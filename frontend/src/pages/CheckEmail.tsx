import { Link, useLocation } from "react-router-dom";

export default function CheckEmail() {
    const location = useLocation();
    const email = location.state?.email as string | undefined;
    return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Check your email
            </h1>

            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300 sm:text-base">
              We’ve sent a confirmation link
              {email ? (
                <>
                  {" "}
                  to <span className="font-medium text-zinc-900 dark:text-zinc-100">{email}</span>.
                </>
              ) : (
                "."
              )}{" "}
              Click the link in the email to activate your account and log in.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
            >
              Didn’t receive it? Resend
            </button>

            <Link
              to="/login"
              className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus:ring-offset-zinc-900"
            >
              Back to login
            </Link>
          </div>

          <div className="mt-6 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-300">
            Tip: Check your spam/promotions folder. The link may take a minute to arrive.
          </div>
        </div>
      </div>
    </main>
    );
}