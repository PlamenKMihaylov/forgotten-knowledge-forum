import { useRegister } from '@/hooks/useRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z
    .object({
        email: z.email(),
        username: z.string().min(4, "Username must be at least 4 characters"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(8, "Passwords must match"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type FormFields = z.infer<typeof schema>;

export default function RegisterForm() {
    const navigate = useNavigate();
    const { register: registerUser, isLoading } = useRegister();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormFields>({ resolver: zodResolver(schema), });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await registerUser({
                email: data.email,
                password: data.password,
                username: data.username
            });

            if (!response.session) {
                navigate("/check-email", { state: { email: data.email } });
            } else {
                navigate("/");
            }
        } catch (error: unknown) {
            setError("root", {
                message: error instanceof Error ? error.message : "Registration failed",
            })
        }
    }

    return (
        <form className="space-y-3"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="on">
            <input {...register("email")} type="text" placeholder="Email" className="
                w-full rounded-md border
                border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                px-3 py-2
                text-sm
                focus:outline-none focus:ring-2
                focus:ring-blue-500
                "/>
            {errors.email &&
                <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">{errors.email.message}</div>
            }
            <input {...register("username")} type="text" placeholder="Username" className="
                w-full rounded-md border
                border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                px-3 py-2
                text-sm
                focus:outline-none focus:ring-2
                focus:ring-blue-500
                "/>
            {errors.username &&
                <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">{errors.username.message}</div>
            }
            <input {...register("password")} type="password" placeholder="Password" className="
                w-full rounded-md border
                border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                px-3 py-2
                text-sm
                focus:outline-none focus:ring-2
                focus:ring-blue-500
                "/>
            {errors.password &&
                <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">{errors.password.message}</div>
            }
            <input {...register("confirmPassword")} type="password" placeholder="Confirm Password" className="
                w-full rounded-md border
                border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-800
                px-3 py-2
                text-sm
                focus:outline-none focus:ring-2
                focus:ring-blue-500
                "/>
            {errors.confirmPassword &&
                <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">{errors.confirmPassword.message}</div>
            }
            <button type="submit" disabled={isLoading} className="
                w-full rounded-md
                bg-blue-600 hover:bg-blue-700
                text-white
                py-2 text-sm font-medium
                transition
                ">
                {isLoading ? "Loading..." : "Register"}
            </button>
            {errors.root &&
                <div className="rounded bg-red-100 text-red-700 p-2 text-sm text-center">{errors.root.message}</div>
            }
        </form>
    );
}