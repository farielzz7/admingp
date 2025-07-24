import axios from "axios"

// Configuración base de Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Funciones de API para diferentes entidades
export const authAPI = {
  login: (credentials: { email: string; password: string }) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
}

export const usersAPI = {
  getAll: (params?: any) => api.get("/users", { params }),
  getById: (id: number) => api.get(`/users/${id}`),
  create: (data: any) => api.post("/users", data),
  update: (id: number, data: any) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
}

export const turistasAPI = {
  getAll: (params?: any) => api.get("/turistas", { params }),
  getById: (id: number) => api.get(`/turistas/${id}`),
  create: (data: any) => api.post("/turistas", data),
  update: (id: number, data: any) => api.put(`/turistas/${id}`, data),
  delete: (id: number) => api.delete(`/turistas/${id}`),
}

export const destinosAPI = {
  getAll: (params?: any) => api.get("/destinos", { params }),
  getById: (id: number) => api.get(`/destinos/${id}`),
  create: (data: any) => api.post("/destinos", data),
  update: (id: number, data: any) => api.put(`/destinos/${id}`, data),
  delete: (id: number) => api.delete(`/destinos/${id}`),
  getCategories: () => api.get("/categorias-destino"),
}

export const hotelesAPI = {
  getAll: (params?: any) => api.get("/hoteles", { params }),
  getById: (id: number) => api.get(`/hoteles/${id}`),
  create: (data: any) => api.post("/hoteles", data),
  update: (id: number, data: any) => api.put(`/hoteles/${id}`, data),
  delete: (id: number) => api.delete(`/hoteles/${id}`),
}

export const paquetesAPI = {
  getAll: (params?: any) => api.get("/paquetes", { params }),
  getById: (id: number) => api.get(`/paquetes/${id}`),
  create: (data: any) => api.post("/paquetes", data),
  update: (id: number, data: any) => api.put(`/paquetes/${id}`, data),
  delete: (id: number) => api.delete(`/paquetes/${id}`),
  getTipos: () => api.get("/tipos-paquete"),
}

export const reservasAPI = {
  getAll: (params?: any) => api.get("/reservas", { params }),
  getById: (id: number) => api.get(`/reservas/${id}`),
  create: (data: any) => api.post("/reservas", data),
  update: (id: number, data: any) => api.put(`/reservas/${id}`, data),
  delete: (id: number) => api.delete(`/reservas/${id}`),
}

export const pagosAPI = {
  getAll: (params?: any) => api.get("/pagos", { params }),
  getById: (id: number) => api.get(`/pagos/${id}`),
  create: (data: any) => api.post("/pagos", data),
  update: (id: number, data: any) => api.put(`/pagos/${id}`, data),
  delete: (id: number) => api.delete(`/pagos/${id}`),
  getMetodos: () => api.get("/metodos-pago"),
}

export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
  getChartData: () => api.get("/dashboard/charts"),
}

export default api
