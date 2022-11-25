import { useState } from "react"

const useJwtToken = (email) => {
    const [token, setToken] = useState('')
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
   return [token]
}

export default useJwtToken