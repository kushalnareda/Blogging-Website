import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().email().min(1, "Username is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
  name: z.string().optional(),
});

export const signinSchema = z.object({
  username: z.string().email().min(1, "Username is required"),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
});

export const createBlogInput = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string()
})


export const updateBlogInput = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string(),
  id: z.number()
})

export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;