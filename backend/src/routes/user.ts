import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signinSchema, signupSchema } from "@kushalsinghnareda/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const validationResult = signupSchema.safeParse(body);
  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors.map(
      (err) => err.message
    );
    c.status(411);
    return c.json({ errors: errorMessages });
  }
  //zod validation
  // password hashing
  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (err) {
    c.status(411);
    return c.text("Invalid");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const validationResult = signinSchema.safeParse(body);
  if (!validationResult.success) {
    const errorMessages = validationResult.error.errors.map(
      (err) => err.message
    );
    c.status(400);
    return c.json({ errors: errorMessages });
  }
  //zod validation
  // password hashing
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403); //unauthorize
      return c.json({
        message: "Incorrect Credentials",
      });
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (err) {
    c.status(411);
    return c.text("Invalid");
  }
});
