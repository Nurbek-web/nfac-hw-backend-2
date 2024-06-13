import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface ChatPageProps {
  id: string;
}

let socket = null;

export function ChatPage({ id }: ChatPageProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [parterTyping, setPartnerTyping] = useState(false);

  const fetchMessages = async () => {
    const res = await fetch(`http://localhost:5000/api/chats/${id}`);
    const data = await res.json();
    setMessages(data.messages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("connected");
      socket!.emit("JOIN_CHAT", {
        chatId: id,
      });
    });

    socket.on("MESSAGE", (message) => {
      setMessages((current) => [...current, message]);
    });

    socket.on("PARTER_TYPING", () => {
      setPartnerTyping(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);

  useEffect(() => {
    // set partnetTyping false after 3 seconds
    const timeout = setTimeout(() => {
      setPartnerTyping(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [parterTyping]);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">Chat with John</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full" size="icon" variant="ghost">
              <BellIcon className="w-5 h-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full w-10 h-10 bg-blue-500 text-white flex items-center justify-center">
                <UserIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">New message from Sarah</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Hey, did you see the new design update?
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div className="flex items-start gap-4" key={message._id}>
            <div className="rounded-full w-10 h-10 bg-blue-500 text-white flex items-center justify-center">
              <UserIcon className="w-5 h-5" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-w-[80%]">
              <p>{message.text}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {message.createdAt}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center">
        <Input
          className="flex-1 bg-transparent border-none focus:ring-0 dark:text-white"
          placeholder="Type your message..."
        />
        <Button className="ml-4" variant="ghost">
          <SendIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}