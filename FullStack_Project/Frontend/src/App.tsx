import { createBrowserRouter, RouterProvider } from "react-router"
import RegisterPage from './pages/login/RegisterPage'
import LoginPage from "./pages/login/LoginPage"
import ForgetPage from "./pages/login/Forgetpage"
const router=createBrowserRouter([
  {
    path:'/',
    children:[
      {
        path:'/register',
        element:<RegisterPage/>
      },
      {
        path:'/login',
        element:<LoginPage/>
      },
      {
        path:'/forget',
        element:<ForgetPage/>
      },
    ]
  }
])
function App() {
  return <RouterProvider router={router} />
}
export default App
