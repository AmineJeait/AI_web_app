import { NavLink } from "react-router";

function Nav() {
  return (
    <div
      className="d-flex flex-column min-vh-100 p-3"
      style={{
        width: "260px",
    backgroundColor: "#ced4da", // lighter grey
    color: "#212529",           // dark text for contrast
    borderRight: "1px solid #adb5bd", // slightly darker border
    boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
      }}
    >
      <div className="mb-4">
        <h4 className="text-center" style={{ color: "#212529", fontWeight: "700" }}>
          MyApp
        </h4>
      </div>

      <ul className="nav flex-column gap-2">
        {[
          { to: "/", label: "Home", icon: "bi-house-fill" },
          { to: "/chat", label: "Chat", icon: "bi-chat-dots-fill" },
          { to: "/settings", label: "Settings", icon: "bi-gear-fill" },
        ].map(({ to, label, icon }) => (
          <li className="nav-item" key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                  isActive ? "bg-primary text-white" : "text-dark"
                }`
              }
              style={{
                fontWeight: 500,
                fontSize: "1rem",
                cursor: "pointer",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <i className={`bi ${icon}`} style={{ fontSize: "1.25rem" }}></i> {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div
        className="mt-auto pt-4 border-top"
        style={{ borderColor: "#ced4da" }}
      >
        <NavLink
          to="/profile"
          className="nav-link d-flex align-items-center gap-2 px-3 py-2 text-dark"
          style={{
            fontWeight: 500,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "color 0.3s",
          }}
        >
          <i className="bi bi-person-circle" style={{ fontSize: "1.25rem" }}></i> Profile
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
