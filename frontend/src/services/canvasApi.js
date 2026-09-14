const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/canvases";

async function request(path = "", options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request failed.");
  }
  return response.status === 204 ? null : response.json();
}

export const canvasApi = {
  list: () => request(),
  create: (canvas) => request("", { method: "POST", body: JSON.stringify(canvas) }),
  update: (id, canvas) => request(`/${id}`, { method: "PUT", body: JSON.stringify(canvas) }),
  remove: (id) => request(`/${id}`, { method: "DELETE" })
};
