import { Suspense, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import routers from './pages/router'
import { createPortal } from 'react-dom'
import { CookiesProvider } from 'react-cookie';
import { useNavigate } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles';
import styled from 'styled-components';
import useStore from 'src/store'
import { MyPage } from 'src/components/control'


const AppWrapper = styled.div`
  margin: auto; 
  max-width: 1024px; 
  width: 100%; 
  min-height: 100vh;
  background-color: #F9F3EE;
`
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 400;
`
const Modal = styled.div`
  height: 50%;
  width: 60%;
  background-color: #FFF;
  box-shadow: 0px -3px 0px 0px rgba(211, 211, 211, 0.2);
  border-radius: 10px;
  position: fixed;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const queryClient = new QueryClient() // QueryClient 생성

function App() {

  const navigator = useNavigate()

  const { isModalOpened, updateModal, memberId } = useStore()
  
  const [ router ] = useState( createBrowserRouter( routers ))
  
  const html = document.querySelector( 'html' )

  if( memberId ===null){
    navigator('./login')
  }

  const closeModal = () => { 
      updateModal();
      html?.classList.remove( 'scroll-locked' )
  }

  const ModalPortal = ({ children, onClose  }) => { 
    const handleBackgroundClick = (e) => {
      ( e.target === e.currentTarget ) && onClose()
    }
    return createPortal(
      <ModalBackground onClick={ handleBackgroundClick }>
        <Modal>{ children }</Modal>
      </ModalBackground>,
      document.body
    )
  }


  return (
    <CookiesProvider>
    <QueryClientProvider client={ queryClient }> {/* QueryClientProvider 추가 */}
      <Suspense>
        <StyledEngineProvider injectFirst>
          <AppWrapper>
            <RouterProvider router={ router } />
            { 
              isModalOpened && 
                <ModalPortal onClose={ closeModal }>
                  <MyPage/>
                </ModalPortal>
            }
          </AppWrapper>
        </StyledEngineProvider>
      </Suspense>
      <ReactQueryDevtools /> {/* DevTools를 사용하려면 추가 */}
    </QueryClientProvider>
    </CookiesProvider>
  )
}

export default App;

