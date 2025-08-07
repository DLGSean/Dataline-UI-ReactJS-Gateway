// ✅ src/Components/Utils/authFetch.js
export default async function authFetch(url, options = {}, navigate) {
  const token = localStorage.getItem('token');

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      if (navigate) navigate('/');
      return null;
    }

    return await response.text();
  } catch (error) {
    console.error('authFetch error:', error);
    throw error;
  }
}
