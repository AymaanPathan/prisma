import { Router } from "express";
import userRoutes from "../routes/user.routes.js";
import accountRoutes from "../routes/accounts.route.js";
import transactionRoute from "../routes/transaction.route.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/account", accountRoutes);
router.use("/transaction", transactionRoute);

export default router;
