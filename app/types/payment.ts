import type { Money } from "./common"
import type { CartItem } from "./cart"
import type { ShippingInformation, ShippingMethod } from "./checkout"

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  subtotal: Money
  shippingCost: Money
  totalAmount: Money
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingInformation: ShippingInformation
  shippingMethod: ShippingMethod
  paymentId?: string
  paymentStatus: "pending" | "authorized" | "captured" | "failed" | "refunded"
  trackingNumber?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
}

export interface OrderSummary {
  id: string
  orderNumber: string
  totalAmount: Money
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  itemCount: number
  paymentStatus: "pending" | "authorized" | "captured" | "failed" | "refunded"
  createdAt: string
}

export interface Payment {
  id: string
  orderId: string
  amount: Money
  status: "pending" | "authorized" | "captured" | "failed" | "refunded"
  paymentMethod: string
  paymentMethodId?: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

export interface PaymentMethod {
  id: string
  userId: string
  type: "credit_card" | "debit_card" | "mercado_credit" | "bank_account"
  lastFourDigits?: string
  cardBrand?: string
  holderName?: string
  expirationMonth?: number
  expirationYear?: number
  isDefault: boolean
  createdAt: string
}

export interface PaymentDetails {
  cardNumber: string
  cardHolder: string
  expirationMonth: number
  expirationYear: number
  cvv: string
  savePaymentMethod?: boolean
}

