import React, { useState } from 'react'
import { 
  Factory, 
  Plus, 
  Calculator, 
  Download, 
  Upload,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Package,
  DollarSign,
  TrendingUp,
  X
} from 'lucide-react'
import ProductionModal from '../components/Production/ProductionModal'

function Production() {
  const [showProductionModal, setShowProductionModal] = useState(false)

  const closeModal = () => {
    setShowProductionModal(false)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">
                Control de Producción
              </h1>
              <p className="text-gray-600 mt-1">
                Funcionalidad temporalmente deshabilitada
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-3">
          <button 
            onClick={() => setShowProductionModal(true)}
            className="btn-warning"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Producción
          </button>
        </div>
      </div>

      {/* Mensaje de funcionalidad deshabilitada */}
      <div className="card">
        <div className="card-body">
          <div className="text-center py-12">
            <Factory className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Funcionalidad de Producción Deshabilitada
            </h3>
            <p className="text-gray-500 mb-6">
              Esta funcionalidad está temporalmente deshabilitada mientras se enfoca en las ventas.
            </p>
          </div>
        </div>
      </div>

      {/* Modal de Producción */}
      {showProductionModal && (
        <ProductionModal 
          isOpen={showProductionModal}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default Production
