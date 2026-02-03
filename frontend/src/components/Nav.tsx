import { supabase } from "../services/supabaseClient";
import { useUser } from "../hooks/useUser";

export function Nav() {
    const { user } = useUser();

    async function handleLogout() {
        await supabase.auth.signOut();
    }

    return (
        <nav>
            <span>Forgotten Knowledge Forum</span>

            {user && (
                <>
                    <span>{user.email}</span>
                    <button onClick={handleLogout} >Logout</button>
                </>
            )}
        </nav>
    );
}