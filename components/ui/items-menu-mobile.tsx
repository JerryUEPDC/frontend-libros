
import { Menu } from "lucide-react";
import MenuList from "./menu-list";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const ItemsMenuMobile = () => {
    return ( 
        <Popover>
        <PopoverTrigger>
            <Menu/>
        </PopoverTrigger>
        <PopoverContent>
            <MenuList/>
        </PopoverContent>
        </Popover>
     );
}
 
export default ItemsMenuMobile