"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "../../context/user-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PaymentMethodsForm() {
  const { user, removePaymentMethod, addPaymentMethod } = useUser()
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCard, setNewCard] = useState({
    type: "credit_card",
    cardNumber: "",
    holderName: "",
    expirationMonth: "1",
    expirationYear: "2025",
    cvv: "",
    bank: "Banco Galicia",
    cardBrand: "visa",
    isDefault: false,
  })

  const handleAddCard = async () => {
    // Extract last 4 digits from card number
    const lastFourDigits = newCard.cardNumber.slice(-4)

    await addPaymentMethod({
      type: newCard.type as any,
      lastFourDigits,
      bank: newCard.bank,
      cardBrand: newCard.cardBrand as any,
      holderName: newCard.holderName,
      expirationMonth: Number.parseInt(newCard.expirationMonth),
      expirationYear: Number.parseInt(newCard.expirationYear),
      isDefault: newCard.isDefault,
    })

    setIsAddingCard(false)
    setNewCard({
      type: "credit_card",
      cardNumber: "",
      holderName: "",
      expirationMonth: "1",
      expirationYear: "2025",
      cvv: "",
      bank: "Banco Galicia",
      cardBrand: "visa",
      isDefault: false,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCard((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewCard((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tarjetas</h2>
        <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">Agregar tarjeta</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar nueva tarjeta</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cardNumber">Número de tarjeta</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={newCard.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="holderName">Nombre del titular</Label>
                <Input
                  id="holderName"
                  name="holderName"
                  value={newCard.holderName}
                  onChange={handleChange}
                  placeholder="Como aparece en la tarjeta"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Fecha de vencimiento</Label>
                  <div className="flex gap-2">
                    <Select
                      value={newCard.expirationMonth}
                      onValueChange={(value) => handleSelectChange("expirationMonth", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Mes" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {month.toString().padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={newCard.expirationYear}
                      onValueChange={(value) => handleSelectChange("expirationYear", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Año" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => i + 2025).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvv">Código de seguridad</Label>
                  <Input id="cvv" name="cvv" value={newCard.cvv} onChange={handleChange} placeholder="123" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Tipo de tarjeta</Label>
                <Select value={newCard.cardBrand} onValueChange={(value) => handleSelectChange("cardBrand", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visa">Visa</SelectItem>
                    <SelectItem value="mastercard">Mastercard</SelectItem>
                    <SelectItem value="amex">American Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingCard(false)}>
                Cancelar
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleAddCard}>
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {user?.paymentMethods.map((card, index) => (
          <div key={card.id} className={`p-4 flex items-center justify-between ${index !== 0 ? "border-t" : ""}`}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                {card.cardBrand === "visa" && (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#1A1F71">
                    <path d="M9.5 4h5c4.5 0 5.5 2 5.5 5v6c0 3-1 5-5.5 5h-5C5 20 4 18 4 15V9c0-3 1-5 5.5-5z" />
                    <path fill="white" d="M9.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                    <path fill="white" d="M13.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                    <path fill="white" d="M7.5 16.5l1.5-9 2 .5-1.5 8.5h-2z" />
                  </svg>
                )}
                {card.cardBrand === "mastercard" && (
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <circle cx="8" cy="12" r="6" fill="#EB001B" />
                    <circle cx="16" cy="12" r="6" fill="#F79E1B" />
                    <path d="M12 17.5a6 6 0 0 0 0-11 6 6 0 0 0 0 11z" fill="#FF5F00" />
                  </svg>
                )}
                {card.type === "mercado_credit" && (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#009EE3">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M11 7h2v10h-2z" />
                    <path d="M7 13h10v2H7z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium">Terminada en {card.lastFourDigits}</p>
                <p className="text-sm text-gray-500">{card.bank}</p>
                <p className="text-sm text-gray-500">
                  Vencimiento: {card.expirationMonth?.toString().padStart(2, "0")}/
                  {card.expirationYear?.toString().slice(-2)}
                </p>
              </div>
            </div>
            {card.type !== "mercado_credit" && (
              <Button
                variant="ghost"
                className="text-blue-500 hover:bg-blue-50"
                onClick={() => removePaymentMethod(card.id)}
              >
                Eliminar
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

