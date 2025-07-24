"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import DataTable from "@/components/ui/DataTable"
import ExportButtons from "@/components/ui/ExportButtons"
import { Search, CreditCard, DollarSign, Calendar, User, FileText, CheckCircle, XCircle, Clock } from "lucide-react"

interface Pago {
  id: number
  reserva_codigo: string
  turista_nombre: string
  monto: number
  metodo_pago: string
  estado: "Pendiente" | "Completado" | "Fallido" | "Reembolsado"
  fecha_pago: string
  referencia_externa: string
  comision: number
  monto_neto: number
  moneda: string
  notas: string
  created_at: string
}

export default function Pagos() {
  const [pagos, setPagos] = useState<Pago[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState("")
  const [filterMetodo, setFilterMetodo] = useState("")

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setPagos([
        {
          id: 1,
          reserva_codigo: "RES-2024-001",
          turista_nombre: "Ana Martínez",
          monto: 3000,
          metodo_pago: "Tarjeta de Crédito",
          estado: "Completado",
          fecha_pago: "2024-01-15T10:30:00",
          referencia_externa: "TXN_123456789",
          comision: 90,
          monto_neto: 2910,
          moneda: "USD",
          notas: "Pago procesado exitosamente",
          created_at: "2024-01-15",
        },
        {
          id: 2,
          reserva_codigo: "RES-2024-002",
          turista_nombre: "John Smith",
          monto: 8800,
          metodo_pago: "Transferencia Bancaria",
          estado: "Pendiente",
          fecha_pago: "2024-02-01T14:15:00",
          referencia_externa: "WIRE_987654321",
          comision: 44,
          monto_neto: 8756,
          moneda: "USD",
          notas: "Esperando confirmación bancaria",
          created_at: "2024-02-01",
        },
        {
          id: 3,
          reserva_codigo: "RES-2024-003",
          turista_nombre: "María García",
          monto: 7000,
          metodo_pago: "PayPal",
          estado: "Completado",
          fecha_pago: "2024-02-10T16:45:00",
          referencia_externa: "PP_ABCDEF123",
          comision: 210,
          monto_neto: 6790,
          moneda: "USD",
          notas: "Pago instantáneo via PayPal",
          created_at: "2024-02-10",
        },
        {
          id: 4,
          reserva_codigo: "RES-2024-004",
          turista_nombre: "Carlos López",
          monto: 4500,
          metodo_pago: "Tarjeta de Débito",
          estado: "Fallido",
          fecha_pago: "2024-01-20T09:20:00",
          referencia_externa: "FAIL_555666777",
          comision: 0,
          monto_neto: 0,
          moneda: "USD",
          notas: "Fondos insuficientes",
          created_at: "2024-01-20",
        },
        {
          id: 5,
          reserva_codigo: "RES-2024-005",
          turista_nombre: "Laura Rodríguez",
          monto: 2500,
          metodo_pago: "Tarjeta de Crédito",
          estado: "Reembolsado",
          fecha_pago: "2024-01-25T11:00:00",
          referencia_externa: "REF_888999000",
          comision: -75,
          monto_neto: 2425,
          moneda: "USD",
          notas: "Reembolso por cancelación",
          created_at: "2024-01-25",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Fallido":
        return "bg-red-100 text-red-800"
      case "Reembolsado":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case "Completado":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Pendiente":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Fallido":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "Reembolsado":
        return <FileText className="w-4 h-4 text-blue-600" />
      default:
        return null
    }
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "reserva_codigo",
      header: "Reserva",
      cell: ({ row }: any) => (
        <div className="font-mono text-sm font-medium text-indigo-600">{row.original.reserva_codigo}</div>
      ),
    },
    {
      accessorKey: "turista_nombre",
      header: "Cliente",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-600" />
          <span className="font-medium">{row.original.turista_nombre}</span>
        </div>
      ),
    },
    {
      accessorKey: "monto",
      header: "Monto",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-medium">
            ${row.original.monto.toLocaleString()} {row.original.moneda}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "metodo_pago",
      header: "Método",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-purple-600" />
          <span className="text-sm">{row.original.metodo_pago}</span>
        </div>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          {getEstadoIcon(row.original.estado)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(row.original.estado)}`}>
            {row.original.estado}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "fecha_pago",
      header: "Fecha",
      cell: ({ row }: any) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <div>
            <div className="text-sm font-medium">{new Date(row.original.fecha_pago).toLocaleDateString()}</div>
            <div className="text-xs text-gray-500">{new Date(row.original.fecha_pago).toLocaleTimeString()}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "monto_neto",
      header: "Neto",
      cell: ({ row }: any) => (
        <div className="text-right">
          <div className="font-medium text-green-600">${row.original.monto_neto.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Comisión: ${Math.abs(row.original.comision)}</div>
        </div>
      ),
    },
  ]

  const filteredPagos = pagos.filter((pago) => {
    const matchesSearch =
      pago.reserva_codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.turista_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.referencia_externa.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEstado = filterEstado === "" || pago.estado === filterEstado
    const matchesMetodo = filterMetodo === "" || pago.metodo_pago === filterMetodo

    return matchesSearch && matchesEstado && matchesMetodo
  })

  const exportColumns = [
    { key: "id", header: "ID" },
    { key: "reserva_codigo", header: "Código Reserva" },
    { key: "turista_nombre", header: "Cliente" },
    { key: "monto", header: "Monto" },
    { key: "metodo_pago", header: "Método Pago" },
    { key: "estado", header: "Estado" },
    { key: "fecha_pago", header: "Fecha Pago" },
    { key: "referencia_externa", header: "Referencia" },
    { key: "comision", header: "Comisión" },
    { key: "monto_neto", header: "Monto Neto" },
    { key: "moneda", header: "Moneda" },
  ]

  // Calcular estadísticas
  const stats = {
    total: pagos.reduce((sum, pago) => sum + (pago.estado === "Completado" ? pago.monto : 0), 0),
    completados: pagos.filter((p) => p.estado === "Completado").length,
    pendientes: pagos.filter((p) => p.estado === "Pendiente").length,
    fallidos: pagos.filter((p) => p.estado === "Fallido").length,
    comisionTotal: pagos.reduce((sum, pago) => sum + (pago.estado === "Completado" ? pago.comision : 0), 0),
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Gestión de Pagos</h1>
            <p className="mt-1 text-sm text-gray-600">Administra los pagos y transacciones del sistema</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Recaudado</p>
                <p className="text-lg font-semibold text-gray-900">${stats.total.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Completados</p>
                <p className="text-lg font-semibold text-gray-900">{stats.completados}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-lg font-semibold text-gray-900">{stats.pendientes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Fallidos</p>
                <p className="text-lg font-semibold text-gray-900">{stats.fallidos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Comisiones</p>
                <p className="text-lg font-semibold text-gray-900">${stats.comisionTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar pagos..."
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
                  <option value="Completado">Completado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Fallido">Fallido</option>
                  <option value="Reembolsado">Reembolsado</option>
                </select>

                <select
                  value={filterMetodo}
                  onChange={(e) => setFilterMetodo(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Todos los métodos</option>
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                </select>
              </div>

              <ExportButtons data={filteredPagos} filename="pagos" columns={exportColumns} />
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <DataTable data={filteredPagos} columns={columns} />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
