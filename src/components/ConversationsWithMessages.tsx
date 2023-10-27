import React, { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatConversationsWithMessages } from "@cometchat/chat-uikit-react";
import { useLocation } from "react-router-dom";
function ConversationsWithMessages() {
  const [user, setUser] = useState<any>();
  const [group, setGroup] = useState<any>();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.receiverType === "user" && state.sender) {
      CometChat.getUser(state.sender).then((user) => {
        console.log({ user });
        setGroup(null)
        setUser(user);
      });
    } else if (state && state.receiverType === "group") {
      CometChat.getGroup(state.receiver).then((group) => {
        setUser(null)
        setGroup(group);
      });
    }
  }, [state]);

  if (user) {
    return <CometChatConversationsWithMessages user={user} />;
  }
  if (group) {
    return <CometChatConversationsWithMessages group={group} />;
  }
  return <CometChatConversationsWithMessages />;
}

export default ConversationsWithMessages;
