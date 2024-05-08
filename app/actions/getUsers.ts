import Prisma from "@prisma/client";

import getSession from "./getSession";
import Email from "next-auth/providers/email";

const getUsers = async () => {
  const sesssion = await getSession();

  if (!sesssion?.user?.email) {
    return [];
  }

  try {
    const users = await prisma?.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: sesssion.user.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
