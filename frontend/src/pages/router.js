import { useRouter } from '../hooks'

export const routes = [
    { path: 'calendar' }

]

const lazyModules = routes?.map( ( { path, dynamicPath } ) => useRouter( path, dynamicPath ) )

lazyModules.unshift( {
    path: '/',
    lazy: async () => {
        const module = await import( `./calendar` )
        return {
            Component: module.default
        }
    }
} )

export default lazyModules
