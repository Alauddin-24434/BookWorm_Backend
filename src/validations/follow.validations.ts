import { z } from "zod";

const createFollow = z.object({
  follower: z.string("Follower ID is required" ),
  following: z.string("Following ID is required"),
});

export const followValidations = {
    createFollow
}