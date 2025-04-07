import axios from "axios"

// Get the API URL from environment variables
const API_URL = "http://127.0.0.1"

// Create individual service clients with absolute URLs
const productCatalogService = axios.create({
  baseURL: `${API_URL}`, // /api/catalog
})

const paymentHubService = axios.create({
  baseURL: `${API_URL}`, // /api/payments
})

const shoppingExperienceService = axios.create({
  baseURL: `${API_URL}`, // /api/shopping
})

// Export a unified client
export const apiClient = {
  products: productCatalogService,
  payments: paymentHubService,
  shopping: shoppingExperienceService,
}

