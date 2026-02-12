import { supabase } from "@/services/supabaseClient";

type GoogleLoginButtonProps = {
  onError?: (message: string) => void;
  label?: string;
};

export function GoogleLoginButton({
  onError,
  label = "Continue with Google",
}: GoogleLoginButtonProps) {
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error && onError) {
      onError(error.message);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="
        w-full flex items-center justify-center gap-2
        rounded-md border border-zinc-300
        bg-white px-4 py-2.5
        text-sm font-medium text-zinc-900
        transition hover:bg-zinc-50
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800
      "
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.52 1 10.2 1 12s.43 3.48 1.18 4.96l2.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.16-3.16C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l2.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
          fill="#EA4335"
        />
      </svg>
      {label}
    </button>
  );
}
