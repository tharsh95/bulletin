import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "GET") {
    try {
        const bulletinId = req.query.id;
      if (!bulletinId) {
        return res.status(400).json({ message: "Bulletin ID is required" });
      }

      const bulletin = await prisma.bulletin.findUnique({
        where: {
          id: parseInt(bulletinId) // Convert the bulletinId to integer if needed
        },
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
        }
      });

      if (!bulletin) {
        return res.status(404).json({ message: "Bulletin not found" });
      }

      res.status(200).json({ bulletin });
    } catch (error) {
      console.error("Error fetching bulletin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
