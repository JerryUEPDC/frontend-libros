"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Campo para el nombre de usuario
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Verificación del correo institucional
    const emailPattern = /^[a-zA-Z0-9._%+-]+@est\.uepdc\.edu\.ec$/;
    if (!emailPattern.test(email)) {
      toast({
        title: "Correo inválido",
        description: "Por favor ingresa un correo institucional de la UEPDC",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Registro exitoso",
          description: "Bienvenido a la plataforma",
        });
        router.push("/login"); // Redirigir al login después del registro
      } else {
        throw new Error(data.error.message || "Hubo un error en el registro");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      toast({
        title: "Error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Crear una Cuenta</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu_correo@est.uepdc.edu.ec"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="username">Nombre de Usuario</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Tu nombre de usuario"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-blue-700">
          {loading ? "Registrando..." : "Registrarse"}
        </Button>
      </form>

      <Toaster />
    </div>
  );
};

export default RegisterForm;
