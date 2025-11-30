"use client";
import { Button } from "@/components/ui/button";
import { Menu, GraduationCap, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "./settings-provider";
import { getFile } from "@/lib/utils";
import { Settings } from "@/lib/types";

const Navigation = () => {
  const { totalItems } = useCart();
  const settings: Settings | null = useSettings();
   
  
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
          { settings?.site_logo && <Image src={getFile(settings?.site_logo??'')} alt={settings?.site_name??''} unoptimized width={120} height={40} /> }
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
            <Link href="/login" className="cursor-pointer">
              <Button variant="ghost" className="cursor-pointer">Login</Button>
            </Link>
            <Link href="/signup" className="cursor-pointer">
              <Button className="cursor-pointer">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    href={link.to}
                    className="text-lg text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
