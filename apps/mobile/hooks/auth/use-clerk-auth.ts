import { useSignIn, useSignUp } from "@clerk/clerk-expo";

export const useClerkAuth = () => {
  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();

  const login = async (email: string, password: string) => {
    if (!signInLoaded) return false;
    const res = await signIn.create({ identifier: email, password });

    if (res.status === "needs_second_factor") {
      await signIn.prepareSecondFactor({ strategy: "email_code" });
      return true;
    } else if (res.status === "complete") {
      await setSignInActive({ session: res.createdSessionId });
      return false;
    } else {
      throw new Error("Authentication Failure");
    }
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    if (!signUpLoaded) return;
    await signUp.create({ firstName, lastName, emailAddress: email, password });
    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });
  };

  const verifyEmail = async (code: string, mode: "login" | "signup") => {
    if (!signUpLoaded || !signInLoaded) return;

    if (mode === "login") {
      const res = await signIn.attemptSecondFactor({ strategy: "email_code", code });
      if (res.status === "complete") await setSignInActive({ session: res.createdSessionId });
      else throw new Error("Authentication Failure");
    } else {
      const res = await signUp.attemptEmailAddressVerification({ code });
      if (res.status === "complete") await setSignUpActive({ session: res.createdSessionId });
      else throw new Error("Authentication Failure");
    }
  };

  return { login, signup, verifyEmail };
};
