export const resetPasswordTemplate = (
  name: string,
  link: string
) => {
  return `
  <div style="font-family:Arial;padding:40px">

      <h2>Reset Password</h2>

      <p>Hello ${name},</p>

      <p>
      Click below to reset your password.
      </p>

      <a
      href="${link}"
      style="
      background:#BD6A3C;
      color:white;
      padding:12px 20px;
      border-radius:8px;
      text-decoration:none;
      "
      >
      Reset Password
      </a>

      <p>
      This link expires in 15 minutes.
      </p>

  </div>
  `;
};