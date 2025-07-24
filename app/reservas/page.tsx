"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import DataTable from "@/components/ui/DataTable"
import ExportButtons from "@/components/ui/ExportButtons"
import { Plus, Search, Edit, Trash2, Calendar, User, Package, CreditCard, Eye } from "lucide-react"

interface Reserva {
  id: number
  codigo: string
  turista_id: number
  turista_nombre: string
  turista_email: string
  paquete_id: number
  paquete_nombre: string
  fecha_inicio: string
  fecha_fin: string
  num_personas: number
  precio_total: number
  estado: "Pendiente" | "Confirmada" | "Cancelada" | "Completada"
  metodo_pago: string
  notas: string
  created_at: string
}

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setReservas([
        {
          id: 1,
          codigo: "RES-2024-001",
          turista_id: 1,
          turista_nombre: "Ana Martínez",
          turista_email: "ana@ejemplo.com",
          paquete_id: 1,
          paquete_nombre: "Cancún Paradise",
          fecha_inicio: "2024-03-15",
          fecha_fin: "2024-03-22",
          num_personas: 2,
          precio_total: 3000,
          estado: "Confirmada",
          metodo_pago: "Tarjeta de Crédito",
          notas: "Solicita habitación con vista al mar",
          created_at: "2024-01-15",
        },
        {
          id: 2,
          codigo: "RES-2024-002",
          turista_id: 2,
          turista_nombre: "John Smith",
          turista_email: "john@example.com",
          paquete_id: 2,
          paquete_nombre: "Aventura Inca",
          fecha_inicio: "2024-04-10",
          fecha_fin: "2024-04-15",
          num_personas: 4,
          precio_total: 8800,
          estado: "Pendiente",
          metodo_pago: "Transferencia",
          notas: "Grupo familiar con niños",
          created_at: "2024-02-01",
        },
        {
          id: 3,
          codigo: "RES-2024-003",
          turista_id: 3,
          turista_nombre: "María García",
          turista_email: "maria@ejemplo.com",
          paquete_id: 3,
          paquete_nombre: "París Romántico",
          fecha_inicio: "2024-05-20",
          fecha_fin: "2024-05-26",
          num_personas: 2,
          precio_total: 7000,
          estado: "Confirmada",
          metodo_pago: "PayPal",
          notas: "Luna de miel",
          created_at: "2024-02-10",
        },
        {
          id: 4,
          codigo: "RES-2024-004",
          turista_id: 4,
          turista_nombre: "Carlos López",
          turista_email: "carlos@ejemplo.com",
          paquete_id: 1,
          paquete_nombre: "Cancún Paradise",
          fecha_inicio: "2024-02-28",
          fecha_fin: "2024-03-07",
          num_personas: 3,
          precio_total: 4500,
          estado: "Completada",
          metodo_pago: "Tarjeta de Débito",
          notas: "",
          created_at: "2024-01-20",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Confirmada":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelada":
        return "bg-red-100 text-red-800"
      case "Completada":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const columns = [
    {
      accessorKey: "codigo",
      header: "Código",
      cell: ({ row }: any) => (
        <div className="font-mono text-sm font-medium text-indigo-600">{row.original.codigo}</div>
      ),
    },
    {
      accessorKey: "turista_nombre",
      header: "Turista",
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium">{row.original.turista_nombre}</div>
          <div className="text-sm text-gray-500">{row.original.turista_email}</div>
        </div>
      ),
    },
    {
      accessorKey: "paquete_nombre",
      header: "Paquete",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Package className="w-4 h-4 text-purple-600" />
          <span className="font-medium">{row.original.paquete_nombre}</span>
        </div>
      ),
    },
    {
      accessorKey: "fecha_inicio",
      header: "Fechas",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <div>
            <div className="text-sm font-medium">{row.original.fecha_inicio}</div>
            <div className="text-xs text-gray-500">al {row.original.fecha_fin}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "num_personas",
      header: "Personas",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <User className="w-4 h-4 text-gray-600" />
          <span>{row.original.num_personas}</span>
        </div>
      ),
    },
    {
      accessorKey: "precio_total",
      header: "Total",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <CreditCard className="w-4 h-4 text-green-600" />
          <span className="font-medium">${row.original.precio_total.toLocaleString()}</span>
        </div>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(row.original.estado)}`}>
          {row.original.estado}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewDetail(row.original)}
            className="text-blue-600 hover:text-blue-900"
            title="Ver detalles"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleEdit(row.original)}
            className="text-indigo-600 hover:text-indigo-900"
            title="Editar"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row.original.id)}
            className="text-red-600 hover:text-red-900"
            title="Eliminar"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  const filteredReservas = reservas.filter((reserva) => {
    const matchesSearch =
      reserva.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.turista_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.paquete_nombre.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEstado = filterEstado === "" || reserva.estado === filterEstado

    return matchesSearch && matchesEstado
  })

  const exportColumns = [
    { key: "codigo", header: "Código" },
    { key: "turista_nombre", header: "Turista" },
    { key: "turista_email", header: "Email" },
    { key: "paquete_nombre", header: "Paquete" },
    { key: "fecha_inicio", header: "Fecha Inicio" },
    { key: "fecha_fin", header: "Fecha Fin" },
    { key: "num_personas", header: "Personas" },
    { key: "precio_total", header: "Total" },
    { key: "estado", header: "Estado" },
    { key: "metodo_pago", header: "Método Pago" },
  ]

  const handleViewDetail = (reserva: Reserva) => {
    setSelectedReserva(reserva)
    setShowDetailModal(true)
  }

  const handleEdit = (reserva: Reserva) => {
    // Implementar lógica de edición
    console.log("Editar reserva:", reserva)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta reserva?")) {
      setReservas(reservas.filter((r) => r.id !== id))
    }
  }

  const handleUpdateEstado = (id: number, nuevoEstado: string) => {
    setReservas(reservas.map((r) => (r.id === id ? { ...r, estado: nuevoEstado as any } : r)))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Reservas</h1>
            <p className="mt-1 text-sm text-gray-600">Administra las reservas de paquetes turísticos</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nueva Reserva</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar reservas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <select
                  value={filterEstado}
                  onChange={(e) => setFilterEstado(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Todos los estados</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>

              <ExportButtons data={filteredReservas} filename="reservas" columns={exportColumns} />
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <DataTable data={filteredReservas} columns={columns} />
            )}
          </div>
        </div>
      </div>

      {/* Modal de detalles */}
      {showDetailModal && selectedReserva && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Detalles de Reserva</h3>
              <button onClick={() => setShowDetailModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Código de Reserva</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">{selectedReserva.codigo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(selectedReserva.estado)}`}
                    >
                      {selectedReserva.estado}
                    </span>
                    <select
                      value={selectedReserva.estado}
                      onChange={(e) => handleUpdateEstado(selectedReserva.id, e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Confirmada">Confirmada</option>
                      <option value="Completada">Completada</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Turista</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReserva.turista_nombre}</p>
                  <p className="text-xs text-gray-500">{selectedReserva.turista_email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Paquete</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReserva.paquete_nombre}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReserva.fecha_inicio}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReserva.fecha_fin}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Número de Personas</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReserva.num_personas}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio Total</label>
                  <p className="mt-1 text-sm text-gray-900 font-semibold">
                    ${selectedReserva.precio_total.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedReserva.metodo_pago}</p>
                </div>
              </div>

              {selectedReserva.notas && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notas</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedReserva.notas}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                <p className="mt-1 text-sm text-gray-900">{selectedReserva.created_at}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cerrar
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md">
                Editar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
