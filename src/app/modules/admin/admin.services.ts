import { Prisma, PrismaClient } from "@prisma/client";
import { searchableFields } from "./admin.constant";

const prisma = new PrismaClient();

// get admins
const getAdmins = async (
  query: Record<string, any>,
  filteringOptions: Record<string, unknown>
) => {
  const { limit = 20, page = 1 } = filteringOptions;
  const filtering: Prisma.AdminWhereInput[] = [];
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
  const skip = (Number(page) - 1) * Number(limit);

  const whereCondition: Prisma.AdminWhereInput = { AND: filtering };
  const admins = await prisma.admin.findMany({
    where: whereCondition,
    take: Number(limit),
    skip,
    orderBy:
      filteringOptions.sortBy && filteringOptions.sortOrder
        ? {
            [filteringOptions.sortBy as string]:
              filteringOptions.sortOrder as Prisma.SortOrder,
          }
        : {
            createdAt: Prisma.SortOrder.desc,
          },
  });
  const adminsCount = await prisma.admin.count({ where: whereCondition });
  const metadata = {
    page: Number(page),
    limit: Number(limit),
    total: adminsCount,
  };
  return { metadata, admins };
};

export const AdminServices = { getAdmins };
