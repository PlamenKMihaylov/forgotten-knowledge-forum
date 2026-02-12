import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "@/components/Login/GoogleLoginButton";
import RegisterForm from "./Register1";

export function Register() {
    const [values, setValues] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    });
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("password");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleRegister(e: React.SubmitEvent) {
        e.preventDefault();
        setErrors({});
        setFormError(null);

        const newErrors: Record<string, string> = {};

        if (!values.email) newErrors.email = "Email is required";
        if (!values.username) newErrors.username = "Username is required";
        if (!values.password) newErrors.password = "Password is required";
        if (!values.confirmPassword) newErrors.confirmPassword = "Confirm your password";

        if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                data: {
                    username: values.username.toLowerCase().trim(),
                    first_name: values.firstName || null,
                    last_name: values.lastName || null,
                },
            },
        });

        if (error) {
            if (error.message.includes("duplicate key")) {
                setErrors({ username: "Username already taken" });
            } else {
                setFormError(error.message);
            }
            setLoading(false);
            return;
        }
        if (!data?.user) {
            setFormError("Registration failed");
            setLoading(false);
            return;
        }

        setLoading(false);

        if (!data.session) {
            navigate("/check-email", { state: { email: values.email } });
        } else {
            navigate("/");
        }
    }

    return (
        <>
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
                        Register
                    </h1>

                    <form onSubmit={handleRegister} className="space-y-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={(e) => handleInputChange(e)}
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
                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={values.username}
                            onChange={(e) => handleInputChange(e)}
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
                        {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}


                        <input
                            type={type}
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={(e) => handleInputChange(e)}
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
                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}

                        <div>
                            <input
                                type={type}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={values.confirmPassword}
                                onChange={(e) => handleInputChange(e)}
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
                            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}

                            <button
                                type="button"
                                onClick={() => setType(type === "password" ? "text" : "password")}
                            >
                                {type === "password" ? "Show" : "Hide"}
                            </button>

                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="
                w-full rounded-md
                bg-blue-600 hover:bg-blue-700
                text-white
                py-2 text-sm font-medium
                transition
                "
                        >
                            Register
                        </button>
                        <GoogleLoginButton label="Sign up with Google" onError={(msg) => setFormError(msg)}/>
                    </form>

                    {formError && (
                        <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">
                            {formError}
                        </div>
                    )}
                </div>
            </main>
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
                        Register
                    </h1>
            <RegisterForm />
            </div>
        </>
    );
}
