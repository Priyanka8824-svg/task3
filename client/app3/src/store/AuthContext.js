import { useState, createContext } from 'react'


export const AuthContext = createContext({
    user: {},
    setUser: () => { },
    accessToken: null,
    refreshToken: null,
    csrftoken: null,
    setAccessToken: () => { },
    setRefreshToken: () => { },
    setCSRFToken: () => { },
    loggedIn: null,
    setLoggedIn: () => { },
})

export function AuthContextProvider(props) {

    const [user, setUser] = useState({username:null})
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [csrftoken, setCSRFToken] = useState()
    const [loggedIn, setLoggedIn] = useState(false)

    return <AuthContext.Provider value={{
        user, setUser,
        accessToken, setAccessToken,
        refreshToken, setRefreshToken,
        csrftoken, setCSRFToken,
        loggedIn, setLoggedIn
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext


