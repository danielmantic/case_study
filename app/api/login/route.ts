import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type User = {
  username: string;
  password: string;
};

const USERS_FILE = path.join(process.cwd(), "users.json");

async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
  }

  const users = await getUsers();

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Tu by si spravil napr. JWT token alebo session, pre demo len odpoved
  return NextResponse.json({ message: "Login successful" });
}
