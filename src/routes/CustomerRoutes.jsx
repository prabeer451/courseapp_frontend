import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from 'components/Loadable'
import Dashboard from 'layout/Dashboard'
import ProtectedRoute from 'routes/components/ProtectedRoute'

const CustomerList = Loadable(lazy(() => import('pages/customers/listCustomers')))
const CustomerProducts = Loadable(lazy(() => import('pages/customers/customerProducts/listCustomerProducts')))

const CustomerRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'customers',
      element: <ProtectedRoute><CustomerList /></ProtectedRoute>
    },
    {
      path: 'customers/:customerId/products',
      element: <ProtectedRoute><CustomerProducts /></ProtectedRoute>
    }
  ]
}

export default CustomerRoutes