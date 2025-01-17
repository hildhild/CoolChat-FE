import DashboardHeader from "./DashboardHeader/DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

function DashboardLayout({ children, page }) {
  return (
    <div className="flex overflow-x-hidden">
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
