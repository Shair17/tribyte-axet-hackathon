import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Shield,
  Sparkles,
  Mail,
  Plus,
  Edit,
  Trash2,
  Settings as SettingsIcon,
  Bell,
  Lock,
} from "lucide-react";

/**
 * Datos de ejemplo (luego se reemplazan por Supabase)
 */
const initialUsers = [
  {
    id: 1,
    name: "Administrador",
    email: "admin@company.com",
    role: "Administrador",
    status: "Activo",
    initials: "AD",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "Manager",
    status: "Activo",
    initials: "SJ",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.c@company.com",
    role: "Manager",
    status: "Activo",
    initials: "MC",
  },
];

const roles = [
  {
    name: "Administrador",
    users: 2,
    permissions: [
      "Acceso total al sistema",
      "Gestión de usuarios",
      "Todos los reportes",
      "Configuración de IA",
    ],
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Manager",
    users: 12,
    permissions: [
      "Ver empleados",
      "Aprobar solicitudes",
      "Generar reportes",
      "Ver insights de IA",
    ],
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Empleado",
    users: 234,
    permissions: ["Ver datos propios", "Enviar solicitudes", "Ver calendario"],
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Viewer",
    users: 8,
    permissions: ["Solo lectura", "Ver reportes"],
    color: "bg-gray-100 text-gray-700",
  },
];

const initialAISettings = [
  {
    name: "Validación de datos",
    description: "Valida automáticamente datos y detecta errores",
    enabled: true,
  },
  {
    name: "Detección de inconsistencias",
    description: "Busca duplicados, conflictos y anomalías",
    enabled: true,
  },
  {
    name: "Reportes automáticos",
    description: "Genera reportes programados automáticamente",
    enabled: true,
  },
  {
    name: "Notificaciones inteligentes",
    description: "Alertas basadas en IA para eventos importantes",
    enabled: false,
  },
  {
    name: "Analítica predictiva",
    description: "Predice tendencias y patrones en los datos",
    enabled: true,
  },
];

export default function SettingsPage() {
  // Estado local: luego lo reemplazas por datos desde Supabase
  const [users, setUsers] = useState(initialUsers);
  const [aiSettings, setAiSettings] = useState(initialAISettings);

  /**
   * Handlers simples (luego se conectan a Supabase)
   */
  const handleAddUser = () => {
    // Luego: abrir modal o navegar a formulario
    const newUser = {
      id: Date.now(),
      name: "Nuevo usuario",
      email: "nuevo@company.com",
      role: "Empleado",
      status: "Activo",
      initials: "NU",
    };
    setUsers((prev) => [newUser, ...prev]);
  };

  const handleEditUser = (id: number) => {
    // Luego: abrir modal o pantalla de edición
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, name: u.name + " (editado)" } : u)),
    );
  };

  const handleDeleteUser = (id: number) => {
    // Luego: confirm modal y eliminar en Supabase
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggleAISetting = (index: number) => {
    setAiSettings((prev) =>
      prev.map((s, i) => (i === index ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const handleReset = () => {
    if (!confirm("¿Restablecer valores por defecto?")) return;
    setUsers(initialUsers);
    setAiSettings(initialAISettings);
  };

  const handleSave = async () => {
    // Aquí luego llamas a Supabase:
    // await supabase.from('settings').upsert(...)
    alert("Guardar cambios (pendiente conectar a Supabase).");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Ajustes del sistema</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona usuarios, roles y automatizaciones de IA.
        </p>
      </div>

      {/* Gestión de usuarios */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestión de usuarios
              </CardTitle>
              <CardDescription>
                Administra usuarios y sus accesos al sistema
              </CardDescription>
            </div>
            <Button className="gap-2" onClick={handleAddUser}>
              <Plus className="h-4 w-4" />
              Agregar usuario
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right mr-4">
                    <Badge variant="outline" className="mb-1">
                      {user.role}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{user.status}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => handleEditUser(user.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Roles y permisos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Roles y permisos
          </CardTitle>
          <CardDescription>
            Configura niveles de acceso y permisos
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div
                key={role.name}
                className="p-5 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={role.color}>{role.name}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {role.users} usuarios
                      </span>
                    </div>
                    <p className="text-sm font-medium">Permisos:</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" type="button">
                      <Edit className="h-3 w-3" />
                    </Button>

                    {role.name !== "Administrador" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>

                <ul className="space-y-2">
                  {role.permissions.map((permission) => (
                    <li
                      key={permission}
                      className="text-sm text-muted-foreground flex items-center gap-2"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuración IA */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Automatización con IA
          </CardTitle>
          <CardDescription>
            Activa o desactiva funciones de IA del sistema
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {aiSettings.map((setting, index) => (
              <div key={setting.name}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor={`ai-${index}`}
                        className="font-semibold cursor-pointer"
                      >
                        {setting.name}
                      </Label>
                      {setting.enabled && (
                        <Badge
                          variant="outline"
                          className="bg-emerald-100 text-emerald-700 text-xs"
                        >
                          Activo
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>

                  <Switch
                    id={`ai-${index}`}
                    checked={setting.enabled}
                    onCheckedChange={() => handleToggleAISetting(index)}
                    className="ml-4"
                  />
                </div>

                {index < aiSettings.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones y Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones por email</Label>
                <p className="text-sm text-muted-foreground">
                  Recibe actualizaciones por correo
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de solicitudes</Label>
                <p className="text-sm text-muted-foreground">
                  Alertas sobre solicitudes pendientes
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Insights de IA</Label>
                <p className="text-sm text-muted-foreground">
                  Notificar hallazgos de IA
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5" />
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticación en 2 pasos</Label>
                <p className="text-sm text-muted-foreground">
                  Seguridad adicional
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tiempo de sesión</Label>
                <p className="text-sm text-muted-foreground">
                  Cierre automático tras 30 min
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Registro de actividad</Label>
                <p className="text-sm text-muted-foreground">
                  Registrar acciones del sistema
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuración general */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Configuración general
          </CardTitle>
          <CardDescription>
            Preferencias básicas de la plataforma
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Nombre de la empresa</Label>
              <div className="p-3 rounded-lg border bg-muted/50">
                <p className="text-sm">Acme Corporation</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Idioma por defecto</Label>
              <div className="p-3 rounded-lg border bg-muted/50">
                <p className="text-sm">Español</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Inicio del año fiscal</Label>
              <div className="p-3 rounded-lg border bg-muted/50">
                <p className="text-sm">1 de enero</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Zona horaria</Label>
              <div className="p-3 rounded-lg border bg-muted/50">
                <p className="text-sm">Europe/Berlin</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={handleReset}>
              Restablecer
            </Button>
            <Button type="button" onClick={handleSave}>
              Guardar cambios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
