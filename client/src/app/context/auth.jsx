import { createContext, useState, useContext, useEffect } from "react"
import apiClient from "../api/apiClient"

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [error, setError] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
          setIsProcessing(true)
          const { data, error } = await apiClient.fetchUserFromToken()
          if(data) setUser(data.user)
          if (error) setError(error)
        }
        const token = localStorage.getItem("poke_token")
        if(token) {
          setIsProcessing(false)
          apiClient.setToken(token)
          fetchUser()
        }
      },[])

    const authValue = { user, setUser, error, setError, isProcessing, setIsProcessing }

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)