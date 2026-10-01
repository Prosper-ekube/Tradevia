import { createContext, useCallback, useState, type ReactNode } from 'react'
import type { UserProfile } from '@/types'
import { readToken, readUser, writeSession, clearSession } from '@/utils/authStorage'

export interface AuthSession {
    token: string
    user: UserProfile
}

export interface AuthContextValue {
    token: string | null
    user: UserProfile | null
    isAuthenticated: boolean
    save: (session: AuthSession) => void
    clear: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(readToken)
    const [user, setUser] = useState<UserProfile | null>(readUser)

    const save = useCallback((session: AuthSession) => {
        writeSession(session.token, session.user)
        setToken(session.token)
        setUser(session.user)
    }, [])

    const clear = useCallback(() => {
        clearSession()
        setToken(null)
        setUser(null)
    }, [])

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, save, clear }}>
            {children}
        </AuthContext.Provider>
    )
}