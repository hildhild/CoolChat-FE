import {
  Autocomplete,
  AutocompleteItem,
  useDisclosure,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
} from "@nextui-org/react";
import { ConfirmModal, LoadingProcess } from "../../../components";
import { useEffect, useState } from "react";
import {
  changeAgentOfChatApi,
  deleteChatApi,
  editIsActiveChatDetailApi,
} from "../../../services/chatApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dateTimeToString } from "../../../utils";
import { useSelector } from "react-redux";
import { getMembersApi } from "../../../services/orgApi";

export const ChatDetailBar = ({ chatDetail, refetch, agentList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user.role);
  const [agentId, setAgentId] = useState(chatDetail.agent?.toString());

  const handleConfirmModal = async () => {
    onClose();
    setIsLoading(true);
    if (action === "finish") {
      //   await editIsActiveChatDetailApi(chatDetail.id, false)
      //     .then((res) => {
      //       console.log(res);
      //       if (res.status === 200) {
      //         toast.success("Thao tác thành công");
      //         handleGetChatDetail();
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    } else if (action === "delete") {
      await deleteChatApi(chatDetail.id)
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            toast.success("Xóa hội thoại thành công");
            navigate("/chat");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (action === "changeAgent") {
      await changeAgentOfChatApi(chatDetail.id, agentId)
        .then((res) => {
          console.log(12, res);
          if (res.status === 200) {
            toast.success("Thay đổi thành công");
            refetch();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(false);
  };

  return (
    <div className="col-span-1 w-full bg-white rounded-2xl px-5 py-10">
      <LoadingProcess isLoading={isLoading} />
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setAction("");
          setAgentId(chatDetail.agent.toString());
        }}
        onConfirm={handleConfirmModal}
        title={
          action === "delete"
            ? "Xóa hội thoại"
            : action === "finish"
            ? "Kết thúc hội thoại"
            : "Thay đổi nhân viên"
        }
        description={
          action === "delete"
            ? "Bạn có muốn xóa hội thoại này không?"
            : action === "finish"
            ? "Bạn có muốn kết thúc hội thoại này không?"
            : "Bạn có chắc chắn muốn thay đổi không?"
        }
      />
      <div className="flex flex-col items-center gap-1 mb-5">
        <div className="text-sm text-neutral-400">Khách hàng</div>
        <div className="text-lg text-coolchat font-semibold">
          {chatDetail?.customer_name ? chatDetail.customer_name : "Không tên"}
        </div>
      </div>
      <Table
        aria-label="Chat detail"
        color="default"
        selectionMode="single"
        removeWrapper
        hideHeader
      >
        <TableHeader>
          <TableColumn align="start">Title</TableColumn>
          <TableColumn align="end">Value</TableColumn>
        </TableHeader>
        <TableBody>
          {chatDetail.customer_email && (
            <TableRow key="1" className="h-12">
              <TableCell>Email</TableCell>
              <TableCell className="font-semibold">
                {chatDetail.customer_email}
              </TableCell>
            </TableRow>
          )}
          {chatDetail.agent && userRole !== "AGENT" && (
            <TableRow key="2" className="h-12">
              <TableCell>Nhân viên hỗ trợ</TableCell>
              <TableCell className="font-semibold">
                <Autocomplete
                  aria-label="select-agent"
                  className="w-36 bg-white rounded-2xl z-50"
                  variant="bordered"
                  size="sm"
                  listboxProps={{
                    emptyContent: "Không có dữ liệu",
                  }}
                  selectedKey={agentId}
                  isClearable={false}
                >
                  {agentList.map((agent) => (
                    <AutocompleteItem
                      key={agent.user_id}
                      onClick={() => {
                        setAgentId(agent.user_id.toString());
                        setAction("changeAgent");
                        onOpen();
                      }}
                    >
                      {agent.user_name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </TableCell>
            </TableRow>
          )}
          <TableRow key="3" className="h-12">
            <TableCell>Thời gian tạo</TableCell>
            <TableCell className="font-semibold">
              {dateTimeToString(new Date(chatDetail.started_at))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex justify-end items-center gap-5 mt-10">
        <Button
          color="danger"
          variant="bordered"
          size="sm"
          onClick={() => {
            setAction("finish");
            onOpen();
          }}
        >
          Kết thúc
        </Button>
        {userRole !== "AGENT" && (
          <Button
            color="danger"
            size="sm"
            onClick={() => {
              setAction("delete");
              onOpen();
            }}
          >
            Xóa
          </Button>
        )}
      </div>
    </div>
  );
};
