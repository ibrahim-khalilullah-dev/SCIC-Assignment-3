"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered className="py-2">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-inherit text-2xl tracking-wider text-primary"
          >
            NextMart
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <Link
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/products"
            className="text-foreground hover:text-primary transition-colors"
          >
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {!user ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                href="/login"
                className="text-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Button color="danger" variant="light" onClick={logout}>
              Logout
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full text-foreground text-lg py-2 block hover:text-primary transition-colors"
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
