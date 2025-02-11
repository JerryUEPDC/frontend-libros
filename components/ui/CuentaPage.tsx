"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogOut, User } from "lucide-react"; // Iconos

const CuentaPage = () => {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("jwt");
    if (!token) {
      toast({
        title: "No has iniciado sesión",
        description: "Redirigiéndote a la página de inicio de sesión...",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    // Obtener datos del usuario desde Strapi
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        setUser({ username: data.username, email: data.email });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información de tu cuenta",
          variant: "destructive",
        });
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
      variant: "default",
    });
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Mi Cuenta</h2>

      {user ? (
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-10 h-10 text-gray-600" />
            <div>
              <p className="text-lg font-semibold">{user.username}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <Button 
            onClick={handleLogout} 
            variant="destructive" 
            className="w-full flex items-center gap-2 px-4 py-2"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </Button>
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando datos...</p>
      )}
    </div>
  );
};

export default CuentaPage;
