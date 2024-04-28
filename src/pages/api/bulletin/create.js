// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pages/api/users.js
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}
import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {

const {title,description,id}=req.body

        const bulletin = await prisma.bulletin.create({
          data: {
            loginId: id,
            title,
            description,
          },
        });
        res.status(201).json({ bulletin, code: true });
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
