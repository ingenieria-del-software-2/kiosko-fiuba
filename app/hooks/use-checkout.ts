"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckoutService } from "../services/checkout-service"
import { PaymentService } from "../services/payment-service"
import type { ShippingInformation } from "../types/checkout"
import type { PaymentDetails } from "../types/payment"

export function useCheckout(cartId?: string) {
  const router = useRouter()
  const [checkoutId, setCheckoutId] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)

  // Get checkout ID from local storage on initial load
  useEffect(() => {
    const storedCheckoutId = localStorage.getItem("checkoutId")
    if (storedCheckoutId) {
      setCheckoutId(storedCheckoutId)
    }

    const storedOrderId = localStorage.getItem("orderId")
    if (storedOrderId) {
      setOrderId(storedOrderId)
    }
  }, [])

  // Use SWR to fetch checkout data
  const {
    checkout,
    isLoading: isLoadingCheckout,
    error: checkoutError,
    mutate: mutateCheckout,
  } = CheckoutService.useCheckout(checkoutId)

  // Use SWR to fetch shipping methods
  const {
    shippingMethods,
    isLoading: isLoadingShippingMethods,
    error: shippingMethodsError,
  } = CheckoutService.useShippingMethods(checkoutId)

  // Use SWR to fetch order data if we have an order ID
  const { order, isLoading: isLoadingOrder, error: orderError, mutate: mutateOrder } = PaymentService.useOrder(orderId)

  // Combined loading state
  const isLoading = isInitializing || isLoadingCheckout || (orderId ? isLoadingOrder : false)

  // Initialize checkout
  const initializeCheckout = async (userId?: string) => {
    if (!cartId) return null

    try {
      setIsInitializing(true)
      const newCheckout = await CheckoutService.initiateCheckout(cartId, userId)

      if (newCheckout) {
        setCheckoutId(newCheckout.id)
        localStorage.setItem("checkoutId", newCheckout.id)
        return newCheckout
      }
      return null
    } catch (err) {
      console.error("Failed to initialize checkout:", err)
      return null
    } finally {
      setIsInitializing(false)
    }
  }

  // Update shipping information
  const updateShipping = async (shippingInfo: ShippingInformation) => {
    if (!checkoutId) return false

    try {
      const updatedCheckout = await CheckoutService.updateShipping(checkoutId, shippingInfo)
      if (updatedCheckout) {
        mutateCheckout(updatedCheckout)
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to update shipping information:", err)
      return false
    }
  }

  // Select shipping method
  const selectShippingMethod = async (shippingMethodId: string) => {
    if (!checkoutId) return false

    try {
      const updatedCheckout = await CheckoutService.selectShippingMethod(checkoutId, shippingMethodId)
      if (updatedCheckout) {
        mutateCheckout(updatedCheckout)
        return true
      }
      return false
    } catch (err) {
      console.error("Failed to select shipping method:", err)
      return false
    }
  }

  // Create order
  const createOrder = async (userId: string) => {
    if (!checkoutId) return null

    try {
      const newOrder = await PaymentService.createOrder(checkoutId, userId)
      if (newOrder) {
        setOrderId(newOrder.id)
        localStorage.setItem("orderId", newOrder.id)
        return newOrder
      }
      return null
    } catch (err) {
      console.error("Failed to create order:", err)
      return null
    }
  }

  // Process payment
  const processPayment = async (
    amount: { amount: number; currency: string },
    paymentMethodId?: string,
    paymentDetails?: PaymentDetails,
  ) => {
    if (!orderId) return null

    try {
      const payment = await PaymentService.processPayment(orderId, amount, paymentMethodId, paymentDetails)

      if (payment) {
        // Refresh order to get updated payment status
        mutateOrder()
        return payment
      }
      return null
    } catch (err) {
      console.error("Failed to process payment:", err)
      return null
    }
  }

  // Complete checkout and redirect to confirmation
  const completeCheckout = () => {
    // Clear checkout and cart IDs from local storage
    localStorage.removeItem("checkoutId")
    localStorage.removeItem("cartId")

    // Keep order ID for order tracking
    router.push(`/cart/checkout/confirmation?orderId=${orderId}`)
  }

  return {
    checkout,
    shippingMethods,
    order,
    isLoading,
    error: checkoutError || shippingMethodsError || orderError,
    initializeCheckout,
    updateShipping,
    selectShippingMethod,
    createOrder,
    processPayment,
    completeCheckout,
  }
}

