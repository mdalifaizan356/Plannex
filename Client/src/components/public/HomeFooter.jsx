import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "./Logo"
import {FaArrowUp} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

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
        </Row>
        <Row className="border-top mt-4 border-secondary text-white" style={{borderColor: "#334155"}}>
          <Col className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-md-3 mt-4">
            <a href="https://ain360.in/" target="_blank" rel="noopener noreferrer" aria-label="Visit AIN360 website" className="d-inline-flex align-items-center text-white text-decoration-none" style={{ gap: "6px" }}>
            <div className="d-flex align-items-center justify-content-center rounded-circle overflow-hidden" style={{width: "48px", height: "48px", border: "1px solid rgba(34, 211, 238, 0.35)", flexShrink: 0}}>
              <img src="https://res.cloudinary.com/x2pybkik/image/upload/v1792567257/1000577422.jpg" alt="AIN360 Logo" className="w-100 h-100 rounded-circle" style={{objectFit: "cover", transition: "transform 0.3s ease"}}/>
            </div>
            <span className="fw-bold" style={{ letterSpacing: "1px" }}>AIN<span style={{ color: "#22D3EE" }}>360</span></span>
            <FiArrowUpRight className="text-secondary" size={18}/>
          </a>
          <p className="text-secondary mb-0" style={{ fontSize: "13px", letterSpacing: "0.4px" }}>Building ideas into digital experiences.</p>
          <p className="text-secondary mb-0" style={{ fontSize: "12px" }}>Copyright © {new Date().getFullYear()} AIN360 — All rights reserved.</p>
          <a href="https://devfaizan.ain360.in/" target="_blank" rel="noopener noreferrer" className="btn rounded-3 mt-4" style={{background: "linear-gradient(135deg, #8b5cf6, #6366f1)", color: "#ffffff", border: "none", fontSize: "13px", fontWeight: "600"}} onMouseEnter={(e) => {e.currentTarget.style.color = "#22D3EE"}} onMouseLeave={(e) => {e.currentTarget.style.color = ""}}>
            Connect with me
            <FiArrowUpRight className="ms-2" size={16} />
          </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default HomeFooter;