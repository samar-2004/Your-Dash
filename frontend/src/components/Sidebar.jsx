// src/components/Sidebar.jsx
import { useTheme } from "../context/themeContext.js";
import { NavLink, useLocation } from "react-router-dom";
import { navItems } from "../navigation/navItems.js";

export default function Sidebar() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex fixed left-0 w-50
        bg-surface 
        h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)]
        flex-col p-4 gap-4 z-20"
      >
        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 no-underline text-sm font-medium rounded-lg px-3 py-3 transition-colors
           ${
             isActive
               ? "bg-[rgb(135,103,228)] text-white shadow-sm"
               : "text-muted-foreground  hover:bg-gray-500/30"
           }`
                }
              >
                <span className="text-lg">
                  <Icon />
                </span>
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-30 
  bg-surface rounded-xl shadow-xl px-2 py-2 
  flex gap-4 flex-nowrap overflow-x-auto scrollbar max-w-[95%]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={`flex items-center justify-center text-xl min-w-[3rem] w-10 h-10 
          rounded-lg transition-all flex-shrink-0
          ${
            active
              ? "bg-[rgb(135,103,228)] text-white"
              : "text-muted-foreground hover:bg-gray-500/30"
          }`}
            >
              <Icon className="h-7 w-7"/>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
