"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { CartService } from "../services/cart-service"
import type { Cart } from "../types/cart"

interface CartContextType {
  cart: Cart | null
  isLoading: boolean
  error: string | null
  addItem: (productId: string, quantity: number, variantId?: string) => Promise<boolean>
  updateItemQuantity: (itemId: string, quantity: number) => Promise<boolean>
  removeItem: (itemId: string) => Promise<boolean>
  clearCart: () => void
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null)
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load cart ID from local storage on initial load
  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId")
    if (storedCartId) {
      setCartId(storedCartId)
    }
    setIsLoading(false)
  }, [])

  // Fetch cart data when cartId changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!cartId) {
        setCart(null)
        return
      }

      try {
        setIsLoading(true)
        const cartData = await CartService.getCart(cartId)
        setCart(cartData)
      } catch (err) {
        console.error("Error fetching cart:", err)
        setError("Error al cargar el carrito")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCart()
  }, [cartId])

  // Initialize a new cart if needed
  const initializeCart = async () => {
    if (!cartId) {
      try {
        setIsLoading(true)
        const newCart = await CartService.createCart()
        if (newCart) {
          setCartId(newCart.id)
          setCart(newCart)
          localStorage.setItem("cartId", newCart.id)
          return newCart
        }
      } catch (err) {
        console.error("Failed to initialize cart:", err)
        setError("Error al crear el carrito")
      } finally {
        setIsLoading(false)
      }
    }
    return cart
  }

  // Add item to cart
  const addItem = async (productId: string, quantity: number, variantId?: string) => {
    let currentCart = cart

    // If no cart exists yet, create one
    if (!currentCart) {
      currentCart = await initializeCart()
      if (!currentCart) return false
    }

    try {
      setIsLoading(true)
      const updatedCart = await CartService.addCartItem(currentCart.id, productId, quantity, variantId)
      if (updatedCart) {
        setCart(updatedCart)
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to add item to cart:", err)
      setError("Error al agregar el producto al carrito")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Update item quantity
  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (!cart) return false

    try {
      setIsLoading(true)
      const updatedCart = await CartService.updateCartItem(cart.id, itemId, quantity)
      if (updatedCart) {
        setCart(updatedCart)
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to update item quantity:", err)
      setError("Error al actualizar la cantidad")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Remove item from cart
  const removeItem = async (itemId: string) => {
    if (!cart) return false

    try {
      setIsLoading(true)
      const updatedCart = await CartService.removeCartItem(cart.id, itemId)
      if (updatedCart) {
        setCart(updatedCart)
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to remove item from cart:", err)
      setError("Error al eliminar el producto del carrito")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem("cartId")
    setCartId(null)
    setCart(null)
  }

  // Refresh cart
  const refreshCart = async () => {
    if (!cartId) return

    try {
      setIsLoading(true)
      const refreshedCart = await CartService.getCart(cartId)
      setCart(refreshedCart)
    } catch (err) {
      console.error("Failed to refresh cart:", err)
      setError("Error al actualizar el carrito")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

