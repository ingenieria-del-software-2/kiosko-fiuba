"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "../../context/user-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin } from "lucide-react"

export default function AddressesForm() {
  const { user, addAddress, removeAddress, setDefaultAddress, updateAddress } = useUser()
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState({
    street: "",
    number: "",
    apartment: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Argentina",
    reference: "",
    label: "Casa",
    isDefault: false,
  })

  const [editingAddress, setEditingAddress] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState({
    street: "",
    number: "",
    apartment: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Argentina",
    reference: "",
    label: "",
    isDefault: false,
  })

  const handleEditAddress = (address: any) => {
    setEditingAddress(address.id)
    setEditFormData({
      street: address.street,
      number: address.number,
      apartment: address.apartment || "",
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      reference: address.reference || "",
      label: address.label || "Casa",
      isDefault: address.isDefault,
    })
  }

  const handleUpdateAddress = async () => {
    if (!editingAddress) return

    await updateAddress(editingAddress, editFormData)
    setEditingAddress(null)
  }

  const handleAddAddress = async () => {
    await addAddress(newAddress)
    setIsAddingAddress(false)
    setNewAddress({
      street: "",
      number: "",
      apartment: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Argentina",
      reference: "",
      label: "Casa",
      isDefault: false,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setNewAddress((prev) => ({ ...prev, isDefault: checked }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Direcciones</h2>
        <Dialog open={isAddingAddress} onOpenChange={setIsAddingAddress}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">Agregar dirección</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Agregar nueva dirección</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="label">Etiqueta</Label>
                  <Input
                    id="label"
                    name="label"
                    value={newAddress.label}
                    onChange={handleChange}
                    placeholder="Casa, Trabajo, etc."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="street">Dirección o lugar de entrega</Label>
                  <Input
                    id="street"
                    name="street"
                    value={newAddress.street}
                    onChange={handleChange}
                    placeholder="Avenida Córdoba 3543"
                  />
                  <div className="flex items-center space-x-2 mt-1">
                    <Checkbox
                      id="noNumber"
                      onCheckedChange={(checked) => {
                        // Aquí puedes manejar la lógica cuando cambia el checkbox
                      }}
                    />
                    <Label htmlFor="noNumber" className="text-sm">
                      Mi calle no tiene número
                    </Label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">Código Postal</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={newAddress.zipCode}
                    onChange={handleChange}
                    placeholder="1188"
                    disabled={newAddress.zipCode === ""}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apartment">Departamento (opcional)</Label>
                  <Input
                    id="apartment"
                    name="apartment"
                    value={newAddress.apartment}
                    onChange={handleChange}
                    placeholder="7C"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="state">Provincia</Label>
                  <select
                    id="state"
                    name="state"
                    value={newAddress.state}
                    onChange={(e) => handleChange(e as any)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Capital Federal">Capital Federal</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Córdoba">Córdoba</option>
                    <option value="Santa Fe">Santa Fe</option>
                    <option value="Mendoza">Mendoza</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <select
                    id="city"
                    name="city"
                    value={newAddress.city}
                    onChange={(e) => handleChange(e as any)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Palermo">Palermo</option>
                    <option value="Recoleta">Recoleta</option>
                    <option value="Belgrano">Belgrano</option>
                    <option value="San Telmo">San Telmo</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reference">Indicaciones para la entrega (opcional)</Label>
                <textarea
                  id="reference"
                  name="reference"
                  value={newAddress.reference}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, reference: e.target.value }))}
                  placeholder="Entre calles, color de la casa, etc."
                  className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid gap-2">
                <Label>Tipo de domicilio</Label>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="residential"
                      name="addressType"
                      defaultChecked={true}
                      onChange={() => {
                        // Manejar cambio a residencial
                      }}
                      className="h-4 w-4 text-blue-500"
                    />
                    <Label htmlFor="residential" className="flex items-center">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 22V12h6v10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Residencial
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="work"
                      name="addressType"
                      onChange={() => {
                        // Manejar cambio a laboral
                      }}
                      className="h-4 w-4 text-blue-500"
                    />
                    <Label htmlFor="work" className="flex items-center">
                      <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Laboral
                    </Label>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4 mt-2">
                <h3 className="font-medium mb-2">Datos de contacto</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contactName">Nombre y apellido</Label>
                    <Input id="contactName" placeholder="Luis Cusihuaman" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone">Teléfono</Label>
                    <Input id="contactPhone" placeholder="1173646243" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-500 hover:bg-blue-600 px-8" onClick={handleAddAddress}>
                Continuar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {user?.addresses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-2">No tienes direcciones guardadas</h3>
          <p className="text-gray-500 mb-4">Agrega una dirección para facilitar tus compras</p>
          <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setIsAddingAddress(true)}>
            Agregar dirección
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {user?.addresses.map((address, index) => (
            <div key={address.id} className={`p-4 ${index !== 0 ? "border-t" : ""}`}>
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium">{address.label}</h3>
                    {address.isDefault && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Predeterminada
                      </span>
                    )}
                  </div>
                  <p>{`${address.street} ${address.number}${address.apartment ? `, ${address.apartment}` : ""}`}</p>
                  <p>{`${address.neighborhood}, ${address.city}, ${address.state}`}</p>
                  <p>{`${address.zipCode}, ${address.country}`}</p>
                  {address.reference && <p className="text-sm text-gray-500 mt-1">Referencia: {address.reference}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditAddress(address)}>
                    Editar
                  </Button>
                  {!address.isDefault && (
                    <Button variant="outline" size="sm" onClick={() => setDefaultAddress(address.id)}>
                      Predeterminar
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => removeAddress(address.id)}
                    disabled={user?.addresses.length <= 1}
                    title={user?.addresses.length <= 1 ? "No puedes eliminar la única dirección" : ""}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!editingAddress} onOpenChange={(open) => !open && setEditingAddress(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar domicilio</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editLabel">Etiqueta</Label>
                <Input
                  id="editLabel"
                  value={editFormData.label}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, label: e.target.value }))}
                  placeholder="Casa, Trabajo, etc."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editStreet">Dirección o lugar de entrega</Label>
                <Input
                  id="editStreet"
                  value={editFormData.street}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, street: e.target.value }))}
                />
                <div className="flex items-center space-x-2 mt-1">
                  <Checkbox
                    id="editNoNumber"
                    onCheckedChange={(checked) => {
                      // Aquí puedes manejar la lógica cuando cambia el checkbox
                    }}
                  />
                  <Label htmlFor="editNoNumber" className="text-sm">
                    Mi calle no tiene número
                  </Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editZipCode">Código Postal</Label>
                <Input
                  id="editZipCode"
                  value={editFormData.zipCode}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                  disabled={editFormData.zipCode === ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editApartment">Departamento (opcional)</Label>
                <Input
                  id="editApartment"
                  value={editFormData.apartment}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, apartment: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editState">Provincia</Label>
                <select
                  id="editState"
                  value={editFormData.state}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, state: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Capital Federal">Capital Federal</option>
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Santa Fe">Santa Fe</option>
                  <option value="Mendoza">Mendoza</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editCity">Ciudad</Label>
                <select
                  id="editCity"
                  value={editFormData.city}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, city: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="Palermo">Palermo</option>
                  <option value="Recoleta">Recoleta</option>
                  <option value="Belgrano">Belgrano</option>
                  <option value="San Telmo">San Telmo</option>
                </select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editReference">Indicaciones para la entrega (opcional)</Label>
              <textarea
                id="editReference"
                value={editFormData.reference}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, reference: e.target.value }))}
                className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="grid gap-2">
              <Label>Tipo de domicilio</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="editResidential"
                    name="editAddressType"
                    defaultChecked={true}
                    onChange={() => {
                      // Manejar cambio a residencial
                    }}
                    className="h-4 w-4 text-blue-500"
                  />
                  <Label htmlFor="editResidential" className="flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 22V12h6v10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Residencial
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="editWork"
                    name="editAddressType"
                    onChange={() => {
                      // Manejar cambio a laboral
                    }}
                    className="h-4 w-4 text-blue-500"
                  />
                  <Label htmlFor="editWork" className="flex items-center">
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Laboral
                  </Label>
                </div>
              </div>
            </div>
            <div className="border-t pt-4 mt-2">
              <h3 className="font-medium mb-2">Datos de contacto</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editContactName">Nombre y apellido</Label>
                  <Input id="editContactName" placeholder="Luis Cusihuaman" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editContactPhone">Teléfono</Label>
                  <Input id="editContactPhone" placeholder="1173646243" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-blue-500 hover:bg-blue-600 px-8" onClick={handleUpdateAddress}>
              Continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

