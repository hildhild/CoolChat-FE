import {
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
import { DashboardLayout } from "../../../layouts";
import { FaTrash, FaInfoCircle } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { MdOutlineGroups } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import {
  getInvitesApi,
  getMembersApi,
  inviteMemberApi,
  removeMemberApi,
  revokeInviteApi,
} from "../../../services/orgApi";
import { toast } from "react-toastify";
import {
  ConfirmModal,
  LoadingProcess,
  TableBottom,
  ToggleSection,
} from "../../../components";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "../../../constants/patterns";
import { dateTimeToString } from "../../../utils";
import { OrganizationInfo } from "./OrganizationInfo";

function Organization() {
  const { t } = useTranslation();
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
    control: inviteControl,
    handleSubmit: inviteHandleSubmit,
    formState: { errors: inviteErrors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      role: "",
    },
  });

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
          // toast.error(res.data.detail);
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
        const res = await getInvitesApi(
          invitationPage,
          inviteStatus,
          invitePageSize
        );
        if (res.status === 200) {
          setTotalInvites(res.data.count);
          setInviteOfPage(res.data.results.length);
          setInvitationPages(Math.ceil(res.data.count / invitePageSize));
          return res.data.results;
        } else {
          // toast.error(res.data.detail);
          return [];
        }
      } catch (e) {
        throw new Error("Failed to fetch invitations.");
      }
    },
  });

  const handleDeleteMember = async (id) => {
    setIsLoading(true);
    await removeMemberApi(id).then((res) => {
      if (res.status === 200) {
        toast.success("Xóa thành viên thành công");
        setMemberId(null);
        refetchMember();
        onClose();
      }
      // else {
      //   if (res?.data.non_field_errors) {
      //     toast.error(res?.data.non_field_errors[0]);
      //   }
      // }
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
      }
      // else {
      //   if (res?.data.detail) {
      //     toast.error(res?.data.detail);
      //   }
      // }
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
      if (
        memberList.filter((member) => member.id === cellValue)[0].role !==
        "OWNER"
      ) {
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
      } else {
        return <></>;
      }
    } else if (columnKey === "joined_at") {
      const date = new Date(cellValue);
      return dateTimeToString(date);
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
      return dateTimeToString(date);
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
      }
      // else {
      //   if (res?.data.email) {
      //     toast.error("Email: " + res.data.email[0]);
      //   } else if (res?.data.role) {
      //     toast.error("Vai trò: " + res.data.role[0]);
      //   }
      // }
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
        <ToggleSection title="Thông tin tổ chức" Icon={FaInfoCircle}>
          <OrganizationInfo />
        </ToggleSection>
        <ToggleSection
          title="Thành viên"
          Icon={MdOutlineGroups}
          initIsOpen={false}
        >
          <div className="bg-white px-5 py-8 rounded-xl">
            <Tabs
              variant="underlined"
              aria-label="Tabs variants"
              className="mb-4 w-full"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-coolchat",
              }}
            >
              <Tab key="memberList" title="Thành viên">
                <Table
                  className="w-full overflow-x-scroll md:overflow-auto"
                  removeWrapper
                  aria-label="member"
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
                <TableBottom
                  page={memberPage}
                  setPage={setMemberPage}
                  pageSize={memberPageSize}
                  setPageSize={setMemberPageSize}
                  pageCount={memberOfPage}
                  totalCount={totalMembers}
                  numOfPages={memberPages}
                />
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
                  className="w-full overflow-x-scroll md:overflow-auto"
                  removeWrapper
                  aria-label="invitation"
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
                <TableBottom
                  page={invitationPage}
                  setPage={setInvitationPage}
                  pageSize={invitePageSize}
                  setPageSize={setInvitePageSize}
                  pageCount={inviteOfPage}
                  totalCount={totalInvites}
                  numOfPages={invitationPages}
                />
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
                          <SelectItem key="ADMIN">
                            {t("enterprise_admin")}
                          </SelectItem>
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
                  <Button
                    color="primary"
                    onClick={inviteHandleSubmit(handleInviteMember)}
                  >
                    MỜI
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </div>
        </ToggleSection>
      </div>
    </DashboardLayout>
  );
}

export default Organization;
