import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { productionAPI } from '../lib/supabase'

const ProductionContext = createContext()

const initialState = {
  productions: [],
  loading: false,
  error: null,
  stats: {
    totalProductionValue: 0,
    totalCosts: 0,
    netProfit: 0
  }
}

function productionReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_PRODUCTIONS':
      return { ...state, productions: action.payload, loading: false, error: null }
    case 'SET_STATS':
      return { ...state, stats: action.payload }
    default:
      return state
  }
}

export function ProductionProvider({ children }) {
  const [state, dispatch] = useReducer(productionReducer, initialState)

  const loadProductions = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const productions = await productionAPI.getAll()
      const productionsData = Array.isArray(productions) ? productions : []
      dispatch({ type: 'SET_PRODUCTIONS', payload: productionsData })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      dispatch({ type: 'SET_PRODUCTIONS', payload: [] })
    }
  }, [])

  const loadStats = useCallback(async () => {
    try {
      const stats = await productionAPI.getStats()
      dispatch({ type: 'SET_STATS', payload: stats })
    } catch (error) {
      console.error('Error loading production stats:', error)
    }
  }, [])

  useEffect(() => {
    loadProductions()
    loadStats()
  }, [loadProductions, loadStats])

  const value = {
    ...state,
    loadProductions,
    loadStats
  }

  return (
    <ProductionContext.Provider value={value}>
      {children}
    </ProductionContext.Provider>
  )
}

export function useProduction() {
  const context = useContext(ProductionContext)
  if (!context) {
    throw new Error('useProduction must be used within a ProductionProvider')
  }
  return context
}

export default ProductionContext
