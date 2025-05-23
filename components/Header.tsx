"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/Auth";
import { useRouter } from "next/navigation"; // ← pridaj toto

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter(); // ← inicializuj router

  const handleLogout = () => {
    logout();              // najprv odhlás používateľa
    router.push("/");      // potom ho presmeruj na hlavnú stránku
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow">
      <Link href="/">
        <Image
          src="/gym.webp"
          alt="Logo"
          width={200}
          height={80}
          className="cursor-pointer m-[20px]"
        />
      </Link>

      <div className="grid grid-cols-3 auto-cols-auto items-center mr-[50px] gap-4">
        {!user ? (
          <>
            <Link href="/login" className="text-[#ff4100] font-[600] no-underline hover:no-underline">
              Login
            </Link>

            <div></div>

            <Link href="/register" className="text-[#ff4100] font-[600] no-underline hover:no-underline">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-[#ff4100] font-[600]">{user}</span>
            <div></div>
            <button
              onClick={handleLogout}
              className="text-[#ff4100] font-[600] cursor-pointer bg-transparent border-none p-0 hover:underline"
              type="button"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
