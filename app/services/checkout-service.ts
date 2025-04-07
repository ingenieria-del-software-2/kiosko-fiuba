import useSWR from "swr"
import { apiClient } from "./api-client"
import type { Checkout, ShippingInformation, ShippingMethod } from "../types/checkout"

// Fetcher function for SWR
const fetcher = (url: string) => apiClient.shopping.get(url).then((res) => res.data)

export const CheckoutService = {
  /**
   * Get checkout by ID with SWR
   */
  useCheckout: (checkoutId: string | null) => {
    const { data, error, isLoading, mutate } = useSWR(checkoutId ? `/checkout/${checkoutId}` : null, fetcher)

    return {
      checkout: data as Checkout,
      isLoading,
      error: error?.message,
      mutate,
    }
  },

  /**
   * Get shipping methods with SWR
   */
  useShippingMethods: (checkoutId: string | null) => {
    const { data, error, isLoading } = useSWR(checkoutId ? `/checkout/${checkoutId}/shipping-methods` : null, fetcher)

    return {
      shippingMethods: data as ShippingMethod[],
      isLoading,
      error: error?.message,
    }
  },

  /**
   * Direct API calls
   */
  initiateCheckout: async (cartId: string, userId?: string): Promise<Checkout | null> => {
    try {
      const response = await apiClient.shopping.post("/checkout", {
        cartId,
        userId,
      })
      return response.data
    } catch (error) {
      console.error("Error initiating checkout:", error)
      return null
    }
  },

  getCheckout: async (checkoutId: string): Promise<Checkout | null> => {
    try {
      const response = await apiClient.shopping.get(`/checkout/${checkoutId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching checkout:", error)
      return null
    }
  },

  updateShipping: async (checkoutId: string, shippingInfo: ShippingInformation): Promise<Checkout | null> => {
    try {
      const response = await apiClient.shopping.put(`/checkout/${checkoutId}/shipping`, shippingInfo)
      return response.data
    } catch (error) {
      console.error("Error updating shipping information:", error)
      return null
    }
  },

  getShippingMethods: async (checkoutId: string): Promise<ShippingMethod[]> => {
    try {
      const response = await apiClient.shopping.get(`/checkout/${checkoutId}/shipping-methods`)
      return response.data
    } catch (error) {
      console.error("Error fetching shipping methods:", error)
      return []
    }
  },

  selectShippingMethod: async (checkoutId: string, shippingMethodId: string): Promise<Checkout | null> => {
    try {
      const response = await apiClient.shopping.put(`/checkout/${checkoutId}/shipping-method`, {
        shippingMethodId,
      })
      return response.data
    } catch (error) {
      console.error("Error selecting shipping method:", error)
      return null
    }
  },
}

