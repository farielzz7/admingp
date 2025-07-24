"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import DataTable from "@/components/ui/DataTable"
import { Plus, Search, Shield, Users, Edit, Trash2, Check, X } from "lucide-react"

interface Rol {
  id: number
  nombre: string
  descripcion: string
  activo: boolean
  usuarios_count: number
  permisos: Permiso[]
  created_at: string
}

interface Permiso {
  id: number
  nombre: string
  descripcion: string
  modulo: string
}

export default function Roles() {
  const [roles, setRoles] = useState<Rol[]>([])
  const [permisos, setPermisos] = useState<Permiso[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingRol, setEditingRol] = useState<Rol | null>(null)
  const [selectedPermisos, setSelectedPermisos] = useState<number[]>([])

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setPermisos([
        { id: 1, nombre: "usuarios.ver", descripcion: "Ver usuarios", modulo: "Usuarios" },
        { id: 2, nombre: "usuarios.crear", descripcion: "Crear usuarios", modulo: "Usuarios" },
        { id: 3, nombre: "usuarios.editar", descripcion: "Editar usuarios", modulo: "Usuarios" },
        { id: 4, nombre: "usuarios.eliminar", descripcion: "Eliminar usuarios", modulo: "Usuarios" },
        { id: 5, nombre: "destinos.ver", descripcion: "Ver destinos", modulo: "Destinos" },
        { id: 6, nombre: "destinos.crear", descripcion: "Crear destinos", modulo: "Destinos" },
        { id: 7, nombre: "reservas.ver", descripcion: "Ver reservas", modulo: "Reservas" },
        { id: 8, nombre: "reportes.ver", descripcion: "Ver reportes", modulo: "Reportes" },
      ])

      setRoles([
        {
          id: 1,
          nombre: "Administrador",
          descripcion: "Acceso completo al sistema",
          activo: true,
          usuarios_count: 2,
          permisos: [
            { id: 1, nombre: "usuarios.ver", descripcion: "Ver usuarios", modulo: "Usuarios" },
            { id: 2, nombre: "usuarios.crear", descripcion: "Crear usuarios", modulo: "Usuarios" },
            { id: 3, nombre: "usuarios.editar", descripcion: "Editar usuarios", modulo: "Usuarios" },
            { id: 4, nombre: "usuarios.eliminar", descripcion: "Eliminar usuarios", modulo: "Usuarios" },
            { id: 5, nombre: "destinos.ver", descripcion: "Ver destinos", modulo: "Destinos" },
            { id: 6, nombre: "destinos.crear", descripcion: "Crear destinos", modulo: "Destinos" },
            { id: 7, nombre: "reservas.ver", descripcion: "Ver reservas", modulo: "Reservas" },
            { id: 8, nombre: "reportes.ver", descripcion: "Ver reportes", modulo: "Reportes" },
          ],
          created_at: "2024-01-15",
        },
        {
          id: 2,
          nombre: "Moderador",
          descripcion: "Gestión de contenido y usuarios básicos",
          activo: true,
          usuarios_count: 5,
          permisos: [
            { id: 1, nombre: "usuarios.ver", descripcion: "Ver usuarios", modulo: "Usuarios" },
            { id: 5, nombre: "destinos.ver", descripcion: "Ver destinos", modulo: "Destinos" },
            { id: 7, nombre: "reservas.ver", descripcion: "Ver reservas", modulo: "Reservas" },
          ],
          created_at: "2024-01-20",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "nombre",
      header: "Rol",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-indigo-600" />
          <div>
            <div className="font-medium">{row.original.nombre}</div>
            <div className="text-sm text-gray-500">{row.original.descripcion}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "usuarios_count",
      header: "Usuarios",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4 text-gray-400" />
          <span>{row.original.usuarios_count}</span>
        </div>
      ),
    },
    {
      accessorKey: "permisos",
      header: "Permisos",
      cell: ({ row }: any) => (
        <div className="flex flex-wrap gap-1">
          {row.original.permisos.slice(0, 3).map((permiso: Permiso) => (
            <span
              key={permiso.id}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {permiso.modulo}
            </span>
          ))}
          {row.original.permisos.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{row.original.permisos.length - 3}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "activo",
      header: "Estado",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.activo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.activo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }: any) => (
        <div className="flex space-x-2">
          <button onClick={() => handleEdit(row.original)} className="text-indigo-600 hover:text-indigo-900">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => handleDelete(row.original.id)} className="text-red-600 hover:text-red-900">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  const filteredRoles = roles.filter(
    (rol) =>
      rol.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rol.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (rol: Rol) => {
    setEditingRol(rol)
    setSelectedPermisos(rol.permisos.map((p) => p.id))
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este rol?")) {
      setRoles(roles.filter((r) => r.id !== id))
    }
  }

  const handleSave = (formData: any) => {
    const permisosSeleccionados = permisos.filter((p) => selectedPermisos.includes(p.id))

    if (editingRol) {
      setRoles(
        roles.map((r) =>
          r.id === editingRol.id
            ? {
                ...r,
                ...formData,
                permisos: permisosSeleccionados,
              }
            : r,
        ),
      )
    } else {
      const newRol: Rol = {
        ...formData,
        id: roles.length + 1,
        usuarios_count: 0,
        permisos: permisosSeleccionados,
        created_at: new Date().toISOString().split("T")[0],
      }
      setRoles([...roles, newRol])
    }

    setShowModal(false)
    setEditingRol(null)
    setSelectedPermisos([])
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingRol(null)
    setSelectedPermisos([])
  }

  // Agrupar permisos por módulo
  const permisosPorModulo = permisos.reduce(
    (acc, permiso) => {
      if (!acc[permiso.modulo]) {
        acc[permiso.modulo] = []
      }
      acc[permiso.modulo].push(permiso)
      return acc
    },
    {} as Record<string, Permiso[]>,
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Roles y Permisos</h1>
            <p className="mt-1 text-sm text-gray-600">Administra los roles y permisos del sistema</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Rol</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full max-w-sm"
              />
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <DataTable data={filteredRoles} columns={columns} />
            )}
          </div>
        </div>
      </div>

      {/* Modal para rol */}
      {showModal && (
        <RolModal
          rol={editingRol}
          permisosPorModulo={permisosPorModulo}
          selectedPermisos={selectedPermisos}
          setSelectedPermisos={setSelectedPermisos}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </AdminLayout>
  )
}

function RolModal({
  rol,
  permisosPorModulo,
  selectedPermisos,
  setSelectedPermisos,
  onSave,
  onClose,
}: {
  rol: Rol | null
  permisosPorModulo: Record<string, Permiso[]>
  selectedPermisos: number[]
  setSelectedPermisos: (permisos: number[]) => void
  onSave: (data: any) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    nombre: rol?.nombre || "",
    descripcion: rol?.descripcion || "",
    activo: rol?.activo ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const togglePermiso = (permisoId: number) => {
    if (selectedPermisos.includes(permisoId)) {
      setSelectedPermisos(selectedPermisos.filter((id) => id !== permisoId))
    } else {
      setSelectedPermisos([...selectedPermisos, permisoId])
    }
  }

  const toggleModulo = (modulo: string) => {
    const permisosDelModulo = permisosPorModulo[modulo].map((p) => p.id)
    const todosSeleccionados = permisosDelModulo.every((id) => selectedPermisos.includes(id))

    if (todosSeleccionados) {
      // Deseleccionar todos los permisos del módulo
      setSelectedPermisos(selectedPermisos.filter((id) => !permisosDelModulo.includes(id)))
    } else {
      // Seleccionar todos los permisos del módulo
      const nuevosPermisos = [...selectedPermisos]
      permisosDelModulo.forEach((id) => {
        if (!nuevosPermisos.includes(id)) {
          nuevosPermisos.push(id)
        }
      })
      setSelectedPermisos(nuevosPermisos)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{rol ? "Editar Rol" : "Nuevo Rol"}</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Rol</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                value={formData.activo.toString()}
                onChange={(e) => setFormData({ ...formData, activo: e.target.value === "true" })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Permisos</label>
            <div className="space-y-4">
              {Object.entries(permisosPorModulo).map(([modulo, permisos]) => {
                const permisosDelModulo = permisos.map((p) => p.id)
                const todosSeleccionados = permisosDelModulo.every((id) => selectedPermisos.includes(id))
                const algunoSeleccionado = permisosDelModulo.some((id) => selectedPermisos.includes(id))

                return (
                  <div key={modulo} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{modulo}</h4>
                      <button
                        type="button"
                        onClick={() => toggleModulo(modulo)}
                        className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm ${
                          todosSeleccionados
                            ? "bg-indigo-100 text-indigo-700"
                            : algunoSeleccionado
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {todosSeleccionados ? (
                          <Check className="h-4 w-4" />
                        ) : algunoSeleccionado ? (
                          <div className="h-4 w-4 bg-yellow-400 rounded-sm" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>{todosSeleccionados ? "Todos" : algunoSeleccionado ? "Parcial" : "Ninguno"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {permisos.map((permiso) => (
                        <label
                          key={permiso.id}
                          className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPermisos.includes(permiso.id)}
                            onChange={() => togglePermiso(permiso.id)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{permiso.nombre}</div>
                            <div className="text-xs text-gray-500">{permiso.descripcion}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              {rol ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
