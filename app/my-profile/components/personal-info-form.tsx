"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "../../context/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export default function PersonalInfoForm() {
  const { user, updateUserInfo } = useUser()
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    displayName: user?.displayName || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveName = async () => {
    await updateUserInfo({
      firstName: formData.firstName,
      lastName: formData.lastName,
    })
    setIsEditingName(false)
  }

  const handleSaveUsername = async () => {
    await updateUserInfo({
      displayName: formData.displayName,
    })
    setIsEditingUsername(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Datos personales</h2>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-600 font-medium">Identidad validada</span>
          </div>
        </div>

        <div className="p-6">
          {!isEditingName ? (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Nombre y apellido</p>
                  <p className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">DNI</p>
                  <p className="font-medium">40994400</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-100"
                onClick={() => setIsEditingName(true)}
              >
                Modificar
              </Button>
            </div>
          ) : (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Nombre</label>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Apellido</label>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSaveName}>
                  Guardar
                </Button>
                <Button variant="outline" onClick={() => setIsEditingName(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          <div className="border-t pt-6">
            {!isEditingUsername ? (
              <div>
                <p className="text-sm text-gray-500 mb-1">Nombre elegido</p>
                <p className="font-medium mb-4">{user?.displayName}</p>
                <Button
                  variant="outline"
                  className="text-blue-500 bg-blue-50 hover:bg-blue-100 border-blue-100"
                  onClick={() => setIsEditingUsername(true)}
                >
                  Modificar
                </Button>
              </div>
            ) : (
              <div>
                <label className="block text-sm text-gray-500 mb-1">Nombre elegido</label>
                <Input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full mb-4"
                />
                <div className="flex gap-2">
                  <Button className="bg-blue-500 hover:bg-blue-600" onClick={handleSaveUsername}>
                    Guardar
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingUsername(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

