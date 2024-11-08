"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

const AppNavbar = () => {
  return (
    <Navbar isBordered maxWidth="xl" isBlurred>
      <NavbarBrand>
        <p className="font-bold text-inherit">MoMoXpress</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="#features">Features</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#calculator">Calculator</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
