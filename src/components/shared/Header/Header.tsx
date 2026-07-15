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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/dashboard/admin";
    if (user.role === "reporter") return "/dashboard/reporter";
    return "/dashboard/user";
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="py-2 bg-background/70 backdrop-blur-md sticky top-0 z-50"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            href="/"
            className="font-black text-2xl tracking-wider bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          >
            NextMart
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            href="/"
            className={`transition-all font-semibold text-sm tracking-wide px-3 py-1.5 rounded-full ${
              isActive("/")
                ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5"
                : "text-foreground/80 hover:text-primary hover:bg-default-100"
            }`}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/products"
            className={`transition-all font-semibold text-sm tracking-wide px-3 py-1.5 rounded-full ${
              isActive("/products")
                ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5"
                : "text-foreground/80 hover:text-primary hover:bg-default-100"
            }`}
          >
            Products
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/about"
            className={`transition-all font-semibold text-sm tracking-wide px-3 py-1.5 rounded-full ${
              isActive("/about")
                ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5"
                : "text-foreground/80 hover:text-primary hover:bg-default-100"
            }`}
          >
            About
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {loading ? (
          <NavbarItem>
            <Spinner size="sm" color="primary" />
          </NavbarItem>
        ) : !user ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Link
                href="/login"
                className="text-foreground/80 hover:text-primary transition-colors mr-2 font-semibold text-sm tracking-wide"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/signup"
                radius="full"
                className="font-bold text-sm px-6 shadow-md shadow-primary/20 hover:shadow-primary/30 transition-shadow duration-200"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform ring-2 ring-primary/30"
                  color="primary"
                  name={user.name}
                  size="sm"
                  src={user.image || ""}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  textValue="Signed in profile"
                >
                  <p className="font-semibold text-xs text-default-400">
                    Signed in as
                  </p>
                  <p className="font-bold text-primary truncate text-sm">
                    {user.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="dashboard_workspace"
                  href={getDashboardLink()}
                  textValue="Dashboard Workspace"
                  className="font-semibold"
                >
                  Dashboard Workspace
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={logout}
                  textValue="Log out"
                  className="font-bold text-danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu className="bg-background/95 backdrop-blur-md pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full text-foreground text-lg py-2 block hover:text-primary transition-colors font-semibold"
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
