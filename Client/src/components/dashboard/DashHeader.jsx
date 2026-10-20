import React, { useContext, useEffect, useState } from "react";
import Logo from "./../public/Logo";
import {Navbar, Container, Offcanvas, Dropdown, Button, Nav} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {FaBars, FaXmark, FaSun, FaCalendarDays, FaCircleCheck, FaLayerGroup, FaGear, FaUser, FaLock, FaCreditCard, FaArrowRightFromBracket, FaCrown, FaChevronRight} from "react-icons/fa6";
import { UserContext } from "../../ContextProvider/UserContextProvider";
import calculateFreeDaysLeft from "../../utilities/calculateFreeDaysLeft";

function DashHeader() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [freeDaysLeft, setFreeDaysLeft] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.exp * 1000 <= Date.now()) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    } catch {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (user?.createdAt) {
      setFreeDaysLeft(calculateFreeDaysLeft(user.createdAt));
    }
  }, [user?.createdAt]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const closeSidebar = () => setShowSidebar(false);
  const isActive = (path) => location.pathname === path;

  const navItems = [
    {
      title: "My Day",
      description: "Focus on today's tasks",
      path: "/dashboard/myday",
      icon: <FaSun />,
    },
    {
      title: "Upcoming",
      description: "Plan what comes next",
      path: "/dashboard/upcoming",
      icon: <FaCalendarDays />,
    },
    {
      title: "Completed",
      description: "Review finished tasks",
      path: "/dashboard/completed",
      icon: <FaCircleCheck />,
    },
  ];

  const navigationItems = [
    {
      title: "Your Boards",
      description: "Manage your projects",
      path: "/dashboard/showboard",
      icon: <FaLayerGroup />,
    },
    {
      title: "Settings",
      description: "App preferences",
      path: "/dashboard/settings",
      icon: <FaGear />,
    },
  ];

  const renderNavItem = (item) => {
    const active = isActive(item.path);
    return (
      <Nav.Link key={item.path} as={Link} to={item.path} onClick={closeSidebar} active={active} className={`d-flex align-items-center gap-3 rounded-3 p-2 ${active ? "bg-primary-subtle text-primary" : "text-secondary"}`}>
        <span className={`d-flex align-items-center justify-content-center rounded-3 flex-shrink-0 ${active ? "bg-white text-primary" : "bg-body-tertiary"}`} style={{ width: 38, height: 38 }}>{item.icon}</span>
        <span className="d-flex flex-column flex-grow-1 overflow-hidden">
          <span className="fw-semibold small">{item.title}</span>
          <span className="text-secondary small">{item.description}</span>
        </span>
        <FaChevronRight className="small opacity-50" />
      </Nav.Link>
    );
  };

  return (
    <>
      <Navbar bg="white" expand={false} className="border-bottom sticky-top" style={{ minHeight: 72, zIndex: 1020 }}>
        <Container fluid className="px-3 px-md-4">
          <div className="d-flex align-items-center gap-3">
            <Button variant="light" className="border rounded-3 d-inline-flex align-items-center justify-content-center" style={{ width: 42, height: 42 }} onClick={() => setShowSidebar(true)} aria-label="Open navigation menu"><FaBars /></Button>
            <Logo />
          </div>
          <Dropdown align="end">
            <Dropdown.Toggle variant="light" id="profile-dropdown" className="border rounded-4 d-flex align-items-center gap-2 bg-white text-dark shadow-none p-2">
              <span className="rounded-3 d-inline-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{width: 38, height: 38, backgroundColor: "#eeedff", color: "#635bff"}}>
                {user?.name?.charAt(0)?.toUpperCase() || <FaUser />}
              </span>
              <span className="d-none d-sm-flex flex-column text-start">
                <span className="fw-bold small">{user?.name || "My Account"}</span>
                <span className="text-secondary small">Account</span>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-2 rounded-4 border shadow mt-2">
              <div className="d-flex align-items-center gap-3 p-2">
                <span className="rounded-3 d-inline-flex align-items-center justify-content-center fw-bold flex-shrink-0" style={{width: 44, height: 44, backgroundColor: "#eeedff", color: "#635bff"}}>
                  {user?.name?.charAt(0)?.toUpperCase() || <FaUser />}
                </span>
                <div className="overflow-hidden">
                  <div className="fw-bold text-dark small">{user?.name || "User"}</div>
                  <div className="text-secondary small text-break">{user?.email || ""}</div>
                </div>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/dashboard/editprofile" className="rounded-3 py-2"><FaUser className="me-2" />Edit Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to="/dashboard/changepass" className="rounded-3 py-2"><FaLock className="me-2" />Change Password</Dropdown.Item>
              <Dropdown.Item as={Link} to="/dashboard/billing" className="rounded-3 py-2"><FaCreditCard className="me-2" />Billing &amp; Plan</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="rounded-3 py-2 text-danger"><FaArrowRightFromBracket className="me-2" />Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

      <Offcanvas show={showSidebar} onHide={closeSidebar} placement="start" style={{ width: "min(300px, 88vw)"}}>
        <Offcanvas.Header className="border-bottom px-4 py-4">
          <div className="d-flex align-items-center gap-2"><Logo /></div>
          <Button variant="light" className="border rounded-3 d-flex align-items-center justify-content-center p-0" style={{ width: 38, height: 38 }} onClick={closeSidebar} aria-label="Close navigation menu"><FaXmark /></Button>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column p-3">
          <div className="text-secondary fw-bold small px-2 mb-3 mt-1">WORKSPACE</div>
          <Nav className="flex-column gap-1">{navItems.map(renderNavItem)}</Nav>
          <div className="text-secondary fw-bold small px-2 mb-3 mt-4">YOUR SPACE</div>
          <Nav className="flex-column gap-1">{navigationItems.map(renderNavItem)}</Nav>
          <div className="mt-auto pt-4">
            <div className="border rounded-4 p-3" style={{background: "linear-gradient(145deg, #f8f7ff, #ffffff)", borderColor: "#e7e5ff"}}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="rounded-3 d-inline-flex align-items-center justify-content-center" style={{width: 36, height: 36, backgroundColor: "#eeedff", color: "#635bff"}}>
                  <FaCrown />
                </span>
                <span className="badge rounded-2" style={{backgroundColor: "#eeedff", color: "#635bff"}}>
                  FREE PLAN
                </span>
              </div>
              <h6 className="fw-bold mb-2">Make more progress</h6>
              <p className="text-secondary small mb-3">
                {freeDaysLeft > 0 ? `${freeDaysLeft} days left in your free trial.` : "Explore plans and find the right fit for you."}
              </p>
              <Button as={Link} to="/dashboard/billing" onClick={closeSidebar} variant="primary" className="w-100 d-flex align-items-center justify-content-between rounded-3" style={{backgroundColor: "#635bff", borderColor: "#635bff"}}>
                View Plans <FaChevronRight />
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default DashHeader;