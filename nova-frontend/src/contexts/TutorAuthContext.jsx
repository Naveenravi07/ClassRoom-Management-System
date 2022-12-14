import { createContext } from 'react'
import { useState } from 'react'


export const TutuorAuthContext = createContext(null)

export default function TutorContext({ children }) {
    const [tutor, setTutor] = useState(null)
    return (
        <TutuorAuthContext.Provider value={{ tutor, setTutor }}>
            {children}
        </TutuorAuthContext.Provider>
    )
}