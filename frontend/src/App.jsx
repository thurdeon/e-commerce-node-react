import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './util/http.js';

import RootLayout from './pages/RootLayout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ContactUsPage from './pages/ContactUsPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx'
import AboutUs from './pages/AboutUsPage.jsx';
import { ToastContainer } from 'react-toastify';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          element: <LandingPage/>
        },
        {
          path: 'shop',
          children: [
            {
              index: true,
              element: <ShopPage/>,
            },
            {
              path: 'product/:productId',
              element: <ProductPage/>
            },
            {
              path: 'checkout',
              element: <CheckoutPage/>
            }
          ]
        },
        {
          path: 'account',
          children: [
            {
              index: true,
              element: <LoginPage/>,
            },
            {
          path: 'login',
          element: <LoginPage/>
          }, 
          {
            path: 'signup',
            element: <SignUpPage/>
          }
        ]
        },
        {
          path: 'about-us',
          element: <AboutUs/>
        },

        {
          path: 'contact-us',
          element: <ContactUsPage/>
        }
      ]
    }
  ])

  return <div>
    <QueryClientProvider client ={queryClient}>
    <ToastContainer position='top-center' limit={3}/>
    <RouterProvider router={router}/>
    </QueryClientProvider>
    </div>
      
  
}

export default App
