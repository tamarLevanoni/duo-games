import Link from "next/link";
import React from "react";
import { AiFillApple } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import Menu from "./components/Menu";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MdMenu } from 'react-icons/md';

const NavBar = () => {
  const links = [
    { label: "דף הבית", href: "/" },
    {label:"פרופיל", href:"/profile"},
    { label: "השאלת משחק", href: "/lending-page" },
    { label: "מוקדים", href: "/locations" },
    { label: "קטלוג", href: "/catalog" },
    { label: "אודותינו", href: "/about" },
  ];
  return (
    <nav className="flex justify-between bg-blue-400">
      <Link href="/">משחקים זוגיות לוגו </Link>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="menu-trigger">
          <MdMenu />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="menu-content">
        {links.map((link) => (
          <DropdownMenu.Item key={link.href} className="p-2 hover:bg-gray-200">
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenu.Item>
        ))}

        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </nav>
  );
};

export default NavBar;
