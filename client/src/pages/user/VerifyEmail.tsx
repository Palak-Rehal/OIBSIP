import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../..//api/axios";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.get(`/auth/verify-email/${token}`);

                setMessage(res.data.message);

                setTimeout(() => {
                    navigate("/login", {
                        state: {
                            message: "Email verified successfully. Please login."
                        }
                    });
                }, 2500);
            } catch (err: any) {
                setMessage(
                    err.response?.data?.message ||
                    "Verification failed."
                );
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-[400px] text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Email Verification
                </h1>

                <p>{message}</p>
            </div>
        </div>
    );
};

export default VerifyEmail;