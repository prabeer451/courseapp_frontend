import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import TestPage from 'pages/courses/TestPage';
import StudyPage from 'pages/courses/StudyPage';
import ProductRoutes from 'src/routes/ProductRoutes.jsx';
import PartsRoutes from 'src/routes/PartsRoutes.jsx';
import ProtectedRoute from 'routes/components/ProtectedRoute.jsx';
import CustomerRoutes from 'src/routes/CustomerRoutes.jsx';
import ServiceRoutes from 'src/routes/ServiceRoutes.jsx';
import AMCRoutes from 'src/routes/AMCRoutes.jsx';
import ComplaintsRoutes from 'src/routes/ComplaintsRoutes.jsx';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Login = Loadable(lazy(() => import('pages/authentication/login')));
const ListProduct = Loadable(lazy(() => import('pages/products/listProduct')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <Navigate to="/dashboard/default" replace />
    },
    {
      path: 'color',
      element: <ProtectedRoute><Color /></ProtectedRoute>
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <ProtectedRoute><DashboardDefault /></ProtectedRoute>
        }
      ]
    },
    {
      path: 'sample-page',
      element: <ProtectedRoute><SamplePage /></ProtectedRoute>
    },
    {
      path: 'shadow',
      element: <ProtectedRoute><Shadow /></ProtectedRoute>
    },
    {
      path: 'typography',
      element: <ProtectedRoute><Typography /></ProtectedRoute>
    },
    {
      path: 'course/:courseId',
      element: <ProtectedRoute><TestPage /></ProtectedRoute>
    },
    {
      path: 'course/:courseId/study',
      element: <ProtectedRoute><StudyPage /></ProtectedRoute>
    },
    {
      path: 'products',
      element: <ProtectedRoute><ListProduct /></ProtectedRoute>
    },
    ...ProductRoutes.children,
    ...PartsRoutes.children,
    ...CustomerRoutes.children,
    ...ServiceRoutes.children,
    ...AMCRoutes.children,
    ...ComplaintsRoutes.children
  ]
};

export default MainRoutes;