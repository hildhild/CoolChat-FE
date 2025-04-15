import DashboardHeader from "./DashboardHeader/DashboardHeader";
import DashboardFooter from "./DashboardFooter";
import { Sidebar } from "./Sidebar";

function DashboardLayout({ children, page }) {
  return (
    <div className="flex overflow-x-hidden">
      <Sidebar page={page} />
      <div className="flex-grow relative h-[100vh] overflow-y-auto">
        <DashboardHeader/>
        {children}
        <DashboardFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;
