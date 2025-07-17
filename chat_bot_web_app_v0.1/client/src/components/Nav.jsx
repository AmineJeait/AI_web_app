import Chat from "./Chat";

//The Nav component takes the whole width of the page so the chatbox will be inside it
// Separate function to avoid duplication
function renderSidebarContent() {
    return (
      <div className="d-flex flex-column align-items-start px-3 pt-2 text-white min-vh-100">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-3 text-white text-decoration-none"
        >
          <span className="fs-5">Menu</span>
        </a>
  
        <ul className="nav nav-pills flex-column w-100" id="menu">
          <li className="nav-item">
            <a href="#" className="nav-link text-white">
              <i className="bi bi-house"></i> <span className="ms-2">Home</span>
            </a>
          </li>
  
          <hr className="text-white w-100 my-2" />
  
          <li>
            <a
              href="#submenu1"
              data-bs-toggle="collapse"
              className="nav-link text-white"
            >
              <i className="bi bi-speedometer2"></i>{" "}
              <span className="ms-2">Dashboard</span>
            </a>
            {/* <ul className="collapse show nav flex-column ms-3" id="submenu1">
              <li>
                <a href="#" className="nav-link text-white">
                  Item 1
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  Item 2
                </a>
              </li>
            </ul> */}
          </li>
  
          <hr className="text-white w-100 my-2" />
  
          {/* <li>
            <a href="#" className="nav-link text-white">
              <i className="bi bi-table"></i> <span className="ms-2">Orders</span>
            </a>
          </li> */}
  
          {/* <li>
            <a
              href="#submenu2"
              data-bs-toggle="collapse"
              className="nav-link text-white"
            >
              <i className="bi bi-bootstrap"></i>{" "}
              <span className="ms-2">Bootstrap</span>
            </a>
            <ul className="collapse nav flex-column ms-3" id="submenu2">
              <li>
                <a href="#" className="nav-link text-white">
                  Item 1
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  Item 2
                </a>
              </li>
            </ul>
          </li> */}
  
          {/* <li>
            <a
              href="#submenu3"
              data-bs-toggle="collapse"
              className="nav-link text-white"
            >
              <i className="bi bi-grid"></i>{" "}
              <span className="ms-2">Products</span>
            </a>
            <ul className="collapse nav flex-column ms-3" id="submenu3">
              <li>
                <a href="#" className="nav-link text-white">
                  Product 1
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  Product 2
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  Product 3
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  Product 4
                </a>
              </li>
            </ul>
          </li> */}
  
          {/* <hr className="text-white w-100 my-2" /> */}
  
          {/* <li>
            <a href="#" className="nav-link text-white">
              <i className="bi bi-people"></i>{" "}
              <span className="ms-2">Customers</span>
            </a>
          </li> */}
        </ul>
  
        {/* <hr className="text-white w-100 my-3" /> */}
  
        {/* <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser"
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-person-circle fs-4 me-2"></i>
            <span>User</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    );
}





function Nav() {
    return (
      <div className="container-fluid">
        {/* Toggle button for mobile */}
        <button
          className="btn btn-outline-dark d-md-none my-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          ☰ Menu
        </button>
  
        {/* Offcanvas Sidebar for small screens */}
        <div
          className="offcanvas offcanvas-start bg-dark text-white"
          tabIndex="-1"
          id="mobileSidebar"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menu</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            {renderSidebarContent()}
          </div>
        </div>
  
        <div className="row flex-nowrap">
          {/* Sidebar for desktop */}
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark d-none d-md-block">
            {renderSidebarContent()}
          </div>
  
          {/* Main Content */}
          <div className="col py-3 bg-light">
            <div className="card shadow-sm p-4">
              <h1>Welcome</h1>
              <p>This is your content area. Chat, dashboard, etc.</p>
              <p>To clear the chat you must refresh the page</p>
              
            </div>
            <div className="chat">
                <Chat />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
 
  
  export default Nav;
  