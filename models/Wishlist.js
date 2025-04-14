const db = require("../database/connection");

class Wishlist {
  static async addToWishlist(wishlistId, parfumId) {
    await db("wishlist_parfum").insert({
      wishlist_id: wishlistId,
      parfum_id: parfumId,
    });
  }

  static async removeFromWishlist(wishlistId, parfumId) {
    await db("wishlist_parfum")
      .where({
        wishlist_id: wishlistId,
        parfum_id: parfumId,
      })
      .del();
  }

  static async getWishlistItems(wishlistId) {
    return await db("wishlist_parfum")
      .join("parfums", "wishlist_parfum.parfum_id", "parfums.parfum_id")
      .where("wishlist_parfum.wishlist_id", wishlistId)
      .select("parfums.*");
  }

  static async isInWishlist(wishlistId, parfumId) {
    const [item] = await db("wishlist_parfum").where({
      wishlist_id: wishlistId,
      parfum_id: parfumId,
    });
    return !!item;
  }
}

module.exports = Wishlist;
