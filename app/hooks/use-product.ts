"use client"

import { useState, useEffect } from "react"
import type { Product, ProductFilters, PaginatedProductResults } from "../types/product"
import { ProductService } from "../services/product-service"

export function useProduct(productId?: string, productSlug?: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)

        let fetchedProduct: Product | null = null

        if (productId) {
          fetchedProduct = await ProductService.getProductById(productId)
        } else if (productSlug) {
          fetchedProduct = await ProductService.getProductBySlug(productSlug)
        }

        if (!fetchedProduct) {
          setError("Producto no encontrado")
        } else {
          setProduct(fetchedProduct)
        }
      } catch (err) {
        setError("Error al cargar el producto")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (productId || productSlug) {
      fetchProduct()
    }
  }, [productId, productSlug])

  return { product, isLoading, error }
}

export function useProductSearch(initialFilters: ProductFilters = {}) {
  const [results, setResults] = useState<PaginatedProductResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const searchResults = await ProductService.searchProducts(filters)
        setResults(searchResults)
      } catch (err) {
        setError("Error al buscar productos")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    searchProducts()
  }, [filters])

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      // Si cambiamos cualquier filtro que no sea la paginación, volvemos a la página 1
      page: newFilters.page || (Object.keys(newFilters).some((key) => key !== "page") ? 1 : prev.page),
    }))
  }

  return { results, isLoading, error, filters, updateFilters }
}

export function useRelatedProducts(productId: string, limit = 4) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const products = await ProductService.getRelatedProducts(productId, limit)
        setRelatedProducts(products)
      } catch (err) {
        setError("Error al cargar productos relacionados")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchRelatedProducts()
    }
  }, [productId, limit])

  return { relatedProducts, isLoading, error }
}

