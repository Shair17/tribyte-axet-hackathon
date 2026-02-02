import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Calendar,
  Sparkles,
  Filter,
  Eye,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

/**
 * Datos de ejemplo (luego se reemplazan por Supabase)
 */
const reports = [
  {
    id: 1,
    title: "Resumen mensual de vacaciones",
    description:
      "Vista general de solicitudes de vacaciones, aprobaciones y días restantes (enero 2025).",
    type: "Vacaciones",
    generatedDate: "2025-01-29",
    status: "Listo",
    fileSize: "2.4 MB",
    format: "PDF",
  },
  {
    id: 2,
    title: "Resumen de bajas médicas - Q1 2025",
    description:
      "Análisis de bajas médicas: razones, duración y tendencias principales.",
    type: "Baja médica",
    generatedDate: "2025-01-28",
    status: "Listo",
    fileSize: "1.8 MB",
    format: "Excel",
  },
  {
    id: 3,
    title: "Insights de fuerza laboral (IA)",
    description:
      "Análisis con IA de patrones del personal y recomendaciones para Q2 2025.",
    type: "IA",
    generatedDate: "2025-01-27",
    status: "Listo",
    fileSize: "3.1 MB",
    format: "PDF",
  },
  {
    id: 4,
    title: "Reporte de asistencia",
    description:
      "Seguimiento mensual de asistencia con estadísticas y patrones de ausencias.",
    type: "Asistencia",
    generatedDate: "2025-01-26",
    status: "Procesando",
    fileSize: "-",
    format: "Excel",
  },
  {
    id: 5,
    title: "Análisis de carga por departamento",
    description:
      "Comparación de solicitudes por área y disponibilidad de personal.",
    type: "Analítica",
    generatedDate: "2025-01-25",
    status: "Listo",
    fileSize: "2.9 MB",
    format: "PDF",
  },
];

const scheduledReports = [
  {
    name: "Resumen diario de asistencia",
    frequency: "Diario a las 09:00",
    nextRun: "Mañana a las 09:00",
  },
  {
    name: "Reporte semanal de vacaciones",
    frequency: "Cada lunes",
    nextRun: "Lunes a las 08:00",
  },
  {
    name: "Insights mensuales (IA)",
    frequency: "Último día del mes",
    nextRun: "Último día del mes a las 18:00",
  },
];

type ReportTypeFilter = "Todos" | "Vacaciones" | "Baja médica" | "IA" | "Analítica" | "Asistencia";
type ReportStatusFilter = "Todos" | "Listo" | "Procesando";

export default function ReportsPage() {
  // Form de generación (simple)
  const [newReportType, setNewReportType] = useState("vacaciones");
  const [newReportRange, setNewReportRange] = useState("este-mes");
  const [newReportFormat, setNewReportFormat] = useState("pdf");

  // Filtros de la lista
  const [typeFilter, setTypeFilter] = useState<ReportTypeFilter>("Todos");
  const [statusFilter, setStatusFilter] = useState<ReportStatusFilter>("Listo");

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchType = typeFilter === "Todos" ? true : r.type === typeFilter;
      const matchStatus = statusFilter === "Todos" ? true : r.status === statusFilter;
      return matchType && matchStatus;
    });
  }, [typeFilter, statusFilter]);

  /**
   * Handlers simples (luego conectas a Supabase / API)
   */
  const handleGenerateReport = () => {
    // Luego: insertar job en Supabase y mostrar "Procesando"
    alert(
      `Generar reporte:\n- Tipo: ${newReportType}\n- Rango: ${newReportRange}\n- Formato: ${newReportFormat}`
    );
  };

  const handlePreview = (reportId: number) => {
    // Luego: abrir modal o navegar a /reports/:id
    alert(`Vista previa del reporte #${reportId}`);
  };

  const handleDownload = (reportId: number) => {
    // Luego: generar URL firmada en Supabase Storage y descargar
    alert(`Descargar reporte #${reportId}`);
  };

  const handleEditSchedule = (name: string) => {
    // Luego: abrir modal y guardar schedule en Supabase
    alert(`Editar programación: ${name}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Reportes y analítica</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Genera, previsualiza y descarga reportes del sistema.
        </p>
      </div>

      {/* Generación de reporte */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Generar nuevo reporte
          </CardTitle>
          <CardDescription>
            Crea reportes personalizados (luego con IA / backend).
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Tipo de reporte</Label>
              <Select value={newReportType} onValueChange={setNewReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacaciones">Vacaciones</SelectItem>
                  <SelectItem value="baja-medica">Baja médica</SelectItem>
                  <SelectItem value="ia">Insights (IA)</SelectItem>
                  <SelectItem value="asistencia">Asistencia</SelectItem>
                  <SelectItem value="analitica">Analítica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Rango de fechas</Label>
              <Select value={newReportRange} onValueChange={setNewReportRange}>
                <SelectTrigger id="date-range">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="este-mes">Este mes</SelectItem>
                  <SelectItem value="mes-pasado">Mes pasado</SelectItem>
                  <SelectItem value="q1-2025">Q1 2025</SelectItem>
                  <SelectItem value="custom">Rango personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Formato</Label>
              <Select value={newReportFormat} onValueChange={setNewReportFormat}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full gap-2" onClick={handleGenerateReport}>
            <Sparkles className="h-4 w-4" />
            Generar reporte
          </Button>
        </CardContent>
      </Card>

      {/* Barra de filtros */}
      <div className="flex gap-3 flex-wrap">
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as ReportTypeFilter)}>
          <SelectTrigger className="w-[220px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Vacaciones">Vacaciones</SelectItem>
            <SelectItem value="Baja médica">Baja médica</SelectItem>
            <SelectItem value="IA">IA</SelectItem>
            <SelectItem value="Analítica">Analítica</SelectItem>
            <SelectItem value="Asistencia">Asistencia</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ReportStatusFilter)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Listo">Listo</SelectItem>
            <SelectItem value="Procesando">Procesando</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de reportes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Reportes disponibles</h3>
          <p className="text-sm text-muted-foreground">
            {filteredReports.length} reportes
          </p>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-7 w-7 text-blue-600" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-semibold text-lg">{report.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {report.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="outline" className="gap-1">
                          <FileText className="h-3 w-3" />
                          {report.type}
                        </Badge>

                        <Badge
                          variant={report.status === "Listo" ? "default" : "secondary"}
                          className={
                            report.status === "Listo"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                          }
                        >
                          {report.status === "Listo" ? (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {report.status}
                        </Badge>

                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Generado {report.generatedDate}
                        </span>

                        {report.status === "Listo" && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {report.fileSize}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">
                              {report.format}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {report.status === "Listo" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => handlePreview(report.id)}
                        >
                          <Eye className="h-4 w-4" />
                          Vista previa
                        </Button>
                        <Button
                          size="sm"
                          className="gap-2"
                          onClick={() => handleDownload(report.id)}
                        >
                          <Download className="h-4 w-4" />
                          Descargar
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" disabled>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Procesando...
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Estadísticas rápidas (estáticas por ahora) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-medium">Total de reportes</p>
            </div>
            <p className="text-3xl font-bold">142</p>
            <p className="text-xs text-muted-foreground mt-1">
              Históricos generados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <p className="text-sm font-medium">Este mes</p>
            </div>
            <p className="text-3xl font-bold">24</p>
            <p className="text-xs text-muted-foreground mt-1">
              +8 vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Download className="h-5 w-5 text-purple-600" />
              <p className="text-sm font-medium">Descargas</p>
            </div>
            <p className="text-3xl font-bold">387</p>
            <p className="text-xs text-muted-foreground mt-1">
              Descargas totales
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Reportes programados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Reportes programados
          </CardTitle>
          <CardDescription>Reportes que se generan automáticamente</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {scheduledReports.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between p-3 rounded-lg border"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.frequency}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium">Siguiente: {s.nextRun}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1"
                    onClick={() => handleEditSchedule(s.name)}
                  >
                    Editar programación
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
