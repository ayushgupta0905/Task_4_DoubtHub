const API_URL = "http://localhost:8000/api";

// =========================
// LOGIN API
// =========================

export const loginUser = async (email, password, domain) => {
  const response = await fetch(`${API_URL}/auth/login`, {
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.detail ||
      data.error ||
      "Login failed"
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