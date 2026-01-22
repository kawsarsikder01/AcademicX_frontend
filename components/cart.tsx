'use client'; 
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
    const { items, removeFromCart, totalPrice } = useCart();

    if (items.length === 0) {
        return (
            <>
                <Navigation />
                <div className="min-h-screen bg-background flex items-center justify-center pt-20">
                    <div className="text-center max-w-md px-4">
                        <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6 animate-bounce" />
                        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                        <p className="text-muted-foreground mb-8">
                            Explore our courses and add some to your cart!
                        </p>
                        <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                            <Link href="/courses">Browse Courses</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-background pt-20">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="md:col-span-2 space-y-4">
                            {items.map((item) => (
                                <Card
                                    key={item.id}
                                    className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 rounded-lg shadow hover:shadow-lg transition"
                                >
                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                                    />

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col justify-between w-full">
                                        <div className="mb-2">
                                            <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                                            {item.instructor && (
                                                <p className="text-sm text-gray-500">By {item.instructor}</p>
                                            )}
                                        </div>

                                        {/* Price & Remove */}
                                        <div className="flex items-center justify-between mt-4 md:mt-0">
                                            <p className="text-xl font-bold text-primary">${Number(item.price)?.toFixed(2)}</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-500 border-red-500 hover:bg-red-50"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-24 rounded-xl shadow-md">
                                <CardContent className="p-6 flex flex-col space-y-4">
                                    <h2 className="text-xl font-bold mb-2">Order Summary</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Subtotal ({items.length} items)</span>
                                            <span>${Number(totalPrice)?.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Tax</span>
                                            <span>$0.00</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between text-xl font-bold">
                                            <span>Total</span>
                                            <span>${Number(totalPrice)?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full bg-primary text-white hover:bg-primary/90"
                                    >
                                        <Link href="/checkout">Proceed to Checkout</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;
