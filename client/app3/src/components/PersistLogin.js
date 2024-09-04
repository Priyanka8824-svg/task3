import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import {AI} from '../axios/AxiosInstance'
import useAI2 from '../hooks/useAI2'
import {NavLink,useNavigate,useParams,Outlet} from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'

export default function PersistLogin() {
    const [loading, setLoading] = useState(true)
    const { user, setUser, accessToken,setAccessToken, setRefreshToken,
        setCSRFToken, loggedIn, setLoggedIn } = useAuth()
    const nav = useNavigate()
    const AI2 = useAI2()
    const refresh = useRefreshToken()

    async function logoutUser () {
        try{
          const res = await AI.get('logout/')
          console.log( res )
        }
        catch(e){
            console.log('error',e)
        }
        finally {
            setUser({ username:null })
            setAccessToken(null)
            setRefreshToken(null)
            setCSRFToken(null)
            setLoggedIn(null)
            nav(`/login/`)
        }
    }



    useEffect(() => {
        let isMounted = true

        async function verifyUser() {
            try {
                await refresh()
                const res = await AI2.get('user/info/')
                // console.log(res)
                setUser({ username:res.data.username })
                setLoggedIn(true)
            }
            catch (error) {
                console.log( error ) 
            }
            finally {
                isMounted && setLoading(false)
            }
        }

        !accessToken ? verifyUser() : setLoading(false)

        return ()=>{isMounted = false}
    }, [])

    return (
        loading ? <h1 className="mt-5 text-center">Loading..</h1> : <Outlet />
    )
}



