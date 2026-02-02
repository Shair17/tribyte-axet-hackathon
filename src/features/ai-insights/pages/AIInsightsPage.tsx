import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Shield,
  AlertTriangle,
  FileText,
  TrendingUp,
  CheckCircle2,
  Activity,
  Zap,
  Database,
  BarChart3,
} from "lucide-react";

type AIInsight = {
  title: string;
  description: string;
  severity: "success" | "warning";
  action: string;
};

type AIFeature = {
  title: string;
  description: string;
  icon: any;
  status: "Activo" | "Procesando";
  statusColor: string;
  details: string[];
  metrics: Record<string, number>;
  enabled: boolean; // para Switch
};

/**
 * Datos de ejemplo (luego vienen de Supabase)
 */
const initialFeatures: AIFeature[] = [
  {
    title: "Validación de datos",
    description:
      "Valida automáticamente entradas y detecta información faltante o incorrecta",
    icon: Shield,
    status: "Activo",
    statusColor: "bg-emerald-100 text-emerald-700",
    details: [
      "Valida 248 registros de empleados",
      "Chequeos en tiempo real",
      "Precisión 99.8%",
    ],
    metrics: { procesados: 1247, correctos: 1244, errores: 3 },
    enabled: true,
  },
  {
    title: "Detección de inconsistencias",
    description:
      "Escanea registros para identificar conflictos, duplicados y anomalías",
    icon: AlertTriangle,
    status: "Procesando",
    statusColor: "bg-blue-100 text-blue-700",
    details: [
      "Detectó 3 inconsistencias",
      "Último escaneo: hace 2 horas",
      "Auto-corrección habilitada",
    ],
    metrics: { escaneados: 5420, marcados: 3, resueltos: 12 },
    enabled: true,
  },
  {
    title: "Reportes automáticos",
    description:
      "Genera reportes sobre vacaciones, ausencias y analítica del personal",
    icon: FileText,
    status: "Activo",
    statusColor: "bg-emerald-100 text-emerald-700",
    details: ["24 reportes este mes", "Programado diario 09:00", "Exporta PDF/Excel/CSV"],
    metrics: { generados: 24, programados: 30, descargados: 18 },
    enabled: true,
  },
  {
    title: "Analítica predictiva",
    description:
      "Predice tendencias de vacaciones, patrones de ausencias y disponibilidad",
    icon: TrendingUp,
    status: "Activo",
    statusColor: "bg-emerald-100 text-emerald-700",
    details: ["Predice pico de vacaciones Q2", "Exactitud 87%", "Análisis histórico"],
    metrics: { predicciones: 156, exactitud: 87, insights: 23 },
    enabled: true,
  },
];

const initialInsights: AIInsight[] = [
  {
    title: "Se detectó un pico de vacaciones",
    description:
      "Q2 2025 muestra 40% más solicitudes de vacaciones que el promedio. Considera ajustes de personal.",
    severity: "warning",
    action: "Ver detalle",
  },
  {
    title: "Mejora en la calidad de datos",
    description:
      "La validación con IA redujo errores en 67% comparado con el trimestre anterior.",
    severity: "success",
    action: "Ver reporte",
  },
  {
    title: "Mejor eficiencia de automatización",
    description:
      "El tiempo de procesamiento de solicitudes se redujo 45% con apoyo de IA.",
    severity: "success",
    action: "Ver analítica",
  },
];

export default function AIInsightsPage() {
  const [features, setFeatures] = useState(initialFeatures);

  /**
   * Luego esto lo guardas en Supabase:
   * supabase.from("ai_features").upsert(...)
   */
  const toggleFeature = (index: number) => {
    setFeatures((prev) =>
      prev.map((f, i) => (i === index ? { ...f, enabled: !f.enabled } : f)),
    );
  };

  const handleViewFeature = (title: string) => {
    alert(`Ver detalle: ${title}`);
  };

  const handleInsightAction = (title: string) => {
    alert(`Acción del insight: ${title}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold">Automatización y validación con IA</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Funciones de IA para validar datos, detectar inconsistencias y generar reportes.
        </p>
      </header>

      {/* Descripción general */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Integración de inteligencia artificial</h3>
              <p className="text-muted-foreground leading-relaxed">
                La IA analiza y procesa automáticamente información administrativa (validación, detección de inconsistencias
                y generación de reportes) para reducir errores manuales y mejorar la eficiencia.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estado del sistema */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="h-5 w-5 text-emerald-600" />
              <p className="text-sm font-medium">Estado del sistema</p>
            </div>
            <p className="text-2xl font-bold">Operativo</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">Todo funciona correctamente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-medium">Velocidad</p>
            </div>
            <p className="text-2xl font-bold">2.4s</p>
            <p className="text-xs text-muted-foreground mt-2">Tiempo promedio de respuesta</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <Database className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-medium">Registros procesados</p>
            </div>
            <p className="text-2xl font-bold">12.4K</p>
            <p className="text-xs text-muted-foreground mt-2">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <p className="text-sm font-medium">Precisión</p>
            </div>
            <p className="text-2xl font-bold">99.2%</p>
            <p className="text-xs text-muted-foreground mt-2">Rendimiento general</p>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>

                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="mt-1">{feature.description}</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={feature.statusColor}>{feature.status}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Toggle simple */}
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <Label className="font-medium">Habilitado</Label>
                    <p className="text-xs text-muted-foreground">Activa o desactiva esta función</p>
                  </div>
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={() => toggleFeature(index)}
                  />
                </div>

                <Separator />

                {/* Detalles */}
                <div className="space-y-2">
                  {feature.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Métricas */}
                <div className="pt-3 border-t">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <p className="text-xl font-bold">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => handleViewFeature(feature.title)}
                >
                  Ver detalle
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Insights recientes
          </CardTitle>
          <CardDescription>Recomendaciones y análisis automático</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {initialInsights.map((insight) => (
            <div
              key={insight.title}
              className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <Badge
                      variant={insight.severity === "success" ? "default" : "secondary"}
                      className={
                        insight.severity === "success"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                      }
                    >
                      {insight.severity === "success" ? "éxito" : "alerta"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleInsightAction(insight.title)}
                >
                  {insight.action}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Métricas de performance */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de rendimiento</CardTitle>
          <CardDescription>Rendimiento del sistema en los últimos 30 días</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Validación de datos</span>
              <span className="font-medium">99.8%</span>
            </div>
            <Progress value={99.8} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Detección de inconsistencias</span>
              <span className="font-medium">94.2%</span>
            </div>
            <Progress value={94.2} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Generación de reportes</span>
              <span className="font-medium">100%</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Precisión predictiva</span>
              <span className="font-medium">87.5%</span>
            </div>
            <Progress value={87.5} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
