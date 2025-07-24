"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import DataTable from "@/components/ui/DataTable"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
  nombre: yup.string().required("Nombre es requerido"),
  apellido: yup.string().required("Apellido es requerido"),
  email: yup.string().email("Email inválido").required("Email es requerido"),
  telefono: yup.string().required("Teléfono es requerido"),
  pais: yup.string().required("País es requerido"),
  fecha_nacimiento: yup.string().required("Fecha de nacimiento es requerida"),
  documento: yup.string().required("Documento es requerido"),
})

type TuristaForm = yup.InferType<typeof schema>

interface Turista {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  pais: string
  fecha_nacimiento: string
  documento: string
  usuario_id: number
  created_at: string
}

export default function Turistas() {
  const [turistas, setTuristas] = useState<Turista[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingTurista, setEditingTurista] = useState<Turista | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TuristaForm>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setTuristas([
        {
          id: 1,
          nombre: "Ana",
          apellido: "Martínez",
          email: "ana@ejemplo.com",
          telefono: "+52 555 1234",
          pais: "México",
          fecha_nacimiento: "1990-05-15",
          documento: "CURP123456",
          usuario_id: 1,
          created_at: "2024-01-15",
        },
        {
          id: 2,
          nombre: "John",
          apellido: "Smith",
          email: "john@example.com",
          telefono: "+1 555 5678",
          pais: "USA",
          fecha_nacimiento: "1985-08-22",
          documento: "SSN987654",
          usuario_id: 2,
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
      header: "Nombre",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">
            {row.original.nombre} {row.original.apellido}
          </div>
          <div className="text-sm text-gray-500">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
    },
    {
      accessorKey: "pais",
      header: "País",
    },
    {
      accessorKey: "documento",
      header: "Documento",
    },
    {
      accessorKey: "created_at",
      header: "Fecha Registro",
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

  const filteredTuristas = turistas.filter(
    (turista) =>
      turista.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turista.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turista.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (turista: Turista) => {
    setEditingTurista(turista)
    setValue("nombre", turista.nombre)
    setValue("apellido", turista.apellido)
    setValue("email", turista.email)
    setValue("telefono", turista.telefono)
    setValue("pais", turista.pais)
    setValue("fecha_nacimiento", turista.fecha_nacimiento)
    setValue("documento", turista.documento)
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este turista?")) {
      setTuristas(turistas.filter((t) => t.id !== id))
    }
  }

  const onSubmit = (data: TuristaForm) => {
    if (editingTurista) {
      // Actualizar turista existente
      setTuristas(turistas.map((t) => (t.id === editingTurista.id ? { ...t, ...data } : t)))
    } else {
      // Crear nuevo turista
      const newTurista: Turista = {
        ...data,
        id: turistas.length + 1,
        usuario_id: 1, // Simular relación con usuario
        created_at: new Date().toISOString().split("T")[0],
      }
      setTuristas([...turistas, newTurista])
    }

    setShowModal(false)
    setEditingTurista(null)
    reset()
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTurista(null)
    reset()
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Turistas</h1>
            <p className="mt-1 text-sm text-gray-600">Administra la información de los turistas registrados</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Turista</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar turistas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <DataTable data={filteredTuristas} columns={columns} />
            )}
          </div>
        </div>
      </div>

      {/* Modal para turista */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingTurista ? "Editar Turista" : "Nuevo Turista"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    {...register("nombre")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    {...register("apellido")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.apellido && <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input
                    {...register("telefono")}
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">País</label>
                  <select
                    {...register("pais")}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar país</option>
                    <option value="México">México</option>
                    <option value="USA">Estados Unidos</option>
                    <option value="Canadá">Canadá</option>
                    <option value="España">España</option>
                    <option value="Argentina">Argentina</option>
                  </select>
                  {errors.pais && <p className="mt-1 text-sm text-red-600">{errors.pais.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                  <input
                    {...register("fecha_nacimiento")}
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.fecha_nacimiento && (
                    <p className="mt-1 text-sm text-red-600">{errors.fecha_nacimiento.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Documento</label>
                  <input
                    {...register("documento")}
                    type="text"
                    placeholder="CURP, SSN, DNI, etc."
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {errors.documento && <p className="mt-1 text-sm text-red-600">{errors.documento.message}</p>}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  {editingTurista ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
