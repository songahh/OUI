import { useRouter } from '../hooks'

export const routes = [
    { path: 'diarywrite' },
    { path: 'diaryedit' },
    { path: 'diary' },
    { path: 'calendar' },
    { path: 'main' },
    { path: 'mypage' },
    { path: 'login' },
    { path: 'research'},
    { path: 'analysis'},
    { path: 'kakao', dynamicPath: 'auth/login/kakao'},
]

const lazyModules = routes?.map( ( { path, dynamicPath } ) => useRouter( path, dynamicPath ) )

lazyModules.unshift( {
    path: '/',
    lazy: async () => {
        const module = await import( `./login` )
        return {
            Component: module.default
        }
    }
} )

export default lazyModules
