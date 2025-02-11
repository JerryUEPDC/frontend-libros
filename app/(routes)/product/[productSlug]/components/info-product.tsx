import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";


export type InfoProductProps = {
    product: ProductType;
  };

const InfoProduct = (props: InfoProductProps) => {

    const {product} = props
    const {addItem} = useCart()

    return ( 
        <div className="px-6">
            <div className="justify-between mb-3 sm:flex">
                <h1 className="text-2xl">{product.attributes.productName} </h1>
                <div className="flex items-center justify-between gap-3">
                    <p className="px-2 py-1 text-xs text-white bg-blue-800 rounded-full w-fit">
                    {product.attributes.curso}
                    </p>
                    <p className="px-2 py-1 text-xs bg-yellow-500 rounded-full w-fit">
                    {product.attributes.materia}
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
                <p>
                    {product.attributes.Description}
                </p>
            <Separator className="my-4" />
            <p className="my-4 text-2xl">{formatPrice(product.attributes.price)} </p>
            <div className="flex items-center gap-5">
                <Button className="w-full" onClick={() => addItem(product)}>Reservar</Button>
            </div>
        </div>
     );
}
 
export default InfoProduct;