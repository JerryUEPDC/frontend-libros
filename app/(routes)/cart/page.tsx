"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CartItem from "./components/cart-item";
import { toast } from "@/hooks/use-toast"; // Importa el toast
import { Toaster } from "@/components/ui/toaster"; // Importa el Toaster

export default function Page() {
    const { items, removeAll } = useCart();
    const prices = items.map((product) => product.attributes.price);
    const totalPrice = prices.reduce((total, price) => total + price, 0);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const handleReservation = async () => {
        if (!selectedDate) {
            toast({
                title: "Fecha no seleccionada",
                description: "Por favor, selecciona una fecha de reserva.",
                variant: "destructive", // Puedes personalizar el estilo aquí
            });
            return;
        }

        setLoading(true);

        const requestBody = {
            data: {
                productos: items.map((product) => product.id),
                fechaReserva: selectedDate.toISOString().split("T")[0],
                estado: "Pendiente",  // Estado por defecto "Pendiente"
            },
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reservas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error("Error al realizar la reserva");

            toast({
                title: "Reserva realizada",
                description: "La reserva se ha realizado con éxito.",
                variant: "success", // Notificación de éxito
            });

            removeAll();
            setShowDatePicker(false);
            setSelectedDate(undefined);
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Hubo un problema con la reserva.",
                variant: "destructive", // Notificación de error
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-5 text-3xl font-bold">Carrito de Reservas</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    {items.length === 0 ? (
                        <p className="text-red-500">El carrito está vacío. Agrega libros antes de reservar.</p>
                    ) : (
                        <ul>
                            {items.map((item) => (
                                <CartItem key={item.id} product={item} />
                            ))}
                        </ul>
                    )}
                </div>

                <div className="p-6 rounded-lg bg-slate-100 flex flex-col">
                    <p className="mb-3 text-lg font-semibold">Resumen de pedido</p>
                    <Separator />
                    <div className="flex justify-between gap-5 my-4">
                        <p>Total de la orden</p>
                        <p>{formatPrice(totalPrice)}</p>
                    </div>

                    <div className="flex items-center justify-center w-full mt-3">
                        <Button
                            className="w-full"
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            disabled={items.length === 0} // 🚀 Deshabilitar si el carrito está vacío
                        >
                            Reservar
                        </Button>
                    </div>

                    {showDatePicker && (
                        <div className="mt-4 flex flex-col items-center">
                            <DayPicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                fromMonth={firstDayOfMonth}
                                toMonth={lastDayOfMonth}
                            />
                            <Button className="mt-4" onClick={handleReservation} disabled={loading}>
                                {loading ? "Reservando..." : "Confirmar Reserva"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Toaster /> {/* Asegúrate de que el Toaster esté presente en la estructura */}
        </div>
    );
}
