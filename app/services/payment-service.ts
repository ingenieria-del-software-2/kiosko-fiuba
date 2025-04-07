import useSWR from "swr"
import { apiClient } from "./api-client"
import type { Order, Payment, PaymentMethod, PaymentDetails } from "../types/payment"

// Fetcher function for SWR
const fetcher = (url: string) => apiClient.payments.get(url).then((res) => res.data)

export const PaymentService = {
  /**
   * Get order by ID with SWR
   */
  useOrder: (orderId: string | null) => {
    const { data, error, isLoading, mutate } = useSWR(orderId ? `/orders/${orderId}` : null, fetcher)

    return {
      order: data as Order,
      isLoading,
      error: error?.message,
      mutate,
    }
  },

  /**
   * Get user orders with SWR
   */
  useUserOrders: (userId: string | null) => {
    const { data, error, isLoading } = useSWR(userId ? `/orders?userId=${userId}` : null, fetcher)

    return {
      orders: data?.orders as Order[],
      pagination: data?.pagination,
      isLoading,
      error: error?.message,
    }
  },

  /**
   * Get payment methods with SWR
   */
  usePaymentMethods: (userId: string | null) => {
    const { data, error, isLoading, mutate } = useSWR(userId ? `/payment-methods?userId=${userId}` : null, fetcher)

    return {
      paymentMethods: data as PaymentMethod[],
      isLoading,
      error: error?.message,
      mutate,
    }
  },

  /**
   * Direct API calls
   */
  createOrder: async (checkoutId: string, userId: string): Promise<Order | null> => {
    try {
      const response = await apiClient.payments.post("/orders", {
        checkoutId,
        userId,
      })
      return response.data
    } catch (error) {
      console.error("Error creating order:", error)
      return null
    }
  },

  getOrder: async (orderId: string): Promise<Order | null> => {
    try {
      const response = await apiClient.payments.get(`/orders/${orderId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching order:", error)
      return null
    }
  },

  cancelOrder: async (orderId: string, reason?: string): Promise<Order | null> => {
    try {
      const response = await apiClient.payments.post(`/orders/${orderId}/cancel`, { reason })
      return response.data
    } catch (error) {
      console.error("Error cancelling order:", error)
      return null
    }
  },

  processPayment: async (
    orderId: string,
    amount: { amount: number; currency: string },
    paymentMethodId?: string,
    paymentDetails?: PaymentDetails,
  ): Promise<Payment | null> => {
    try {
      const response = await apiClient.payments.post("/payments", {
        orderId,
        amount,
        paymentMethodId,
        paymentDetails,
      })
      return response.data
    } catch (error) {
      console.error("Error processing payment:", error)
      return null
    }
  },

  getPayment: async (paymentId: string): Promise<Payment | null> => {
    try {
      const response = await apiClient.payments.get(`/payments/${paymentId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching payment:", error)
      return null
    }
  },

  getPaymentMethods: async (userId: string): Promise<PaymentMethod[]> => {
    try {
      const response = await apiClient.payments.get(`/payment-methods?userId=${userId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching payment methods:", error)
      return []
    }
  },

  addPaymentMethod: async (
    userId: string,
    type: string,
    details: {
      lastFourDigits?: string
      cardBrand?: string
      holderName?: string
      expirationMonth?: number
      expirationYear?: number
      isDefault?: boolean
    },
  ): Promise<PaymentMethod | null> => {
    try {
      const response = await apiClient.payments.post("/payment-methods", {
        userId,
        type,
        ...details,
      })
      return response.data
    } catch (error) {
      console.error("Error adding payment method:", error)
      return null
    }
  },

  removePaymentMethod: async (paymentMethodId: string): Promise<boolean> => {
    try {
      await apiClient.payments.delete(`/payment-methods/${paymentMethodId}`)
      return true
    } catch (error) {
      console.error("Error removing payment method:", error)
      return false
    }
  },
}

