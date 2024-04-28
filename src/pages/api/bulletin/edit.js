import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "PATCH") {
    try {
      const { id, title, description, loginId } = req.body;
      const updatedBulletin = await prisma.bulletin.update({
        where: { id:+id,loginId},
        data: {
          title,
          description,
        },
      });

        res.status(200).json({ bulletin: updatedBulletin, code: true });
    } catch (e) {
      console.error("Error updating bulletin:", e);
      res.status(500).json({ message: "Unauthorized" });
    }
    finally {
        await prisma.$disconnect();
      }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
