import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthProvider"

const useJwtToken = (email) => {
    const {loading} = useContext(AuthContext)
    const [token, setToken] = useState('')
    // if(loading) return
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.accessToken) {
                    localStorage.setItem('accessToken', data.accessToken)
                    setToken(data.accessToken)
                }
            })
       }
    },[email])
   return [token]
}

export default useJwtToken