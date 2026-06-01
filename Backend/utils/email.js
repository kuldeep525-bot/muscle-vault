export const sendPlanAssignedEmail = async ({
  userEmail,
  userName,
  planName,
  duration,
  price,
  startDate,
  endDate,
}) => {
  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "Muscle Vault",
        email: process.env.EMAIL_USER,
      },
      to: [{ email: userEmail, name: userName }],
      subject: `🎉 Your Muscle Vault Membership is Active!`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 20px; border-radius: 10px;">
          
          <div style="background: #dc2626; padding: 20px; border-radius: 8px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 3px;">MUSCLE VAULT</h1>
            <p style="color: white; margin: 5px 0; font-size: 12px;">Membership Activated</p>
          </div>

          <div style="background: #111; padding: 20px; border-radius: 8px; margin-top: 15px;">
            <h2 style="color: #fff;">Welcome, ${userName}! 💪</h2>
            <p style="color: #aaa;">Your membership is activate Now!</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="border-bottom: 1px solid #222;">
                <td style="padding: 10px; color: #666;">Plan Name</td>
                <td style="padding: 10px; font-weight: bold; color: #fff;">${planName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #222;">
                <td style="padding: 10px; color: #666;">Duration</td>
                <td style="padding: 10px; font-weight: bold; color: #fff;">${duration} Month(s)</td>
              </tr>
              <tr style="border-bottom: 1px solid #222;">
                <td style="padding: 10px; color: #666;">Price</td>
                <td style="padding: 10px; font-weight: bold; color: #dc2626;">₹${price}</td>
              </tr>
              <tr style="border-bottom: 1px solid #222;">
                <td style="padding: 10px; color: #666;">Start Date</td>
                <td style="padding: 10px; font-weight: bold; color: #fff;">${startDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #666;">End Date</td>
                <td style="padding: 10px; font-weight: bold; color: #dc2626;">${endDate}</td>
              </tr>
            </table>

            <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #dc2626;">
              <p style="margin: 0; color: #aaa;">
                ⚠️ <strong style="color: #fff;">Reminder:</strong> 
                Don't forgot renew your Membership
                <strong style="color: #dc2626;">${endDate}</strong>
              </p>
            </div>
          </div>

          <p style="text-align: center; color: #444; font-size: 12px; margin-top: 15px;">
            Muscle Vault — Town Nayagaon, Punjab 
          </p>
        </div>
      `,
    }),
  });
};

export const sendExpiryReminderEmail = async ({
  userEmail,
  userName,
  endDate,
  daysLeft,
}) => {
  const subjects = {
    2: `Only 2 Days Left — Renew Your Membership!`,
    1: `Your Membership Will Expire Tomorrow!`,
  };

  const colors = {
    2: "#e67e22",
    1: "#dc2626",
  };

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: {
        name: "Muscle Vault",
        email: process.env.EMAIL_USER,
      },
      to: [{ email: userEmail, name: userName }],
      subject: subjects[daysLeft],
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 20px; border-radius: 10px;">

          <div style="background: ${colors[daysLeft]}; padding: 20px; border-radius: 8px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 3px;">MUSCLE VAULT</h1>
            <p style="color: white; margin: 5px 0; font-size: 12px;">Membership Expiry Reminder</p>
          </div>

          <div style="background: #111; padding: 20px; border-radius: 8px; margin-top: 15px;">
            <h2 style="color: #fff;">Hello, ${userName}! 👋</h2>

            <div style="background: ${colors[daysLeft]}22; padding: 15px; border-radius: 8px; border-left: 4px solid ${colors[daysLeft]}; margin-bottom: 15px;">
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: ${colors[daysLeft]};">
                ${
                  daysLeft === 1
                    ? "🚨 Kal Expire Ho Jayegi!"
                    : `⚠️ Sirf ${daysLeft} Din Bache Hain!`
                }
              </p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #222;">
                <td style="padding: 10px; color: #666;">Member Name</td>
                <td style="padding: 10px; font-weight: bold; color: #fff;">${userName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; color: #666;">Expiry Date</td>
                <td style="padding: 10px; font-weight: bold; color: #dc2626;">${endDate}</td>
              </tr>
            </table>

            <div style="text-align: center; margin-top: 20px;">
              <p style="color: #aaa;">Membership renew karne ke liye gym visit karo:</p>
              <p style="font-weight: bold; color: #dc2626; font-size: 18px;">+91 98765 43210</p>
            </div>
          </div>

          <p style="text-align: center; color: #444; font-size: 12px; margin-top: 15px;">
            Muscle Vault — Model Town, Ludhiana
          </p>
        </div>
      `,
    }),
  });

  console.log(`${daysLeft} din pehle reminder email bheja — ${userName}`);
};
