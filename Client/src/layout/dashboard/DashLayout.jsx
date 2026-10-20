import React from "react";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import DashHeader from "../../components/dashboard/DashHeader";

const DashLayout = () => { 
  return (
    <>
    <DashHeader />
    <Row>
      <Col>
        <main>
          <Outlet />
        </main>
      </Col>
    </Row>
    </>
  );
};
export default DashLayout;
