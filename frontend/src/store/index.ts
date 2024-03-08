import { create } from 'zustand'

const useStore = create<MainStore>( ( set, get ) => ( {

  session: null,
  setSession: ( session ) => set( { session } ),

  accessToken: '',
  setAccessToken: ( accessToken ) => set( { accessToken } ),

  isLogin: false,
  setIsLogin: ( isLogin ) => set( { isLogin } ),

  userId : '',
  setUserId: ( userId ) => set( { userId } ),

}))

export default useStore

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