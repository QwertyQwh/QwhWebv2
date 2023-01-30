import Home from './Home.jsx'
import Test1 from './Contents/Test1.jsx'
import Test2 from './Contents/Test2.jsx'
import  {BlogLoader} from './Router/BlogLoader'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Wrapper from './Wrapper.jsx';
import Blog from './Pages/Blog.jsx';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper />,
      children:[
          {
            path: "Home",
            element: <Home />,
            errorElement : <Blog />,
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