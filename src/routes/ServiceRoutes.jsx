import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from 'components/Loadable'
import Dashboard from 'layout/Dashboard'
import ProtectedRoute from 'routes/components/ProtectedRoute'

const ServiceList = Loadable(lazy(() => import('pages/services/listService')))

const ServiceRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'services',
      element: <ProtectedRoute><ServiceList /></ProtectedRoute>
    }
  ]
}

export default ServiceRoutes
