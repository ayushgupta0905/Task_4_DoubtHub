
const BASE_API_URL =
  import.meta.env.VITE_API_URL ||
  "https://task-4-doubthub-6liq.onrender.com/api";

const ML_API_URL =
  import.meta.env.VITE_ML_API_URL ||
  "https://task-4-doubthub.onrender.com";

// ==========================================
// TOKEN & SESSION MANAGEMENT
// ==========================================

export const getAuthToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("access_token")
  );
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

// ==========================================
// GENERIC API REQUEST
// ==========================================

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
        "Request timed out. Please check the backend service and try again."
      );
      abortErr.isTimeout = true;
      throw abortErr;
    }

    throw new Error(
      `Network request failed to ${url}. Check your internet connection and backend status. (${err.message})`,
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
  const data = await apiRequest("/auth/signup", {
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

  if (data?.token) {
    setAuthToken(data.token);
  }

  if (data?.user) {
    setStoredUser(data.user);
  }

  if (formData.domain) {
    localStorage.setItem("domain", formData.domain);
  }

  return data;
};

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
// QUERIES APIs
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

  return parseMlRecommendations(
    data?.queries || data?.recommendations
  );
};

// ==========================================
// ML DOMAIN PREDICTION
// ==========================================

// ML endpoint resolution (uses local Vite dev proxy /ml to bypass CORS during development)
const getMlUrl = (endpoint) => {
  if (import.meta.env.DEV) {
    return `/ml${endpoint}`;
  }
  return `${ML_API_URL}${endpoint}`;
};

export const predictDomain = async (queryText) => {
  const query = queryText?.trim();

  if (!query) return "";

  // 1. Try direct ML service (or local dev proxy)
  try {
    const response = await fetch(getMlUrl("/predict"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Query: query,
      }),
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      if (data?.prediction) return data.prediction;
    }
  } catch {
    // fallback to backend proxy if direct fails
  }

  // 2. Fallback to authenticated backend proxy
  if (getAuthToken()) {
    try {
      const data = await apiRequest("/queries/predict", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      if (data?.prediction) return data.prediction;
    } catch {
      // silent fallback
    }
  }

  return "General";
};

// ==========================================
// ML RECOMMENDATIONS
// ==========================================

export const getMLRecommendations = async (queryText) => {
  const query = queryText?.trim();

  if (!query) return [];

  // 1. Try direct ML service (or local dev proxy)
  try {
    const response = await fetch(getMlUrl("/recommend"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Query: query,
      }),
    });

    if (response.ok) {
      const data = await response.json().catch(() => null);
      if (data?.recommendations) {
        return parseMlRecommendations(data.recommendations);
      }
    }
  } catch {
    // fallback to backend proxy
  }

  // 2. Fallback to authenticated backend proxy
  if (getAuthToken()) {
    try {
      const data = await apiRequest("/queries/recommend", {
        method: "POST",
        body: JSON.stringify({ query }),
      });
      if (data?.recommendations) {
        return parseMlRecommendations(data.recommendations);
      }
    } catch {
      return [];
    }
  }

  return [];
};

// ==========================================
// PARSE ML RECOMMENDATIONS
// ==========================================

const parseMlRecommendations = (raw) => {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw;
  }

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);

      if (
        parsed.similar_queries &&
        typeof parsed.similar_queries === "object"
      ) {
        return Object.values(parsed.similar_queries);
      }

      if (Array.isArray(parsed)) {
        return parsed;
      }

      return [];
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
  return await apiRequest(`/answers/${queryId}`, {
    method: "GET",
  });
};

export const postAnswer = async (queryId, content) => {
  return await apiRequest(`/answers/${queryId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

export const getMyAnswers = async () => {
  return await apiRequest("/answers/my", {
    method: "GET",
  });
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
  return await apiRequest("/bookmarks", {
    method: "GET",
  });
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
  return await apiRequest("/domains", {
    method: "GET",
  });
};

export const getDomainByName = async (name) => {
  return await apiRequest(
    `/domains/${encodeURIComponent(name)}`,
    { method: "GET" }
  );
};
