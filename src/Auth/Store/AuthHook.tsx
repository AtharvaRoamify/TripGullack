import { createContext, useContext, useEffect, useState } from "react"
import type { User,AuthContextType} from "../Store/Types"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("trip-gullack-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))      
      // Mock user data - in real app, this would come from your API
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      }
      
      setUser(mockUser)
      localStorage.setItem("trip-gullack-user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data - in real app, this would come from your API
      const mockUser: User = {
        id: "1",
        email,
        name,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      }
      
      setUser(mockUser)
      localStorage.setItem("trip-gullack-user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("trip-gullack-user")
  }

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loading
    }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
