import {
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Pagination,
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import {
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import {
  MdOutlineGroups,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import {
  editOrgInfoApi,
  getInvitesApi,
  getMembersApi,
  inviteMemberApi,
  removeMemberApi,
  revokeInviteApi,
} from "../../services/orgApi";
import { toast } from "react-toastify";
import { setOrganizationData } from "../../store/slices/OrganizationSlice";
import { setCompanyName } from "../../store/slices/UserSlice";
import { ConfirmModal } from "../../components";
import { useQuery } from "@tanstack/react-query";

function Organization() {
  const { t } = useTranslation();
  const [isOrganizationInfo, setIsOrganizationInfo] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const orgInfo = useSelector((state) => state.organization);
  const [orgInfoData, setOrgInfoData] = useState(orgInfo);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const dispatch = useDispatch();
  const [inviteForm, setInviteForm] = useState({
    email: "",
    role: "",
  });
  const userRole = useSelector((state) => state.user.role);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [memberId, setMemberId] = useState(null);
  const [memberPage, setMemberPage] = useState(1);
  const [totalMembers, setTotalMembers] = useState(0);
  const [memberPages, setMemberPages] = useState(0);
  const [memberOfPage, setMemberOfPage] = useState(0);

  const [invitationId, setInvitationId] = useState(null);
  const [invitationPage, setInvitationPage] = useState(1);
  const [totalInvites, setTotalInvites] = useState(0);
  const [invitationPages, setInvitationPages] = useState(0);
  const [inviteStatus, setInviteStatus] = useState("");
  const [inviteOfPage, setInviteOfPage] = useState(0);


  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    console.log(userRole);
    if (userRole !== "OWNER") {
      navigate("/chatbot-training");
    }
  }, []);

  const { data: memberList, refetch: refetchMember } = useQuery({
    queryKey: ['member', memberPage],
    queryFn: async () => {
        const res = await getMembersApi(memberPage);
        setTotalMembers(res.data.count);
        setMemberOfPage(res.data.results.length);
        setMemberPages(Math.ceil(res.data.count / 50));
        return res.data.results;
    },
  });

  const { data: invitationList, refetch: refetchInvitation } = useQuery({
    queryKey: ['invitation', invitationPage, inviteStatus],
    queryFn: async () => {
        const res = await getInvitesApi(invitationPage, inviteStatus);
        setTotalInvites(res.data.count);
        setInviteOfPage(res.data.results.length);
        setInvitationPages(Math.ceil(res.data.count / 50));
        return res.data.results;
    },
  });

  const handleChangeValue = (e) => {
    const fieldName = e.target.name;
    switch (fieldName) {
      case "name":
        setOrgInfoData({ ...orgInfoData, name: e.target.value });
        break;
      case "contact_email":
        setOrgInfoData({ ...orgInfoData, contact_email: e.target.value });
        break;
      case "contact_phone":
        setOrgInfoData({ ...orgInfoData, contact_phone: e.target.value });
        break;
      case "description":
        setOrgInfoData({ ...orgInfoData, description: e.target.value });
        break;
      case "address":
        setOrgInfoData({ ...orgInfoData, address: e.target.value });
        break;
      default:
        return;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOrgInfoData({ ...orgInfoData, logo: URL.createObjectURL(file) });
    }
  };

  const handleChangeInfo = () => {
    editOrgInfoApi(
      orgInfoData.name,
      orgInfoData.description,
      orgInfoData.contact_email,
      orgInfoData.contact_phone,
      orgInfoData.address
    )
      .then((res) => {
        console.log(123, res);
        if (res.status === 200) {
          dispatch(setOrganizationData(orgInfoData));
          dispatch(setCompanyName(orgInfoData.name));
          toast.success("Thay đổi thông tin thành công.");
          setIsEditInfo(false);
        } else {
          console.log(res);
          if (res.data?.name) {
            toast.error("Tên: " + res.data.name[0]);
          } else if (res.data?.description) {
            toast.error("Mô tả: " + res.data.description[0]);
          } else if (res.data?.contact_email) {
            toast.error("Email liên hệ: " + res.data.contact_email[0]);
          } else if (res.data?.contact_phone) {
            toast.error("Số điện thoại liên hệ: " + res.data.contact_phone[0]);
          } else if (res.data?.address) {
            toast.error("Dịa chỉ: " + res.data.address[0]);
          }
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
  };

  const handleDeleteMember = (id) => {
    removeMemberApi(id).then((res) => {
      console.log(4, res);
      if (res.status === 200) {
        toast.success("Xóa thành viên thành công");
        setMemberId(null);
        refetchMember();
        onClose();
      } else {
        if (res?.data.non_field_errors) {
          toast.error(res?.data.non_field_errors[0]);
        }
      }
    });
  };

  const handleRevokeInvitation = (id) => {
    revokeInviteApi(id).then((res) => {
      console.log(4, res);
      if (res.status === 200) {
        toast.success("Hủy lời mời thành công");
        setInvitationId(null);
        refetchInvitation();
        onClose();
      } else {
        if (res?.data.detail) {
          toast.error(res?.data.detail);
        }
      }
    });
  };

  const memberColumns = [
    {
      key: "user_email",
      label: "Email",
    },
    {
      key: "user_name",
      label: "Họ tên",
    },
    {
      key: "role",
      label: "Vai trò",
    },
    {
      key: "joined_at",
      label: "Thời gian tham gia",
    },
    {
      key: "id",
      label: "Thao tác",
    },
  ];

  const renderMemberCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "id") {
      return (
        <button
          className="text-red-500"
          onClick={() => {
            onOpen();
            setMemberId(cellValue);
          }}
        >
          <FaTrash />
        </button>
      );
    } else if (columnKey === "joined_at") {
      const date = new Date(cellValue);
      return date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
    } else if (columnKey === "role") {
      if (cellValue === "OWNER"){
        return t("enterprise_owner")
      } else if (cellValue === "ADMIN"){
        return t("enterprise_admin")
      } else if (cellValue === "AGENT") {
        return t("csr")
      }
      
    } else {
      return cellValue;
    }
  };

  const invitationColumns = [
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Vai trò",
    },
    {
      key: "created_at",
      label: "Thời gian gửi",
    },
    {
      key: "expires_at",
      label: "Thời gian hết hạn",
    },
    {
      key: "status",
      label: "Trạng thái",
    },
    {
      key: "id",
      label: "Thao tác",
    },
  ];

  const renderInvitationCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "id") {
      if (item["status"] === "active"){
        return (
          <button
            className="text-red-500"
            onClick={() => {
              onOpen();
              setInvitationId(cellValue);
            }}
          >
            <FaXmark />
          </button>
        );
      } else {
        return <></>
      }
      
    } else if (columnKey === "created_at" || columnKey === "expires_at") {
      const date = new Date(cellValue);
      return date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
    } else if (columnKey === "role") {
      if (cellValue === "ADMIN"){
        return t("enterprise_admin")
      } else if (cellValue === "AGENT") {
        return t("csr")
      }
    } else if (columnKey === "status") {
      if (cellValue === "active"){
        return <Chip color="primary" variant="bordered" className="capitalize" size="sm">Đang chờ</Chip>
      } else if (cellValue === "expired"){
        return <Chip color="warning" variant="bordered" className="capitalize" size="sm">Quá hạn</Chip>
      } else if (cellValue === "revoked") {
        return <Chip color="danger" variant="bordered" className="capitalize" size="sm">Đã hủy</Chip>
      } else if (cellValue === "used") {
        return <Chip color="success" variant="bordered" className="capitalize" size="sm">Thành công</Chip>
      }
    } else {
      return cellValue;
    }
  };

  const handleInviteMember = () => {
    inviteMemberApi(inviteForm.email, inviteForm.role).then((res) => {
      if (res.status === 201) {
        toast.success(
          "Mời thành công, lời mời sẽ được gửi đến email của người nhận."
        );
        setInviteForm({
          email: "",
          role: "",
        });
        refetchInvitation();
      } else {
        if (res?.data.email) {
          toast.error("Email: " + res.data.email[0]);
        } else if (res?.data.role) {
          toast.error("Vai trò: " + res.data.role[0]);
        }
      }
    });
  };

  const handleConfirmModal = () => {
    if (memberId) {
      handleDeleteMember(memberId);
    } else if (invitationId) {
      handleRevokeInvitation(invitationId);
    }
  }

  return (
    <DashboardLayout page="organization">
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => {onClose(); setMemberId(null); setInvitationId(null);}}
        onConfirm={handleConfirmModal}
        title={memberId ? "Xóa thành viên" : "Hủy lời mời"}
        description={memberId ? "Bạn có muốn xóa thành viên này không?" : "Bạn có muốn hủy lời mời này không?"}
      />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">TỔ CHỨC</div>
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsOrganizationInfo(!isOrganizationInfo);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <FaInfoCircle size={30} />
            <div>Thông tin tổ chức</div>
          </div>
          {isOrganizationInfo ? (
            <CiSquareMinus size={20} />
          ) : (
            <CiSquarePlus size={20} />
          )}
        </Button>
        {isOrganizationInfo && (
          <div className="bg-white px-5 py-8 rounded-xl mb-8">
            <div className="w-full flex justify-center items-center mb-5">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center text-neutral-600 mb-2">
                  <div className="text-sm">Logo</div>
                  {/* <MdOutlineAddPhotoAlternate /> */}
                </div>
                <Avatar
                  className="w-20 h-20 bg-white"
                  isBordered
                  radius="sm"
                  src={orgInfoData.logo ? orgInfoData.logo : LogoOnly}
                />
                {isEditInfo && (
                  <input
                    id="avatar-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-3"
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-3">
              <div>
                <Input
                  name="name"
                  onChange={handleChangeValue}
                  isDisabled={!isEditInfo}
                  type="text"
                  variant="bordered"
                  label={t("name")}
                  placeholder={t("enter_your_name")}
                  className="mb-5"
                  value={orgInfoData.name}
                />
                <Input
                  name="contact_email"
                  onChange={handleChangeValue}
                  isDisabled={!isEditInfo}
                  type="email"
                  variant="bordered"
                  label={t("contact_email")}
                  placeholder={t("enter_contact_email")}
                  className="mb-5"
                  value={orgInfoData.contact_email}
                />
                <Input
                  name="address"
                  onChange={handleChangeValue}
                  isDisabled={!isEditInfo}
                  type="text"
                  variant="bordered"
                  label={t("address")}
                  placeholder={t("enter_address")}
                  className="mb-5"
                  value={orgInfoData.address}
                />
              </div>
              <div>
                <Input
                  name="description"
                  onChange={handleChangeValue}
                  isDisabled={!isEditInfo}
                  type="text"
                  variant="bordered"
                  label={t("des")}
                  placeholder={t("enter_des")}
                  className="mb-5"
                  value={orgInfoData.description}
                />
                <Input
                  name="contact_phone"
                  onChange={handleChangeValue}
                  isDisabled={!isEditInfo}
                  type="text"
                  variant="bordered"
                  label={t("contact_phone")}
                  placeholder={t("enter_contact_phone")}
                  className="mb-5"
                  value={orgInfoData.contact_phone}
                />
                <Input
                  name="subscription_type"
                  isDisabled
                  type="text"
                  variant="bordered"
                  label="Gói đăng ký"
                  className="mb-5"
                  value={orgInfoData.subscription_type}
                />
              </div>
            </div>
            <div className="flex gap-5 justify-end">
              {isEditInfo ? (
                <>
                  <Button
                    color="danger"
                    onClick={() => {
                      setIsEditInfo(false);
                      setOrgInfoData(orgInfo);
                    }}
                  >
                    HỦY BỎ
                  </Button>
                  <Button color="success" onClick={handleChangeInfo}>
                    LƯU
                  </Button>
                </>
              ) : (
                <Button color="primary" onClick={() => setIsEditInfo(true)}>
                  CHỈNH SỬA
                </Button>
              )}
            </div>
          </div>
        )}
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsMember(!isMember);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <MdOutlineGroups size={30} />
            <div>Thành viên</div>
          </div>
          {isMember ? <CiSquareMinus size={20} /> : <CiSquarePlus size={20} />}
        </Button>
        {isMember && (
          <div className="bg-white px-5 py-8 rounded-xl">
            <Tabs
              variant="underlined"
              aria-label="Tabs variants"
              className="mb-4"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-coolchat",
              }}
            >
              <Tab key="memberList" title="Thành viên">
                <Table
                  removeWrapper
                  aria-label="member"
                  bottomContent={
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-neutral-500">
                        {
                          memberOfPage === 0
                          ?
                          "Không có dữ liệu"
                          :
                          `Hiển thị ${(memberPage-1)*50 + 1} đến ${(memberPage-1)*50 + memberOfPage} trong ${totalMembers} dữ liệu`
                        }
                      </div>
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={memberPage}
                        total={memberPages}
                        onChange={(page) => setMemberPage(page)}
                      />
                    </div>
                  }
                >
                  <TableHeader columns={memberColumns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={memberList ? memberList : []}>
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{renderMemberCell(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="invitationList" title="Lời mời đã gửi">
                <div className="flex justify-end mb-5">
                  <Select
                    variant="bordered"
                    label="Trạng thái"
                    defaultSelectedKeys={[inviteStatus]}
                    size="sm"
                    labelPlacement="outside"
                    className="w-32"
                    onChange={(e) => setInviteStatus(e.target.value)}
                  >
                    <SelectItem key="">Tất cả</SelectItem>
                    <SelectItem key="active">Đang chờ</SelectItem>
                    <SelectItem key="expired">Quá hạn</SelectItem>
                    <SelectItem key="revoked">Đã hủy</SelectItem>
                    <SelectItem key="used">Thành công</SelectItem>
                  </Select>
                </div>
                <Table
                  removeWrapper
                  aria-label="invitation"
                  bottomContent={
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-neutral-500">
                        {
                          inviteOfPage === 0
                          ?
                          "Không có dữ liệu"
                          :
                          `Hiển thị ${(invitationPage-1)*50 + 1} đến ${(invitationPage-1)*50 + inviteOfPage} trong ${totalInvites} dữ liệu`
                        }
                      </div>
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={invitationPage}
                        total={invitationPages}
                        onChange={(page) => setInvitationPage(page)}
                      />
                    </div>
                  }
                >
                  <TableHeader columns={invitationColumns}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={invitationList ? invitationList : []}>
                    {(item) => (
                      <TableRow key={item.key}>
                        {(columnKey) => (
                          <TableCell>{renderInvitationCell(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="inviteMember" title="Mời thêm thành viên">
                <div className="grid grid-cols-2 gap-5 mb-3">
                  <Input
                    name="email"
                    type="email"
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, email: e.target.value })
                    }
                    variant="bordered"
                    label="Email"
                    placeholder="Nhập email"
                    className="mb-5"
                    value={inviteForm.email}
                  />
                  <Select
                    variant="bordered"
                    label={t("role")}
                    className="mb-5"
                    placeholder={t("select_role")}
                    selectedKeys={[inviteForm.role]}
                    onChange={(e) =>
                      setInviteForm({ ...inviteForm, role: e.target.value })
                    }
                  >
                    {/* <SelectItem key="OWNER">{t("enterprise_owner")}</SelectItem> */}
                    <SelectItem key="ADMIN">{t("enterprise_admin")}</SelectItem>
                    <SelectItem key="AGENT">{t("csr")}</SelectItem>
                  </Select>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button color="primary" onClick={handleInviteMember}>
                    MỜI
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Organization;
