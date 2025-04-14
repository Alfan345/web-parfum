const db = require("../database/connection");

class Interaction {
  static async track(userId, parfumId, actionType) {
    await db("interactions").insert({
      user_id: userId,
      parfum_id: parfumId,
      action_type: actionType,
    });
  }

  static async getUserHistory(userId, limit = 10) {
    return await db("interactions")
      .join("parfums", "interactions.parfum_id", "parfums.parfum_id")
      .where("interactions.user_id", userId)
      .orderBy("interactions.timestamp", "desc")
      .limit(limit)
      .select("parfums.*");
  }

  static async trackRecommendationView(userId, parfumId = null) {
    const interactionData = {
      user_id: userId,
      action_type: "recommendation_view",
      timestamp: db.fn.now(),
    };

    // Jika ada parfumId, tambahkan ke data interaksi
    if (parfumId) {
      interactionData.parfum_id = parfumId;
    } else {
      // Atau gunakan parfum default jika diperlukan
      interactionData.parfum_id = 1; // Ganti dengan ID parfum default yang valid
    }

    await db("interactions").insert(interactionData);
  }
}


module.exports = Interaction;
