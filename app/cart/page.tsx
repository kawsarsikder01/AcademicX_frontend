export const dynamic = "force-dynamic";
import Cart from "@/components/cart";
import { Providers } from "@/components/Provider";

export default function CartPage() {
    return(
        <Providers>
            <Cart/>
        </Providers>
    )
}   