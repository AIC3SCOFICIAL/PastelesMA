import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'
import Production from './pages/Production'
import { SalesProvider } from './context/SalesContext'
import { ProductionProvider } from './context/ProductionContext'

function App() {
  return (
    <SalesProvider>
      <ProductionProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ventas" element={<Sales />} />
              <Route path="/produccion" element={<Production />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ProductionProvider>
    </SalesProvider>
  )
}

export default App
