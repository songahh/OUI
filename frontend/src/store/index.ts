import { create } from 'zustand'
import { persist } from "zustand/middleware";


type MainStore = {
  session: Session,
  setSession: ( session: Session ) => void

  accessToken: string,
  setAccessToken: ( accessToken: string ) => void

  isLogin: boolean
  setIsLogin: ( isLogin: boolean ) => void

  userId : string
  setUserId: ( userId: string ) => void
}

type Session = {
  id: number,
  email: string,
  nickname: string,
  profileImage: string,
}

const useStore = create(
  persist<MainStore>(
    (set) => ({
      session: null,
      setSession: ( session ) => set( { session } ),

      accessToken: '',
      setAccessToken: ( accessToken ) => set( { accessToken } ),

      isLogin: false,
      setIsLogin: ( isLogin ) => set( { isLogin } ),

      userId : '',
      setUserId: ( userId ) => set( { userId } ),
    }),
    {
      name: 'userStorage',
    },
  ),
);
export default useStore