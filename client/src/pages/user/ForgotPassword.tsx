import { useState } from "react";
import { Mail, ArrowLeft, Pizza, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await forgotPassword(email);

      setMessage(
        response.data?.message ||
          "Password reset link sent to your email."
      );

      setEmail("");
    } catch (error: any) {
      console.error("FORGOT PASSWORD ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">

      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white rounded-[35px] shadow-2xl overflow-hidden">

        {/* Left */}

        <div className="hidden md:flex bg-[#2E2B27] text-white flex-col items-center justify-center p-12 text-center">

          <div className="w-24 h-24 rounded-full bg-[#BD6A3C] flex items-center justify-center mb-8">
            <Pizza size={50} />
          </div>

          <h1 className="text-4xl font-black">
            Forgot Password?
          </h1>

          <p className="mt-5 text-gray-300 text-lg leading-8">
            Enter your email address and we'll send you a password reset link.
          </p>

        </div>

        {/* Right */}

        <div className="p-10">

          <Link
            to="/login"
            className="flex items-center gap-2 text-[#BD6A3C] font-semibold"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

          <h2 className="text-3xl font-black mt-8 text-[#2E2B27]">
            Reset Password
          </h2>

          <p className="text-gray-500 mt-3">
            Enter the email associated with your account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            <div>

              <label className="text-sm font-semibold">
                Email Address
              </label>

              <div className="mt-2 flex items-center border rounded-2xl px-4">

                <Mail
                  size={20}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full px-4 py-4 outline-none"
                />

              </div>

            </div>

            {/* Success */}

            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl text-sm">
                {message}
              </div>
            )}

            {/* Error */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#BD6A3C] text-white py-4 rounded-full font-bold hover:bg-[#a85731] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >

              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;