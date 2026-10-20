import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "./Logo"
import {FaArrowUp} from "react-icons/fa";

const HomeFooter = () => {
  const currentYear = new Date().getFullYear();
  const footerStyle = {background:"radial-gradient(ellipse at top left, rgba(109,40,217,0.18), transparent 45%), #0b1020", color: "#a5afc5", borderTop: "1px solid rgba(255,255,255,0.08)"};
  const linkStyle = {color: "#a5afc5", textDecoration: "none", fontSize: "14px", transition: "color 0.2s ease"};
  const headingStyle = {color: "#ffffff", fontSize: "14px", fontWeight: "600", marginBottom: "18px"};
  return (
    <footer style={footerStyle}>
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={5} md={6}>
            <Logo/>
            <p style={{fontSize: "14px", lineHeight: "1.9", maxWidth: "360px", color: "#929db5"}}>
              Plan smarter, stay organized, and get more done. Keep your tasks and projects moving forward with Plannex.
            </p>
          </Col>
          {/* <Col lg={2} md={6} xs={6}>
            <h6 style={headingStyle}>Explore</h6>
            <div className="d-flex flex-column gap-3">
              <Link to="/" style={linkStyle}>Home</Link>
              <Link to="/signin" style={linkStyle}>Sign In</Link>
              <Link to="/signup" style={linkStyle}>Get Started</Link>
            </div>
          </Col>
          <Col lg={2} md={6} xs={6}>
            <h6 style={headingStyle}>Resources</h6>
            <div className="d-flex flex-column gap-3">
              <Link to="/contact" style={linkStyle}>Contact</Link>
              <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
              <Link to="/terms" style={linkStyle}>Terms of Use</Link>
            </div>
          </Col> */}
          <Col lg={3} md={6}>
            <h6 style={headingStyle}>Ready to get organized?</h6>
            <p style={{fontSize: "13px", lineHeight: "1.8", color: "#929db5"}}>
              Turn your plans into progress, one task at a time.
            </p>
            <Link to="/signup" className="btn rounded-3 px-3 py-2" style={{background: "linear-gradient(135deg, #8b5cf6, #6366f1)", color: "#ffffff", border: "none", fontSize: "13px", fontWeight: "600"}}>
              Get Started <FaArrowUp className="ms-2" size={11} />
            </Link>
          </Col>
        </Row>
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-5 pt-4"
          style={{borderTop: "1px solid rgba(255,255,255,0.09)"}}>
          <p className="mb-0 text-center text-md-start" style={{ fontSize: "13px", color: "#7f8ba3" }}>
            © {currentYear} AIN360. All rights reserved.
          </p>
          <p className="mb-0" style={{ fontSize: "13px", color: "#7f8ba3" }}>
            Built for better productivity.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default HomeFooter;
