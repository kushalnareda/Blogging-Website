"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string().email().min(1, "Username is required"),
    password: zod_1.z.string().min(6, "Password must be atleast 6 characters long"),
    name: zod_1.z.string().optional(),
});
exports.signinSchema = zod_1.z.object({
    username: zod_1.z.string().email().min(1, "Username is required"),
    password: zod_1.z.string().min(6, "Password must be atleast 6 characters long"),
});
exports.createBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string()
});
exports.updateBlogInput = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    content: zod_1.z.string(),
    id: zod_1.z.number()
});
