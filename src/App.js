import React from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from './components/RootLayout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const routes = [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Login />
        },
        {
          path: 'dashboard',
          element: <PrivateRoute />
        }
      ]
    }
  ];

  const browserRouterObj = createBrowserRouter(routes);

  function PrivateRoute() {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return <Dashboard />;
  }

  return (
    <div className="App">
      <RouterProvider router={browserRouterObj}>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              >
                {route.children && route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            ))}
          </Routes>
        </BrowserRouter>
      </RouterProvider>
    </div>
  );
}

export default App;
