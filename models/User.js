const db = require("../database/connection");
const bcrypt = require("bcrypt");

class User {
  static async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await db("users").insert({
      name,
      email,
      password: hashedPassword,
    });
    return userId;
  }

  static async findByEmail(email) {
    const [user] = await db("users").where("email", email);
    return user;
  }

  static async findById(userId) {
    const [user] = await db("users").where("user_id", userId);
    return user;
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async getOrCreateWishlist(userId) {
    const [wishlist] = await db("wishlists").where("user_id", userId);
    if (wishlist) return wishlist;

    const [wishlistId] = await db("wishlists").insert({ user_id: userId });
    return { wishlist_id: wishlistId, user_id: userId };
  }
}

module.exports = User;
