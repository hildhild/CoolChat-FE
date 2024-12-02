import Logo from "@/assets/CoolChat Logo/2.png"
import LogoOnly from "@/assets/CoolChat Logo/3.png"
import { Button } from "@nextui-org/react"
import { MdDataUsage, MdOutlineChat, MdLogout  } from "react-icons/md"
import { FaEdit, FaChartBar, FaRegMoneyBillAlt, FaCog   } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Sidebar = ({isExpanded}) => {
    if (isExpanded) {
        return <div className="w-[270px]">
            <div className="w-full flex justify-center p-4 mb-7">
                <img src={Logo} className="h-10"></img>
            </div>
            <Link to="/chatbot-training">
                <Button className="flex w-full bg-white px-5 h-14 relative" radius="none">
                    <div className="absolute left-0 w-1 h-full bg-coolchat z-10 rounded-r-lg"></div>
                    <div className="flex w-full h-full justify-start items-center !rounded-md p-4 bg-coolchat text-white">
                        <MdDataUsage size={20}/>
                        <div className="ml-4 flex items-center font-semibold">Đào tạo chatbot</div>
                    </div>
                </Button>
            </Link>
            <Link to="/chatbot-editting">
                <Button className="flex w-full bg-white px-5 h-14">
                    <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                        <FaEdit size={20}/>
                        <div className="ml-4 flex items-center font-semibold">Tùy chỉnh chatbot</div>
                    </div>
                </Button>
            </Link>
            <Link to="/chat">
                <Button className="flex w-full bg-white px-5 h-14">
                    <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                        <MdOutlineChat size={20}/>
                        <div className="ml-4 flex items-center font-semibold">Hội thoại</div>
                    </div>
                </Button>
            </Link>
            <Link to="/report">
                <Button className="flex w-full bg-white px-5 h-14">
                    <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                        <FaChartBar size={20}/>
                        <div className="ml-4 flex items-center font-semibold">Báo cáo</div>
                    </div>
                </Button>
            </Link>
            <Link to="/subscription">
                <Button className="flex w-full bg-white px-5 h-14">
                    <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                        <FaRegMoneyBillAlt size={20}/>
                        <div className="ml-4 flex items-center font-semibold">Thanh toán</div>
                    </div>
                </Button>
            </Link>
            <hr className="w-full my-4"></hr>
            <Link to="/setting">
                <Button className="flex w-full bg-white px-5 h-14">
                    <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                        <FaCog size={20}/>
                        <div className="ml-4 flex items-center font-semibold">Cài đặt</div>
                    </div>
                </Button>
            </Link>
            <Button className="flex w-full bg-white px-5 h-14">
                <div className="flex w-full h-full justify-start items-center !rounded-md p-4">
                    <MdLogout size={20}/>
                    <div className="ml-4 flex items-center font-semibold">Đăng xuất</div>
                </div>
            </Button>
        </div>
    }
    else {
        return <div className="w-[60px]">
            <div className="w-full flex justify-center py-4 mb-7">
                <img src={LogoOnly} className="h-10"></img>
            </div>
            <Link to="/chatbot-training">
                <Button className="w-full !min-w-0 bg-white h-14 px-2" radius="none">
                    <div className="flex w-full h-full justify-center items-center !rounded-md bg-coolchat text-white">
                        <MdDataUsage size={20}/>
                    </div>
                </Button>
            </Link>
            <Link to="/chatbot-editting">
                <Button className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md">
                        <FaEdit size={20}/>
                    </div>
                </Button>
            </Link>
            <Link to="/chat">
                <Button className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md">
                        <MdOutlineChat size={20}/>
                    </div>
                </Button>
            </Link>
            <Link to="/report">
                <Button className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md">
                        <FaChartBar size={20}/>
                    </div>
                </Button>
            </Link>
            <Link to="/subscription">
                <Button className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md">
                        <FaRegMoneyBillAlt size={20}/>
                    </div>
                </Button>
            </Link>
            <hr className="w-full my-4"></hr>
            <Link to="/setting">
                <Button className="w-full !min-w-0 bg-white h-14 px-2">
                    <div className="flex w-full h-full justify-center items-center !rounded-md">
                        <FaCog size={20}/>
                    </div>
                </Button>
            </Link>
            <Button className="w-full !min-w-0 bg-white h-14 px-2">
                <div className="flex w-full h-full justify-center items-center !rounded-md">
                    <MdLogout size={20}/>
                </div>
            </Button>
        </div>
    }
    
}