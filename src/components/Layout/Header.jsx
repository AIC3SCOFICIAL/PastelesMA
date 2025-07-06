import React from 'react'
import { Menu, Store } from 'lucide-react'

function Header({ onMenuClick }) {
  return (
    <header className="lg:hidden h-16 flex items-center justify-between px-4 bg-white border-b border-gray-200 sticky top-0 z-10">
      <button 
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>
      
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
          <Store className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-lg font-bold text-gray-900">M&A</h1>
      </div>
    </header>
  )
}

export default Header
