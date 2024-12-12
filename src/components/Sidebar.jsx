import Logo from "@/assets/CoolChat Logo/2.png"
import LogoOnly from "@/assets/CoolChat Logo/3.png"
import { MdDataUsage, MdOutlineChat, MdLogout, MdOutlineGroups } from "react-icons/md"
import { FaEdit, FaChartBar, FaRegMoneyBillAlt, FaCog } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import { setToken } from "../store/slices/UserSlice";
import { toast } from "react-toastify";

export const Sidebar = ({page}) => {
    const isExpanded = useSelector(state => state.sidebar.isExpanded);
    const userRole = useSelector(state => state.user.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setToken(""));
        localStorage.setItem("token", "");
        navigate("/");
        toast.success("Đăng xuất thành công");
    }

    if (isExpanded) {
        return <div className="w-[270px]">
            <div className="w-[270px] flex justify-center p-4 mb-7">
                <img src={Logo} className="h-10"></img>
            </div>
            <Link to="/chatbot-training">
                {
                    page === "chatbot-training"
                    ?
                    <div className="flex w-full bg-white px-5 h-14 relative" radius="none">
                        <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                            <MdDataUsage size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Đào tạo chatbot</div>
                        </div>
                    </div>
                    :
                    <div className="flex w-full bg-white px-5 h-14">
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                            <MdDataUsage size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Đào tạo chatbot</div>
                        </div>
                    </div>
                }
            </Link>
            <Link to="/chatbot-editting">
                {
                    page === "chatbot-editting"
                    ?
                    <div className="flex w-full bg-white px-5 h-14 relative" radius="none">
                        <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                            <FaEdit size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Tùy chỉnh chatbot</div>
                        </div>
                    </div>
                    :
                    <div className="flex w-full bg-white px-5 h-14">
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                            <FaEdit size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Tùy chỉnh chatbot</div>
                        </div>
                    </div>
                }
            </Link>
            <Link to="/chat">
                {
                    page === "chat"
                    ?
                    <div className="flex w-full bg-white px-5 h-14 relative" radius="none">
                        <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                            <MdOutlineChat size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Hội thoại</div>
                        </div>
                    </div>
                    :
                    <div className="flex w-full bg-white px-5 h-14">
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                            <MdOutlineChat size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Hội thoại</div>
                        </div>
                    </div>
                }
            </Link>
            <Link to="/report">
                {
                    page === "report"
                    ?
                    <div className="flex w-full bg-white px-5 h-14 relative" radius="none">
                        <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                            <FaChartBar size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Báo cáo</div>
                        </div>
                    </div>
                    :
                    <div className="flex w-full bg-white px-5 h-14">
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                            <FaChartBar size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Báo cáo</div>
                        </div>
                    </div>
                }
            </Link>
            <Link to="/subscription">
                {
                    page === "subscription"
                    ?
                    <div className="flex w-full bg-white px-5 h-14 relative" radius="none">
                        <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                            <FaRegMoneyBillAlt size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Thanh toán</div>
                        </div>
                    </div>
                    :
                    <div className="flex w-full bg-white px-5 h-14">
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                            <FaRegMoneyBillAlt size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Thanh toán</div>
                        </div>
                    </div>
                }
            </Link>
            {
                userRole === "OWNER"
                &&
                <Link to="/organization">
                    {
                        page === "organization"
                        ?
                        <div className="flex w-full bg-white px-5 h-14 relative" radius="none">
                            <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                            <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                                <MdOutlineGroups  size={20}/>
                                <div className="ml-4 flex items-center font-semibold">Tổ chức</div>
                            </div>
                        </div>
                        :
                        <div className="flex w-full bg-white px-5 h-14">
                            <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                                <MdOutlineGroups  size={20}/>
                                <div className="ml-4 flex items-center font-semibold">Tổ chức</div>
                            </div>
                        </div>
                    }
                </Link>
            }
            <hr className="w-full my-4"></hr>
            <Link to="/setting">
                {
                    page === "setting"
                    ?
                    <div className="flex w-full bg-white px-5 h-14 relative" radius="none">
                        <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                            <FaCog size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Cài đặt</div>
                        </div>
                    </div>
                    :
                    <div className="flex w-full bg-white px-5 h-14">
                        <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                            <FaCog size={20}/>
                            <div className="ml-4 flex items-center font-semibold">Cài đặt</div>
                        </div>
                    </div>
                }
            </Link>
            <button className="flex w-full bg-white px-5 h-14" onClick={handleLogout}>
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                    <MdLogout size={20}/>
                    <div className="ml-4 flex items-center font-semibold">Đăng xuất</div>
                </div>
            </button>
        </div>
    }
    else {
        return <div className="w-[60px]">
            <div className="w-[60px] flex justify-center py-4 mb-7">
                <img src={LogoOnly} className="h-10"></img>
            </div>
            <Link to="/chatbot-training">
                {
                    page === "chatbot-training"
                    ?
                    <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                        <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                            <MdDataUsage size={20}/>
                        </div>
                    </div>
                    :
                    <div className="w-full !min-w-0 bg-white h-14 px-2">
                        <div className="flex w-full h-full justify-center items-center !rounded-md">
                            <MdDataUsage size={20}/>
                        </div>
                    </div>
                }
                
            </Link>
            <Link to="/chatbot-editting">
                {
                    page === "chatbot-editting"
                    ?
                    <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                        <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                            <FaEdit size={20}/>
                        </div>
                    </div>
                    :
                    <div className="w-full !min-w-0 bg-white h-14 px-2">
                        <div className="flex w-full h-full justify-center items-center !rounded-md">
                            <FaEdit size={20}/>
                        </div>
                    </div>
                }
            </Link>
            <Link to="/chat">
                {
                    page === "chat"
                    ?
                    <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                        <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                            <MdOutlineChat size={20}/>
                        </div>
                    </div>
                    :
                    <div className="w-full !min-w-0 bg-white h-14 px-2">
                        <div className="flex w-full h-full justify-center items-center !rounded-md">
                            <MdOutlineChat size={20}/>
                        </div>
                    </div>
                }
            </Link>
            <Link to="/report">
                {
                    page === "report"
                    ?
                    <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                        <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                            <FaChartBar size={20}/>
                        </div>
                    </div>
                    :
                    <div className="w-full !min-w-0 bg-white h-14 px-2">
                        <div className="flex w-full h-full justify-center items-center !rounded-md">
                            <FaChartBar size={20}/>
                        </div>
                    </div>
                }
            </Link>
            <Link to="/subscription">
            {
                    page === "subscription"
                    ?
                    <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                        <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                            <FaRegMoneyBillAlt size={20}/>
                        </div>
                    </div>
                    :
                    <div className="w-full !min-w-0 bg-white h-14 px-2">
                        <div className="flex w-full h-full justify-center items-center !rounded-md">
                            <FaRegMoneyBillAlt size={20}/>
                        </div>
                    </div>
                }
            </Link>
            {
                userRole === "OWNER"
                &&
                <Link to="/organization">
                    {
                        page === "organization"
                        ?
                        <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                            <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                                <MdOutlineGroups  size={20}/>
                            </div>
                        </div>
                        :
                        <div className="w-full !min-w-0 bg-white h-14 px-2">
                            <div className="flex w-full h-full justify-center items-center !rounded-md">
                                <MdOutlineGroups  size={20}/>
                            </div>
                        </div>
                    }
                </Link>
            }
            <hr className="w-full my-4"></hr>
            <Link to="/setting">
                {
                    page === "setting"
                    ?
                    <div className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                        <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                            <FaCog size={20}/>
                        </div>
                    </div>
                    :
                    <div className="w-full !min-w-0 bg-white h-14 px-2">
                        <div className="flex w-full h-full justify-center items-center !rounded-md">
                            <FaCog size={20}/>
                        </div>
                    </div>
                }
            </Link>
            <button className="w-full !min-w-0 bg-white h-14 px-2" onClick={handleLogout}>
                <div className="flex w-full h-full justify-center items-center !rounded-md">
                    <MdLogout size={20}/>
                </div>
            </button>
        </div>
    }
    
}