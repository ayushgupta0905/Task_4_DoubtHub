const API_URL = "http://192.168.1.105:8000/api";

// =========================
// LOGIN API
// =========================

export const loginUser = async (email, password, domain) => {
  let response;
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        domain: domain,
      }),
    });
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error(
        `Failed to connect to backend server at ${API_URL}. Please check your network connection, ensure the backend is running, and verify CORS configuration.`
      );
    }
    throw err;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      (data && (data.message || data.detail || data.error)) ||
      `Login failed with status ${response.status}`
    );
  }

  return data;
};


// =========================
// SIGNUP API
// =========================

export const signupUser = async (formData) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      college: formData.college,
      branch: formData.branch,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      year: formData.year,
      graduationYear: formData.graduationYear,
      domain: formData.domain,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.detail ||
      data.error ||
      "Signup failed"
    );
  }

  return data;
};