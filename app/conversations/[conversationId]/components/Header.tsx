"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/UseOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Online😁" : "Offline😔";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        // active bg styling
        className="
  bg-sky-100
  w-full
  flex
  border-b-[1px]
      sm:px-4
      py-3
      lg:px-6
      justify-between
      items-center
      shadow-sm
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            //back button styling
            className="lg:hidden
       block
       text-gray-500
       hover:text-orange-600
       transition
       cursor-pointer"
            href="/conversations"
          >
            <HiChevronLeft size={35} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div
              //active online styling
              className="
            text-medium
            font-bold
            text-red-700
            "
            >
              {statusText}
            </div>
          </div>
        </div>
        {/* three dots styling */}
        <HiEllipsisHorizontal
          size={35}
          onClick={() => setDrawerOpen(true)}
          className="
      text-gray-500
      bg-gray-50
      cursor-pointer
      hover:text-orange-600
      tansition"
        />
      </div>
    </>
  );
};

export default Header;
