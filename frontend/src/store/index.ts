import { create } from 'zustand'
import { persist } from "zustand/middleware";


const useStore = create(

  persist<MainStore>(
    ( set ) => ({

      accessToken: '',
      setAccessToken: ( accessToken ) => set( { accessToken } ),

      isLogin: false,
      setIsLogin: ( isLogin ) => set( { isLogin } )

    }),
    {
      name: 'userStorage',
    },
  ),
);

export default useStore


type MainStore = {

  accessToken: string,
  setAccessToken: ( accessToken: string ) => void

  isLogin: boolean
  setIsLogin: ( isLogin: boolean ) => void

}