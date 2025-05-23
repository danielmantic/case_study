import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type User = {
  username: string;
  password: string;
};

const USERS_FILE = path.join(process.cwd(), 'users.json');

async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUsers(users: User[]) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
  }

  const users = await getUsers();

  if (users.find((u) => u.username === username)) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
  }

  users.push({ username, password });
  await saveUsers(users);

  return NextResponse.json({ message: 'User registered' });
}