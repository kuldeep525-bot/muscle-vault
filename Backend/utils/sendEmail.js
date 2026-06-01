export const sendEmail = async ({ to, subject, text }) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "MuscleValut Gym Portal", email: process.env.EMAIL_USER },
      to: [{ email: to }],
      subject,
      textContent: text,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.log("Brevo error:", data);
    throw new Error(data.message || "Email send failed");
  }

  console.log("Email sent successfully:", data);
};
