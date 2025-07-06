// Configuración base de la API
const API_BASE_URL = '/api'

// Función helper para hacer requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

// API para ventas
export const salesAPI = {
  // Obtener todas las ventas
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/sales?${queryString}` : '/sales'
    const response = await apiRequest(endpoint)
    return response.data || []
  },

  // Obtener una venta por ID
  getById: async (id) => {
    const response = await apiRequest(`/sales/${id}`)
    return response.data
  },

  // Crear nueva venta
  create: async (saleData) => {
    const response = await apiRequest('/sales', {
      method: 'POST',
      body: JSON.stringify(saleData),
    })
    return response.data
  },

  // Actualizar venta
  update: async (id, saleData) => {
    const response = await apiRequest(`/sales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(saleData),
    })
    return response.data
  },

  // Eliminar venta
  delete: async (id) => {
    const response = await apiRequest(`/sales/${id}`, {
      method: 'DELETE',
    })
    return response.data
  },

  // Obtener productos disponibles
  getProducts: async () => {
    const response = await apiRequest('/products')
    return response.data || []
  },

  // Obtener estadísticas
  getStats: async () => {
    const response = await apiRequest('/stats')
    return response.data || {}
  },

  // Exportar datos
  export: async () => {
    const response = await apiRequest('/sales/export')
    return response.data
  },

  // Importar datos
  import: async (data) => {
    const response = await apiRequest('/sales/import', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.data
  },
}

// API para producción
export const productionAPI = {
  // Obtener todas las producciones
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const endpoint = queryString ? `/production?${queryString}` : '/production'
    const response = await apiRequest(endpoint)
    return response.data || []
  },

  // Obtener una producción por ID
  getById: async (id) => {
    const response = await apiRequest(`/production/${id}`)
    return response.data
  },

  // Crear nueva producción
  create: async (productionData) => {
    const response = await apiRequest('/production', {
      method: 'POST',
      body: JSON.stringify(productionData),
    })
    return response.data
  },

  // Actualizar producción
  update: async (id, productionData) => {
    const response = await apiRequest(`/production/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productionData),
    })
    return response.data
  },

  // Eliminar producción
  delete: async (id) => {
    const response = await apiRequest(`/production/${id}`, {
      method: 'DELETE',
    })
    return response.data
  },

  // Obtener estadísticas de producción
  getStats: async () => {
    const response = await apiRequest('/production/stats')
    return response.data || {}
  },

  // Exportar datos de producción
  export: async () => {
    const response = await apiRequest('/production/export')
    return response.data
  },

  // Importar datos de producción
  import: async (data) => {
    const response = await apiRequest('/production/import', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return response.data
  },
}

// Utilidades adicionales
export const utils = {
  // Formatear moneda
  formatCurrency: (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount)
  },

  // Formatear fecha
  formatDate: (date) => {
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date))
  },

  // Formatear fecha corta
  formatDateShort: (date) => {
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date))
  },

  // Descargar archivo JSON
  downloadJSON: (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },

  // Leer archivo JSON
  readJSONFile: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          resolve(data)
        } catch (error) {
          reject(new Error('Archivo JSON inválido'))
        }
      }
      reader.onerror = () => reject(new Error('Error al leer el archivo'))
      reader.readAsText(file)
    })
  },

  // Generar ID único
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },

  // Debounce para búsquedas
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Validar email
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Validar teléfono colombiano
  isValidPhone: (phone) => {
    const phoneRegex = /^(\+57|57)?[1-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  },

  // Calcular porcentaje
  calculatePercentage: (value, total) => {
    if (total === 0) return 0
    return ((value / total) * 100).toFixed(1)
  },

  // Truncar texto
  truncateText: (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substr(0, maxLength) + '...'
  },
}

export default {
  salesAPI,
  productionAPI,
  utils,
}
