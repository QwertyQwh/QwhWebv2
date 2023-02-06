import Home from './Home.jsx'
import  {BlogLoader} from './Router/BlogLoader'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Wrapper from './Wrapper.jsx';
import Blog from './Pages/Blog/Blog.jsx';

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