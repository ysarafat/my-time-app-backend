import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get admins
const getAdmins = async (query: Record<string, any>) => {
  const admins = await prisma.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: query.search,
          },
        },
      ],
    },
  });
  return admins;
};

export const AdminServices = { getAdmins };
