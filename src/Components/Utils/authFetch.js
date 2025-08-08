// /Utils/authFetch.js
export default async function authFetch(url, options = {}, navigate) {
  const token = localStorage.getItem('token'); // adjust if using sessionStorage

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 && navigate) {
      navigate('/login');
    }

    return response; // ✅ DO NOT call response.json() here
  } catch (error) {
    console.error("authFetch error:", error);
    throw error;
  }
}
