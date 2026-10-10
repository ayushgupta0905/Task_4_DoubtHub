const BASE_API_URL = import.meta.env.VITE_API_URL || "https://task-4-doubthub-6liq.onrender.com/api";
const ML_API_URL = import.meta.env.VITE_ML_API_URL || "https://task-4-doubthub.onrender.com";

// ==========================================
// TOKEN & SESSION MANAGEMENT
// ==========================================

export const getAuthToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("access_token");
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("access_token", token);
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("domain");
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

// Generic fetch wrapper with auth header injection and timeout
const apiRequest = async (endpoint, options = {}, timeoutMs = 25000) => {
  const url = `${BASE_API_URL}${endpoint}`;
  const token = getAuthToken();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
      signal: options.signal || controller.signal,
    });
  } catch (err) {
    if (err.name === "AbortError") {
      const abortErr = new Error(
        "Request timed out. The backend email service (Nodemailer/SMTP) took more than 25 seconds to respond. Please check your email inbox to see if the OTP arrived, or try again."
      );
      abortErr.isTimeout = true;
      throw abortErr;
    }
    throw new Error(
      `Network request failed to ${url}. Please verify internet connection and backend status. (${err.message})`,
      { cause: err }
    );
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg =
      (data && (data.message || data.error || data.detail)) ||
      `Request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
};

// ==========================================
// AUTHENTICATION APIs
// ==========================================

export const signupUser = async (formData) => {
  return await apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      name: formData.name?.trim(),
      email: formData.email?.trim().toLowerCase(),
      college: formData.college?.trim(),
      branch: formData.branch?.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      year: formData.year,
      graduationYear: Number(formData.graduationYear),
      domain: formData.domain,
    }),
  });
};

export const verifyBackendOtp = async (email, otp) => {
  const data = await apiRequest("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({
      email: email?.trim().toLowerCase(),
      otp: String(otp).trim(),
    }),
  });

  if (data?.token) {
    setAuthToken(data.token);
  }
  if (data?.user) {
    setStoredUser(data.user);
    if (data.user.domain) {
      localStorage.setItem("domain", data.user.domain);
    }
  }

  return data;
};

// Alias for backwards compatibility
export const verifyOtp = verifyBackendOtp;

export const loginUser = async (email, password, domain) => {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email?.trim().toLowerCase(),
      password,
      domain,
    }),
  });

  if (data?.token) {
    setAuthToken(data.token);
  }
  if (data?.user) {
    setStoredUser(data.user);
  }
  if (domain) {
    localStorage.setItem("domain", domain);
  }

  return data;
};

export const getUserProfile = async () => {
  return await apiRequest("/auth/profile", {
    method: "GET",
  });
};

export const logoutUser = () => {
  clearAuthSession();
};

// ==========================================
// QUERIES (QUESTIONS) APIs
// ==========================================

export const getQueries = async () => {
  return await apiRequest("/queries", { method: "GET" });
};

export const getInboxQueries = async () => {
  return await apiRequest("/queries/inbox", { method: "GET" });
};

export const getMyQueries = async () => {
  return await apiRequest("/queries/my", { method: "GET" });
};

export const getQueryById = async (id) => {
  return await apiRequest(`/queries/${id}`, { method: "GET" });
};

export const createQuery = async ({ title, description }) => {
  return await apiRequest("/queries", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });
};

export const resolveQuery = async (id) => {
  return await apiRequest(`/queries/${id}/resolve`, {
    method: "PATCH",
  });
};

export const getSimilarQueriesByQueryId = async (id) => {
  const data = await apiRequest(`/queries/${id}/similar`, {
    method: "GET",
  });
  return parseMlRecommendations(data?.queries || data?.recommendations);
};

// ==========================================
// ML SERVICES (Direct + Proxy)
// ==========================================

export const predictDomain = async (queryText) => {
  if (!queryText || !queryText.trim()) return "General";

  // Try direct FastAPI ML Service first
  try {
    const res = await fetch(`${ML_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Query: queryText.trim() }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.prediction) return json.prediction;
    }
  } catch {
    // fallback to backend proxy if direct fails
  }

  // Fallback to Backend proxy
  try {
    const data = await apiRequest("/queries/predict", {
      method: "POST",
      body: JSON.stringify({ query: queryText.trim() }),
    });
    if (data.prediction) return data.prediction;
  } catch {
    // silent fallback
  }

  return "DSA";
};

export const getMLRecommendations = async (queryText) => {
  if (!queryText || !queryText.trim()) return [];

  // Try direct FastAPI ML Service first
  try {
    const res = await fetch(`${ML_API_URL}/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Query: queryText.trim() }),
    });
    if (res.ok) {
      const json = await res.json();
      return parseMlRecommendations(json.recommendations);
    }
  } catch {
    // fallback to backend proxy
  }

  // Fallback to backend proxy
  try {
    const data = await apiRequest("/queries/recommend", {
      method: "POST",
      body: JSON.stringify({ query: queryText.trim() }),
    });
    return parseMlRecommendations(data.recommendations);
  } catch {
    return [];
  }
};

const parseMlRecommendations = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.similar_queries && typeof parsed.similar_queries === "object") {
        return Object.values(parsed.similar_queries);
      }
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return [raw];
    }
  }

  if (typeof raw === "object" && raw.similar_queries) {
    return Object.values(raw.similar_queries);
  }

  return [];
};

// ==========================================
// ANSWERS APIs
// ==========================================

export const getAnswersByQuery = async (queryId) => {
  return await apiRequest(`/answers/${queryId}`, { method: "GET" });
};

export const postAnswer = async (queryId, content) => {
  return await apiRequest(`/answers/${queryId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export const getMyAnswers = async () => {
  return await apiRequest("/answers/my", { method: "GET" });
};

export const deleteAnswer = async (answerId) => {
  return await apiRequest(`/answers/${answerId}`, {
    method: "DELETE",
  });
};

export const acceptAnswer = async (answerId) => {
  return await apiRequest(`/answers/${answerId}/accept`, {
    method: "PATCH",
  });
};

// ==========================================
// BOOKMARKS APIs
// ==========================================

export const getBookmarks = async () => {
  return await apiRequest("/bookmarks", { method: "GET" });
};

export const addBookmark = async (queryId) => {
  return await apiRequest(`/bookmarks/${queryId}`, {
    method: "POST",
  });
};

export const removeBookmark = async (queryId) => {
  return await apiRequest(`/bookmarks/${queryId}`, {
    method: "DELETE",
  });
};

// ==========================================
// DOMAINS APIs
// ==========================================

export const getDomains = async () => {
  return await apiRequest("/domains", { method: "GET" });
};

export const getDomainByName = async (name) => {
  return await apiRequest(`/domains/${encodeURIComponent(name)}`, {
    method: "GET",
  });
};