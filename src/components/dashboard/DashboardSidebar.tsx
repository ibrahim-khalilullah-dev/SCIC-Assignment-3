"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  CreditCard,
  Bookmark,
  User,
  Users,
  Settings,
} from "lucide-react";

interface SidebarProps {
  userRole: "user" | "reporter" | "admin";
}

export default function DashboardSidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const userLinks = [
    { label: "Dashboard", href: "/dashboard/user", icon: Home },
    {
      label: "Purchases",
      href: "/dashboard/user/purchased",
      icon: ShoppingBag,
    },
    { label: "Wishlist", href: "/dashboard/user/bookmarks", icon: Bookmark },
    { label: "Profile", href: "/dashboard/user/profile", icon: User },
  ];

  const reporterLinks = [
    { label: "Seller Console", href: "/dashboard/reporter", icon: Home },
    {
      label: "Manage Products",
      href: "/dashboard/reporter/products",
      icon: ShoppingBag,
    },
    { label: "Sales Log", href: "/dashboard/reporter/sales", icon: CreditCard },
    { label: "Profile", href: "/dashboard/reporter/profile", icon: User },
  ];

  const adminLinks = [
    { label: "Admin Core", href: "/dashboard/admin", icon: Home },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "All Products",
      href: "/dashboard/admin/products",
      icon: ShoppingBag,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
    { label: "Profile", href: "/dashboard/admin/profile", icon: User },
  ];

  const roleLinksMap = {
    user: userLinks,
    reporter: reporterLinks,
    admin: adminLinks,
  };

  const navItems = roleLinksMap[userRole] || userLinks;

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-full lg:w-64 shrink-0 border-r border-default-100 bg-default-50 p-6 flex flex-col justify-between min-h-[300px] lg:min-h-[calc(100vh-80px)]">
      <div className="space-y-8">
        <div>
          <span className="text-[10px] font-bold text-default-400 uppercase tracking-widest block">
            Workspace
          </span>
          <span className="text-xs font-bold text-primary capitalize mt-1 block">
            {userRole} dashboard
          </span>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-default-500 hover:bg-default-100 hover:text-default-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-default-100 pt-6 mt-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-default-400 hover:text-default-900 transition duration-200"
        >
          <Settings className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
