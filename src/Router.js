import Home from './Home.js'
import Test1 from './Contents/Test1.js'
import Test2 from './Contents/Test2.js'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Wrapper from './Wrapper.js';
import Blog from './Pages/Blog.js';
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper />,
      errorElement : <Test2 />,
      children:[
          {
            path: "Home",
            element: <Home />,
            children: [{
                path: 'Blogs/:id',
                element : <Blog name = 'Test1'/>
            }]
          },
      ]
    },

  ]);
export default function Router(){
    
    return <>
        <RouterProvider router={router} />
    </>
}