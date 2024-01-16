import React, { useEffect, useState } from "react";
import ChatBox from "../component/ChatBox";
import { Box } from "@mui/material";
import ChatMessageBox from "../component/ChatMessageBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllMessage } from "../services/auth";
import { setMessageList } from "../redux/messageSlice";
import { startLoading, stopLoading } from "../redux/loaderSlice";

function TempUserChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const messages = useSelector((s) => s.message.list);
  const authUser = useSelector((s) => s.auth.authUser);
  const activeFriend = useSelector((s) => s.user.activeFriend);
  const [list, setList] = useState();

  const fetchAllMessage = async () => {
    try {
      dispatch(startLoading());
      const res = await GetAllMessage({
        uid: authUser?._id,
        fid: activeFriend?._id,
      });
      dispatch(setMessageList(res?.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (authUser?._id && activeFriend?._id) {
      fetchAllMessage();
      setList(
        [...messages]?.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
      );
    }
  }, [authUser, activeFriend]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 140px)",
          overflowY: "auto",
          scrollbarWidth: 0,
        }}
      >
        {list
          ? list.map((data, ind) => (
              <ChatBox
                key={ind}
                data={data}
                auth={authUser}
                friend={activeFriend}
              />
            ))
          : null}
      </Box>
      <ChatMessageBox />
    </>
  );
}

export default TempUserChat;