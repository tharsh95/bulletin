// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pages/api/users.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const secret = "WB04k9GCdB8LldqsK4reVucgHpQrq2l4ewuL0g5AlLU=";

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const newUser = await prisma.login.findFirst({
        where: {
          email,
        },
      });
      if (!newUser) {
        return res.status(400).json({ message: "Sign Up first", code: false });
      }

      const correct = await bcrypt.compare(password, newUser.password);
      if (correct) {
        const token = sign(
          {
            //   exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
            email: email,
          },
          secret
        );
        const serialised = serialize("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialised);
        const { password,createdDate, ...data } = newUser;
        res.status(200).json({ data, code: true });
      } else {
        res.status(200).json({ message: "Wrong Password", code: false });
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
