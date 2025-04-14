const db = require("../database/connection");

class Parfum {
  static async getAll() {
    return await db("parfums").select("*");
  }

  static async getById(parfumId) {
    const [parfum] = await db("parfums").where("parfum_id", parfumId);
    return parfum;
  }

  static async search(keyword) {
    return await db("parfums")
      .where("name", "like", `%${keyword}%`)
      .orWhere("brand", "like", `%${keyword}%`)
      .orWhere("description", "like", `%${keyword}%`)
      .orWhere("notes", "like", `%${keyword}%`);
  }

  static async filterByBrand(brand) {
    return await db("parfums").where("brand", brand);
  }

  static async filterByGender(gender) {
    return await db("parfums").where("gender", gender);
  }

  static async sortByName() {
    return await db("parfums").orderBy("name", "asc");
  }

  static async sortByPrice() {
    return await db("parfums").orderBy("price_range", "asc");
  }

  static async getByNotesAndPrice(notes, priceRange) {
    return await db("parfums")
      .where("notes", "like", `%${notes}%`)
      .andWhere("price_range", priceRange);
  }

  static async trackInteraction(userId, parfumId, actionType) {
    await db("interactions").insert({
      user_id: userId,
      parfum_id: parfumId,
      action_type: actionType,
    });
  }

  static async getTrending(limit = 5) {
    return await db("interactions")
      .select("parfums.*")
      .count("interactions.parfum_id as interaction_count")
      .join("parfums", "interactions.parfum_id", "parfums.parfum_id")
      .groupBy("interactions.parfum_id")
      .orderBy("interaction_count", "desc")
      .limit(limit);
  }

  static async getSimilar(parfumId) {
    const [parfum] = await db("parfums").where("parfum_id", parfumId);
    if (!parfum) return [];

    return await db("parfums")
      .where("notes", "like", `%${parfum.notes.split(",")[0]}%`)
      .andWhereNot("parfum_id", parfumId)
      .limit(5);
  }
}

module.exports = Parfum;
