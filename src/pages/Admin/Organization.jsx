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
import { FaTrash, FaInfoCircle } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { MdOutlineGroups } from "react-icons/md";
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
import { ConfirmModal, LoadingProcess } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "../../constants/patterns";

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
  const userRole = useSelector((state) => state.user.role);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [memberId, setMemberId] = useState(null);
  const [memberPage, setMemberPage] = useState(1);
  const [totalMembers, setTotalMembers] = useState(0);
  const [memberPages, setMemberPages] = useState(0);
  const [memberOfPage, setMemberOfPage] = useState(0);
  const [memberPageSize, setMemberPageSize] = useState(10);

  const [invitationId, setInvitationId] = useState(null);
  const [invitationPage, setInvitationPage] = useState(1);
  const [totalInvites, setTotalInvites] = useState(0);
  const [invitationPages, setInvitationPages] = useState(0);
  const [inviteStatus, setInviteStatus] = useState("");
  const [inviteOfPage, setInviteOfPage] = useState(0);
  const [invitePageSize, setInvitePageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control: editControl,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: orgInfo,
  });

  const {
    control: inviteControl,
    handleSubmit: inviteHandleSubmit,
    formState: { errors: inviteErrors },
    reset
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      role: "",
    },
  });

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    console.log(userRole);
    if (userRole !== "OWNER") {
      navigate("/chatbot-training");
    }
  }, []);

  const {
    data: memberList,
    refetch: refetchMember,
    isLoading: isLoadingMember,
  } = useQuery({
    queryKey: ["member", memberPage, memberPageSize],
    queryFn: async () => {
      try {
        const res = await getMembersApi(memberPage, memberPageSize);
        if (res.status === 200) {
          setTotalMembers(res.data.count);
          setMemberOfPage(res.data.results.length);
          setMemberPages(Math.ceil(res.data.count / memberPageSize));
          return res.data.results;
        } else {
          toast.error(res.data.detail);
          return []; 
        }
      } catch (e) {
        throw new Error("Failed to fetch invitations."); 
      }
      
    },
  });

  const {
    data: invitationList,
    refetch: refetchInvitation,
    isLoading: isLoadingInvite,
  } = useQuery({
    queryKey: ["invitation", invitationPage, inviteStatus, invitePageSize],
    queryFn: async () => {
      try {
        const res = await getInvitesApi(invitationPage, inviteStatus, invitePageSize);
        if (res.status === 200) {
          setTotalInvites(res.data.count);
          setInviteOfPage(res.data.results.length);
          setInvitationPages(Math.ceil(res.data.count / invitePageSize));
          return res.data.results; 
        } else {
          toast.error(res.data.detail);
          return []; 
        }
      } catch (e) {
        throw new Error("Failed to fetch invitations."); 
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOrgInfoData({ ...orgInfoData, logo: URL.createObjectURL(file) });
    }
  };

  const handleChangeInfo = async (data) => {
    setIsLoading(true);
    await editOrgInfoApi(
      data.name,
      data.description,
      data.contact_email,
      data.contact_phone,
      data.address
    )
      .then((res) => {
        console.log(123, res);
        if (res.status === 200) {
          dispatch(setOrganizationData(data));
          dispatch(setCompanyName(data.name));
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
    setIsLoading(false);
  };

  const handleDeleteMember = async (id) => {
    setIsLoading(true);
    await removeMemberApi(id).then((res) => {
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
    setIsLoading(false);
  };

  const handleRevokeInvitation = async (id) => {
    setIsLoading(true);
    await revokeInviteApi(id).then((res) => {
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
    setIsLoading(false);
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
      return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } else if (columnKey === "role") {
      if (cellValue === "OWNER") {
        return t("enterprise_owner");
      } else if (cellValue === "ADMIN") {
        return t("enterprise_admin");
      } else if (cellValue === "AGENT") {
        return t("csr");
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
      if (item["status"] === "active") {
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
        return <></>;
      }
    } else if (columnKey === "created_at" || columnKey === "expires_at") {
      const date = new Date(cellValue);
      return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    } else if (columnKey === "role") {
      if (cellValue === "ADMIN") {
        return t("enterprise_admin");
      } else if (cellValue === "AGENT") {
        return t("csr");
      }
    } else if (columnKey === "status") {
      if (cellValue === "active") {
        return (
          <Chip
            color="primary"
            variant="bordered"
            className="capitalize"
            size="sm"
          >
            Đang chờ
          </Chip>
        );
      } else if (cellValue === "expired") {
        return (
          <Chip
            color="warning"
            variant="bordered"
            className="capitalize"
            size="sm"
          >
            Quá hạn
          </Chip>
        );
      } else if (cellValue === "revoked") {
        return (
          <Chip
            color="danger"
            variant="bordered"
            className="capitalize"
            size="sm"
          >
            Đã hủy
          </Chip>
        );
      } else if (cellValue === "used") {
        return (
          <Chip
            color="success"
            variant="bordered"
            className="capitalize"
            size="sm"
          >
            Thành công
          </Chip>
        );
      }
    } else {
      return cellValue;
    }
  };

  const handleInviteMember = async (data) => {
    setIsLoading(true);
    await inviteMemberApi(data.email, data.role).then((res) => {
      if (res.status === 201) {
        toast.success(
          "Mời thành công, lời mời sẽ được gửi đến email của người nhận."
        );
        reset();
        refetchInvitation();
      } else {
        if (res?.data.email) {
          toast.error("Email: " + res.data.email[0]);
        } else if (res?.data.role) {
          toast.error("Vai trò: " + res.data.role[0]);
        }
      }
    });
    setIsLoading(false);
  };

  const handleConfirmModal = () => {
    if (memberId) {
      handleDeleteMember(memberId);
    } else if (invitationId) {
      handleRevokeInvitation(invitationId);
    }
  };

  return (
    <DashboardLayout page="organization">
      <LoadingProcess
        isLoading={isLoading || isLoadingInvite || isLoadingMember}
      />
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setMemberId(null);
          setInvitationId(null);
        }}
        onConfirm={handleConfirmModal}
        title={memberId ? "Xóa thành viên" : "Hủy lời mời"}
        description={
          memberId
            ? "Bạn có muốn xóa thành viên này không?"
            : "Bạn có muốn hủy lời mời này không?"
        }
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mb-3">
              <div>
                <Controller
                  control={editControl}
                  name="name"
                  rules={{
                    required: t("required"),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      name="name"
                      label={t("org_name")}
                      placeholder={t("enter_org_name")}
                      type="text"
                      variant="bordered"
                      value={value}
                      onChange={onChange}
                      isRequired
                      isDisabled={!isEditInfo}
                    />
                  )}
                />
                {editErrors.name && (
                  <div className="text-red-500 text-xs mt-2">
                    {editErrors.name.message}
                  </div>
                )}
              </div>
              <div>
                <Controller
                  control={editControl}
                  name="description"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      name="description"
                      label={t("des")}
                      placeholder={t("enter_des")}
                      type="text"
                      variant="bordered"
                      value={value}
                      onChange={onChange}
                      isDisabled={!isEditInfo}
                    />
                  )}
                />
                {editErrors.description && (
                  <div className="text-red-500 text-xs mt-2">
                    {editErrors.description.message}
                  </div>
                )}
              </div>
              <div>
                <Controller
                  control={editControl}
                  name="contact_email"
                  rules={{
                    required: t("required"),
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: t("invalid"),
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      name="contact_email"
                      label={t("contact_email")}
                      placeholder={t("enter_contact_email")}
                      type="email"
                      variant="bordered"
                      value={value}
                      onChange={onChange}
                      isRequired
                      isDisabled={!isEditInfo}
                    />
                  )}
                />
                {editErrors.contact_email && (
                  <div className="text-red-500 text-xs mt-2">
                    {editErrors.contact_email.message}
                  </div>
                )}
              </div>
              <div>
                <Controller
                  control={editControl}
                  name="contact_phone"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      name="contact_phone"
                      label={t("contact_phone")}
                      placeholder={t("enter_contact_phone")}
                      type="text"
                      variant="bordered"
                      value={value}
                      onChange={onChange}
                      isDisabled={!isEditInfo}
                    />
                  )}
                />
                {editErrors.contact_phone && (
                  <div className="text-red-500 text-xs mt-2">
                    {editErrors.contact_phone.message}
                  </div>
                )}
              </div>
              <div>
                <Controller
                  control={editControl}
                  name="address"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      name="address"
                      label={t("address")}
                      placeholder={t("enter_address")}
                      type="text"
                      variant="bordered"
                      value={value}
                      onChange={onChange}
                      isDisabled={!isEditInfo}
                    />
                  )}
                />
                {editErrors.address && (
                  <div className="text-red-500 text-xs mt-2">
                    {editErrors.address.message}
                  </div>
                )}
              </div>
              <div>
                <Controller
                  control={editControl}
                  name="subscription_type"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      name="subscription_type"
                      label="Gói đăng ký"
                      type="text"
                      variant="bordered"
                      value={value}
                      onChange={onChange}
                      isDisabled
                    />
                  )}
                />
                {editErrors.subscription_type && (
                  <div className="text-red-500 text-xs mt-2">
                    {editErrors.subscription_type.message}
                  </div>
                )}
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
                  <Button color="success" onClick={editHandleSubmit(handleChangeInfo)}>
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
                      <div className="flex items-center gap-3">
                        <Select
                          variant="bordered"
                          label="Số hàng"
                          defaultSelectedKeys={[memberPageSize.toString()]}
                          size="sm"
                          labelPlacement="outside-left"
                          className="w-24"
                          onChange={(e) => setMemberPageSize(e.target.value)}
                        >
                          <SelectItem key="5">5</SelectItem>
                          <SelectItem key="10">10</SelectItem>
                          <SelectItem key="20">20</SelectItem>
                          <SelectItem key="50">50</SelectItem>
                        </Select>
                        <div className="text-sm text-neutral-500">
                          {memberOfPage === 0
                            ? "Không có dữ liệu"
                            : `Hiển thị ${(memberPage - 1) * memberPageSize + 1} đến ${
                                (memberPage - 1) * memberPageSize + memberOfPage
                              } trong tổng ${totalMembers} dữ liệu`}
                        </div>
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
                          <TableCell>
                            {renderMemberCell(item, columnKey)}
                          </TableCell>
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
                      <div className="flex items-center gap-3">
                        <Select
                          variant="bordered"
                          label="Số hàng"
                          defaultSelectedKeys={[invitePageSize.toString()]}
                          size="sm"
                          labelPlacement="outside-left"
                          className="w-24"
                          onChange={(e) => setInvitePageSize(e.target.value)}
                        >
                          <SelectItem key="5">5</SelectItem>
                          <SelectItem key="10">10</SelectItem>
                          <SelectItem key="20">20</SelectItem>
                          <SelectItem key="50">50</SelectItem>
                        </Select>
                        <div className="text-sm text-neutral-500">
                          {inviteOfPage === 0
                            ? "Không có dữ liệu"
                            : `Hiển thị ${(invitationPage - 1) * invitePageSize + 1} đến ${
                                (invitationPage - 1) * invitePageSize + inviteOfPage
                              } trong tổng ${totalInvites} dữ liệu`}
                        </div>
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
                          <TableCell>
                            {renderInvitationCell(item, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="inviteMember" title="Mời thêm thành viên">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                  <div>
                    <Controller
                      control={inviteControl}
                      name="email"
                      rules={{
                        required: t("required"),
                        pattern: {
                          value: EMAIL_PATTERN,
                          message: t("invalid"),
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          name="email"
                          label="Email"
                          placeholder="Nhập email"
                          type="email"
                          variant="bordered"
                          value={value}
                          onChange={onChange}
                          isRequired
                        />
                      )}
                    />
                    {inviteErrors.email && (
                      <div className="text-red-500 text-xs mt-2">
                        {inviteErrors.email.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Controller
                      control={inviteControl}
                      name="role"
                      rules={{
                        required: t("required"),
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          variant="bordered"
                          label={t("role")}
                          placeholder={t("select_role")}
                          selectedKeys={[value]}
                          onChange={onChange}
                          isRequired
                        >
                          {/* <SelectItem key="OWNER">{t("enterprise_owner")}</SelectItem> */}
                          <SelectItem key="ADMIN">{t("enterprise_admin")}</SelectItem>
                          <SelectItem key="AGENT">{t("csr")}</SelectItem>
                        </Select>
                      )}
                    />
                    {inviteErrors.role && (
                      <div className="text-red-500 text-xs mt-2">
                        {inviteErrors.role.message}
                      </div>
                    )}
                  </div>
                  
                </div>
                <div className="flex gap-5 justify-end">
                  <Button color="primary" onClick={inviteHandleSubmit(handleInviteMember)}>
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
