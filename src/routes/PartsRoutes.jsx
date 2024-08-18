import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from 'components/Loadable'
import Dashboard from 'layout/Dashboard'
import ProtectedRoute from 'routes/components/ProtectedRoute'

const PartList = Loadable(lazy(() => import('pages/parts/listParts')))

const PartsRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'parts',
      element: <ProtectedRoute><PartList /></ProtectedRoute>
    }
  ]
}

export default PartsRoutes
