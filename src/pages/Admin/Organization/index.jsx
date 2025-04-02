import { DashboardLayout } from "../../../layouts";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineGroups } from "react-icons/md";
import { ToggleSection } from "../../../components";
import { OrganizationInfo } from "./OrganizationInfo";
import { useSelector } from "react-redux";
import { Member } from "./Member";

function Organization() {
  const userRole = useSelector((state) => state.user.role);

  return (
    <DashboardLayout page="organization">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">TỔ CHỨC</div>
        <ToggleSection title="Thông tin tổ chức" Icon={FaInfoCircle}>
          <OrganizationInfo />
        </ToggleSection>
        {userRole === "OWNER" && (
          <ToggleSection
            title="Thành viên"
            Icon={MdOutlineGroups}
            initIsOpen={false}
          >
            <Member />
          </ToggleSection>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Organization;
