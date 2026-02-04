import { useState } from "react";
import { supabase } from "../services/supabaseClient";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
  }

  return (

    <main
      className="
        min-h-screen flex items-center justify-center
        bg-zinc-100 dark:bg-zinc-950
        text-zinc-900 dark:text-zinc-100
      "
    >

      <div
        className="
          w-full max-w-sm
          rounded-xl border
          border-zinc-200 dark:border-zinc-800
          bg-white dark:bg-zinc-900
          p-6 space-y-4
        "
      >
        <h1 className="text-2xl font-semibold text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full rounded-md border
              border-zinc-300 dark:border-zinc-700
              bg-white dark:bg-zinc-800
              px-3 py-2
              text-sm
              focus:outline-none focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full rounded-md border
              border-zinc-300 dark:border-zinc-700
              bg-white dark:bg-zinc-800
              px-3 py-2
              text-sm
              focus:outline-none focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            type="submit"
            className="
              w-full rounded-md
              bg-blue-600 hover:bg-blue-700
              text-white
              py-2 text-sm font-medium
              transition
            "
          >
            Login
          </button>
        </form>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
