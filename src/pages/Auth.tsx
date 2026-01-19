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

import { ArrowRight, Loader2, Mail, Sparkles, Lock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { setSession } from "@/lib/auth";

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
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Auth Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-xl shadow-2xl shadow-primary/5">
            {step === "choice" ? (
              <>
                <CardHeader className="text-center space-y-4 pb-8">
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 cursor-pointer group p-3 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors" onClick={() => navigate("/")}>
                      <Sparkles className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold tracking-tight">Welcome to Neura AI</CardTitle>
                    <CardDescription className="text-base">
                      The next generation of AI video creation
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => setStep("signUp")}
                    className="w-full h-12 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                    size="lg"
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setStep("signIn")}
                    variant="outline"
                    className="w-full h-12 text-base font-medium hover:bg-primary/5"
                    size="lg"
                  >
                    Sign In
                  </Button>
                </CardContent>
                <div className="py-6 px-6 text-xs text-center text-muted-foreground border-t border-primary/10 mt-4">
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="w-3 h-3 text-primary" />
                    <span>Secured with enterprise-grade encryption</span>
                  </div>
                </div>
              </>
            ) : step === "signIn" || step === "signUp" ? (
              <>
                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
                      <Sparkles className="w-6 h-6 text-primary" />
                      <span className="font-bold text-xl">Neura AI</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                      {step === "signUp" ? "Create Account" : "Welcome Back"}
                    </CardTitle>
                    <CardDescription>
                      {step === "signUp"
                        ? "Enter your details to get started"
                        : "Enter your credentials to continue"}
                    </CardDescription>
                  </div>
                </CardHeader>
                <form onSubmit={handlePasswordSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                        <Input
                          type="email"
                          name="email"
                          placeholder="name@example.com"
                          className="pl-10 h-11 bg-background/50"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="pl-10 h-11 bg-background/50"
                          required
                          disabled={isLoading}
                          minLength={8}
                        />
                      </div>
                    </div>
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-destructive" />
                        {error}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full h-11 shadow-lg shadow-primary/20"
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
                    <div className="flex items-center justify-center gap-2 w-full text-sm">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => setStep("choice")}
                        disabled={isLoading}
                      >
                        Back
                      </Button>
                      <span className="text-muted-foreground/30">|</span>
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-primary hover:text-primary/80"
                        onClick={() => setStep(step === "signUp" ? "signIn" : "signUp")}
                        disabled={isLoading}
                      >
                        {step === "signUp" ? "Already have an account?" : "Need an account?"}
                      </Button>
                    </div>
                  </CardFooter>
                </form>
              </>
            ) : typeof step === "object" && step.mode === "otp" ? (
              <>
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl">Check your email</CardTitle>
                    <CardDescription>
                      We've sent a verification code to <span className="text-foreground font-medium">{step.email}</span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <form onSubmit={handleOtpSubmit}>
                  <CardContent className="space-y-6">
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
                        <InputOTPGroup className="gap-2">
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot 
                              key={index} 
                              index={index} 
                              className="h-12 w-10 sm:w-12 border-primary/20 bg-background/50"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                        {error}
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Didn't receive the code?{" "}
                        <Button
                          variant="link"
                          className="p-0 h-auto text-primary"
                          onClick={() => {
                            setStep("signIn");
                            setOtp("");
                            setError(null);
                          }}
                        >
                          Try again
                        </Button>
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full h-11"
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify Email
                          <CheckCircle2 className="ml-2 h-4 w-4" />
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
                      Back to Sign In
                    </Button>
                  </CardFooter>
                </form>
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