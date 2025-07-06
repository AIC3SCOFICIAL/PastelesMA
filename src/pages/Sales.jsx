import React, { useState } from 'react'
import { useSales } from '../context/SalesContext'
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Edit,
  Trash2,
  Package,
  Calendar,
  MapPin,
  Phone,
  X,
  DollarSign,
  Truck,
  Check,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { utils } from '../utils/api'
import SalesModalMultiple from '../components/Sales/SalesModalMultiple'

function Sales() {
  const { 
    filteredSales, 
    loading, 
    filters, 
    setFilters, 
    clearFilters, 
    deleteSale,
    updateSale,
    exportData,
    importData,
    getPaymentStatus,
    getDeliveryStatus,
    markAsPaid,
    markAsDelivered,
    markAsNotDelivered
  } = useSales()
  
  const [showSalesModal, setShowSalesModal] = useState(false)
  const [editingSale, setEditingSale] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [actionLoading, setActionLoading] = useState({})

  const handleEdit = (sale) => {
    setEditingSale(sale)
    setShowSalesModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta venta?')) {
      try {
        await deleteSale(id)
      } catch (error) {
        console.error('Error deleting sale:', error)
      }
    }
  }

  const handleExport = async () => {
    try {
      const data = await exportData()
      utils.downloadJSON(data, `ventas-${utils.formatDateShort(new Date())}.json`)
    } catch (error) {
      console.error('Error exporting data:', error)
    }
  }

  const handleImport = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      const data = await utils.readJSONFile(file)
      await importData(data)
      event.target.value = '' // Reset input
    } catch (error) {
      console.error('Error importing data:', error)
      alert('Error al importar el archivo. Verifica que sea un archivo JSON válido.')
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value })
  }

  // Funciones para acciones rápidas con loading
  const handleQuickAction = async (actionFn, saleId, actionType) => {
    setActionLoading(prev => ({ ...prev, [`${saleId}_${actionType}`]: true }))
    try {
      await actionFn(saleId)
    } catch (error) {
      console.error(`Error in ${actionType}:`, error)
    } finally {
      setActionLoading(prev => ({ ...prev, [`${saleId}_${actionType}`]: false }))
    }
  }

  const handleMarkPaid = (sale) => {
    return handleQuickAction(markAsPaid, sale.id, 'paid')
  }

  const handleMarkDelivered = (sale) => {
    return handleQuickAction(markAsDelivered, sale.id, 'delivered')
  }

  const handleMarkNotDelivered = (sale) => {
    return handleQuickAction(markAsNotDelivered, sale.id, 'not_delivered')
  }


  // Función para obtener el badge de estado de pago
  const getPaymentBadge = (sale) => {
    const paymentStatus = getPaymentStatus(sale)
    const statusConfig = {
      'pendiente': { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800', 
        icon: AlertCircle,
        label: 'Pendiente' 
      },
      'pagado': { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        icon: CheckCircle2,
        label: 'Pagado' 
      },
      'cancelado': { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        icon: XCircle,
        label: 'Cancelado' 
      }
    }
    
    const config = statusConfig[paymentStatus] || statusConfig['pendiente']
    const IconComponent = config.icon
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    )
  }

  const getDeliveryBadge = (sale) => {
    const deliveryStatus = getDeliveryStatus(sale)
    const deliveryConfig = {
      'entregada': { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        icon: CheckCircle2,
        label: 'Entregada' 
      },
      'no_entregada': { 
        bg: 'bg-gray-100', 
        text: 'text-gray-800', 
        icon: Package,
        label: 'No Entregada' 
      }
    }
    
    const config = deliveryConfig[deliveryStatus] || deliveryConfig['no_entregada']
    const IconComponent = config.icon
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    )
  }

  // Componente de botones de acción responsive
  const ActionButtons = ({ sale }) => {
    const paymentStatus = getPaymentStatus(sale)
    const deliveryStatus = getDeliveryStatus(sale)

    return (
      <div className="flex flex-col space-y-2">
        {/* Botones de acción rápida */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {sale.status === 'pendiente' && (
            <button
              onClick={() => handleMarkPaid(sale)}
              className="px-2 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded-md transition-colors flex items-center"
              title="Marcar como Pagado"
            >
              <DollarSign className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Pagado</span>
            </button>
          )}
          {sale.delivery_status === 'pendiente' && (
            <button
              onClick={() => handleMarkDelivered(sale)}
              className="px-2 py-1 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-md transition-colors flex items-center"
              title="Marcar como Entregado"
            >
              <Truck className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Entregado</span>
            </button>
          )}
          {sale.delivery_status !== 'entregado' && sale.delivery_status !== 'pendiente' && (
            <button
              onClick={() => handleMarkDelivered(sale)}
              className="px-2 py-1 text-xs bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-md transition-colors flex items-center"
              title="Marcar como Entregado"
            >
              <Truck className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Entregado</span>
            </button>
          )}
        </div>
        
        {/* Botones de edición y eliminación */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handleEdit(sale)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(sale.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  const closeModal = () => {
    setShowSalesModal(false)
    setEditingSale(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // Filtrar ventas por término de búsqueda
  const searchedSales = filteredSales.filter(sale =>
    sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.phone?.includes(searchTerm) ||
    sale.address?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header mejorado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">
                Gestión de Ventas
              </h1>
              <p className="text-gray-600 mt-1">
                Administra pedidos, pagos y entregas
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Importar
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button onClick={handleExport} className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </button>
          <button 
            onClick={() => setShowSalesModal(true)}
            className="btn-success"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Venta
          </button>
        </div>
      </div>

      {/* Resumen de Ventas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total de Pedidos</p>
              <p className="text-3xl font-bold">{searchedSales.length}</p>
              <p className="text-green-100 text-sm mt-1">
                {searchedSales.length === 1 ? 'pedido registrado' : 'pedidos registrados'}
              </p>
            </div>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total de Pasteles</p>
              <p className="text-3xl font-bold">
                {searchedSales.reduce((total, sale) => {
                  if (sale.sale_products && sale.sale_products.length > 0) {
                    return total + sale.sale_products.reduce((productTotal, product) => 
                      productTotal + (product.quantity || 0), 0
                    )
                  }
                  return total
                }, 0)}
              </p>
              <p className="text-blue-100 text-sm mt-1">
                pasteles encargados en total
              </p>
            </div>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Búsqueda y Filtros simplificados */}
      <div className="card">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, teléfono o dirección..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Botón de filtros */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary ${showFilters ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </button>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado del Pedido
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Todos</option>
                    <option value="proceso">En proceso</option>
                    <option value="pagado">Pagado</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método de Pago
                  </label>
                  <select
                    value={filters.payment_method}
                    onChange={(e) => handleFilterChange('payment_method', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Todos</option>
                    <option value="proceso">En proceso</option>
                    <option value="inmediato">Inmediato</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado de Entrega
                  </label>
                  <select
                    value={filters.delivery}
                    onChange={(e) => handleFilterChange('delivery', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Todos</option>
                    <option value="no_entregada">No entregado</option>
                    <option value="entregada">Entregado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Producto
                  </label>
                  <select
                    value={filters.tipo}
                    onChange={(e) => handleFilterChange('tipo', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Todos</option>
                    <option value="pollo">Pasteles de Pollo</option>
                    <option value="cerdo">Pasteles de Cerdo</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="btn-secondary w-full"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Lista de Ventas con diseño mejorado y responsive */}
      <div className="space-y-4 sm:space-y-6">
        {searchedSales.length > 0 ? (
          searchedSales.map((sale) => (
            <div key={sale.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="p-4 sm:p-6">
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {sale.customer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {sale.customer_name}
                        </h3>
                        <div className="text-xl font-bold text-green-600">
                          {utils.formatCurrency(sale.total)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <ActionButtons sale={sale} />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getPaymentBadge(sale)}
                    {getDeliveryBadge(sale)}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Package className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium">
                        {sale.sale_products && sale.sale_products.length > 0 
                          ? sale.sale_products.map(product => 
                              `${product.quantity} ${product.tipo === 'pollo' ? 'Pasteles de Pollo' : 'Pasteles de Cerdo'}`
                            ).join(', ')
                          : 'Sin productos'
                        }
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>{utils.formatDateShort(sale.created_at)}</span>
                    </div>
                    
                    {sale.phone && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{sale.phone}</span>
                      </div>
                    )}
                    
                    {sale.address && (
                      <div className="flex items-start space-x-2 text-gray-500">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="break-words">{utils.truncateText(sale.address, 60)}</span>
                      </div>
                    )}
                    
                    {sale.notes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-gray-700 font-medium">Notas:</span>
                        <span className="text-gray-600 ml-2">{utils.truncateText(sale.notes, 80)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {sale.customer_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2 flex-wrap">
                            <h3 className="text-xl font-bold text-gray-900">
                              {sale.customer_name}
                            </h3>
                            {getPaymentBadge(sale)}
                            {getDeliveryBadge(sale)}
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2 flex-wrap gap-y-1">
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4" />
                              <span className="font-medium">
                                {sale.sale_products && sale.sale_products.length > 0 
                                  ? sale.sale_products.map(product => 
                                      `${product.quantity} ${product.tipo === 'pollo' ? 'Pasteles de Pollo' : 'Pasteles de Cerdo'}`
                                    ).join(', ')
                                  : 'Sin productos'
                                }
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{utils.formatDateShort(sale.created_at)}</span>
                            </div>
                            {sale.phone && (
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>{sale.phone}</span>
                              </div>
                            )}
                          </div>
                          {sale.address && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{utils.truncateText(sale.address, 80)}</span>
                            </div>
                          )}
                          {sale.notes && (
                            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                              <strong>Notas:</strong> {utils.truncateText(sale.notes, 100)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {utils.formatCurrency(sale.total)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {sale.sale_products && sale.sale_products.length > 0 
                            ? `${sale.sale_products.length} producto${sale.sale_products.length > 1 ? 's' : ''}`
                            : 'Total'
                          }
                        </div>
                      </div>
                      
                      <ActionButtons sale={sale} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
            <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              {searchTerm || Object.values(filters).some(f => f) 
                ? 'No se encontraron ventas' 
                : 'No hay ventas registradas'
              }
            </h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base">
              {searchTerm || Object.values(filters).some(f => f)
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Comienza registrando tu primera venta'
              }
            </p>
            {!searchTerm && !Object.values(filters).some(f => f) && (
              <button 
                onClick={() => setShowSalesModal(true)}
                className="btn-success"
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Primera Venta
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal de Venta */}
      {showSalesModal && (
        <SalesModalMultiple 
          isOpen={showSalesModal}
          onClose={closeModal}
          sale={editingSale}
        />
      )}
    </div>
  )
}

export default Sales
