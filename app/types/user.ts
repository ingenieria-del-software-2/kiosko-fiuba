export interface Address {
  id: string
  street: string
  number: string
  apartment?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  reference?: string
  label?: string // "Casa", "Trabajo", etc.
}

export interface PaymentMethod {
  id: string
  type: "credit_card" | "debit_card" | "mercado_credit" | "bank_account"
  lastFourDigits?: string
  bank?: string
  cardBrand?: string
  holderName?: string
  expirationMonth?: number
  expirationYear?: number
  isDefault: boolean
}

export interface PurchasePreferences {
  receivePromotions: boolean
  receiveNewsletters: boolean
  twoFactorAuth: boolean
  notificationPreferences: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  displayName: string
  phoneNumber: string
  profilePicture?: string
  addresses: Address[]
  paymentMethods: PaymentMethod[]
  preferences: PurchasePreferences
  level: "regular" | "mercado_puntos" | "platinum" | "gold" | "platinum_pro"
  createdAt: Date
  lastLogin: Date
  isVerified: boolean
  isSeller: boolean
  sellerInfo?: {
    storeName: string
    storeDescription?: string
    storeRating: number
    totalSales: number
    sellerSince: Date
  }
}

