"use client";

import { useState, useRef } from "react";
import { PRODUCT_CATEGORIES } from "../../../constants/constants";
import NavItem from "./NavItem";
import { useOnClickOutside } from "../Hooks/OnClickOutSide";

function NavItems() {
  const [active, setActive] = useState<number | null>(null);
// Set a number to active div. if number === active then that div is open and conditional rendering is enabled.

  // If any div is open, then isAnyOpen will be true.
  const isAnyOpen = active !== null;

  const navRef = useRef<HTMLDivElement | null>(null);
// Create a ref for the navigation div.
  useOnClickOutside(navRef, () => setActive(null));
  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        // Track the category index
        const handleOpen = () => {
          if (active === index) {
            setActive(null);
          } else {
            setActive(index);
          }
        };

        const isOpen = index === active;
        const close = () => setActive(null);
        return (
          <NavItem
            category={category}
            isOpen={isOpen}
            handleOpen={handleOpen}
            key={`${category.value}-${index}`} // Ensure key is unique
            isAnyOpen={isAnyOpen}
            close={close}
          />
        );
      })}
    </div>
  );
}

export default NavItems;
