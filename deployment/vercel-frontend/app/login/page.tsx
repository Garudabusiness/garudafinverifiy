'use client';
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ identifier?: string; password?: string }>({});

  function validateForm(identifier: string, password: string): boolean {
    const errors: { identifier?: string; password?: string } = {};

    // Validate identifier (email or phone)
    if (!identifier.trim()) {
      errors.identifier = "Email or phone number is required";
    } else {
      const isEmail = identifier.includes("@");
      const isPhone = /^[0-9]{10}$/.test(identifier.trim());
      if (!isEmail && !isPhone) {
        errors.identifier = "Please enter a valid email or 10-digit phone number";
      }
    }

    // Validate password
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function onSubmit(formData: FormData) {
    setError(null);
    setFieldErrors({});

    const identifier = String(formData.get("identifier") || "").trim();
    const password = String(formData.get("password") || "");

    // Client-side validation
    if (!validateForm(identifier, password)) {
      return;
    }

    setLoading(true);

    try {
      // Validate API URL is configured
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("API configuration error. Please contact support.");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });

      if (!res.ok) {
        let errorData: any = {};
        try {
          errorData = await res.json();
        } catch {
          // Response is not JSON
        }

        // Handle specific HTTP status codes
        if (res.status === 401) {
          throw new Error("Invalid email/phone or password. Please try again.");
        } else if (res.status === 400) {
          throw new Error(errorData.message || "Invalid input. Please check your details.");
        } else if (res.status >= 500) {
          throw new Error("Server error. Please try again later.");
        }

        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const data = await res.json();

      // Validate response structure
      if (!data.accessToken) {
        throw new Error("Invalid server response. Please try again.");
      }

      // Store token and user info for authenticated requests
      localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      const role = (data.user?.role || "CLIENT").toLowerCase();
      window.location.href = role === "admin" ? "/admin" : role === "field" ? "/field" : "/client";
    } catch (e: unknown) {
      let errorMessage = "An error occurred. Please try again.";

      if (e instanceof TypeError) {
        if (e.message.includes("fetch") || e.message.includes("Failed to fetch")) {
          errorMessage = "Failed to connect to the server. Please check your internet connection and try again.";
        } else if (e.message.includes("signal")) {
          errorMessage = "Request timed out. Please check your connection and try again.";
        } else {
          errorMessage = "Network error. Please check your connection.";
        }
      } else if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === "object" && e !== null && "message" in e) {
        errorMessage = String((e as any).message);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-lighter/20 via-white to-brand-light/10 px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-primary">Welcome Back</h1>
            <p className="text-gray-600 text-sm md:text-base">Sign in to your GarudaVerify account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form
            className="space-y-5 mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              onSubmit(formData);
            }}
          >
            {/* Identifier Field */}
            <div className="space-y-2">
              <label htmlFor="identifier" className="block text-sm font-semibold text-gray-700">
                Email or Phone Number
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                placeholder="Enter your email or phone"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base ${
                  fieldErrors.identifier
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                }`}
                aria-invalid={fieldErrors.identifier ? "true" : "false"}
                aria-describedby={fieldErrors.identifier ? "identifier-error" : undefined}
              />
              {fieldErrors.identifier && (
                <p id="identifier-error" className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {fieldErrors.identifier}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-base ${
                    fieldErrors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20"
                  }`}
                  aria-invalid={fieldErrors.password ? "true" : "false"}
                  aria-describedby={fieldErrors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-brand-primary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p id="password-error" className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-1">
              <Link
                href="/forgot-password"
                className="text-sm text-brand-primary hover:text-brand-dark transition-colors font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3.5 rounded-xl bg-brand-primary text-white font-semibold hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/30 active:scale-[0.98] text-base"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center pt-6 mt-2 border-t border-gray-100">
            <p className="text-sm md:text-base text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-brand-primary hover:text-brand-dark font-semibold transition-colors hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs md:text-sm text-gray-500 mt-8 px-4">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-brand-primary hover:underline font-medium">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-brand-primary hover:underline font-medium">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
