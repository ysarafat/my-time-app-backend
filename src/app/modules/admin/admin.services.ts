import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get admins
const getAdmins = async (query: Record<string, any>) => {
  const filtering: Prisma.AdminWhereInput[] = [];
  const searchableFields = ["name", "email", "phone"];
  const { search, ...filterBy } = query;
  if (search) {
    filtering.push({
      OR: searchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterBy).length > 0) {
    filtering.push({
      AND: Object.entries(filterBy).map(([key, value]) => {
        console.log(key, value);
        return {
          [key]: {
            equals: value,
          },
        };
      }),
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: filtering };
  const admins = await prisma.admin.findMany({
    where: whereCondition,
  });
  return admins;
};

export const AdminServices = { getAdmins };
