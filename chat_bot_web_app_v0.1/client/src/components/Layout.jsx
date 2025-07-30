import { Outlet } from "react-router";
import Nav from "./Nav";

function Layout() {
  return (
    <div
      className="d-flex min-vh-100"
      style={{
        backgroundColor: "#f1f3f5",
      }}
    >
      <Nav /> {/* Sidebar always visible */}

      <main
        className="flex-grow-1 p-4"
        style={{
          borderRadius: "1rem",
          minHeight: "100vh",
          overflowY: "auto",
          backgroundColor: "white",
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
        }}
      >
        <Outlet /> {/* Page content here */}
      </main>
    </div>
  );
}

export default Layout;
