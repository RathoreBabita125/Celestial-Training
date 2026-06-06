import { createBrowserRouter, RouterProvider } from "react-router";
import Signup from './pages/login/Signup';
import Signin from './pages/login/Signin';
import Forget from './pages/login/Forget';
import Home from './components/Home';
import Dashboard from "./pages/dashboard/Dashboard";
import Project from "./pages/dashboard/Project";
import Calender from "./pages/dashboard/Calender";
import DashHome from "./pages/dashboard/Home";
import Activity from "./pages/dashboard/Activity";
import Message from "./pages/dashboard/Message";
import Task from "./pages/dashboard/Task";
import Team from "./pages/dashboard/Team";
// import Inbox from "./pages/dashboard/Inbox";
import CreateTask from "./pages/tasks/CreateTask";
import ViewTask from "./pages/tasks/ViewTask";
import EditTask from "./pages/tasks/EditTask";
import DeleteTask from "./pages/tasks/DeleteTask";
import UserManagement from "./pages/dashboard/UserManagement";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
        element:<Dashboard/>,
        children:[
          {
            path:'',
            element:<DashHome/>
          },
          {
            path:'usermanagement',
            element:<UserManagement/>
          },
          {
            path:'project',
            element:<Project/>
          },
          {
            path:'task',
            element:<Task/>,
            children:[
              {
                path:'createtask',
                element:<CreateTask/>
              },
              {
                path:'deletetask',
                element:<DeleteTask/>
              },
              {
                path:'edittask',
                element:<EditTask/>
              },
              {
                path:'viewtask',
                element:<ViewTask/>
              },
            ]
          },
          {
            path:'team',
            element:<Team/>
          },
          {
            path:'calender',
            element:<Calender/>
          },
          {
            path:'message',
            element:<Message/>
          },
          {
            path:'activity',
            element:<Activity/>
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
