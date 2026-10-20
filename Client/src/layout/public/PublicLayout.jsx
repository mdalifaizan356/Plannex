import React from "react";
import { Outlet } from "react-router-dom";
import HomeHeader from "../../components/public/HomeHeader";
import HomeFooter from "../../components/public/HomeFooter";

const PublicLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HomeHeader />
      <main className="flex-grow-1 p-3">
        <Outlet />
      </main>
      <HomeFooter />
    </div>
  );
};

export default PublicLayout;
