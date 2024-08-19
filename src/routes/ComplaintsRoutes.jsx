import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import Loadable from 'components/Loadable'
import Dashboard from 'layout/Dashboard'
import ProtectedRoute from 'routes/components/ProtectedRoute'

const ListComplaints = Loadable(lazy(() => import('pages/complaint/listComplaint')))

const ComplaintsRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: 'complaints',
      element: <ProtectedRoute><ListComplaints /></ProtectedRoute>
    }
  ]
}

export default ComplaintsRoutes
