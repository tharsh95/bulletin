/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
const secret = "WB04k9GCdB8LldqsK4reVucgHpQrq2l4ewuL0g5AlLU=";
const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === "GET") {
    const { cookies } = req;

    const jwt = cookies.token;

    if (!jwt) {
      return res.json({ message: "You are logged out" });
    } else {
      const serialised = serialize("token", null, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialised);

      return res.status(200).json({ message: "Successfuly logged out!" });
    }
  } else if (req.method === "POST") {
    const { jwt } = req.body;
    try {
      verify(jwt, secret);
      return res.send({ message: true });
    } catch (e) {
      return res.json({ message: false });
    }  finally {
      await prisma.$disconnect();
    }
  }
}
