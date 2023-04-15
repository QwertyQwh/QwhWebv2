import Home from './Home.jsx'
import  {BlogLoader} from './Router/BlogLoader'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Wrapper from './Wrapper.jsx';
import Blog from './Pages/Blog/Blog.jsx';
import TestScene from './Scene/TestScene.jsx';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper />,
      children:[
          {
            path: "Home",
            element: <Home />,
          },
          {
            path: "Test",
            element: <TestScene />,
          },
        {
            path: 'Blogs/:id',
            element : <Blog />,
            loader: BlogLoader,
      }
      ]
    },

  ]);
export default function Router(){
    return <>
        <RouterProvider router={router} />
    </>
}