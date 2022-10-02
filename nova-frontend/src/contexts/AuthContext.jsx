import { createContext } from 'react'
import { useState } from 'react'


export const AuthContext = createContext(null)

export default function Context({ children }) {
    let [user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}