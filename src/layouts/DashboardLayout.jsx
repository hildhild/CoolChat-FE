import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import DashboardFooter from "../components/DashboardFooter";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

function DashboardLayout({ children, page }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="flex">
      <Sidebar isExpanded={isExpanded} page={page}/>
      <div className="flex-grow relative">
        <DashboardHeader isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
        {children}
        <DashboardFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;
