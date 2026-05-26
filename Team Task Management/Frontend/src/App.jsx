import { createBrowserRouter, RouterProvider } from "react-router"
import Signup from './pages/login/Signup'
import Signin from './pages/login/Signin'
import Forget from './pages/login/Forget'
import Home from './components/Home'
import Dashboard from "./pages/dashboard/Dashboard"
import Sidebar from "./pages/dashboard/Sidebar"
import Task from "./pages/dashboard/Task"

const router = createBrowserRouter([
  {
    path: '',
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/sidebar',
        element:<Sidebar/>
      },
      {
        path:'/task',
        element:<Task/>
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
])


function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )

}

export default App
