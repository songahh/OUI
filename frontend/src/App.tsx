import logo from './logo.svg';
import './App.css';
import { Suspense, useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import routers from './pages/router'
import useStore from './store'

const queryClient = new QueryClient() // QueryClient 생성

function App() {

  const [ router ] = useState( createBrowserRouter( routers ))

  return (
    <QueryClientProvider client={ queryClient }> {/* QueryClientProvider 추가 */}
      <Suspense>
        <RouterProvider router={ router } />
      </Suspense>
      <ReactQueryDevtools /> {/* DevTools를 사용하려면 추가 */}
    </QueryClientProvider>
  )
}

export default App;
