import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/themeContext.js";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FiSearch, FiBell, FiChevronDown, FiX } from "react-icons/fi";
import { LuSun, LuMoon } from "react-icons/lu";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();

  // Close mobile search when route changes
  useEffect(() => {
    setMobileSearchOpen(false);
  }, [location.pathname]);
  // Focus input when opened
  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current)
      searchInputRef.current.focus();
  }, [mobileSearchOpen]);
  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-4 py-3 md:pl-7 md:pr:5 h-14 md:h-16 bg-surface backdrop-blur">
      {/* Logo (always visible) */}
      <Link
        to="/"
        className="flex items-center gap-2 font-semibold text-base md:text-lg shrink-0"
      >
        <span className="text-2xl md:text-3xl leading-none">
          <MdOutlineDashboardCustomize />
        </span>
        <span className="text-foreground">Your Dash</span>
      </Link>

      {/* Spacer to push right content to the right */}
      <div className="flex-1"></div>

      {/* Right cluster */}
      <div className="flex items-center gap-1 md:gap-3">
        {/* Desktop / tablet search */}
        <div className="hidden sm:block">
          <div className="relative w-64 md:w-80 lg:w-96 xl:w-[550px] group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Here"
              className="w-full h-10 md:h-11 pl-9 pr-3 rounded-lg text-muted-foreground focus:text-black bg-muted text-xs md:text-sm font-medium outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>
        </div>

        {/* Mobile search icon (collapsed) */}
        <button
          className="sm:hidden w-9 h-9 flex items-center text-muted-foreground justify-center rounded-md bg-muted hover:bg-muted/70 transition"
          aria-label="Open search"
          onClick={() => setMobileSearchOpen(true)}
        >
          <FiSearch size={16} />
        </button>
        
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 md:w-10 md:h-10 flex items-center text-muted-foreground  justify-center rounded-full bg-muted hover:bg-muted/70 transition"
        >
          {theme === "light" ? <LuMoon size={16} /> : <LuSun size={16} />}
        </button>
        
        <button
          className="relative w-9 h-9 md:w-10 md:h-10 flex items-center text-muted-foreground  justify-center rounded-full bg-muted hover:bg-muted/70 transition"
          aria-label="Notifications"
        >
          <FiBell size={16} />
          <span className="sr-only">Notifications</span>
          <span className="absolute top-2 right-2 md:top-3 md:right-3  border-2  border-border w-[9px] h-[9px] bg-red-500 rounded-full"></span>
        </button>
        
        {/* Profile avatar */}
        <div className="flex items-center gap-1 md:gap-2 pl-1 md:pl-2">
          <div className="relative h-9 w-9 md:h-10 md:w-10 rounded-full ring-2 ring-primary/40 overflow-hidden">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden lg:flex flex-col leading-tight text-xs md:text-sm">
            <span className="font-semibold">Ritika</span>
            <span className="text-[10px] md:text-[11px] text-muted-foreground">
              ritika@gmail.com
            </span>
          </div>
          <FiChevronDown className="text-muted-foreground" size={16} />
        </div>
      </div>

      {/* Mobile expanding search overlay */}
      {mobileSearchOpen && (
        <div className="sm:hidden absolute inset-x-0 top-full px-4 pb-3 pt-2 bg-surface/95 backdrop-blur border-b border-border animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Here"
                className="w-full h-10 pl-9 pr-10 rounded-xl bg-muted text-sm font-medium outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Close search"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}