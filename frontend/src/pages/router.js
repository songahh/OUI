import { useRouter } from '../hooks'

export const routes = [
    

]

const lazyModules = routes?.map( ( { path, dynamicPath } ) => useRouter( path, dynamicPath ) )

lazyModules.unshift( {
    path: '/',
    lazy: async () => {
        const module = await import( `./home` )
        return {
            Component: module.default
        }
    }
} )

export default lazyModules
