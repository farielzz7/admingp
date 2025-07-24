"use client"

import { Download, FileText } from "lucide-react"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import "jspdf-autotable"

interface ExportButtonsProps {
  data: any[]
  filename: string
  columns: { key: string; header: string }[]
}

export default function ExportButtons({ data, filename, columns }: ExportButtonsProps) {
  const exportToExcel = () => {
    // Preparar datos para Excel
    const excelData = data.map((item) => {
      const row: any = {}
      columns.forEach((col) => {
        row[col.header] = item[col.key]
      })
      return row
    })

    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Datos")

    // Ajustar ancho de columnas
    const colWidths = columns.map((col) => ({
      wch: Math.max(col.header.length, 15),
    }))
    ws["!cols"] = colWidths

    XLSX.writeFile(wb, `${filename}.xlsx`)
  }

  const exportToPDF = () => {
    const doc = new jsPDF()

    // Título
    doc.setFontSize(16)
    doc.text(`Reporte: ${filename}`, 20, 20)

    // Fecha de generación
    doc.setFontSize(10)
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 20, 30)

    // Preparar datos para PDF
    const tableData = data.map((item) =>
      columns.map((col) => {
        const value = item[col.key]
        // Formatear valores especiales
        if (typeof value === "number") {
          return value.toLocaleString()
        }
        if (typeof value === "boolean") {
          return value ? "Sí" : "No"
        }
        return value || "-"
      }),
    )

    // Crear tabla
    ;(doc as any).autoTable({
      head: [columns.map((col) => col.header)],
      body: tableData,
      startY: 40,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [79, 70, 229], // Indigo
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251], // Gray-50
      },
      margin: { top: 40 },
    })

    doc.save(`${filename}.pdf`)
  }

  return (
    <div className="flex space-x-2">
      <button
        onClick={exportToExcel}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 text-sm"
      >
        <Download className="h-4 w-4" />
        <span>Excel</span>
      </button>
      <button
        onClick={exportToPDF}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 text-sm"
      >
        <FileText className="h-4 w-4" />
        <span>PDF</span>
      </button>
    </div>
  )
}
