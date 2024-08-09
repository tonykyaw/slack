import { FC } from "react";

import Typography from "@/components/ui/typography";

type ChatHeaderProp = { title: string; };

const ChatHeader: FC<ChatHeaderProp> = ({ title }) => {
  return (
    <div className="absolute z-20 h-10 top-0 left-0 w-full">
      <div className="h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md">
        <Typography text={`# ${title}`} variant="h4" />
      </div>
    </div>
  );
};

export default ChatHeader;
