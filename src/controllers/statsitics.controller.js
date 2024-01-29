import { Closette, CATEGORIES } from "../models/Closette.js";
import { Users } from "../models/Users.js";
import { Products } from "../models/Product.js";

export default {
  GetDashboardStats: async (req, res, next) => {
    try {
      const closettesCount = await Closette.countDocuments();

      const userCount = await Users.countDocuments({
        role: "CLIENT",
      });

      const userMCount = await Users.countDocuments({
        gender: "M",
      });

      const userFCount = await Users.countDocuments({
        gender: "F",
      });

      const userOCount = await Users.countDocuments({
        gender: "O",
      });

      const productsCount = await Products.countDocuments();

      const categoriesCount = CATEGORIES.length;

      const count = {
        closette: closettesCount || 0,
        users: {
          total: userCount || 0,
          male: userMCount || 0,
          female: userFCount || 0,
          others: userOCount || 0,
        },
        prodoucts: productsCount || 0,
        categories: categoriesCount,
      };

      res.status(200).json({
        success: true,
        content: {
          count,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
