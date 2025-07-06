import React from 'react'
import { useSales } from '../context/SalesContext'
import { useProduction } from '../context/ProductionContext'
import {
  ShoppingCart,
  Package,
  DollarSign,
  Truck,
  Factory,
  TrendingUp,
  BarChart2,
  PieChart
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart as RePieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

function Dashboard() {
  const {
    stats: {
      totalSales,
      paidOrders,
      pendingOrders,
      deliveredOrders,
      processOrders,
      totalRevenue
    },
    sales
  } = useSales()

  const {
    stats: {
      totalProductionValue = 0
    }
  } = useProduction()

  // Calcular ingreso como pedidos entregados * 10,000 COP
  const ingreso = deliveredOrders * 10000

  const netProfit = ingreso - totalProductionValue

  // Calcular total de pasteles (suma de todas las cantidades de productos)
  const totalPasteles = sales.reduce((total, sale) => {
    if (sale.sale_products && sale.sale_products.length > 0) {
      return total + sale.sale_products.reduce((saleTotal, product) => saleTotal + (product.quantity || 0), 0)
    }
    return total + (sale.quantity || 0)
  }, 0)

  // Calcular pedidos por entregar (total de pasteles que faltan por entregar)
  const pedidosPorEntregar = sales.reduce((total, sale) => {
    if (sale.sale_products && sale.sale_products.length > 0) {
      const pendientes = sale.sale_products.reduce((sum, product) => sum + (product.quantity || 0), 0)
      if (sale.delivery_status === 'entregado') {
        return total
      }
      return total + pendientes
    }
    return total
  }, 0)

  // Calcular pedidos por pagar (status pendiente)
  const pedidosPorPago = sales.filter(sale => sale.status === 'pendiente').length

  // Calcular pedidos entregados (delivery_status entregado)
  const pedidosEntregados = sales.filter(sale => sale.delivery_status === 'entregado').length

  // Datos para las gráficas
  const chartData = {
    ventas: [
      { label: 'Por Pagar', value: pedidosPorPago },
      { label: 'Pagados', value: paidOrders }
    ],
    entregas: [
      { label: 'Por Entregar', value: pedidosPorEntregar },
      { label: 'Entregados', value: pedidosEntregados }
    ]
  }

  const statCards = [
    {
      title: 'Total de Ventas',
      value: totalSales,
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      bgColor: 'bg-gradient-to-br from-green-400 to-green-600',
      isCount: true
    },
    {
      title: 'Pedidos Pagados',
      value: paidOrders,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
      isCount: true
    },
    {
      title: 'Total de Pasteles',
      value: totalPasteles,
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      isCount: true
    },
    {
      title: 'Pedidos por Entregar',
      value: pedidosPorEntregar,
      icon: <Package className="w-6 h-6 text-white" />,
      bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600',
      isCount: true
    },
    {
      title: 'Pedidos por Pagar',
      value: pedidosPorPago,
      icon: <Truck className="w-6 h-6 text-white" />,
      bgColor: 'bg-gradient-to-br from-teal-400 to-teal-600',
      isCount: true
    },
    {
      title: 'Pedidos Entregados',
      value: pedidosEntregados,
      icon: <Truck className="w-6 h-6 text-white" />,
      bgColor: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      isCount: true
    },
    {
      title: 'Valor Total Producción',
      value: totalProductionValue,
      icon: <Factory className="w-6 h-6 text-white" />,
      bgColor: 'bg-gradient-to-br from-orange-400 to-orange-600',
      isCount: false
    },
    {
      title: 'Ingreso',
      value: ingreso,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      bgColor: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      isCount: false
    },
    {
      title: 'Utilidad Neta',
      value: netProfit,
      icon: <DollarSign className="w-6 h-6 text-white" />,
      bgColor: netProfit >= 0 
        ? 'bg-gradient-to-br from-green-400 to-green-600'
        : 'bg-gradient-to-br from-red-400 to-red-600',
      isCount: false
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleString('es-CO')}
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map(({ title, value, icon, bgColor, isCount }) => (
          <div 
            key={title} 
            className={`${bgColor} rounded-2xl shadow-xl transform transition-all duration-200 hover:scale-105`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white bg-opacity-20">
                  {icon}
                </div>
                <span className="text-xs font-medium text-white bg-black bg-opacity-20 px-2 py-1 rounded-full">
                  {isCount ? 'Cantidad' : 'Valor'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
                <p className="text-3xl font-bold text-white">
                  {isCount 
                    ? (value || 0).toLocaleString('es-CO')
                    : (value || 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfica de Estado de Pagos */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
              Estado de Pagos
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={256}>
            <BarChart data={chartData.ventas} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de Estado de Entregas */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-purple-500" />
              Estado de Entregas
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={256}>
            <RePieChart>
              <Pie
                data={chartData.entregas}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8b5cf6"
                label
              >
                {chartData.entregas.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#a78bfa'} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
