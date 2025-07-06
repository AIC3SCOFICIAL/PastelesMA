import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Factory, 
  Store,
  User,
  Activity
} from 'lucide-react'
import clsx from 'clsx'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Panel de control',
    color: 'from-blue-500 to-indigo-600',
    hoverColor: 'hover:bg-blue-50 hover:shadow-blue-500/25',
    activeColor: 'bg-blue-50 shadow-blue-500/25',
    textColor: 'text-blue-600'
  },
  {
    name: 'Ventas',
    href: '/ventas',
    icon: ShoppingCart,
    description: 'Gestión de pedidos',
    color: 'from-green-500 to-emerald-600',
    hoverColor: 'hover:bg-green-50 hover:shadow-green-500/25',
    activeColor: 'bg-green-50 shadow-green-500/25',
    textColor: 'text-green-600'
  },
  {
    name: 'Producción',
    href: '/produccion',
    icon: Factory,
    description: 'Control de costos',
    color: 'from-orange-500 to-red-600',
    hoverColor: 'hover:bg-orange-50 hover:shadow-orange-500/25',
    activeColor: 'bg-orange-50 shadow-orange-500/25',
    textColor: 'text-orange-600'
  }
]

function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  const isActive = (href) => {
    return location.pathname === href
  }

  return (
    <>
      {/* Sidebar Desktop y Mobile */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-30 border-r border-gray-200",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header del Sidebar */}
        <div className="h-20 flex items-center justify-center px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">M&A</h1>
              <p className="text-blue-100 text-sm font-medium">Sistema de Gestión</p>
            </div>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="mt-8 px-6 space-y-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
            Menú Principal
          </div>
          
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={clsx(
                  "nav-link group block",
                  active ? "active" : ""
                )}
              >
                <div className={clsx(
                  "flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300",
                  active 
                    ? `${item.activeColor} shadow-lg scale-105`
                    : `${item.hoverColor} hover:shadow-lg hover:scale-105`
                )}>
                  <div className={clsx(
                    "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300",
                    `bg-gradient-to-br ${item.color}`,
                    active ? `shadow-${item.color.split('-')[1]}-500/25` : ""
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className={clsx(
                      "font-medium transition-colors duration-300",
                      active 
                        ? item.textColor
                        : `text-gray-800 group-hover:${item.textColor}`
                    )}>
                      {item.name}
                    </span>
                    <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                  </div>
                  <div className={clsx(
                    "w-2 h-2 rounded-full transition-opacity duration-300",
                    active 
                      ? `bg-${item.color.split('-')[1]}-400 opacity-100`
                      : `bg-${item.color.split('-')[1]}-400 opacity-0 group-hover:opacity-100`
                  )}></div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Footer del Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-gradient-to-r from-gray-100 to-blue-100 rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-sm">M&A</p>
                <p className="text-gray-600 text-xs">Sistema Activo</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
