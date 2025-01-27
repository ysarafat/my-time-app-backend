import { PrismaClient, UserRoles } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
// create admin
const createAdmin = async (payload: any) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashPassword;
  const userData = {
    email: payload.admin.email,
    password: payload.password,
    role: UserRoles.ADMIN,
  };
  //  start transaction
  const result = await prisma.$transaction(async (transaction) => {
    await transaction.user.create({
      data: userData,
    });
    const createdAdmin = await transaction.admin.create({
      data: payload.admin,
    });
    return createdAdmin;
  });
  return result;
};

// get all users
export const UserServices = { createAdmin };
