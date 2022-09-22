import { createContext } from 'react'
import { useContext, useState } from 'react'


export const AuthContext = createContext(null)

export default function Context({ children }) {
    let [user, setUser] = useState({
        name: "",
        _id: "",
        type: ""
    })

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}