"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Users, Plane, Hotel, CreditCard } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTourists: 0,
    totalReservations: 0,
    totalRevenue: 0,
  })

  const [chartData, setChartData] = useState({
    monthlyReservations: [],
    touristsByCountry: [],
    revenueByPackage: [],
  })

  useEffect(() => {
    // Simular carga de datos
    setStats({
      totalUsers: 1250,
      totalTourists: 3420,
      totalReservations: 890,
      totalRevenue: 125000,
    })

    setChartData({
      monthlyReservations: [
        { month: "Ene", reservas: 65 },
        { month: "Feb", reservas: 78 },
        { month: "Mar", reservas: 90 },
        { month: "Abr", reservas: 81 },
        { month: "May", reservas: 95 },
        { month: "Jun", reservas: 110 },
      ],
      touristsByCountry: [
        { name: "México", value: 35 },
        { name: "USA", value: 25 },
        { name: "Canadá", value: 20 },
        { name: "España", value: 12 },
        { name: "Otros", value: 8 },
      ],
      revenueByPackage: [
        { package: "Playa", revenue: 45000 },
        { package: "Montaña", revenue: 32000 },
        { package: "Ciudad", revenue: 28000 },
        { package: "Aventura", revenue: 20000 },
      ],
    })
  }, [])

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Resumen general del sistema de administración</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Usuarios" value={stats.totalUsers} icon={Users} color="bg-blue-500" />
          <StatCard title="Total Turistas" value={stats.totalTourists} icon={Plane} color="bg-green-500" />
          <StatCard title="Reservas Activas" value={stats.totalReservations} icon={Hotel} color="bg-yellow-500" />
          <StatCard title="Ingresos Totales" value={`$${stats.totalRevenue}`} icon={CreditCard} color="bg-purple-500" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Reservations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reservas por Mes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.monthlyReservations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reservas" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tourists by Country */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Turistas por País</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.touristsByCountry}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.touristsByCountry.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Package */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ingresos por Tipo de Paquete</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.revenueByPackage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="package" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Ingresos"]} />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  )
}
