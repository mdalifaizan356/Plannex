import React from 'react'
import { Navbar} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaClipboardCheck } from "react-icons/fa";

function Logo() {
  return (
    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold fs-4 text-dark m-0">
        <span className="d-flex align-items-center justify-content-center rounded-3 text-white" style={{width: "42px", height: "42px", background: "linear-gradient(135deg, #6366f1, #4338ca)", boxShadow: "0 4px 10px rgba(79, 70, 229, 0.2)"}}>
            <FaClipboardCheck size={21} />
        </span>
        <span>
            Plan<span style={{ color: "#6366f1" }}>nex</span>
        </span>
    </Navbar.Brand>
  )
}

export default Logo