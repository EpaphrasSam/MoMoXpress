"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const AppNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const menuItems = [
    { name: "About", id: "about" },
    { name: "Features", id: "features" },
    { name: "Calculator", id: "calculator" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <Navbar
      isBordered
      maxWidth="xl"
      isBlurred
      className="bg-background/80 backdrop-blur-md border-accent"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-foreground"
          icon={(open) => (open ? <FaTimes size={24} /> : <FaBars size={24} />)}
        />
        <NavbarBrand className="cursor-pointer" onClick={scrollToTop}>
          <p className="font-bold hover:text-primary transition-colors">
            MoMoXpress
          </p>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className="hidden md:flex" justify="end">
        {menuItems.map((item) => (
          <NavbarItem key={item.id}>
            <Link
              className="cursor-pointer text-foreground/80 hover:text-primary transition-colors"
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-background/95 backdrop-blur-md">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.id}>
            <Link
              className="w-full cursor-pointer text-foreground/80 hover:text-primary transition-colors"
              onClick={() => scrollToSection(item.id)}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default AppNavbar;
