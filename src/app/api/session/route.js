import { auth } from "@/src/lib/auth";

export default async function handler(req, res) {
  try {
    const session = await auth();
    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch session" });
  }
}
