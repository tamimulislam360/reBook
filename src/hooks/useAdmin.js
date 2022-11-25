import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthProvider"

const useAdmin = email => {
    const {setLoading} = useContext(AuthContext) 
    const [isAdmin, setIsAdmin] = useState('')
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.isAdmin)
                setIsAdminLoading(false)
                
            })
        }
    }, [email])
    
    return [isAdmin,isAdminLoading]
}

export default useAdmin