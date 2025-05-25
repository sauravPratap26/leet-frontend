import { z } from "zod";
export const createPlaylistSchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(15, "Title could be max 15 characters"),
  description: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(250, "Title could be max 250 characters"),
});

export const editPlaylistDetailsSchema = z.object({
  name: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(15, "Title could be max 15 characters"),
  description: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(250, "Title could be max 250 characters"),
  id: z.string().uuid(),
  userId: z.string().uuid(),
});

export const deletePlaylistSchema = z.object({
  id: z.string().uuid(),
  confirmName: z.string().min(1, "You must confirm the playlist name"),
});