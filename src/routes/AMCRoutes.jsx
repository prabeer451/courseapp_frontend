import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from 'components/Loadable'
import Dashboard from 'layout/Dashboard'
import ProtectedRoute from 'routes/components/ProtectedRoute'

const CreateAMC = Loadable(lazy(() => import('pages/AMC/listAmc')))

const AMCRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'amc',
      element: <ProtectedRoute><CreateAMC /></ProtectedRoute>
    }
  ]
}

export default AMCRoutes
