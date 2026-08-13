import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Verify Error:", error);
  } else {
    console.log("SMTP Ready");
  }
});

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Verify your PizzaHub Account 🍕",
    html: `
      <div style="font-family:Arial;padding:40px">
        <h2>Welcome to PizzaHub 🍕</h2>
        <p>Thanks for registering.</p>
        <p>Please verify your email address:</p>

        <a
          href="${verificationUrl}"
          style="
            background:#e63946;
            color:white;
            padding:12px 20px;
            border-radius:8px;
            text-decoration:none;
            display:inline-block;
          "
        >
          Verify Email
        </a>

        <p>If you did not create this account, ignore this email.</p>
      </div>
    `,
  });
};


export const sendResetPasswordEmail = async (
  email: string,
  name: string,
  token: string
) => {
  const resetUrl =
    `${process.env.CLIENT_URL}/reset-password/${token}`;

  console.log("=================================");
  console.log("Sending reset email to:", email);
  console.log("Reset URL:", resetUrl);
  console.log("=================================");

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset your PizzaHub Password",
    html: `
      <div style="font-family:Arial;padding:40px">

        <h2>PizzaHub Password Reset</h2>

        <p>Hello <b>${name}</b>,</p>

        <p>
          Click the button below to reset your password.
        </p>

        <a
          href="${resetUrl}"
          style="
            background:#BD6A3C;
            color:white;
            padding:12px 20px;
            border-radius:8px;
            text-decoration:none;
            display:inline-block;
          "
        >
          Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>

      </div>
    `,
  });
};