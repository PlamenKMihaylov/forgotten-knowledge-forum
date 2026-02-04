import { useUser } from "../hooks/useUser";

export function Home() {
    const { user } = useUser();

    return (
        <>
            <main>
                <h1>Home</h1>
                <p>Welcome to my forum app {user?.email}</p>
            </main>
        </>
    )
}