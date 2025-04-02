import Logo from "@/assets/CoolChat Logo/2.png";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import {
  MdDataUsage,
  MdOutlineChat,
  MdLogout,
  MdOutlineGroups,
} from "react-icons/md";
import {
  FaEdit,
  FaChartBar,
  FaRegMoneyBillAlt,
  FaCog,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Tooltip } from "@nextui-org/react";
import { setToken } from "../../store/slices/UserSlice";
import { toast } from "react-toastify";
import { toggleIsExpanded } from "../../store/slices/SidebarSlice";

const LargeSidebar = ({ page, isExpanded }) => {
  const userRole = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setToken(""));
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Đăng xuất thành công");
  };

  return (
    <div
      className="w-[270px] h-[100vh] bg-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[270px] flex justify-center p-4 mb-7 relative">
        <img src={Logo} className="h-10"></img>
        <button
          className={`hamburger hamburger--spin ${
            isExpanded ? "is-active" : ""
          } absolute md:!hidden right-[16px] top-[24px]`}
          type="button"
          onClick={() => dispatch(toggleIsExpanded())}
          style={{
            width: "25px",
            height: "25px",
            padding: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
      {userRole !== "AGENT" && (
        <>
          <Link to="/chatbot-training">
            {page === "chatbot-training" ? (
              <div
                className="flex w-full bg-white px-5 h-14 relative"
                radius="none"
              >
                <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                  <MdDataUsage size={20} />
                  <div className="ml-4 flex items-center font-semibold">
                    Đào tạo chatbot
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-white px-5 h-14">
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-coolchat">
                  <MdDataUsage size={20} />
                  <div className="ml-4 flex items-center font-semibold">
                    Đào tạo chatbot
                  </div>
                </div>
              </div>
            )}
          </Link>
          <Link to="/chatbot-editting">
            {page === "chatbot-editting" ? (
              <div
                className="flex w-full bg-white px-5 h-14 relative"
                radius="none"
              >
                <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                  <FaEdit size={20} />
                  <div className="ml-4 flex items-center font-semibold">
                    Tùy chỉnh chatbot
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-white px-5 h-14">
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-coolchat">
                  <FaEdit size={20} />
                  <div className="ml-4 flex items-center font-semibold">
                    Tùy chỉnh chatbot
                  </div>
                </div>
              </div>
            )}
          </Link>
        </>
      )}
      <Link to="/chat">
        {page === "chat" ? (
          <div
            className="flex w-full bg-white px-5 h-14 relative"
            radius="none"
          >
            <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
            <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
              <MdOutlineChat size={20} />
              <div className="ml-4 flex items-center font-semibold">
                Hội thoại
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full bg-white px-5 h-14">
            <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-coolchat">
              <MdOutlineChat size={20} />
              <div className="ml-4 flex items-center font-semibold">
                Hội thoại
              </div>
            </div>
          </div>
        )}
      </Link>
      {userRole !== "AGENT" && (
        <>
          <Link to="/report">
            {page === "report" ? (
              <div
                className="flex w-full bg-white px-5 h-14 relative"
                radius="none"
              >
                <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                  <FaChartBar size={20} />
                  <div className="ml-4 flex items-center font-semibold">
                    Báo cáo
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-white px-5 h-14">
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-coolchat">
                  <FaChartBar size={20} />
                  <div className="ml-4 flex items-center font-semibold">
                    Báo cáo
                  </div>
                </div>
              </div>
            )}
          </Link>
          <Link to="/subscription">
            {page === "subscription" ? (
              <div
                className="flex w-full bg-white px-5 h-14 relative"
                radius="none"
              >
                <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                  <FaRegMoneyBillAlt size={20} />
                  <div className="ml-4 flex items-center font-semibold">
                    Thanh toán
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full bg-white px-5 h-14">
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-coolchat">
                  <FaRegMoneyBillAlt size={20} />
                  <div className="ml-4 flex items-center font-semibold">
                    Thanh toán
                  </div>
                </div>
              </div>
            )}
          </Link>
        </>
      )}

      {userRole === "AGENT" && (
        <Link to="/appointment">
          {page === "appointment" ? (
            <div
              className="flex w-full bg-white px-5 h-14 relative"
              radius="none"
            >
              <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
              <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                <FaCalendarAlt size={20} />
                <div className="ml-4 flex items-center font-semibold">
                  Lịch hẹn
                </div>
              </div>
            </div>
          ) : (
            <div className="flex w-full bg-white px-5 h-14">
              <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-coolchat">
                <FaCalendarAlt size={20} />
                <div className="ml-4 flex items-center font-semibold">
                  Lịch hẹn
                </div>
              </div>
            </div>
          )}
        </Link>
      )}
      <Link to="/organization">
        {page === "organization" ? (
          <div
            className="flex w-full bg-white px-5 h-14 relative"
            radius="none"
          >
            <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
            <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
              <MdOutlineGroups size={20} />
              <div className="ml-4 flex items-center font-semibold">
                Tổ chức
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full bg-white px-5 h-14">
            <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-coolchat">
              <MdOutlineGroups size={20} />
              <div className="ml-4 flex items-center font-semibold">
                Tổ chức
              </div>
            </div>
          </div>
        )}
      </Link>
      <hr className="w-full my-4"></hr>
      <Link to="/setting">
        {page === "setting" ? (
          <div
            className="flex w-full bg-white px-5 h-14 relative"
            radius="none"
          >
            <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
            <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
              <FaCog size={20} />
              <div className="ml-4 flex items-center font-semibold">
                Cài đặt
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full bg-white px-5 h-14">
            <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-coolchat">
              <FaCog size={20} />
              <div className="ml-4 flex items-center font-semibold">
                Cài đặt
              </div>
            </div>
          </div>
        )}
      </Link>
      <button className="flex w-full bg-white px-5 h-14" onClick={handleLogout}>
        <div className="flex w-full h-full justify-start items-center !rounded-md p-4 hover:text-red-500">
          <MdLogout size={20} />
          <div className="ml-4 flex items-center font-semibold">Đăng xuất</div>
        </div>
      </button>
    </div>
  );
};

export const Sidebar = ({ page }) => {
  const isExpanded = useSelector((state) => state.sidebar.isExpanded);
  const userRole = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setToken(""));
    localStorage.setItem("token", "");
    navigate("/");
    toast.success("Đăng xuất thành công");
  };

  if (isExpanded) {
    return (
      <>
        <div className="hidden md:block">
          <LargeSidebar page={page} isExpanded={isExpanded} />
        </div>
        <div
          className="absolute md:hidden w-[100vw] h-[100vh] bg-[#00000030] z-50"
          onClick={() => dispatch(toggleIsExpanded())}
        >
          <LargeSidebar page={page} isExpanded={isExpanded} />
        </div>
      </>
    );
  } else {
    return (
      <div className="w-[60px] hidden md:block">
        <div className="w-[60px] flex justify-center py-4 mb-7">
          <img src={LogoOnly} className="h-10"></img>
        </div>
        {userRole !== "AGENT" && (
          <>
            <Link to="/chatbot-training">
              <Tooltip content="Đào tạo chatbot" placement="right">
                {page === "chatbot-training" ? (
                  <div
                    className="w-full !min-w-0 bg-white h-14 px-2"
                    radius="none"
                  >
                    <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                      <MdDataUsage size={20} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-coolchat">
                      <MdDataUsage size={20} />
                    </div>
                  </div>
                )}
              </Tooltip>
            </Link>
            <Link to="/chatbot-editting">
              <Tooltip content="Tùy chỉnh chatbot" placement="right">
                {page === "chatbot-editting" ? (
                  <div
                    className="w-full !min-w-0 bg-white h-14 px-2"
                    radius="none"
                  >
                    <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                      <FaEdit size={20} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-coolchat">
                      <FaEdit size={20} />
                    </div>
                  </div>
                )}
              </Tooltip>
            </Link>
          </>
        )}
        <Link to="/chat">
          <Tooltip content="Hội thoại" placement="right">
            {page === "chat" ? (
              <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                  <MdOutlineChat size={20} />
                </div>
              </div>
            ) : (
              <div className="w-full !min-w-0 bg-white h-14 px-2">
                <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-coolchat">
                  <MdOutlineChat size={20} />
                </div>
              </div>
            )}
          </Tooltip>
        </Link>
        {userRole !== "AGENT" && (
          <>
            <Link to="/report">
              <Tooltip content="Báo cáo" placement="right">
                {page === "report" ? (
                  <div
                    className="w-full !min-w-0 bg-white h-14 px-2"
                    radius="none"
                  >
                    <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                      <FaChartBar size={20} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-coolchat">
                      <FaChartBar size={20} />
                    </div>
                  </div>
                )}
              </Tooltip>
            </Link>
            <Link to="/subscription">
              <Tooltip content="Thanh toán" placement="right">
                {page === "subscription" ? (
                  <div
                    className="w-full !min-w-0 bg-white h-14 px-2"
                    radius="none"
                  >
                    <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                      <FaRegMoneyBillAlt size={20} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-coolchat">
                      <FaRegMoneyBillAlt size={20} />
                    </div>
                  </div>
                )}
              </Tooltip>
            </Link>
          </>
        )}
        {userRole === "AGENT" && (
          <Link to="/appointment">
            <Tooltip content="Lịch hẹn" placement="right">
              {page === "appointment" ? (
                <div
                  className="w-full !min-w-0 bg-white h-14 px-2"
                  radius="none"
                >
                  <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                    <FaCalendarAlt size={20} />
                  </div>
                </div>
              ) : (
                <div className="w-full !min-w-0 bg-white h-14 px-2">
                  <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-coolchat">
                    <FaCalendarAlt size={20} />
                  </div>
                </div>
              )}
            </Tooltip>
          </Link>
        )}
        <Link to="/organization">
          <Tooltip content="Tổ chức" placement="right">
            {page === "organization" ? (
              <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                  <MdOutlineGroups size={20} />
                </div>
              </div>
            ) : (
              <div className="w-full !min-w-0 bg-white h-14 px-2">
                <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-coolchat">
                  <MdOutlineGroups size={20} />
                </div>
              </div>
            )}
          </Tooltip>
        </Link>
        <hr className="w-full my-4"></hr>
        <Link to="/setting">
          <Tooltip content="Cài đặt" placement="right">
            {page === "setting" ? (
              <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                  <FaCog size={20} />
                </div>
              </div>
            ) : (
              <div className="w-full !min-w-0 bg-white h-14 px-2">
                <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-coolchat">
                  <FaCog size={20} />
                </div>
              </div>
            )}
          </Tooltip>
        </Link>
        <Tooltip content="Đăng xuất" placement="right">
          <button
            className="w-full !min-w-0 bg-white h-14 px-2"
            onClick={handleLogout}
          >
            <div className="flex w-full h-full justify-center items-center !rounded-md hover:text-red-500">
              <MdLogout size={20} />
            </div>
          </button>
        </Tooltip>
      </div>
    );
  }
};
