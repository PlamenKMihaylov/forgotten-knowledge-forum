import { useState } from "react";
import { supabase } from "@/services/supabaseClient";

type RegisterPayload = {
  email: string;
  password: string;
  username: string;
};

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);

  const register = async ({ email, password, username }: RegisterPayload) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            username: username.toLowerCase().trim(),
            first_name: null,
            last_name: null,
          },
        },
      });

      if (error) throw error;

      return data;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
