import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { resetPassword } from "../../api/authApi";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword(
        token!,
        password
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF9F4] via-[#F8F2EA] to-[#F3ECE5] flex items-center justify-center px-4">

      <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-[#BD6A3C]/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-orange-300/20 blur-3xl" />

      <div className="relative w-full max-w-sm">

        <div className="backdrop-blur-2xl bg-white/55 border border-white/60 rounded-[32px] shadow-2xl p-8">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[#BD6A3C] text-sm font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />

            Back to Login
          </Link>

          <div className="flex justify-center mt-7">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#BD6A3C] to-[#E08B52] flex items-center justify-center shadow-lg">

              <ShieldCheck
                size={30}
                className="text-white"
              />

            </div>

          </div>

          <h1 className="text-3xl font-black text-center text-[#2E2B27] mt-6">
            Reset Password
          </h1>

          <p className="text-center text-sm text-gray-500 mt-2">
            Create a new secure password.
          </p>

          {message && (
            <div className="mt-5 rounded-2xl bg-[#F8F6F3] border border-[#ECE6DB] px-4 py-3 text-center text-sm">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            <div>

              <label className="text-sm font-semibold">
                New Password
              </label>

              <div className="relative mt-2">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="New Password"
                  className="w-full h-12 rounded-2xl border border-white/70 bg-white/70 backdrop-blur-md pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#BD6A3C]"
                />

              </div>

            </div>

            <div>

              <label className="text-sm font-semibold">
                Confirm Password
              </label>

              <div className="relative mt-2">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm Password"
                  className="w-full h-12 rounded-2xl border border-white/70 bg-white/70 backdrop-blur-md pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#BD6A3C]"
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#BD6A3C] to-[#D87C47] text-white font-bold hover:scale-[1.02] transition-all disabled:opacity-60"
            >
              {loading
                ? "Updating..."
                : "Reset Password"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default ResetPassword;