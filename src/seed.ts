import mongoose from "mongoose";
import config from "./config";
import User from "./modules/user/user.model";
import Country from "./modules/country/country.model";
import VisaService from "./modules/visa-service/visaService.model";
import Client from "./modules/client/client.model";
import Booking from "./modules/booking/booking.model";
import Review from "./modules/review/review.model";
import Account from "./modules/account/account.model";
import CmsContent from "./modules/cms/cms.model";
import bcrypt from "bcrypt";

const seedData = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🌱 Database connected for seeding...");

    // Clear existing data (optional but recommended for clean seed)
    await Promise.all([
      User.deleteMany({}),
      Country.deleteMany({}),
      VisaService.deleteMany({}),
      Client.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      Account.deleteMany({}),
      CmsContent.deleteMany({}),
    ]);
    console.log("🧹 Existing data cleared.");

    const hashedPassword = await bcrypt.hash("123456", config.bcrypt_salt_rounds);

    // 1. Seed Users
    const admin = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    const manager = await User.create({
      name: "Manager User",
      email: "manager@example.com",
      password: hashedPassword,
      role: "manager",
      isActive: true,
    });

    const user = await User.create({
      name: "Regular User",
      email: "user@example.com",
      password: hashedPassword,
      role: "user",
      isActive: true,
    });
    console.log("👤 Users seeded.");

    // 2. Seed Countries
    const countriesData = [
      { name: "India", code: "IN", flag: "🇮🇳" },
      { name: "Thailand", code: "TH", flag: "🇹🇭" },
      { name: "Malaysia", code: "MY", flag: "🇲🇾" },
      { name: "UAE", code: "AE", flag: "🇦🇪" },
      { name: "Singapore", code: "SG", flag: "🇸🇬" },
      { name: "Nepal", code: "NP", flag: "🇳🇵" },
    ];
    const countries = await Country.insertMany(countriesData);
    console.log("🌍 Countries seeded.");

    // 3. Seed Visa Services
    const visaServicesData = [
      {
        title: "Thailand Tourist Visa",
        description: "Standard tourist visa for visiting Thailand for leisure.",
        country: countries[1]._id,
        visaType: "tourist",
        fee: 5000,
        processingTime: "5-7 business days",
        requirements: ["Passport", "Photo", "Bank Statement"],
        category: "standard",
        createdBy: admin._id,
      },
      {
        title: "India Business Visa",
        description: "Visa for business purposes in India.",
        country: countries[0]._id,
        visaType: "business",
        fee: 12000,
        processingTime: "3-5 business days",
        requirements: ["Passport", "Invitation Letter", "Tax Paper"],
        category: "express",
        createdBy: admin._id,
      },
      {
        title: "Malaysia Student Visa",
        description: "Visa for students planning to study in Malaysia.",
        country: countries[2]._id,
        visaType: "student",
        fee: 15000,
        processingTime: "15-20 business days",
        requirements: ["Passport", "Offer Letter", "Health Insurance"],
        category: "standard",
        createdBy: admin._id,
      },
    ];
    const visaServices = await VisaService.insertMany(visaServicesData);
    console.log("🎫 Visa Services seeded.");

    // 4. Seed Clients
    const client = await Client.create({
      name: "John Doe",
      email: "john@example.com",
      phone: "+880123456789",
      passportNumber: "EA1234567",
      passportExpiry: new Date("2030-12-31"),
      dateOfBirth: new Date("1990-01-01"),
      nationality: "Bangladeshi",
      address: "Dhaka, Bangladesh",
      visaType: "tourist",
      country: countries[1]._id,
      status: "processing",
      assignedTo: manager._id,
      createdBy: admin._id,
    });
    console.log("👥 Client seeded.");

    // 5. Seed Bookings
    await Booking.create({
      userId: user._id,
      visaServiceId: visaServices[0]._id,
      fullName: "Regular User",
      email: "user@example.com",
      phone: "+8801711223344",
      passportNumber: "BK9876543",
      travelDate: new Date("2026-08-15"),
      totalFee: 5000,
      status: "pending",
    });
    console.log("📅 Booking seeded.");

    // 6. Seed Accounting
    await Account.insertMany([
      {
        type: "income",
        title: "Thailand Visa Processing Fee",
        amount: 5000,
        category: "Visa Fee",
        date: new Date(),
        createdBy: admin._id,
      },
      {
        type: "expense",
        title: "Office Rent - May",
        amount: 20000,
        category: "Rent",
        date: new Date(),
        createdBy: admin._id,
      },
    ]);
    console.log("💰 Accounting seeded.");

    // 7. Seed CMS
    await CmsContent.insertMany([
      {
        type: "blog",
        title: "How to apply for Thailand Visa in 2026",
        slug: "how-to-apply-thailand-visa-2026",
        content: "<p>Thailand is open for tourists. Here is the step by step guide...</p>",
        excerpt: "Learn how to get your Thailand visa easily.",
        isPublished: true,
        author: admin._id,
      },
      {
        type: "faq",
        title: "What documents are needed for India Visa?",
        slug: "india-visa-documents-faq",
        content: "Passport, 2x2 photo, Bank statement and NID copy.",
        isPublished: true,
        author: admin._id,
      }
    ]);
    console.log("📝 CMS Content seeded.");

    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
