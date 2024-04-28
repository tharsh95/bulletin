// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pages/api/users.js

import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    try {
      const bulletinList = await prisma.bulletin.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          login: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      res.status(200).json({ bulletinList });
    } catch (e) {
      console.log(e);
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
