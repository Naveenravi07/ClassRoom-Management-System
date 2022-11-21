import { createContext } from 'react'
import { useState } from 'react'


export const ClassContext = createContext([])

export default function ClassContextWrapper({ children }) {
    const [allclasses, setallclasses] = useState([])
    return (
        <ClassContext.Provider value={{ allclasses, setallclasses }}>
            {children}
        </ClassContext.Provider>
    )
}