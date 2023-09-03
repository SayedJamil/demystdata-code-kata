import { Router } from "express";
import InitController from "../controllers/init-controller";
import { BalanceController, DecisionController } from "../controllers";
import { createLoanRequestValidator } from "../validators";
const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: "ok" });
});

router.get("/health", (req, res) => {
  res.sendStatus(200);
});

router.get("/init", InitController.initApplication);
router.get("/balance", BalanceController.getBalanceSheet);
router.post(
  "/loan_request",
  createLoanRequestValidator(),
  DecisionController.submitLoanRequest
);

export default router;
