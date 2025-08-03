import { Admin, Prisma, PrismaClient } from "@prisma/client";
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
  filtering.push({
    isDeleted: false,
  });
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

// get admin by  id
const getAdminByID = async (id: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return admin;
};

// update admin by ID
const updateAdmin = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const updatedData = await prisma.admin.update({
    where: {
      id,
      isDeleted: false,
    },
    data,
  });
  return updatedData;
};

// delete admin
const deleteAdmin = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const deletedData = await prisma.$transaction(async (client) => {
    const deleteAdmin = await client.admin.delete({
      where: {
        id,
      },
    });
    await client.user.delete({
      where: {
        email: deleteAdmin?.email,
      },
    });
    return deleteAdmin;
  });
  return deletedData;
};

// soft delete admin
const softDeleteAdmin = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const updatedData = await prisma.$transaction(async (client) => {
    const updatedAdmin = await client.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await client.user.update({
      where: {
        email: updatedAdmin?.email,
      },
      data: {
        status: "DELETED",
      },
    });
    return updatedAdmin;
  });
  return updatedData;
};

// exports
export const AdminServices = {
  getAdmins,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
