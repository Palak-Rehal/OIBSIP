export const verificationTemplate = (
  name: string,
  link: string
) => {
  return `
  <div style="font-family:Arial;padding:40px">

      <h2>🍕 Welcome to PizzaHub</h2>

      <p>Hello <b>${name}</b>,</p>

      <p>
      Please verify your email address by clicking
      the button below.
      </p>

      <a
      href="${link}"
      style="
      background:#BD6A3C;
      color:white;
      padding:12px 20px;
      text-decoration:none;
      border-radius:8px;
      display:inline-block;
      "
      >
      Verify Email
      </a>

      <p>
      If you didn't create this account,
      simply ignore this email.
      </p>

  </div>
  `;
};