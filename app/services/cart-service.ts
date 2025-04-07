import useSWR from "swr"
import { apiClient } from "./api-client"
import type { Cart } from "../types/cart"

// Fetcher function for SWR
const fetcher = (url: string) => apiClient.shopping.get(url).then((res) => res.data)

export const CartService = {
  /**
   * Get cart by ID with SWR
   */
  useCart: (cartId: string | null) => {
    const { data, error, isLoading, mutate } = useSWR(cartId ? `/carts/${cartId}` : null, fetcher)

    return {
      cart: data as Cart,
      isLoading,
      error: error?.message,
      mutate,
    }
  },

  /**
   * Direct API calls
   */
  createCart: async (): Promise<Cart | null> => {
    try {
      const response = await apiClient.shopping.post("/carts")
      return response.data
    } catch (error) {
      console.error("Error creating cart:", error)
      return null
    }
  },

  getCart: async (cartId: string): Promise<Cart | null> => {
    try {
      const response = await apiClient.shopping.get(`/carts/${cartId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching cart:", error)
      return null
    }
  },

  addCartItem: async (
    cartId: string,
    productId: string,
    quantity: number,
    variantId?: string,
  ): Promise<Cart | null> => {
    try {
      const response = await apiClient.shopping.post(`/carts/${cartId}/items`, {
        productId,
        variantId,
        quantity,
      })
      return response.data
    } catch (error) {
      console.error("Error adding item to cart:", error)
      return null
    }
  },

  updateCartItem: async (cartId: string, itemId: string, quantity: number): Promise<Cart | null> => {
    try {
      const response = await apiClient.shopping.put(`/carts/${cartId}/items`, {
        itemId,
        quantity,
      })
      return response.data
    } catch (error) {
      console.error("Error updating cart item:", error)
      return null
    }
  },

  removeCartItem: async (cartId: string, itemId: string): Promise<Cart | null> => {
    try {
      const response = await apiClient.shopping.delete(`/carts/${cartId}/items/${itemId}`)
      return response.data
    } catch (error) {
      console.error("Error removing cart item:", error)
      return null
    }
  },
}

