import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {
      const { id, loginId } = req.body;
        await prisma.bulletin.delete({
        where: {
          id,
          loginId,
        },
      });
      res.status(200).json({ code: true });
    } catch (e) {
      res.status(500).json({ message: "Unauthorized" });

    }
    finally {
      await prisma.$disconnect();
    }
  }
   else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
