import Home from './Home.jsx'
import  {BlogLoader} from './Router/BlogLoader'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Wrapper from './Wrapper.jsx';
import Blog_Legacy from './Pages/Blog_Legacy/Blog_Legacy.jsx';
import Blog from './Pages/Blog/Blog.jsx';
import TestScene from './Scene/TestScene.jsx';
import { SectionLoader } from './Router/SectionLoader.js';
import Section_Router from './Pages/Sections/Section_Router.jsx';
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
            path: "Section/:section",
            element: <Section_Router />,
            loader: SectionLoader,
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