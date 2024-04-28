
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pages/api/users.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {
      const { name, email, password } = req.body;

      const user = await prisma.login.findFirst({
        where: { email },
      });
      if(user){
        return res.status(201).json({message:"User exists",code:false});

      }
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user in the database
      const newUser = await prisma.login.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({newUser,code:true});
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
 