import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { useUser } from "../hooks/useUser";
import ThemeToggle from "./ThemeToggle";

export function Nav() {
  const { user } = useUser();
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  const linkBase =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#165dfc]/40";
  const linkInactive =
    "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800";
  const linkActive =
    "text-[#165dfc] bg-[#165dfc]/10 dark:bg-[#165dfc]/15";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Left: brand + primary nav */}
        <div className="flex items-center gap-4">
          <span className="select-none text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Forgotten Knowledge Forum
          </span>

          <div className="hidden items-center gap-1 sm:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
              end
            >
              Home
            </NavLink>

            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Posts
            </NavLink>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          {/* Mobile links */}
          <div className="flex items-center gap-1 sm:hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              Posts
            </NavLink>
          </div>

          <div className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-800" />

          <ThemeToggle />

          {!user ? (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                Register
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
              >
                Profile
              </NavLink>

              <button
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium text-white bg-[#165dfc] hover:bg-[#165dfc]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#165dfc]/40"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
