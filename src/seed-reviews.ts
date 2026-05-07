import mongoose from "mongoose";
import config from "./config";
import User from "./modules/user/user.model";
import VisaService from "./modules/visa-service/visaService.model";
import Review from "./modules/review/review.model";

const seedReviews = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("🌱 Connected to DB for seeding reviews...");

    // Find a user and a service to link reviews
    const visaService = await VisaService.findOne();

    if (!visaService) {
      console.log("❌ VisaService not found. Please run main seed first.");
      process.exit(1);
    }

    // Create 5 unique users for reviews
    const userNames = ["John Doe", "Sarah Smith", "Mike Ross", "Harvey Specter", "Donna Paulsen"];
    const users = await Promise.all(userNames.map(async (name, i) => {
      const email = `reviewer${i}@example.com`;
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name,
          email,
          password: "password123", // dummy password
          role: "user",
          isActive: true
        });
      }
      return user;
    }));

    const reviewsData = [
      {
        rating: 5,
        comment: "Excellent service! Got my visa earlier than expected. Highly recommended!",
      },
      {
        rating: 4,
        comment: "Very professional team. They helped me with all the documentation correctly.",
      },
      {
        rating: 5,
        comment: "Smooth experience. The AI assistance for documentation is a game changer!",
      },
      {
        rating: 5,
        comment: "Best visa consultancy in Bangladesh. Very transparent and fast.",
      },
      {
        rating: 4,
        comment: "Great support throughout the process. Will definitely use again for my next trip.",
      }
    ];

    const reviews = reviewsData.map((data, i) => ({
      ...data,
      userId: users[i]._id,
      visaServiceId: visaService._id
    }));

    await Review.deleteMany({}); // Clear existing reviews
    await Review.insertMany(reviews);
    
    console.log("✅ 5 Reviews seeded successfully with unique users!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedReviews();
