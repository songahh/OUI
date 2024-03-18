import './App.css';
import { Suspense, useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import routers from './pages/router'
import { StyledEngineProvider } from '@mui/material/styles';
import useStore from './store'

const queryClient = new QueryClient() // QueryClient 생성

function App() {

  const [ router ] = useState( createBrowserRouter( routers ))

  return (
    <QueryClientProvider client={ queryClient }> {/* QueryClientProvider 추가 */}
      <Suspense>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={ router } />
        </StyledEngineProvider>
      </Suspense>
      <ReactQueryDevtools /> {/* DevTools를 사용하려면 추가 */}
    </QueryClientProvider>
  )
}

export default App;

