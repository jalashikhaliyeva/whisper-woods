"use client";

import React, { useState } from "react";
import { Menu, User, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inspirations", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Travel Partners", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <header
      className={`flex items-center justify-between py-4 px-4 bg-background ${montserrat.variable}`}
    >
      {/* Logo */}
      <div className={`flex items-center ${cormorantGaramond.variable}`}>
        <span className="font-semibold text-2xl mr-1 font-[family-name:var(--font-cormorant-garamond)]">
          Maison{" "}
        </span>
        <span className="font-semibold text-2xl text-primary font-[family-name:var(--font-cormorant-garamond)]">
          Lumière
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6 text-muted-foreground font-[family-name:var(--font-montserrat)]">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-foreground transition-colors "
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Right-aligned Icons */}
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:inline-flex">
          <User className="h-5 w-5" />
        </Button>

        {/* Mobile Menu Toggle */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className={`w-full max-w-none px-6 ${montserrat.variable}`}
          >
            <SheetHeader className="flex flex-row items-center justify-start mb-8">
              {/* Mobile Logo */}
              <div
                className={`flex items-center ${cormorantGaramond.variable}`}
              >
                <span className="font-semibold text-2xl mr-1 font-[family-name:var(--font-cormorant-garamond)]">
                  Maison{" "}
                </span>
                <span className="font-semibold text-2xl text-primary font-[family-name:var(--font-cormorant-garamond)]">
                  Lumière
                </span>
              </div>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col items-center pt-20 space-y-6  font-[family-name:var(--font-montserrat)] h-full">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg hover:text-primary transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-center space-x-2 text-lg hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
                <span>Dil</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
