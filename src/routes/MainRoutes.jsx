import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import TestPage from 'pages/courses/TestPage';
import StudyPage from 'pages/courses/StudyPage';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const Login = Loadable(lazy(() => import('pages/authentication/login')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
    }
  ]
};

export default MainRoutes;
