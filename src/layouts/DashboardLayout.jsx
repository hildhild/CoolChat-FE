import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import DashboardFooter from "../components/DashboardFooter";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

function DashboardLayout({ children, page }) {
  return (
    <div className="flex">
      <Sidebar page={page} />
      <div className="flex-grow relative h-[100vh] overflow-y-scroll">
        <DashboardHeader/>
        {children}
        <DashboardFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;
