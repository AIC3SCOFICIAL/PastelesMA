import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dfaztxegscmynengqkgx.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYXp0eGVnc2NteW5lbmdxa2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODQ5NzEsImV4cCI6MjA2NzM2MDk3MX0.oZybbvC3mX3y5u-ayShTfhOnty-GRzZIpSiUbnRu1lw'
const supabase = createClient(supabaseUrl, supabaseKey)


// Funciones para ventas
export const salesAPI = {
  getAll: async (filters = {}) => {
    let query = supabase
      .from('sales')
      .select(`
        *,
        sale_products (
          id,
          tipo,
          quantity,
          price_per_unit,
          subtotal
        )
      `)

    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    if (filters.delivery_status) {
      query = query.eq('delivery_status', filters.delivery_status)
    }
    if (filters.customer_name) {
      query = query.ilike('customer_name', `%${filters.customer_name}%`)
    }
    if (filters.tipo) {
      query = query.eq('sale_products.tipo', filters.tipo)
    }
    if (filters.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      throw error
    }
    return data
  },

  getStats: async () => {
    try {
      // Obtener estadísticas de ventas desde la base de datos
      const { data: sales, error } = await supabase
        .from('sales')
        .select('status, delivery_status, total')

      if (error) {
        throw error
      }

      // Calcular estadísticas
      const totalSales = sales.length
      const paidOrders = sales.filter(sale => sale.status === 'pagado').length
      const pendingOrders = sales.filter(sale => sale.status === 'pendiente').length
      const processOrders = sales.filter(sale => sale.delivery_status === 'en_preparacion' || sale.delivery_status === 'listo').length
      const deliveredOrders = sales.filter(sale => sale.delivery_status === 'entregado').length
      
      // Los ingresos deben venir solo de los pedidos pagados
      const totalRevenue = sales
        .filter(sale => sale.status === 'pagado')
        .reduce((sum, sale) => sum + (sale.total || 0), 0)

      return {
        totalSales,
        paidOrders,
        pendingOrders,
        processOrders,
        deliveredOrders,
        totalRevenue,
        totalCosts: 0,
        netProfit: totalRevenue
      }
    } catch (error) {
      console.error('Error loading sales stats:', error)
      return {
        totalSales: 0,
        paidOrders: 0,
        pendingOrders: 0,
        processOrders: 0,
        deliveredOrders: 0,
        totalRevenue: 0,
        totalCosts: 0,
        netProfit: 0
      }
    }
  },



  create: async (saleData) => {
    const { products, ...saleInfo } = saleData
    
    // Crear la venta primero
    const { data: saleResult, error: saleError } = await supabase
      .from('sales')
      .insert([saleInfo])
      .select()
    
    if (saleError) {
      throw saleError
    }
    
    const sale = saleResult[0]
    
    // Crear los productos de la venta
    if (products && products.length > 0) {
      const saleProducts = products.map(product => ({
        sale_id: sale.id,
        tipo: product.tipo,
        quantity: product.quantity,
        price_per_unit: product.price_per_unit,
        subtotal: product.quantity * product.price_per_unit
      }))
      
      const { error: productsError } = await supabase
        .from('sale_products')
        .insert(saleProducts)
      
      if (productsError) {
        throw productsError
      }
    }
    
    // Retornar la venta con sus productos
    return await salesAPI.getById(sale.id)
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('sales')
      .select(`
        *,
        sale_products (
          id,
          tipo,
          quantity,
          price_per_unit,
          subtotal
        )
      `)
      .eq('id', id)
      .single()
    
    if (error) {
      throw error
    }
    return data
  },

  update: async (id, updates) => {
    const { products, ...saleInfo } = updates
    
    // Actualizar la venta
    const { data: saleResult, error: saleError } = await supabase
      .from('sales')
      .update(saleInfo)
      .eq('id', id)
      .select()
    
    if (saleError) {
      throw saleError
    }
    
    // Si hay productos, actualizar los productos
    if (products && products.length > 0) {
      // Eliminar productos existentes
      await supabase.from('sale_products').delete().eq('sale_id', id)
      
      // Insertar nuevos productos
      const saleProducts = products.map(product => ({
        sale_id: id,
        tipo: product.tipo,
        quantity: product.quantity,
        price_per_unit: product.price_per_unit,
        subtotal: product.quantity * product.price_per_unit
      }))
      
      const { error: productsError } = await supabase
        .from('sale_products')
        .insert(saleProducts)
      
      if (productsError) {
        throw productsError
      }
    }
    
    // Retornar la venta actualizada con sus productos
    return await salesAPI.getById(id)
  },

  delete: async (id) => {
    const { error } = await supabase.from('sales').delete().eq('id', id)
    if (error) {
      throw error
    }
  }
}

// Funciones para producción (si se decide mantener, sino eliminar)
export const productionAPI = {
  getAll: async () => {
    // Si no se usa producción, puede lanzar error o retornar vacío
    return []
  },
  getStats: async () => {
    try {
      // Obtener datos de producción desde la base de datos
      const { data: productions, error } = await supabase
        .from('production')
        .select('cost')

      if (error) {
        console.error('Error fetching production data:', error)
        return {
          totalProductionValue: 0,
          totalCosts: 0,
          netProfit: 0
        }
      }

      const totalProductionValue = productions?.reduce((sum, prod) => sum + (prod.cost || 0), 0) || 0

      return {
        totalProductionValue,
        totalCosts: totalProductionValue,
        netProfit: 0
      }
    } catch (error) {
      console.error('Error loading production stats:', error)
      return {
        totalProductionValue: 0,
        totalCosts: 0,
        netProfit: 0
      }
    }
  },



  create: async () => {
    throw new Error('No implementado')
  },
  update: async () => {
    throw new Error('No implementado')
  },
  delete: async () => {
    throw new Error('No implementado')
  }
}

export default {
  salesAPI,
  productionAPI
}
