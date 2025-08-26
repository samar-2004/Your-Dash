const BASE_URL = 'http://localhost:5000/api'; // Adjust this to match your backend port

const request = async (url, options = {}) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const api = {
  get: (url) => request(url),
  post: (url, data) => request(url, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (url, data) => request(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (url) => request(url, {
    method: 'DELETE',
  }),
};
