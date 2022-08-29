import { Router } from "express";

const router = Router();

import albumController from "./constrollers/albumController";

// router.use("/users", authController);

router.use("/data", albumController);

// module.exports = router;

export default router;
