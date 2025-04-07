import type { Money } from "./common"
import type { CartItem } from "./cart"

export interface ShippingInformation {
  fullName: string
  street: string
  apartment?: string
  city: string
  state?: string
  postalCode: string
  country: string
  phoneNumber?: string
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: Money
  estimatedDeliveryDays: number
  carrier: string
}

export interface Checkout {
  id: string
  cartId: string
  userId?: string
  status:
    | "pending"
    | "shipping_info_provided"
    | "shipping_method_selected"
    | "ready_for_payment"
    | "completed"
    | "cancelled"
  items: CartItem[]
  subtotal: Money
  shippingCost: Money
  totalAmount: Money
  shippingInformation?: ShippingInformation
  selectedShippingMethod?: ShippingMethod
  createdAt: string
  updatedAt: string
}

