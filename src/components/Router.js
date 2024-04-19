import React from 'react'
import First from './First';
import Todos from './Todos';
import Navbar from './Navbar';
import History from './History'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
export default function Router() {
    let router = createBrowserRouter([
        {
          path:'/',
          element:<><Navbar/> <First/></>
       },
        {
           path:'/todos',
           element:<><Navbar/> <Todos/></>
        },
        {
            path:'/history',
            element: <><Navbar/> <History/></>
        }
    ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}
