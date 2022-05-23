import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import { auth } from "./firebase";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [instructorIdentifier, setInstructorIdentifier] = useState('')
    const [regNumber, setRegNumber] = useState(null)
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user)
            else setUser(null)
        })
    }, [])

    return (<UserContext.Provider value={{ user, instructorIdentifier, setInstructorIdentifier, setRegNumber }} >
        {children}
    </UserContext.Provider>)
}

export default UserContext;