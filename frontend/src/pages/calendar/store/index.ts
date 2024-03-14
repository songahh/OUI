import { create } from 'zustand'

const useStore = create<Model>(( set, get ) => ({
  isModalOpened: false,
  updateModal: () => set(( state ) => ({ isModalOpened: !state.isModalOpened })),

  clickDate: new Date,
  updateDate: ( date ) => set(( state ) => ({ clickDate: date })),
}))

export interface Model{
  isModalOpened : boolean
  updateModal: () => void
  clickDate: Date
  updateDate: ( date: Date ) => void
}
 
export default useStore;