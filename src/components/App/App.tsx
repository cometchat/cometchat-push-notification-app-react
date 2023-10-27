/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import {
  CometChatConversationsWithMessages,
  CometChatTheme,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { useEffect, useRef, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatIncomingCall } from "@cometchat/chat-uikit-react";
import { CometChatMessages } from "@cometchat/chat-uikit-react";

import { CometChatCalls } from "@cometchat/calls-sdk-javascript";
import { useQueryParams } from "../../custom-hooks";
import { Login } from "../Login";
import { IsMobileViewContext } from "../../IsMobileViewContext";
import { Signup } from "../Signup";
import { appStyle, loadingModalStyle } from "./style";
import LoadingIconGif from "../../assets/loading_icon.gif";
import CometChatLogo from "../../assets/cometchat_logo.png";
import PowerOff from "../../assets/power-off.png";

import { Button } from "../Button";
import firebaseInitialize from "../../firebase";
import ConversationsWithMessages from "../ConversationsWithMessages";
function App() {
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  let { uid, callType, guid, sessionid, receiverType } = queryParams;
  const [isMobileView, setIsMobileView] = useState(false);
  const [theme, setTheme] = useState(new CometChatTheme({}));

  const [interestingAsyncOpStarted, setInterestingAsyncOpStarted] =
    useState(false);
  const [loggedInUser, setLoggedInUserState] = useState<
    CometChat.User | null | undefined
  >();

  const setLoggedInUser = (props: any) => {
    setLoggedInUserState(props);
    firebaseInitialize(navigate);
  };
  const [chatWithUser, setChatWithUser] = useState<CometChat.User>();
  const [chatWithGroup, setChatWithGroup] = useState<CometChat.Group>();

  const [callObject, setCallObject] = useState<CometChat.Call>();
  const [homeSessionId, setHomeSessionId] = useState<string>();
  // const navigate = useNavigate();
  const myElementRef = useRef(null);
  const refCount = useRef(0);
  // let isCallEnded = false;

  const [isCallAccepted, setIsCallAccepted] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) setIsMobileView(true);
      else setIsMobileView(false);
    }
    window.addEventListener("resize", handleResize);
  }, [setIsMobileView]);

  useEffect(() => {
    if (uid && callType && receiverType) {
      var call: CometChat.Call = new CometChat.Call(
        uid,
        callType,
        receiverType
      );
      if (call) {
        setCallObject(call);
      }
    }

    return () => {
      setCallObject(undefined);
    };
  }, [uid, callType, receiverType]);

  const acceptCall = async (sessionid: any) => {
    await CometChat.acceptCall(sessionid).then(
      async (call: any) => {
        setIsCallAccepted(true);

        setCallObject(undefined);
        console.log(
          "Call @cometchat/chat-sdk-javascriptaccepted successfully:",
          call
        );
        let CurrentSessionId = call.sessionId;
        const authToken: string = loggedInUser?.getAuthToken()!;
        let callToken = await CometChatCalls.generateToken(
          CurrentSessionId,
          authToken
        );
        let isAudioOnly = callType === "audio" || call.type === "audio";
        const callSettings = new CometChatCalls.CallSettingsBuilder()
          .enableDefaultLayout(true)
          .setIsAudioOnlyCall(isAudioOnly)
          .setCallListener(
            new CometChatCalls.OngoingCallListener({
              onUserListUpdated: (userList: any) => {
                console.log("user list:", userList);
              },

              onCallEndButtonPressed: () => {
                CometChatCalls.endSession();
                CometChat.endCall(CurrentSessionId);
                // if (window.location.href !== "/") {
                //   navigate({
                //     pathname: "/",
                //   });
                // }
                setIsCallAccepted(false);
              },
              onCallEnded: () => {
                console.log("Call ended");
                // if (isCallEnded) {
                console.log("clilcked in on");
                CometChatCalls.endSession();
                CometChat.endCall(CurrentSessionId);
                setIsCallAccepted(false);

                // if (window.location.href !== "http://localhost:3000/") {
                //   navigate({
                //     pathname: "/",
                //   });
                // }
              },

              onError: (error: any) => {
                console.log("Error :", error);
              },
              onMediaDeviceListUpdated: (deviceList: any) => {
                console.log("Device List:", deviceList);
              },
              onUserMuted: (event: any) => {
                // This event will work in JS SDK v3.0.2-beta1 & later.
                console.log("Listener => onUserMuted:", {
                  userMuted: event.muted,
                  userMutedBy: event.mutedBy,
                });
              },
              onScreenShareStarted: () => {
                // This event will work in JS SDK v3.0.3 & later.
                console.log("Screen sharing started.");
              },
              onScreenShareStopped: () => {
                // This event will work in JS SDK v3.0.3 & later.
                console.log("Screen sharing stopped.");
              },
              onCallSwitchedToVideo: (event: any) => {
                // This event will work in JS SDK v3.0.8 & later.
                console.log("call switched to video:", {
                  sessionId: event.sessionId,
                  callSwitchInitiatedBy: event.initiator,
                  callSwitchAcceptedBy: event.responder,
                });
              },
              onUserJoined: (user: any) =>
                console.log("event => onUserJoined", user),
              onUserLeft: (user: any) => {
                console.log("event => onUserLeft", user);
              },
            })
          )
          .build();

        const htmlElement = myElementRef.current;
        CometChatCalls.startSession(
          callToken.token,
          callSettings,
          htmlElement!
        );
      },
      (error: any) => {
        console.log("Call acceptance failed with error", error);
      }
    );
  };

  useEffect(() => {
    var listnerID = "UNIQUE_LISTENER_ID";

    CometChat.addCallListener(
      listnerID,
      new CometChat.CallListener({
        onIncomingCallReceived: (call: CometChat.Call) => {
          console.log("Incoming call:", call);
          setHomeSessionId(call.getSessionId());
          // setHomeCallType(call.type);
          setCallObject(call);
        },
        onOutgoingCallAccepted: (call: CometChat.Call) => {
          console.log("Outgoing call accepted:", call);
        },
        onOutgoingCallRejected: (call: CometChat.Call) => {
          console.log("Outgoing call rejected:", call);
        },
        onIncomingCallCancelled: (call: CometChat.Call) => {
          console.log("Incoming call cancelled:", call);
        },
        onCallEndedMessageReceived: (call: CometChat.Call) => {
          console.log("CallEnded Message:", call);
        },
      })
    );

    return () => {
      CometChat.removeCallListener(sessionid);
      CometChatCalls.removeCallEventListener(sessionid);
      refCount.current = 0;
    };
  }, [sessionid]);

  const cancelCall = async (sessionid: string) => {
    setCallObject(undefined);
    console.log("rejected?????????????????????????????????????????");
    let status: string = CometChat.CALL_STATUS.REJECTED;

    CometChat.rejectCall(sessionid, status).then(
      (call: CometChat.Call) => {
        console.log("Call rejected successfully", call);
      },
      (error: CometChat.Call) => {
        console.log("Call rejection failed with error:", error);
      }
    );
  };

  useEffect(() => {
    if (guid && !uid) {
      CometChat.getGroup(guid)
        .then((group: CometChat.Group) => {
          if ("guid" in group) {
            setChatWithGroup(group);
          }
        })
        .catch((error: any) => {
          console.log("group does not exit", error);
        });
    }

    if (uid && !guid) {
      CometChat.getUser(uid)
        .then((user: CometChat.User) => {
          if ("uid" in user) {
            setChatWithUser(user);
          }
        })
        .catch((error: any) => {
          console.log("user does not exit", error);
        });
    }
  }, [guid, uid]);

  useEffect(() => {
    (async () => {
      try {
        setLoggedInUser(await CometChat.getLoggedinUser());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const logout = () => {
    CometChatUIKit.logout()!.then(
      () => {
        //Logout completed successfully
        console.log("Logout completed successfully");
        setLoggedInUser(null);
      },
      (error: any) => {
        //Logout failed with exception
        console.log("Logout failed with exception:", { error });
      }
    );
  };

  function IncrementCountToDeclineCall() {
    refCount.current = refCount.current + 1;
  }
  function getChatsModule() {
    return (
      <>
        {isCallAccepted ? (
          <div
            style={{ height: "100%", width: "100%" }}
            ref={myElementRef}
          ></div>
        ) : (
          <div
            style={{ height: "100%", width: "100%" }}
            id='ELEMENT_ID'
            key='chatPage'
          >
            {chatWithGroup ? (
              <>
                <CometChatMessages group={chatWithGroup} key={guid} />

                {callObject && (
                  <CometChatIncomingCall
                    call={callObject}
                    onAccept={() => acceptCall(sessionid)}
                  />
                )}
              </>
            ) : (
              <>
                {chatWithUser && (
                  <CometChatMessages user={chatWithUser} key={uid} />
                )}
                {callObject && (
                  <CometChatIncomingCall
                    call={callObject}
                    onAccept={() => acceptCall(sessionid)}
                    onDecline={() => {
                      IncrementCountToDeclineCall();

                      if (refCount.current > 2) {
                        cancelCall(sessionid);
                      }
                    }}
                  />
                )}
              </>
            )}
          </div>
        )}
      </>
    );
  }
  function getSignup() {
    return (
      <Signup
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        setInterestingAsyncOpStarted={setInterestingAsyncOpStarted}
      />
    );
  }
  function getLoadingModal() {
    return (
      <div style={loadingModalStyle(interestingAsyncOpStarted)}>
        <div
          style={{
            padding: "16px",
            borderRadius: "8px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "8px",
          }}
        >
          <img
            src={CometChatLogo}
            alt='CometChat logo'
            style={{
              width: "240px",
              height: "240px",
            }}
          />
          <img src={LoadingIconGif} alt='Laoding icon' />
        </div>
      </div>
    );
  }

  function getHome() {
    // navigator.serviceWorker.addEventListener("message", (event) => {
    //   console.log("Received a message from service worker: ", event.data);
    //   if (event.data?.data && event.data?.data?.message) {
    //     let message = JSON.parse(event.data?.data?.message);
    //     // console.log(message);
    //     let senderUid = message.sender;
    //     let receiverType = message.receiverType;
    //     let guid = message.receiver
    //     let finalObj = { senderUid, receiverType, guid };
    //     navigate("/conversationsWithMessages", { state: finalObj });
    //   }
    // });
    return (
      <>
        <div
          className='App'
          style={{ height: "100%", width: "100%" }}
          id='ELEMENT_ID'
          key='homePage'
        >
          {loggedInUser ? (
            <div style={{ height: "97%", width: "100%" }}>
              {isCallAccepted ? (
                <div
                  style={{ height: "100%", width: "100%" }}
                  ref={myElementRef}
                ></div>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <Button
                      iconURL={PowerOff}
                      hoverText='Logout'
                      onClick={logout}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        buttonIconTint: theme.palette.getAccent(),
                        border: "none",
                      }}
                    />
                  </div>

                  <CometChatConversationsWithMessages key='CometChatConversationsWithMessages-homePage' />
                  {callObject && (
                    <CometChatIncomingCall
                      call={callObject}
                      onAccept={() => acceptCall(homeSessionId)}
                    />
                  )}
                </>
              )}
            </div>
          ) : (
            <Login
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
              setInterestingAsyncOpStarted={setInterestingAsyncOpStarted}
            />
          )}
        </div>
      </>
    );
  }
  return (
    <div style={appStyle(theme)}>
      <div
        style={{
          height: "100px",
          width: "800px",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "white",
          }}
        >
          <IsMobileViewContext.Provider value={isMobileView}>
            <Routes>
              <Route path='/'>
                <Route path='/' element={getHome()}></Route>
                <Route path='signup' element={getSignup()} />

                <Route path='chats' element={getChatsModule()} />
                <Route
                  path="conversationsWithMessages"
                  element={<ConversationsWithMessages />}
                />
              </Route>
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </IsMobileViewContext.Provider>

          {getLoadingModal()}
        </div>
      </div>
    </div>
  );
}

export default App;
