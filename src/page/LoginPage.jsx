import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { z } from "zod";
import CodeBackground from "../component/AuthImagePattern";
import "../global.css";

const LonginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LonginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("signup data", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("SignUp failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col lg:flex-row">
      {/* Left Side - Form (Mobile: top, Desktop: left) */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md mx-auto">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 hover:bg-primary/20 hover:rotate-6 hover:scale-105">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
                Create Your Account
              </h1>
              <p className="text-slate-400">Join our developer community</p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-700 backdrop-blur-sm"
          >
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg bg-slate-800 border ${
                    errors.email
                      ? "border-red-500/50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-700 focus:ring-primary focus:border-primary"
                  } shadow-sm placeholder-slate-500 text-slate-200 transition duration-200`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`block w-full pl-10 pr-10 py-3 rounded-lg bg-slate-800 border ${
                    errors.password
                      ? "border-red-500/50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-700 focus:ring-primary focus:border-primary"
                  } shadow-sm placeholder-slate-500 text-slate-200 transition duration-200`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-slate-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-500 hover:text-slate-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-500 hover:text-slate-300" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <CodeBackground
        title={"Welcome Back"}
        subtitle={
          "Sign in to continue your journey with us. Don't have an account? Create one now."
        }
      />
    </div>
  );
};

export default LoginPage;
