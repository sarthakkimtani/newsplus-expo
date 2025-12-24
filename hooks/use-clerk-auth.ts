import { useSignIn, useSignUp } from "@clerk/clerk-expo";

export const useClerkAuth = () => {
  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();

  const getError = (err: any, fallback: string) =>
    err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || err?.message || fallback;

  const login = async (email: string, password: string) => {
    if (!signInLoaded) return;
    const res = await signIn.create({ identifier: email, password });

    if (res.status !== "complete") throw new Error("Login incomplete");
    await setSignInActive({ session: res.createdSessionId });
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    if (!signUpLoaded) return;
    await signUp.create({ firstName, lastName, emailAddress: email, password });
    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });
  };

  const verifyEmail = async (code: string) => {
    if (!signUpLoaded) return;
    const res = await signUp.attemptEmailAddressVerification({ code });
    if (res.status !== "complete") throw new Error("Verification incomplete");
    await setSignUpActive({ session: res.createdSessionId });
  };

  return { login, signup, verifyEmail, getError };
};
