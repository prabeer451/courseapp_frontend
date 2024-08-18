import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from 'components/Loadable'
import Dashboard from 'layout/Dashboard'

const ProductProfile = Loadable(lazy(() => import('pages/products/productProfile')))

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    // return <Navigate to="/login" replace />
  }
  return children
}

const ProductRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'products/:productId',
      element: <ProtectedRoute><ProductProfile /></ProtectedRoute>
    }
  ]
}

export default ProductRoutes

// To activate these routes, import ProductRoutes in your main routing file and include it in the routes array.

