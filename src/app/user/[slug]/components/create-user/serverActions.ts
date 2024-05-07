"use server";

import { Clients, Users, connectDB } from "@/libs/server";
import { UserDTO } from "@/validations";

const createUserAction = async ({ name, clientEmail }: UserDTO) => {
  await connectDB();

  const client = await Clients.findOne({ email: clientEmail });

  if (!client) {
    throw new Error("Client not found");
  }

  const user = await Users.create({ name, clientId: client._id });

  return user._id.toString();
};

export { createUserAction };
