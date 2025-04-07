"use client"

import { useState, useEffect } from "react"
import { CartService } from "../services/cart-service"

export function useCart() {
  const [cartId, setCartId] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  // Get cart from local storage on initial load
  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId")
    if (storedCartId) {
      setCartId(storedCartId)
    }
    setIsInitializing(false)
  }, [])

  // Use SWR to fetch cart data
  const { cart, isLoading: isLoadingCart, error, mutate } = CartService.useCart(cartId)

  // Combined loading state
  const isLoading = isInitializing || isLoadingCart

  // Initialize a new cart if needed
  const initializeCart = async () => {
    if (!cartId && !isInitializing) {
      try {
        const newCart = await CartService.createCart()
        if (newCart) {
          setCartId(newCart.id)
          localStorage.setItem("cartId", newCart.id)
          return newCart
        }
      } catch (err) {
        console.error("Failed to initialize cart:", err)
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
      const updatedCart = await CartService.addCartItem(currentCart.id, productId, quantity, variantId)
      if (updatedCart) {
        mutate(updatedCart)
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to add item to cart:", err)
      return false
    }
  }

  // Update item quantity
  const updateItemQuantity = async (itemId: string, quantity: number) => {
    if (!cart) return false

    try {
      const updatedCart = await CartService.updateCartItem(cart.id, itemId, quantity)
      if (updatedCart) {
        mutate(updatedCart)
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to update item quantity:", err)
      return false
    }
  }

  // Remove item from cart
  const removeItem = async (itemId: string) => {
    if (!cart) return false

    try {
      const updatedCart = await CartService.removeCartItem(cart.id, itemId)
      if (updatedCart) {
        mutate(updatedCart)
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to remove item from cart:", err)
      return false
    }
  }

  return {
    cart,
    isLoading,
    error,
    addItem,
    updateItemQuantity,
    removeItem,
    refreshCart: mutate,
  }
}

