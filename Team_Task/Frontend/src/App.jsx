import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Home from './components/Home';
import Signup from './pages/login/Signup';
import Signin from './pages/login/Signin';
import Forget from './pages/login/Forget';
import Dashboard from "./pages/dashboard/Dashboard";
import Project from "./pages/admin/Project";
import Team from "./pages/admin/Team";
import Calender from "./pages/calender/Calender";
import UserManagement from "./pages/admin/UserManagement";
import ManagerProjects from "./pages/projectManager/ManagerProjects";
import ManagerTasks from "./pages/projectManager/ManagerTasks";
import UnAuthorizedPage from "./components/UnAuthorizedPage";
import ProtectedRoute from "./pages/protectedRoutes/ProtectedRoutes";
import RoleBasedHome from "./pages/dashboard/RoleBasedHome";
import ManagerTeam from "./pages/projectManager/ManagerTeam";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EngineerTask from './pages/engineer/EngineerTask';

const router = createBrowserRouter([
  {
    path: '',
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/unauthorized',
        element: <UnAuthorizedPage />
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['Admin', 'Project Manager', 'Engineer']}>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            element: <RoleBasedHome />
          },
          {
            path: 'user-management',
            element: <UserManagement />
          },
          {
            path: 'project-management',
            element: <Project />
          },
          {
            path: 'team',
            element: <Team />
          },
          {
            path: 'projects',
            element: (
              <ProtectedRoute allowedRoles={['Project Manager']}>
                <ManagerProjects />
              </ProtectedRoute>
            ),
          },
          {
            path: 'tasks',
            element: (
              <ProtectedRoute allowedRoles={['Project Manager']}>
                <ManagerTasks />
              </ProtectedRoute>
            ),
          },
          {
            path: 'teams',
            element: (
              <ProtectedRoute allowedRoles={['Project Manager']}>
                <ManagerTeam />
              </ProtectedRoute>
            ),
          },
          {
            path: 'engineer-tasks',
            element: (
              <ProtectedRoute allowedRoles={['Engineer']}>
                <EngineerTask />
              </ProtectedRoute>
            ),
          },
          {
            path: 'calender',
            element: (
              <ProtectedRoute allowedRoles={['Admin', 'Project Manager', 'Engineer']}>
                <Calender />
              </ProtectedRoute>
            ),
          },
        ]
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/forget',
        element: <Forget />
      },
    ]
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
      <ToastContainer />
    </>
  )
};
export default App;
