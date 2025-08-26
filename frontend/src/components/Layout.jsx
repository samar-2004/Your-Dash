// src/components/Layout.jsx
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Sticky header at top */}
      <Header />

      <div className="flex flex-1">
        {/* Fixed sidebar (desktop) */}
        <Sidebar />

        {/* Scrollable main content */}
        <main className="flex-1 ml-0 md:ml-50 overflow-y-auto md:p-4 py-4">
          <Outlet /> {/* React Router pages will render here */}
        </main>
      </div>
    </div>
  );
}
