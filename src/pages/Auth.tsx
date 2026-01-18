import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { ArrowRight, Loader2, Mail, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getSession, setSession } from "@/lib/auth";

interface AuthProps {
  redirectAfterAuth?: string;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const navigate = useNavigate();
  const [step, setStep] = useState<"choice" | "signIn" | "signUp" | { email: string; mode: "otp" | "password" }>("choice");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOTP = useAction(api.simpleAuth.sendOTP);
  const verifyOTP = useMutation(api.simpleAuthMutations.verifyOTP);
  const signUpWithPassword = useAction(api.passwordAuth.signUpWithPassword);
  const signInWithPassword = useAction(api.passwordAuth.signInWithPassword);

  // Check for existing session on mount
  useEffect(() => {
    const session = getSession();
    if (session) {
      console.log("✅ Existing session found for:", session.userEmail);
      const redirect = redirectAfterAuth || "/dashboard";
      navigate(redirect);
    }
  }, [navigate, redirectAfterAuth]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;

      console.log("📧 Sending OTP to:", email);

      // Send OTP using custom auth system
      const result = await sendOTP({ email });

      if (result.success) {
        console.log("✅ OTP sent successfully");
        setStep({ email, mode: "otp" });
        setIsLoading(false);
      } else {
        throw new Error(result.error || "Failed to send verification code");
      }
    } catch (error) {
      console.error("❌ Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      let result;
      if (step === "signUp") {
        console.log("🔐 Creating account for:", email);
        result = await signUpWithPassword({ email, password });
      } else {
        console.log("🔐 Signing in:", email);
        result = await signInWithPassword({ email, password });
      }

      if (result.success && result.userId) {
        console.log("✅ Authentication successful! User ID:", result.userId);
        setSession(result.userId, email);
        const redirect = redirectAfterAuth || "/dashboard";
        navigate(redirect);
      } else {
        throw new Error(result.error || "Authentication failed");
      }
    } catch (error) {
      console.error("❌ Password auth error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (typeof step === "object") {
        console.log("🔍 Verifying OTP:", otp, "for", step.email);

        // Verify OTP using custom auth system
        const result = await verifyOTP({
          email: step.email,
          code: otp,
        });

        if (result.success) {
          console.log("✅ OTP verified successfully! User ID:", result.userId);

          // Store session
          setSession(result.userId, step.email);

          const redirect = redirectAfterAuth || "/dashboard";
          navigate(redirect);
        }
      }
    } catch (error) {
      console.error("❌ OTP verification error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "The verification code you entered is incorrect."
      );
      setIsLoading(false);
      setOtp("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Auth Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="flex items-center justify-center h-full flex-col">
          <Card className="min-w-[350px] sm:min-w-[400px] pb-0 border glass-card shadow-2xl">
            {step === "choice" ? (
              <>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
                      <Sparkles className="w-8 h-8 text-primary group-hover:animate-pulse" />
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">
                        Neura AI
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
                  <CardDescription className="text-base">
                    Create viral videos with AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={() => setStep("signUp")}
                    className="w-full"
                    size="lg"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setStep("signIn")}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Sign In
                  </Button>
                </CardContent>
                <div className="py-4 px-6 text-xs text-center text-muted-foreground bg-muted/50 border-t rounded-b-lg">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Secured with enterprise-grade encryption</span>
                  </div>
                </div>
              </>
            ) : step === "signIn" || step === "signUp" ? (
              <>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
                      <Sparkles className="w-8 h-8 text-primary group-hover:animate-pulse" />
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text text-transparent">
                        Neura AI
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {step === "signUp" ? "Create Account" : "Welcome Back"}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {step === "signUp"
                      ? "Get started with AI-powered videos"
                      : "Sign in to create viral videos with AI"}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handlePasswordSubmit}>
                  <CardContent className="space-y-4">
                    <div className="relative flex items-center gap-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="relative flex items-center gap-2">
                      <Input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        disabled={isLoading}
                        minLength={8}
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-500">
                        {error}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex-col gap-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {step === "signUp" ? "Creating account..." : "Signing in..."}
                        </>
                      ) : (
                        <>
                          {step === "signUp" ? "Create Account" : "Sign In"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <div className="w-full text-center">
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm"
                        onClick={() => setStep("choice")}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                      <span className="text-muted-foreground mx-2">•</span>
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm"
                        onClick={() => setStep(step === "signUp" ? "signIn" : "signUp")}
                        disabled={isLoading}
                      >
                        {step === "signUp" ? "Already have an account?" : "Need an account?"}
                      </Button>
                    </div>
                  </CardFooter>
                </form>
                <div className="py-4 px-6 text-xs text-center text-muted-foreground bg-muted/50 border-t rounded-b-lg">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Secured with enterprise-grade encryption</span>
                  </div>
                </div>
              </>
            ) : typeof step === "object" && step.mode === "otp" ? (
              <>
                <CardHeader className="text-center mt-4">
                  <CardTitle>Check your email</CardTitle>
                  <CardDescription>
                    We've sent a code to {step.email}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleOtpSubmit}>
                  <CardContent className="pb-4">
                    <div className="flex justify-center">
                      <InputOTP
                        value={otp}
                        onChange={setOtp}
                        maxLength={6}
                        disabled={isLoading}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && otp.length === 6 && !isLoading) {
                            const form = (e.target as HTMLElement).closest("form");
                            if (form) {
                              form.requestSubmit();
                            }
                          }
                        }}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-red-500 text-center">
                        {error}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Didn't receive a code?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => {
                          setStep("signIn");
                          setOtp("");
                          setError(null);
                        }}
                      >
                        Try again
                      </Button>
                    </p>
                  </CardContent>
                  <CardFooter className="flex-col gap-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify code
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setStep("signIn");
                        setOtp("");
                        setError(null);
                      }}
                      disabled={isLoading}
                    >
                      Back
                    </Button>
                  </CardFooter>
                </form>
                <div className="py-4 px-6 text-xs text-center text-muted-foreground bg-muted/50 border-t rounded-b-lg">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>Secured with enterprise-grade encryption</span>
                  </div>
                </div>
              </>
            ) : null}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Auth {...props} />
  );
}
