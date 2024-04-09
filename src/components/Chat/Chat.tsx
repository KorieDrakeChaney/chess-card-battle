"use client";

import { useChessCardBattleStore } from "@/providers/chess-card-battle";
import { api } from "@/trpc/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChatLeft } from "react-icons/bs";
import { SlArrowDown } from "react-icons/sl";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import styles from "./Chat.module.css";
import { parse, Renderer } from "marked";
import { HiOutlineExclamation } from "react-icons/hi";
import Link from "next/link";
import { useFlags } from "flagsmith/react";

const renderer = new Renderer();
renderer.link = (href, _, text) => {
  return `<a href="${href}" target="_blank">${text}</a>`;
};

const Chat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const flags = useFlags(["mindsdb_chat"]);

  const [messages, addMessage, execute, isStarred] = useChessCardBattleStore(
    (state) => [
      state.messages,
      state.addMessage,
      state.execute,
      state.isStarred,
    ],
  );

  const { data } = api.users.getCurrentUser.useQuery();

  const [message, setMessage] = useState("");

  const handleEnter = () => {
    if (message.length > 0) {
      setIsLoading(true);
      addMessage(message);
    }
  };

  useEffect(() => {
    const loadingQuery = async () => {
      if (isLoading) {
        const response = message;
        try {
          const { data }: { data: { data: string } } = await axios.post(
            `/api/message`,
            {
              message: response,
            },
          );

          if (data) {
            addMessage(await parse(data.data, { renderer }));
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      }
    };

    loadingQuery().catch((error) => {
      console.error(error);
    });
  }, [isLoading, message, addMessage]);

  useEffect(() => {
    execute().catch((error) => {
      console.error(error);
    });
  }, [execute]);

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-start justify-end">
      <div
        className="h-[500px] w-[90%] overflow-hidden rounded bg-white shadow-sm transition-all xs:w-[360px] md:w-[480px]"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
          opacity: isOpen ? "100%" : "0%",
          margin: isOpen ? "0.5rem" : "0rem",
        }}
      >
        <div
          className="flex h-full flex-col bg-gray-200"
          style={{
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <div className="flex items-center justify-between border-b  bg-white p-2 shadow-md">
            <div className="text-lg font-bold">Chat</div>
            <div className="flex items-center justify-center">
              <div className="ml-2">
                <BsChatLeft size={25} className="text-blue-dark" />
              </div>
            </div>
          </div>

          {isStarred && flags.mindsdb_chat.enabled ? (
            <div
              className={
                styles.chatbox +
                " flex h-full flex-col gap-2 overflow-y-scroll p-2"
              }
            >
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-start gap-1 ${
                      index % 2 !== 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div className="relative hidden aspect-square h-[40px] w-[40px] overflow-hidden rounded-full sm:inline">
                      <Image
                        src={
                          index % 2 === 0
                            ? data?.image ?? "/avatar.png"
                            : "/logo.png"
                        }
                        alt="avatar"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div
                      className={`${styles.chatMessage} flex w-[75%] flex-col rounded-lg p-2 ${
                        index % 2 === 0
                          ? "bg-green-light text-white"
                          : "bg-blue-dark  text-white"
                      }`}
                      dangerouslySetInnerHTML={{ __html: message }}
                    ></div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-green-light"></div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <HiOutlineExclamation className="text-red-500" size={50} />
              {data ? (
                <>
                  {!flags.mindsdb_chat.enabled ? (
                    <div>Current chat is disabled by the admin</div>
                  ) : (
                    <>
                      <div>
                        Please star the{" "}
                        <Link
                          href={
                            "https://github.com/KorieDrakeChaney/chess-card-battle"
                          }
                          className="font-bold text-pink-dark hover:underline"
                          target="_blank"
                        >
                          repo
                        </Link>{" "}
                        to access the chat
                      </div>
                      <div className="text-[0.85rem] italic text-gray-500">
                        Refresh the page after starring the repo.
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div>
                    Please{" "}
                    <Link
                      href={"/signin"}
                      className="font-bold text-pink-dark hover:underline"
                    >
                      sign in
                    </Link>{" "}
                    to access the chat
                  </div>
                </>
              )}
            </div>
          )}
          <div className={styles.chat + " mb-1 flex items-center px-2"}>
            <input
              type="text"
              value={message}
              size={0}
              placeholder={isStarred ? "Type a message" : "Star the repo"}
              className=" w-[10px] flex-grow rounded-2xl bg-green-light px-2 py-1 text-white outline-none sm:text-[1rem]"
              disabled={isLoading || !isOpen || !isStarred}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setMessage(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEnter();
                }
              }}
            />

            <div className="rounded-full border-2 border-green-light bg-white p-2">
              <FaArrowUp
                size={15}
                className="cursor-pointer text-green-light transition-all"
                onClick={handleEnter}
                style={
                  message.length == 0
                    ? { transform: "rotate(90deg)", opacity: 0.5 }
                    : { transform: "rotate(0deg)", opacity: 1 }
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-auto mb-4 ml-2 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full bg-green-light p-2 shadow-md hover:opacity-80 active:opacity-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <SlArrowDown size={25} className=" text-white" />
        ) : (
          <BsChatLeft size={25} className="text-white" />
        )}
      </div>
    </div>
  );
};

export default Chat;
