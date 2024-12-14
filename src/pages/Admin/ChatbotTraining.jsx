import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Switch,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tabs,
  Pagination,
  Chip,
  Textarea,
} from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import {
  FaUserCircle,
  FaBook,
  FaFacebookSquare,
  FaCode,
  FaFile,
  FaEdit,
  FaFileUpload,
  FaTrash,
} from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import {
  MdOutlineAddPhotoAlternate,
  MdLabel,
  MdSearch,
  MdOutlineCancel,
  MdOutlineTextSnippet,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GiNightSleep } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChatbotTraining() {
  const { t } = useTranslation();
  const [isLabel, setIsLabel] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();

  useEffect(()=> {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  const rows = [
    {
      key: "1",
      uploader: "Tony Reichert",
      company: "microsoft",
      type: "document",
      name: "masothue.pdf",
      time: "5:00 12/12/2024",
      category: "uncat",
    },
    {
      key: "2",
      uploader: "Tony Reichert",
      company: "microsoft",
      type: "document",
      name: "masothue.pdf",
      time: "5:00 12/12/2024",
      category: "mp",
    },
    {
      key: "3",
      uploader: "Tony Reichert",
      company: "microsoft",
      type: "document",
      name: "masothue.pdf",
      time: "5:00 12/12/2024",
      category: "np",
    },
    {
      key: "4",
      uploader: "Tony Reichert",
      company: "microsoft",
      type: "document",
      name: "masothue.pdf",
      time: "5:00 12/12/2024",
      category: "np",
    },
    {
      key: "5",
      uploader: "Tony Reichert",
      company: "microsoft",
      type: "document",
      name: "masothue.pdf",
      time: "5:00 12/12/2024",
      category: "npr",
    },
    {
      key: "6",
      uploader: "Tony Reichert",
      company: "microsoft",
      type: "document",
      name: "masothue.pdf",
      time: "5:00 12/12/2024",
      category: "cr",
    },
    {
      key: "7",
      uploader: "Tony Reichert",
      company: "microsoft",
      type: "document",
      name: "masothue.pdf",
      time: "5:00 12/12/2024",
      category: "hp",
    },
    {
      key: "8",
      uploader: "Tony Reichert",
      company: "microsoft",
      type: "document",
      name: "masothue.pdf",
      time: "5:00 12/12/2024",
      category: "hp",
    },
  ];

  const columns = [
    {
      key: "uploader",
      label: "Người tải lên",
    },
    {
      key: "company",
      label: "Công ty",
    },
    {
      key: "type",
      label: "Loại hình",
    },
    {
      key: "name",
      label: "Tên tri thức",
    },
    {
      key: "time",
      label: "Thời gian",
    },
    {
      key: "category",
      label: "Hạng mục",
    },
  ];

  const categoryColor = {
    hp: "danger",
    mp: "secondary",
    np: "success",
    npr: "default",
    cr: "primary",
    uncat: "warning",
  };

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "category") {
      return (
        <Select
          color={categoryColor[cellValue]}
          placeholder="Select an animal"
          defaultSelectedKeys={[cellValue]}
          size="sm"
          className="w-full"
        >
          <SelectItem key="hp">HP</SelectItem>
          <SelectItem key="mp">MP</SelectItem>
          <SelectItem key="np">NP</SelectItem>
          <SelectItem key="npr">NPR</SelectItem>
          <SelectItem key="cr">CR</SelectItem>
          <SelectItem key="uncat">Uncat</SelectItem>
        </Select>
      );
    } else {
      return cellValue;
    }
  };

  return (
    <DashboardLayout page="chatbot-training">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">ĐÀO TẠO CHATBOT</div>
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsLabel(!isLabel);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <MdLabel size={30} />
            <div>Gán nhãn tri thức</div>
          </div>
          {isLabel ? <CiSquareMinus size={20} /> : <CiSquarePlus size={20} />}
        </Button>
        {isLabel && (
          <>
            <div className="bg-white px-5 py-8 rounded-xl mb-8">
              <div className="flex w-full justify-between mb-5">
                <div>
                  <div className="font-semibold text-lg">
                    Tất cả nguồn tri thức
                  </div>
                  <div className="text-sm text-[#16C098]">
                    Cập nhật 1 phút trước, 5 tri thức mới
                  </div>
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <Input
                    isClearable
                    radius="lg"
                    placeholder="Tìm kiếm..."
                    variant="bordered"
                    className="w-72"
                    size="lg"
                    startContent={<MdSearch size={25} />}
                  />
                  <Select
                    variant="bordered"
                    label="Sắp xếp theo"
                    defaultSelectedKeys={["newest"]}
                    size="sm"
                    className="w-[120px]"
                  >
                    <SelectItem key="newest">Mới nhất</SelectItem>
                    <SelectItem key="oldest">Cũ nhất</SelectItem>
                  </Select>
                </div>
              </div>
              <Table
                removeWrapper
                aria-label="chatbot-training"
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={rows}>
                  {(item) => (
                    <TableRow key={item.key}>
                      {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-neutral-500">
                  Hiển thị 1 đến 8 trong 256K dữ liệu
                </div>
                <Pagination showControls total={10} initialPage={1} />
              </div>
            </div>
            <div className="flex gap-5 justify-end mb-5">
              <Button color="primary" onClick={()=> navigate("comparison")}>SO SÁNH CHATBOT</Button>
              <Button color="success">LƯU VÀ ĐÀO TẠO</Button>
            </div>
            <div className="font-semibold text-lg">Chú thích</div>
            <div className="grid grid-cols-2 gap-x-16 gap-y-5 py-5 mb-5">
              <div className="grid grid-cols-12">
                <Chip color="danger" className="col-span-2">
                  HP
                </Chip>
                <div className="text-sm col-span-10">
                  Highest Priority (Ưu tiên cao nhất): Thông tin về sản
                  phẩm/dịch vụ. Bao gồm mô tả chi tiết, thông số kỹ thuật, và
                  tính năng của sản phẩm hoặc dịch vụ.
                </div>
              </div>
              <div className="grid grid-cols-12">
                <Chip color="default" className="col-span-2">
                  NPR
                </Chip>
                <div className="text-sm col-span-10">
                  NPR (News and Press Releases): Cập nhật về công ty, sản phẩm
                  mới, hoặc các sự kiện quan trọng, các đề cập về công ty trên
                  các báo chí điện tử.
                </div>
              </div>
              <div className="grid grid-cols-12">
                <Chip color="secondary" className="col-span-2">
                  MP
                </Chip>
                <div className="text-sm col-span-10">
                  Medium Priority (Ưu tiên trung bình): Gồm user manuals, FAQ,
                  các tài liệu hướng dẫn, giúp trả lời các câu hỏi phổ biến về
                  sản phẩm hoặc dịch vụ của công ty.
                </div>
              </div>
              <div className="grid grid-cols-12">
                <Chip color="primary" className="col-span-2">
                  CR
                </Chip>
                <div className="text-sm col-span-10">
                  Customer Record (Hồ sơ khách hàng): Chứa các lịch sử trao đổi
                  và các trường hợp xử lý trước đây với khách hàng, giúp chatbot
                  cải thiện phản hồi với các tình huống tương tự.
                </div>
              </div>
              <div className="grid grid-cols-12">
                <Chip color="success" className="col-span-2">
                  NP
                </Chip>
                <div className="text-sm col-span-10">
                  Normal Priority (Ưu tiên thông thường): Bao gồm chính sách bảo
                  mật, bảo hành, hoàn trả, và các quy định liên quan của công ty
                  đối với sản phẩm và dịch vụ.
                </div>
              </div>
              <div className="grid grid-cols-12">
                <Chip color="warning" className="col-span-2">
                  Uncat
                </Chip>
                <div className="text-sm col-span-10">
                  Uncategorized (Chưa được phân loại): Các tài liệu chưa được
                  phân thành 1 trong 5 hạng mục trên
                </div>
              </div>
            </div>
          </>
        )}
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsUpdate(!isUpdate);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <FaBook size={30} />
            <div>Cập nhật tri thức</div>
          </div>
          {isUpdate ? <CiSquareMinus size={20} /> : <CiSquarePlus size={20} />}
        </Button>
        {isUpdate && (
          <div className="bg-white px-5 py-8 rounded-xl">
            <Tabs
              size="lg"
              aria-label="integrate"
              className="mb-4"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-white",
              }}
            >
              <Tab
                key="file"
                title={
                  <div className="flex gap-3 items-center px-5">
                    <FaFile size={20} />
                    Tải lên phương tiện
                  </div>
                }
              >
                <div className="mb-5">Thêm tài liệu của bạn ở đây</div>
                <div className="flex flex-col justify-center items-center border-2 border-dashed border-coolchat rounded-2xl p-6 mb-5">
                  <FaFileUpload size={50} className="text-coolchat mb-3" />
                  <div>Kéo thả các tệp để bắt đầu tải lên</div>
                  <div className="flex justify-center items-center py-4">
                    <div className="h-[1px] w-12 bg-slate-200"></div>
                    <div className="mx-3 uppercase">{t("or")}</div>
                    <div className="h-[1px] w-12 bg-slate-200"></div>
                  </div>
                  <Button variant="bordered" color="primary">
                    Chọn từ máy tính
                  </Button>
                </div>
                <div className="text-sm text-neutral-600 mb-5">
                  Chỉ hỗ trợ .pdf, .doc, .docx và .txt
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <div className="mb-4">Các file vừa upload</div>
                    <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center justify-between gap-5">
                        <FaFilePdf className="text-[#F15B48]" size={25} />
                        <div>
                          <div className="text-sm font-semibold">
                            document.pdf
                          </div>
                          <div className="text-sm text-gray-400">5.3MB</div>
                        </div>
                      </div>
                      <MdOutlineCancel className="text-red-500" size={20} />
                    </div>
                    <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center justify-between gap-5">
                        <FaFilePdf className="text-[#F15B48]" size={25} />
                        <div>
                          <div className="text-sm font-semibold">
                            document.pdf
                          </div>
                          <div className="text-sm text-gray-400">5.3MB</div>
                        </div>
                      </div>
                      <MdOutlineCancel className="text-red-500" size={20} />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">Các file hiện có</div>
                    <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center justify-between gap-5">
                        <FaFilePdf className="text-[#F15B48]" size={25} />
                        <div>
                          <div className="text-sm font-semibold">
                            document.pdf
                          </div>
                          <div className="text-sm text-gray-400">5.3MB</div>
                        </div>
                      </div>
                      <MdOutlineCancel className="text-red-500" size={20} />
                    </div>
                    <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center justify-between gap-5">
                        <FaFilePdf className="text-[#F15B48]" size={25} />
                        <div>
                          <div className="text-sm font-semibold">
                            document.pdf
                          </div>
                          <div className="text-sm text-gray-400">5.3MB</div>
                        </div>
                      </div>
                      <MdOutlineCancel className="text-red-500" size={20} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-5 mt-3">
                  <Button color="default">Hủy</Button>
                  <Button color="primary">Lưu</Button>
                </div>
              </Tab>
              <Tab
                key="text"
                title={
                  <div className="flex gap-3 items-center px-5">
                    <FaEdit size={20} />
                    Nhập tri thức
                  </div>
                }
              >
                <div className="mb-5">Nhập hướng dẫn cho AI dưới dạng viết tay</div>
                <Textarea
                  variant="bordered"
                  disableAnimation
                  disableAutosize
                  className="w-full bg-white rounded-xl mb-4"
                  classNames={{
                    input: "resize-y min-h-[120px]",
                  }}
                />
                <div className="mb-3">Các hướng dẫn hiện có (double-tap để đổi tên)</div>
                <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                  <div className="flex items-center justify-between gap-5">
                    <MdOutlineTextSnippet className="text-yellow-500" size={30} />
                    <div>
                      <div className="text-sm font-semibold">
                        note1
                      </div>
                      <div className="text-sm text-gray-400">2590 từ</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit size={20}/>
                    <MdOutlineCancel className="text-red-500" size={20} />
                  </div>
                </div>
                <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                  <div className="flex items-center justify-between gap-5">
                    <MdOutlineTextSnippet className="text-yellow-500" size={30} />
                    <div>
                      <div className="text-sm font-semibold">
                        note2
                      </div>
                      <div className="text-sm text-gray-400">1097 từ</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit size={20}/>
                    <MdOutlineCancel className="text-red-500" size={20} />
                  </div>
                </div>
                <div className="flex justify-end gap-5 mt-5">
                  <Button color="default">Hủy</Button>
                  <Button color="primary">Lưu</Button>
                </div>
              </Tab>
              <Tab
                key="web"
                title={
                  <div className="flex gap-3 items-center px-5">
                    <TbWorld size={20} />
                    Nhập tri thức web
                  </div>
                }
              >
                <div className="mb-5">Nhập các website để AI crawl</div>
                <div className="grid grid-cols-12 gap-4 mb-10">
                  <Input type="text" variant="bordered" placeholder="Nhập đường dẫn đến website"className="col-span-10"/>
                  <Button color="primary" className="col-span-2">Thêm</Button>
                </div>
                <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                  <div className="flex items-center justify-between gap-5">
                    <TbWorld className="text-coolchat" size={30} />
                    <div className="text-sm font-semibold">
                      coolchat.software
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit size={20}/>
                    <FaTrash className="text-red-500" size={20} />
                  </div>
                </div>
                <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                  <div className="flex items-center justify-between gap-5">
                    <TbWorld className="text-coolchat" size={30} />
                    <div className="text-sm font-semibold">
                      coolchat.com
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit size={20}/>
                    <FaTrash className="text-red-500" size={20} />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ChatbotTraining;
