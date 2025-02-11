"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Instagram } from "lucide-react"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Primero BGU",
    href: "/category/primero-bachillerato",
    description:
      "Accede a los libros esenciales para el Primer año de Bachillerato General Unificado.",
  },
  {
    title: "Segundo BGU",
    href: "/category/segundo-bachillerato",
    description:
      "Accede a los libros esenciales para el Segundo año de Bachillerato General Unificado.",
  },
  {
    title: "Tercero BGU",
    href: "/category/tercero-bachillerato",
    description:
      "Accede a los libros esenciales para el Tercer año de Bachillerato General Unificado.",
  }
]

const MenuList= () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre Nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                   
                    <div className="mb-2 mt-4 text-lg font-medium">
                      UEPDC
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                    Somos una Institución Educativa Particular Católica nacida de la Misión para la Misión, que brinda una formación con valores científicos, éticos, morales y cristianos.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/tienda" title="Tienda">
                Accede a toda tu información, tus pedidos y mucho más.
              </ListItem>
              <ListItem href="https://www.facebook.com/UEPDC2021" title="Facebook">
                No te pierdas de nuestras publicaciones en Facebook.
              </ListItem>
              <ListItem 
              href="https://www.instagram.com/uepdc" title="Instagram">
              No te pierdas de nuestras publicaciones en Instagram.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Libros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="https://uepdc.edu.ec" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              UEPDC
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
export default MenuList