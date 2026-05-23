import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";
import Member from "./src/models/member.model.js";
import Plan from "./src/models/plan.model.js";
import Payment from "./src/models/payment.model.js";

dotenv.config();

const firstNames = [
  "Harpreet",
  "Manpreet",
  "Gurpreet",
  "Rajveer",
  "Simran",
  "Arjun",
  "Priya",
  "Rahul",
  "Neha",
  "Vikram",
  "Pooja",
  "Rohit",
  "Anjali",
  "Suresh",
  "Kavita",
  "Deepak",
  "Sunita",
  "Amit",
  "Rekha",
  "Sanjay",
];

const lastNames = [
  "Singh",
  "Kaur",
  "Sharma",
  "Kumar",
  "Verma",
  "Gupta",
  "Mehta",
  "Patel",
  "Bhatia",
  "Malhotra",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomPhone = () => {
  return `9${Math.floor(Math.random() * 9)}${Math.floor(
    Math.random() * 10000000,
  )
    .toString()
    .padStart(8, "0")}`;
};

const seedDatabase = async () => {
  try {
    // DB connect
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("✅ MongoDB connected");

    // Pehle plans banao
    console.log("📦 Plans bana raha hoon...");
    await Plan.deleteMany({});

    const plans = await Plan.insertMany([
      { name: "STARTER", duration: 1, price: 999, isActive: true },
      { name: "PRO", duration: 3, price: 2499, isActive: true },
      { name: "ELITE", duration: 12, price: 7999, isActive: true },
    ]);
    console.log("✅ 3 Plans bane");

    // 100 users + members banao
    console.log("👥 100 Members bana raha hoon...");

    const statuses = ["active", "nonActive"];
    const paymentStatuses = ["paid", "due", "overdue"];

    for (let i = 1; i <= 100; i++) {
      const firstName = getRandomItem(firstNames);
      const lastName = getRandomItem(lastNames);
      const name = `${firstName} ${lastName}`;
      const email = `member${i}@gmail.com`;
      const phone = getRandomPhone();
      const password = await bcrypt.hash("123456", 10);

      // User banao
      const user = await User.create({
        name,
        email,
        password,
        phone,
        role: "member",
      });

      // Random plan assign karo
      const randomPlan = getRandomItem(plans);
      const randomStatus = getRandomItem(statuses);

      // Start aur end date
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 6));
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + randomPlan.duration);

      // Member banao
      const member = await Member.create({
        userId: user._id,
        planId: randomPlan._id,
        membershipStatus: randomStatus,
        membershipStart: startDate.toLocaleDateString("en-IN"),
        membershipEnd: endDate.toLocaleDateString("en-IN"),
      });

      // Payment record banao
      const randomMonth = getRandomItem(months);
      const randomPaymentStatus = getRandomItem(paymentStatuses);

      await Payment.create({
        memberId: member._id,
        planId: randomPlan._id,
        amount: randomPlan.price,
        month: `${randomMonth} 2026`,
        status: randomPaymentStatus,
        paidAt: randomPaymentStatus === "paid" ? new Date() : null,
      });

      console.log(`✅ Member ${i}/100 — ${name}`);
    }

    console.log("\n🎉 Seed complete!");
    console.log("📊 Summary:");
    console.log(
      `   Users:    ${await User.countDocuments({ role: "member" })}`,
    );
    console.log(`   Members:  ${await Member.countDocuments()}`);
    console.log(`   Payments: ${await Payment.countDocuments()}`);
    console.log(`   Plans:    ${await Plan.countDocuments()}`);
    console.log("\n🔑 Login credentials:");
    console.log("   Email:    member1@gmail.com");
    console.log("   Password: 123456");

    process.exit(0);
  } catch (error) {
    console.log("❌ Error:", error);
    process.exit(1);
  }
};

seedDatabase();
