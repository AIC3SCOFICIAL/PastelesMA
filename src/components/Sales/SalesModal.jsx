import React, { useState, useEffect } from 'react'
import { X, Save, Calculator } from 'lucide-react'
import { useSales } from '../../context/SalesContext'
import { utils } from '../../utils/api'

function SalesModal({ isOpen, onClose, sale = null }) {
  const { createSale, updateSale, loading } = useSales()
  const [formData, setFormData] = useState({
    customer_name: '',
    tipo: '',
    quantity: 1,
    price_per_unit: 10000,
    phone: '',
    address: '',
    notes: '',
    status: 'pendiente',
    delivery_status: 'pendiente'
  })

  const [errors, setErrors] = useState({})

  // Si estamos editando, cargar los datos de la venta
  useEffect(() => {
    if (sale) {
      setFormData({
        customer_name: sale.customer_name || '',
        tipo: sale.tipo || '',
        quantity: sale.quantity || 1,
        price_per_unit: sale.price_per_unit || 10000,
        phone: sale.phone || '',
        address: sale.address || '',
        notes: sale.notes || '',
        status: sale.status || 'pendiente',
        delivery_status: sale.delivery_status || 'pendiente'
      })
    }
  }, [sale])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'El nombre del cliente es requerido'
    }

    if (!formData.tipo) {
      newErrors.tipo = 'Debe seleccionar un tipo de producto'
    }

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'La cantidad debe ser mayor a 0'
    }

    if (!formData.price_per_unit || formData.price_per_unit < 1) {
      newErrors.price_per_unit = 'El precio debe ser mayor a 0'
    }

    if (formData.phone && !utils.isValidPhone(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      const saleData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        price_per_unit: parseFloat(formData.price_per_unit),
        total: parseInt(formData.quantity) * parseFloat(formData.price_per_unit)
      }

      if (sale) {
        await updateSale(sale.id, saleData)
      } else {
        await createSale(saleData)
      }

      onClose()
      
      // Reset form
      setFormData({
        customer_name: '',
        tipo: '',
        quantity: 1,
        price_per_unit: 10000,
        phone: '',
        address: '',
        notes: '',
        status: 'pendiente',
        delivery_status: 'pendiente'
      })
    } catch (error) {
      console.error('Error saving sale:', error)
    }
  }

  const calculateTotal = () => {
    const quantity = parseInt(formData.quantity) || 0
    const pricePerUnit = parseFloat(formData.price_per_unit) || 0
    return quantity * pricePerUnit
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">
            {sale ? 'Editar Venta' : 'Nueva Venta'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Cliente *
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleInputChange}
                className={`input-field ${errors.customer_name ? 'border-red-500' : ''}`}
                placeholder="Ej: Juan Pérez"
              />
              {errors.customer_name && (
                <p className="text-red-500 text-xs mt-1">{errors.customer_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Producto *
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className={`input-field ${errors.tipo ? 'border-red-500' : ''}`}
              >
                <option value="">Seleccionar tipo</option>
                <option value="pollo">Pasteles de Pollo</option>
                <option value="cerdo">Pasteles de Cerdo</option>
              </select>
              {errors.tipo && (
                <p className="text-red-500 text-xs mt-1">{errors.tipo}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                className={`input-field ${errors.quantity ? 'border-red-500' : ''}`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio por Unidad *
              </label>
              <input
                type="number"
                name="price_per_unit"
                value={formData.price_per_unit}
                onChange={handleInputChange}
                min="1"
                className={`input-field ${errors.price_per_unit ? 'border-red-500' : ''}`}
              />
              {errors.price_per_unit && (
                <p className="text-red-500 text-xs mt-1">{errors.price_per_unit}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Precio por defecto: $10,000</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono / WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="Ej: 3001234567"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado del Pedido
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección de Entrega
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="input-field resize-none"
                placeholder="Dirección completa para la entrega..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado de Entrega
              </label>
              <select
                name="delivery_status"
                value={formData.delivery_status}
                onChange={handleInputChange}
                className="input-field mb-3"
              >
                <option value="pendiente">No Entregada</option>
                <option value="entregado">Entregada</option>
              </select>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas Adicionales
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="2"
                className="input-field resize-none"
                placeholder="Observaciones especiales..."
              />
            </div>
          </div>

          {/* Total de la Venta */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Total de la Venta</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {utils.formatCurrency(calculateTotal())}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {sale ? 'Actualizar Venta' : 'Guardar Venta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SalesModal
