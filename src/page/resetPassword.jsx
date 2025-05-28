import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Loader2, Lock, Code } from "lucide-react";
import { z } from "zod";
import CodeBackground from "../component/AuthImagePattern";
import "../global.css";
import { useAuthStore } from "../store/useAuthStore";

const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be at most 15 characters")
    .trim(),
});

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useParams();
  const { resetPassword } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async ({ password }) => {
    if (!token) return console.error("Missing token in URL");
    try {
      setIsSubmitting(true);
      await resetPassword(token, password,navigate);
    } catch (error) {
      console.error("Reset Password failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 hover:bg-primary/20 hover:rotate-6 hover:scale-105">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
                Reset Your Password
              </h1>
              <p className="text-slate-400">
                Enter a new password to recover access to your account
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-slate-800/50 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-700 backdrop-blur-sm"
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  {...register("password")}
                  className={`block w-full pl-10 pr-3 py-3 rounded-lg bg-slate-800 border ${
                    errors.password
                      ? "border-red-500/50 focus:ring-red-500 focus:border-red-500"
                      : "border-slate-700 focus:ring-primary focus:border-primary"
                  } shadow-sm placeholder-slate-500 text-slate-200 transition duration-200`}
                  placeholder="Enter new password"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-slate-400">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <CodeBackground
        title="Back to Code"
        subtitle="You've taken the first step. Reset your password and dive back to practice!"
      />
    </div>
  );
};

export default ResetPasswordPage;
