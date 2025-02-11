
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import IconButton from "@/components/ui/icon-button";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";

type ProductCardProps = {
    product: ProductType
}

const ProductCard = (props: ProductCardProps) => {
    const { product } = props;
    const router = useRouter();
    const { addItem } = useCart();

    return (
        <div className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md group">
            {/* Etiquetas de curso y materia */}
            <div className="absolute flex items-center justify-between gap-3 px-2 z-[1] top-4">
                <p className="px-2 py-1 text-xs text-white bg-blue-800 rounded-full w-fit">
                    {product.attributes.curso}
                </p>
                <p className="px-2 py-1 text-xs text-white bg-yellow-500 rounded-full w-fit">
                    {product.attributes.materia}
                </p>
            </div>

            {/* Contenedor de la imagen con link */}
            <Link href={`/product/${product.attributes.slug}`}>
                <Carousel opts={{ align: "start" }} className="w-full max-w-sm">
                    <CarouselContent>
                        {product.attributes.images.data.map((image) => (
                            <CarouselItem key={image.id}>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.attributes.url}`}
                                    alt="Image"
                                    className="rounded-xl"
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                </Link>

            {/* Botones de acción */}
            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <IconButton
                    onClick={() => {router.push(`/product/${product.attributes.slug}`);
                    }}
                    icon={<Expand size={20} className="text-gray-600" />}
                />
                <IconButton onClick={() => addItem(product)}
                              icon={<ShoppingCart size={20} />}
                              className="text-gray-600"/>
            </div>
            {/* Información del producto */}
            <p className="text-2xl text-center">{product.attributes.productName}</p>
            <p className="font-bold text-center">{formatPrice(product.attributes.price)}</p>
        </div>
        
    );
};

export default ProductCard;

