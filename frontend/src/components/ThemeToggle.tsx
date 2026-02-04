import { useEffect } from "react";

export default function ThemeToggle() {
    function toggler(): void {
        const html = document.documentElement;
        const current = html.dataset.theme ?? "light";
        const next = current === "light" ? "dark" : "light";
        
        html.dataset.theme = next;
        localStorage.setItem("theme", next);
    }

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) {
            document.documentElement.dataset.theme = saved;
        }
    }, []);

    return (
    <button
      onClick={toggler}
      className="rounded-md px-3 py-2 text-sm font-medium transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#165dfc]/40"
    >
      Theme
    </button>    )
}