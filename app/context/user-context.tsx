"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, Address, PaymentMethod } from "../types/user"

interface UserContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateUserInfo: (userData: Partial<User>) => Promise<void>
  addAddress: (address: Omit<Address, "id">) => Promise<void>
  updateAddress: (addressId: string, addressData: Partial<Address>) => Promise<void>
  removeAddress: (addressId: string) => Promise<void>
  addPaymentMethod: (paymentMethod: Omit<PaymentMethod, "id">) => Promise<void>
  removePaymentMethod: (paymentMethodId: string) => Promise<void>
  setDefaultAddress: (addressId: string) => Promise<void>
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Mock user data for development
const mockUser: User = {
  id: "user123",
  email: "messi@example.com",
  username: "Messi",
  firstName: "Lionel",
  lastName: "Messi",
  displayName: "Lionel Messi",
  phoneNumber: "+54 9 11 1234-5678",
  profilePicture: "/placeholder.svg?height=100&width=100",
  addresses: [
    {
      id: "addr1",
      street: "Avenida Libertador",
      number: "1986",
      neighborhood: "Palermo",
      city: "CABA",
      state: "Buenos Aires",
      zipCode: "C1425",
      country: "Argentina",
      isDefault: true,
      label: "Casa",
    },
  ],
  paymentMethods: [
    {
      id: "pm1",
      type: "credit_card",
      lastFourDigits: "8610",
      bank: "Banco Galicia",
      cardBrand: "visa",
      holderName: "LIONEL MESSI",
      expirationMonth: 12,
      expirationYear: 2026,
      isDefault: true,
    },
    {
      id: "pm2",
      type: "credit_card",
      lastFourDigits: "9797",
      bank: "Banco Galicia",
      cardBrand: "mastercard",
      holderName: "LIONEL MESSI",
      expirationMonth: 8,
      expirationYear: 2025,
      isDefault: false,
    },
  ],
  preferences: {
    receivePromotions: true,
    receiveNewsletters: false,
    twoFactorAuth: true,
    notificationPreferences: {
      email: true,
      push: true,
      sms: false,
    },
  },
  level: "platinum",
  createdAt: new Date("2020-01-15"),
  lastLogin: new Date(),
  isVerified: true,
  isSeller: false,
  sellerInfo: undefined,
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setUser(mockUser)
          setIsLoading(false)
        }, 500)
      } catch (err) {
        setError("Error al cargar los datos del usuario")
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      setUser(mockUser)
      setError(null)
    } catch (err) {
      setError("Credenciales inválidas")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateUserInfo = async (userData: Partial<User>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Asegurarnos de que estamos actualizando correctamente el estado
      const updatedUser = { ...user, ...userData }
      console.log("Usuario actualizado:", updatedUser)
      setUser(updatedUser)
    } catch (err) {
      setError("Error al actualizar la información del usuario")
    } finally {
      setIsLoading(false)
    }
  }

  // Modificar la función addAddress para asegurar que la primera dirección sea predeterminada
  const addAddress = async (address: Omit<Address, "id">) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newAddress: Address = {
        ...address,
        id: `addr${Date.now()}`,
        // Si es la primera dirección, hacerla predeterminada automáticamente
        isDefault: user.addresses.length === 0 ? true : address.isDefault,
      }

      // Si esta es la primera dirección o marcada como default, actualizar todas las demás
      const updatedAddresses =
        address.isDefault || user.addresses.length === 0
          ? user.addresses.map((addr) => ({ ...addr, isDefault: false }))
          : [...user.addresses]

      setUser({
        ...user,
        addresses: [...updatedAddresses, newAddress],
      })
    } catch (err) {
      setError("Error al agregar la dirección")
    } finally {
      setIsLoading(false)
    }
  }

  const updateAddress = async (addressId: string, addressData: Partial<Address>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      let updatedAddresses = [...user.addresses]

      // If setting this address as default, update all others
      if (addressData.isDefault) {
        updatedAddresses = updatedAddresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId ? true : false,
        }))
      } else {
        // Regular update
        updatedAddresses = updatedAddresses.map((addr) => (addr.id === addressId ? { ...addr, ...addressData } : addr))
      }

      setUser({
        ...user,
        addresses: updatedAddresses,
      })
    } catch (err) {
      setError("Error al actualizar la dirección")
    } finally {
      setIsLoading(false)
    }
  }

  const removeAddress = async (addressId: string) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedAddresses = user.addresses.filter((addr) => addr.id !== addressId)

      // If we removed the default address and there are other addresses, make the first one default
      if (user.addresses.find((addr) => addr.id === addressId)?.isDefault && updatedAddresses.length > 0) {
        updatedAddresses[0].isDefault = true
      }

      setUser({
        ...user,
        addresses: updatedAddresses,
      })
    } catch (err) {
      setError("Error al eliminar la dirección")
    } finally {
      setIsLoading(false)
    }
  }

  const addPaymentMethod = async (paymentMethod: Omit<PaymentMethod, "id">) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newPaymentMethod: PaymentMethod = {
        ...paymentMethod,
        id: `pm${Date.now()}`,
      }

      // If this is the first payment method or marked as default, update all others
      const updatedPaymentMethods = paymentMethod.isDefault
        ? user.paymentMethods.map((pm) => ({ ...pm, isDefault: false }))
        : [...user.paymentMethods]

      setUser({
        ...user,
        paymentMethods: [...updatedPaymentMethods, newPaymentMethod],
      })
    } catch (err) {
      setError("Error al agregar el método de pago")
    } finally {
      setIsLoading(false)
    }
  }

  const removePaymentMethod = async (paymentMethodId: string) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedPaymentMethods = user.paymentMethods.filter((pm) => pm.id !== paymentMethodId)

      // If we removed the default payment method and there are others, make the first one default
      if (user.paymentMethods.find((pm) => pm.id === paymentMethodId)?.isDefault && updatedPaymentMethods.length > 0) {
        updatedPaymentMethods[0].isDefault = true
      }

      setUser({
        ...user,
        paymentMethods: updatedPaymentMethods,
      })
    } catch (err) {
      setError("Error al eliminar el método de pago")
    } finally {
      setIsLoading(false)
    }
  }

  const setDefaultAddress = async (addressId: string) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedAddresses = user.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))

      setUser({
        ...user,
        addresses: updatedAddresses,
      })
    } catch (err) {
      setError("Error al actualizar la dirección predeterminada")
    } finally {
      setIsLoading(false)
    }
  }

  const setDefaultPaymentMethod = async (paymentMethodId: string) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedPaymentMethods = user.paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === paymentMethodId,
      }))

      setUser({
        ...user,
        paymentMethods: updatedPaymentMethods,
      })
    } catch (err) {
      setError("Error al actualizar el método de pago predeterminado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        updateUserInfo,
        addAddress,
        updateAddress,
        removeAddress,
        addPaymentMethod,
        removePaymentMethod,
        setDefaultAddress,
        setDefaultPaymentMethod,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider")
  }
  return context
}

