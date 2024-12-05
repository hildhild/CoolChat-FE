import { Chip, Input, Pagination, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import { MdOutlineChat, MdOutlineSupportAgent, MdSearch  } from "react-icons/md";

function Chat() {
  return (
    <DashboardLayout page="chat">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh] relative">
        <div className="font-semibold mb-6 text-2xl">HỘI THOẠI</div>
        <Tabs variant="light" aria-label="Tabs variants" classNames={{
          cursor: "bg-coolchat bg-opacity-10",
          tabContent: "group-data-[selected=true]:text-coolchat"
        }}>
          <Tab key="all" title={
            <div className="flex justify-between items-center w-[150px] font-semibold">
              <div className="flex justify-center items-center gap-3">
                <MdOutlineChat size={20}/>
                <div>Tất cả</div>
              </div>
              <div>12</div>
            </div>
          }>
            <div className="bg-white rounded-xl border-[1px] border-gray-200 mb-5 mt-3">
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9">Our Bachelor of Commerce program is ACBSP-accredited.</div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9 flex gap-5">
                  <Chip color="warning">Cần hỗ trợ</Chip>
                  Our Bachelor of Commerce program is ACBSP-accredited.
                </div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9">Our Bachelor of Commerce program is ACBSP-accredited.</div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9 flex gap-5">
                  <Chip color="warning">Cần hỗ trợ</Chip>
                  Our Bachelor of Commerce program is ACBSP-accredited.
                </div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9">Our Bachelor of Commerce program is ACBSP-accredited.</div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9 flex gap-5">
                  <Chip color="warning">Cần hỗ trợ</Chip>
                  Our Bachelor of Commerce program is ACBSP-accredited.
                </div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9">Our Bachelor of Commerce program is ACBSP-accredited.</div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9">Our Bachelor of Commerce program is ACBSP-accredited.</div>
                <div className="col-span-1">8:38 AM</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                Hiển thị
                <Select 
                  variant="bordered"
                  className="w-20 bg-white rounded-2xl"
                  size="sm"
                  defaultSelectedKeys={["8"]}
                >
                  <SelectItem key="8">8</SelectItem>
                  <SelectItem key="16">16</SelectItem>
                </Select>
                hàng
              </div>
              <Pagination showControls total={2} initialPage={1} variant="light" color="default"/>
            </div>
          </Tab>
          <Tab key="support" title={
            <div className="flex justify-between items-center w-[150px] font-semibold">
              <div className="flex justify-center items-center gap-3">
                <MdOutlineSupportAgent size={20}/>
                <div>Cần hỗ trợ</div>
              </div>
              <div>4</div>
            </div>
          }>
            <div className="bg-white rounded-xl border-[1px] border-gray-200 mb-5 mt-3">
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9 flex gap-5">
                  <Chip color="warning">Cần hỗ trợ</Chip>
                  Our Bachelor of Commerce program is ACBSP-accredited.
                </div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9 flex gap-5">
                  <Chip color="warning">Cần hỗ trợ</Chip>
                  Our Bachelor of Commerce program is ACBSP-accredited.
                </div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9 flex gap-5">
                  <Chip color="warning">Cần hỗ trợ</Chip>
                  Our Bachelor of Commerce program is ACBSP-accredited.
                </div>
                <div className="col-span-1">8:38 AM</div>
              </div>
              <div className="w-full grid grid-cols-12 p-5">
                <div className="col-span-2 font-semibold">Jullu Jalal</div>
                <div className="col-span-9 flex gap-5">
                  <Chip color="warning">Cần hỗ trợ</Chip>
                  Our Bachelor of Commerce program is ACBSP-accredited.
                </div>
                <div className="col-span-1">8:38 AM</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                Hiển thị
                <Select 
                  variant="bordered"
                  className="w-20 bg-white rounded-2xl"
                  size="sm"
                  defaultSelectedKeys={["8"]}
                >
                  <SelectItem key="8">8</SelectItem>
                  <SelectItem key="16">16</SelectItem>
                </Select>
                hàng
              </div>
              <Pagination showControls total={1} initialPage={1} variant="light" color="default"/>
            </div>
          </Tab>
        </Tabs>
        <div className="flex gap-4 justify-center items-center absolute right-5 top-[88px]">
          <Input
            isClearable
            radius="lg"
            placeholder="Tìm kiếm..."
            variant="bordered" 
            className="bg-white rounded-2xl w-72"
            startContent={
              <MdSearch/>
            }
          />
          <Select 
            variant="bordered"
            className="w-20 bg-white rounded-2xl"
            placeholder="Lọc"
          >
            <SelectItem key="year">Năm</SelectItem>
            <SelectItem key="month">Tháng</SelectItem>
          </Select>
        </div>
        
      </div>
    </DashboardLayout>
  );
}

export default Chat;
