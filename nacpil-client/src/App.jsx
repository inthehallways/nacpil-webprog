import { createBrowserRouter, RouterProvider } from "react-router-dom";

//homepage structure

import Layout from './components/Layout';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';


const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/articles',
        element: <ArticleListPage />
      },
      {
        path: '/articles/:name',
        element: <ArticlePage />
      },
      {
        path: '/404',
        element: <NotFoundPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App