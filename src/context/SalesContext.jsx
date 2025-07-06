import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { salesAPI } from '../lib/supabase'

const SalesContext = createContext()

// Estados iniciales
const initialState = {
  sales: [],
  products: [],
  loading: false,
  error: null,
  filters: {
    status: '',
    payment_method: '',
    delivery: '',
    tipo: '',
    customer: '',
    date_from: '',
    date_to: ''
  },
  stats: {
    totalSales: 0,
    totalRevenue: 0,
    totalCosts: 0,
    netProfit: 0,
    paidOrders: 0,
    pendingOrders: 0,
    processOrders: 0,
    deliveredOrders: 0
  }
}

// Reducer para manejar las acciones
function salesReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    
    case 'SET_SALES':
      return { ...state, sales: action.payload, loading: false, error: null }
    
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }
    
    case 'ADD_SALE':
      return { 
        ...state, 
        sales: [action.payload, ...state.sales],
        loading: false,
        error: null
      }
    
    case 'UPDATE_SALE':
      return {
        ...state,
        sales: state.sales.map(sale => 
          sale.id === action.payload.id ? action.payload : sale
        ),
        loading: false,
        error: null
      }
    
    case 'DELETE_SALE':
      return {
        ...state,
        sales: state.sales.filter(sale => sale.id !== action.payload),
        loading: false,
        error: null
      }
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    
    case 'CLEAR_FILTERS':
      return { ...state, filters: initialState.filters }
    
    case 'SET_STATS':
      return { ...state, stats: action.payload }
    
    default:
      return state
  }
}

// Provider del contexto
export function SalesProvider({ children }) {
  const [state, dispatch] = useReducer(salesReducer, initialState)

  // Memoizar funciones para evitar recreaciones innecesarias
  const loadSales = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const sales = await salesAPI.getAll()
      const salesData = Array.isArray(sales) ? sales : []
      dispatch({ type: 'SET_SALES', payload: salesData })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      dispatch({ type: 'SET_SALES', payload: [] })
    }
  }, [])

  const loadStats = useCallback(async () => {
    try {
      const stats = await salesAPI.getStats()
      dispatch({ type: 'SET_STATS', payload: stats })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }, [])

  // Cargar datos iniciales una sola vez
  useEffect(() => {
    loadSales()
    loadStats()
  }, [loadSales, loadStats])

  const createSale = async (saleData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const newSale = await salesAPI.create(saleData)
      dispatch({ type: 'ADD_SALE', payload: newSale })
      await loadStats()
      return newSale
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const updateSale = async (id, saleData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const updatedSale = await salesAPI.update(id, saleData)
      dispatch({ type: 'UPDATE_SALE', payload: updatedSale })
      await loadStats()
      return updatedSale
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const deleteSale = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await salesAPI.delete(id)
      dispatch({ type: 'DELETE_SALE', payload: id })
      await loadStats()
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters })
  }

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' })
  }

  const exportData = async () => {
    try {
      return await salesAPI.export()
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const importData = async (data) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await salesAPI.import(data)
      await loadSales()
      await loadStats()
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  // Filtrar ventas según los filtros activos
  const filteredSales = state.sales.filter(sale => {
    const { status, payment_method, delivery, tipo, customer, date_from, date_to } = state.filters
    
    if (status) {
      if (status === 'proceso' && sale.status !== 'pendiente') return false
      if (status === 'pagado' && sale.status !== 'pagado') return false
      if (status === 'cancelado' && sale.status !== 'cancelado') return false
    }
    
    if (payment_method) {
      if (payment_method === 'proceso' && sale.status !== 'pendiente') return false
      if (payment_method === 'inmediato' && sale.status !== 'pagado') return false
    }
    
    if (delivery) {
      const deliveryStatus = getDeliveryStatus(sale)
      if (delivery === 'entregada' && deliveryStatus !== 'entregada') return false
      if (delivery === 'no_entregada' && deliveryStatus !== 'no_entregada') return false
    }
    
    if (tipo) {
      if (!sale.sale_products || sale.sale_products.length === 0) return false
      const hasProductType = sale.sale_products.some(product => product.tipo === tipo)
      if (!hasProductType) return false
    }
    
    if (customer && !sale.customer_name.toLowerCase().includes(customer.toLowerCase())) return false
    
    if (date_from || date_to) {
      const saleDate = new Date(sale.created_at)
      if (date_from && saleDate < new Date(date_from)) return false
      if (date_to && saleDate > new Date(date_to + 'T23:59:59')) return false
    }
    
    return true
  })

  // Funciones auxiliares para determinar estados simplificados
  const getPaymentStatus = (sale) => {
    return sale.status || 'pendiente'
  }

  const getDeliveryStatus = (sale) => {
    if (sale.delivery_status === 'entregado') {
      return 'entregada'
    }
    return 'no_entregada'
  }

  // Funciones para acciones rápidas - versión simplificada
  const markAsPaid = async (saleId) => {
    try {
      const sale = state.sales.find(s => s.id === saleId)
      if (!sale) throw new Error('Venta no encontrada')
      
      await salesAPI.update(saleId, { 
        status: 'pagado'
      })
      
      // Recargar datos para asegurar sincronización
      await loadSales()
      await loadStats()
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const markAsDelivered = async (saleId) => {
    try {
      const sale = state.sales.find(s => s.id === saleId)
      if (!sale) throw new Error('Venta no encontrada')
      
      await salesAPI.update(saleId, { 
        delivery_status: 'entregado'
      })
      
      // Recargar datos para asegurar sincronización
      await loadSales()
      await loadStats()
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const markAsNotDelivered = async (saleId) => {
    try {
      const sale = state.sales.find(s => s.id === saleId)
      if (!sale) throw new Error('Venta no encontrada')
      
      await salesAPI.update(saleId, { 
        delivery_status: 'pendiente'
      })
      
      // Recargar datos para asegurar sincronización
      await loadSales()
      await loadStats()
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      throw error
    }
  }

  const value = {
    ...state,
    filteredSales,
    loadSales,
    createSale,
    updateSale,
    deleteSale,
    setFilters,
    clearFilters,
    exportData,
    importData,
    refreshStats: loadStats,
    getPaymentStatus,
    getDeliveryStatus,
    markAsPaid,
    markAsDelivered,
    markAsNotDelivered
  }

  return (
    <SalesContext.Provider value={value}>
      {children}
    </SalesContext.Provider>
  )
}

// Hook para usar el contexto
export function useSales() {
  const context = useContext(SalesContext)
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider')
  }
  return context
}
