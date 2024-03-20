import { useRouter } from '../hooks'

export const routes = [
    { path: 'diary' },
    { path: 'calendar' },
    { path: 'home' },
    { path: 'main' },
    { path: 'mypage' },
    { path: 'login' },
    { path: 'research'},
    { path: 'analysis'},
]

const lazyModules = routes?.map( ( { path, dynamicPath } ) => useRouter( path, dynamicPath ) )

lazyModules.unshift( {
    path: '/',
    lazy: async () => {
        const module = await import( `./main` )
        return {
            Component: module.default
        }
    }
} )

export default lazyModules
