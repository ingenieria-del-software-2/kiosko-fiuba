import type { Money } from "./common"

export interface CartItem {
  id: string
  productId: string
  productName: string
  variantId?: string
  quantity: number
  unitPrice: Money
  totalPrice: Money
  imageUrl: string
}

export interface Cart {
  id: string
  userId?: string
  items: CartItem[]
  totalAmount: Money
  itemCount: number
  createdAt: string
  updatedAt: string
}

export interface AddCartItemRequest {
  productId: string
  variantId?: string
  quantity: number
}

export interface UpdateCartItemRequest {
  itemId: string
  quantity: number
}

