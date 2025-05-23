'use client';

import React, { useState } from 'react';
import CustomInput from '@/components/CustomInput';
import PasswordInput from '@/components/PasswordInput';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+421');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setSuccess('');
      return;
    }

    if (password !== repeatPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    const userData = {
      name,
      surname,
      email,
      username,
      password,
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setSuccess('');
      } else {
        setSuccess('Registration successful!');
        setError('');
        setName('');
        setSurname('');
        setEmail('');
        setUsername('');
        setPassword('');
        setRepeatPassword('');
        router.push('/login');
      }
    } catch (err) {
      setError('Something went wrong.');
      setSuccess('');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen grid grid-cols-[20%_60%_20%]">
        <div></div>
        <div className="flex flex-col items-center">
          <h1 className="text-[#ff4100] text-3xl font-bold mb-10 text-center">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full justify-center max-w-[220px]">
            <CustomInput value={name} handler={(e) => setName(e.target.value)} placeholder="Name" name="name" className="mb-[20px]"/>
            <CustomInput value={surname} handler={(e) => setSurname(e.target.value)} placeholder="Surname" name="surname" className="mb-[20px]"/>
            <CustomInput value={username} handler={(e) => setUsername(e.target.value)} placeholder="Username" name="username" className="mb-[20px]"/>
            <CustomInput value={email} handler={(e) => setEmail(e.target.value)} placeholder="Email" name="email" className="mb-[20px]"/>
            <PasswordInput value={password} handler={(e) => setPassword(e.target.value)} placeholder="Password" name="password" className="mb-[20px]"/>
            <PasswordInput value={repeatPassword} handler={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat Password" name="repeatPassword" className="mb-[20px]"/>

            <button
              type="submit"
              className={clsx(
                "flex justify-center p-[12px] items-center gap-2.5 flex-[1_0_0] rounded-full",
                "bg-[#ff4100] text-[#ffffff] font-[600] border-none outline-none focus:outline-none hover:no-underline cursor-pointer"
              )}
            >
              Register
            </button>

            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && <p className="text-green-600 text-center">{success}</p>}
          </form>
        </div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
}
