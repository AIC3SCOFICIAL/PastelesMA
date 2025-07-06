import React, { useState, useEffect } from 'react'
import { X, Save, Calculator, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { useSales } from '../../context/SalesContext'
import { utils } from '../../utils/api'

function SalesModalMultiple({ isOpen, onClose, sale = null }) {
  const { createSale, updateSale, loading } = useSales()
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    address: '',
    notes: '',
    status: 'pendiente',
    delivery_status: 'pendiente',
    payment_method: 'proceso'
  })

  const [products, setProducts] = useState([
    {
      id: Date.now(),
      tipo: '',
      quantity: 1,
      price_per_unit: 10000
    }
  ])

  const [errors, setErrors] = useState({})

  // Si estamos editando, cargar los datos de la venta
  useEffect(() => {
    if (sale) {
      setFormData({
        customer_name: sale.customer_name || '',
        phone: sale.phone || '',
        address: sale.address || '',
        notes: sale.notes || '',
        status: sale.status || 'pendiente',
        delivery_status: sale.delivery_status || 'pendiente',
        payment_method: sale.status === 'pagado' ? 'inmediato' : 'proceso'
      })
      
      // Cargar los productos reales de la base de datos
      if (sale.sale_products && sale.sale_products.length > 0) {
        setProducts(sale.sale_products.map((product, index) => ({
          id: Date.now() + index,
          tipo: product.tipo,
          quantity: product.quantity,
          price_per_unit: product.price_per_unit
        })))
      } else {
        // Si no hay productos en la base de datos, crear uno por defecto
        setProducts([{
          id: Date.now(),
          tipo: 'pollo',
          quantity: 1,
          price_per_unit: 10000
        }])
      }
    } else {
      // Reset para nueva venta
      setFormData({
        customer_name: '',
        phone: '',
        address: '',
        notes: '',
        status: 'pendiente',
        delivery_status: 'pendiente',
        payment_method: 'proceso'
      })
      setProducts([{
        id: Date.now(),
        tipo: '',
        quantity: 1,
        price_per_unit: 10000
      }])
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

  const handleProductChange = (productId, field, value) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, [field]: value }
        : product
    ))
    
    // Limpiar errores de productos
    if (errors[`product_${productId}_${field}`]) {
      setErrors(prev => ({
        ...prev,
        [`product_${productId}_${field}`]: ''
      }))
    }
  }

  const addProduct = () => {
    setProducts(prev => [...prev, {
      id: Date.now(),
      tipo: '',
      quantity: 1,
      price_per_unit: 10000
    }])
  }

  const removeProduct = (productId) => {
    if (products.length > 1) {
      setProducts(prev => prev.filter(product => product.id !== productId))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'El nombre del cliente es requerido'
    }

    if (formData.phone && !utils.isValidPhone(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido'
    }

    // Validar productos
    products.forEach(product => {
      if (!product.tipo) {
        newErrors[`product_${product.id}_tipo`] = 'Debe seleccionar un tipo de producto'
      }
      if (!product.quantity || product.quantity < 1) {
        newErrors[`product_${product.id}_quantity`] = 'La cantidad debe ser mayor a 0'
      }
      if (!product.price_per_unit || product.price_per_unit < 1) {
        newErrors[`product_${product.id}_price_per_unit`] = 'El precio debe ser mayor a 0'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      // Crear objeto sin payment_method ya que no existe en la base de datos
      // Solo enviar campos que existen en la tabla sales de Supabase
      const { payment_method, ...formDataWithoutPaymentMethod } = formData
      
      const saleData = {
        ...formDataWithoutPaymentMethod,
        total: calculateTotal(),
        // Ajustar el estado de pago automáticamente si es inmediato
        status: payment_method === 'inmediato' ? 'pagado' : formData.status,
        // Incluir los productos
        products: products.map(product => ({
          tipo: product.tipo,
          quantity: parseInt(product.quantity),
          price_per_unit: parseFloat(product.price_per_unit)
        }))
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
        phone: '',
        address: '',
        notes: '',
        status: 'pendiente',
        delivery_status: 'pendiente',
        payment_method: 'proceso'
      })
      setProducts([{
        id: Date.now(),
        tipo: '',
        quantity: 1,
        price_per_unit: 10000
      }])
    } catch (error) {
      console.error('Error saving sale:', error)
    }
  }

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = parseInt(product.quantity) || 0
      const pricePerUnit = parseFloat(product.price_per_unit) || 0
      return total + (quantity * pricePerUnit)
    }, 0)
  }

  const calculateProductSubtotal = (product) => {
    const quantity = parseInt(product.quantity) || 0
    const pricePerUnit = parseFloat(product.price_per_unit) || 0
    return quantity * pricePerUnit
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-4xl">
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
          {/* Información del Cliente */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Información del Cliente</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección de Entrega
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="2"
                className="input-field resize-none"
                placeholder="Dirección completa para la entrega..."
              />
            </div>
          </div>

          {/* Productos */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Productos del Pedido
              </h4>
              <button
                type="button"
                onClick={addProduct}
                className="btn-primary text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar Producto
              </button>
            </div>

            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900">Producto #{index + 1}</h5>
                    {products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de Pastel *
                      </label>
                      <select
                        value={product.tipo}
                        onChange={(e) => handleProductChange(product.id, 'tipo', e.target.value)}
                        className={`input-field ${errors[`product_${product.id}_tipo`] ? 'border-red-500' : ''}`}
                      >
                        <option value="">Seleccionar</option>
                        <option value="pollo">Pasteles de Pollo</option>
                        <option value="cerdo">Pasteles de Cerdo</option>
                      </select>
                      {errors[`product_${product.id}_tipo`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`product_${product.id}_tipo`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cantidad *
                      </label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(product.id, 'quantity', e.target.value)}
                        min="1"
                        className={`input-field ${errors[`product_${product.id}_quantity`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`product_${product.id}_quantity`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`product_${product.id}_quantity`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Precio Unitario *
                      </label>
                      <input
                        type="number"
                        value={product.price_per_unit}
                        onChange={(e) => handleProductChange(product.id, 'price_per_unit', e.target.value)}
                        min="1"
                        className={`input-field ${errors[`product_${product.id}_price_per_unit`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`product_${product.id}_price_per_unit`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`product_${product.id}_price_per_unit`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subtotal
                      </label>
                      <div className="input-field bg-gray-50 font-semibold text-gray-900">
                        {utils.formatCurrency(calculateProductSubtotal(product))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estados y Método de Pago */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Estados del Pedido</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pago
                </label>
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="proceso">Pago en Proceso</option>
                  <option value="inmediato">Pago Inmediato</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.payment_method === 'inmediato' 
                    ? 'El pago se realizó al momento de la venta'
                    : 'El pago se realizará posteriormente'
                  }
                </p>
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
                  disabled={formData.payment_method === 'inmediato'}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
                {formData.payment_method === 'inmediato' && (
                  <p className="text-xs text-green-600 mt-1">
                    Automáticamente marcado como pagado
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de Entrega
                </label>
                <select
                  name="delivery_status"
                  value={formData.delivery_status}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="pendiente">No Entregada</option>
                  <option value="entregado">Entregada</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas Adicionales
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="input-field resize-none"
              placeholder="Observaciones especiales, instrucciones de entrega, etc..."
            />
          </div>

          {/* Total de la Venta */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="w-6 h-6 text-green-600" />
                <div>
                  <span className="text-lg font-semibold text-gray-900">Total del Pedido</span>
                  <p className="text-sm text-gray-600">{products.length} producto(s)</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600">
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

export default SalesModalMultiple
