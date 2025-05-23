"use client";

import { useState } from "react";
import CustomInput from '@/components/CustomInput';
import PasswordInput from '@/components/PasswordInput';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import clsx from 'clsx';
import { useAuth } from '@/components/Auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Login failed");
      } else {
        login(username);
        router.push('/');
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen grid grid-cols-[20%_60%_20%]">
        <div></div>
        <div className="flex flex-col items-center">
          <h1 className="text-[#ff4100] text-3xl font-bold mb-10 text-center">Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full justify-center max-w-[220px]">
            <CustomInput
              value={username}
              handler={(e) => setUsername(e.target.value)}
              placeholder="Username"
              name="username"
              className="mb-[20px]"
            />

            <PasswordInput
              value={password}
              handler={(e) => setPassword(e.target.value)}
              placeholder="Password"
              name="password"
              className="mb-[20px]"
            />

            <button
              type="submit"
              className={clsx(
                "flex justify-center p-[12px] items-center gap-2.5 flex-[1_0_0] p-3 rounded-full",
                "bg-[#ff4100] text-[#ffffff] font-[600] border-none outline-none focus:outline-none focus:ring-0 hover:no-underline cursor-pointer"
              )}
            >
              Login
            </button>

            {message && (
              <p
                className={
                  message.toLowerCase().includes("success")
                    ? "text-green-600 text-center"
                    : "text-red-600 text-center"
                }
              >
                {message}
              </p>
            )}
          </form>
        </div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
}
