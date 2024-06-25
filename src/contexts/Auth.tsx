import { Session, User, AuthChangeEvent } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import supabase from "../../supabase/supabase";

const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
}>({ session: null, user: null, signOut: () => {} });

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const subscription = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session) => {
        if (event === "SIGNED_OUT") {
          setSession(null);
        
        } else if (session) {
          setSession(session);
          setUser(session.user);
         
        }
      }
    );
    setLoading(false)

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{session:session, user:user, signOut:()=>supabase.auth.signOut() }}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
    return useContext(AuthContext)
}

export default AuthProvider