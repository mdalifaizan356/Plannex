import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaClipboardCheck, FaArrowRight } from "react-icons/fa";
import Logo from "./Logo";

const HomeHeader = () => {
  return (
    <Navbar fixed="top" className="py-3 bg-white border-bottom" style={{zIndex: 9999, boxShadow: "0 4px 24px rgba(15, 23, 42, 0.05)"}}>
      <Container>
        <Logo/>
        <div className="d-flex align-items-center gap-3">
          <span className="text-secondary small d-none d-sm-inline">Already have an account?</span>
          <Button as={Link} to="/signin" className="d-flex align-items-center gap-2 border-0 rounded-3 px-3 py-2 fw-semibold" style={{background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 4px 10px rgba(79, 70, 229, 0.18)"}}>
            Log In <FaArrowRight size={12} />
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default HomeHeader;