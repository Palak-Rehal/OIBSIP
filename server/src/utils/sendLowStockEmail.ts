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

export const sendLowStockEmail = async (
  items: any[]
) => {
  const html = `
    <div style="font-family:Arial,sans-serif">
      <h2>⚠ Low Inventory Alert</h2>

      <p>The following inventory items are below their threshold.</p>

      <table
        border="1"
        cellspacing="0"
        cellpadding="8"
        style="border-collapse:collapse"
      >
        <tr>
          <th>Category</th>
          <th>Item</th>
          <th>Stock</th>
          <th>Threshold</th>
        </tr>

        ${items
          .map(
            (item) => `
            <tr>
              <td>${item.category}</td>
              <td>${item.name}</td>
              <td>${item.stock}</td>
              <td>${item.threshold}</td>
            </tr>
          `
          )
          .join("")}

      </table>

      <p>Please restock these items.</p>

      <br/>

      <strong>PizzaHub Inventory System</strong>

    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,

    to: process.env.ADMIN_EMAIL,

    subject: "⚠ PizzaHub Low Inventory Alert",

    html,
  });
};