"use client";

import { AdminLoginProps } from "@/types";
import { useState } from "react";

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-sm px-8">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
            Whisper Woods
          </h1>
          <p className="text-sm text-neutral-500 mt-1">Admin access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors text-sm"
            />
          </div>
          <div>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
