import { createContext } from 'react'
import { useContext, useState } from 'react'


export const TutuorAuthContext = createContext(null)

export default function TutorContext({ children }) {
    let [tutor, setTutor] = useState(null)

    return (
        <TutuorAuthContext.Provider value={{ tutor, setTutor }}>
            {children}
        </TutuorAuthContext.Provider>
    )
}