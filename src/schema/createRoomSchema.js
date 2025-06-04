import { z } from "zod";
export const createRoomSchema = () => {
  return z.object({
    name: z
      .string()
      .min(3, "Room name must be at least 3 characters")
      .max(15, "Room name must be atmost 15 characters")
      .trim(),
    description: z
      .string()
      .min(6, "Room description must be at least 6 characters")
      .max(35, "Room description must be atmost 35 characters")
      .trim(),
  });
};
