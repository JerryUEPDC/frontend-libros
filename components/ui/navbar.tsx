"use client"
import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";

const Navbar = () => {
    const router = useRouter()
    const cart = useCart()
    return (
      <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-4xl md:max-w-6xl">
        <h1 className="text-3xl text-blue-800 font-bold" onClick={()=> router.push("/")}>Biblioteca
            <span className="text-yellow-500 font-bold">Comboni</span>
        </h1>
        <div className="items-center justify-between hidden sm:flex">
            <MenuList />
        </div>
        <div className="flex sm:hidden">
            <ItemsMenuMobile/>
        </div>
        <div className="flex items-center justify-beetween gap-2 sm:gap-7">
            {cart.items.length === 0 ? 
            <ShoppingCart strokeWidth="1" className="cursor-pointer" onClick={() => router.push("/cart")}/>
            : (
              <div className="flex gap-1" onClick={() => router.push("/cart")}>
                  <BaggageClaim strokeWidth={1} className="cursor-pointer"/>
                  <span>{cart.items.length}</span>
                </div>
            )}
            <User strokeWidth={1} className="cursor-pointer" onClick={()=> router.push("/cuenta")} />
            <ToggleTheme></ToggleTheme>
        </div>
      </div> 
    );
  };

  export default Navbar;