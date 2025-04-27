import express from 'express';
const router = express.Router();

// import authRoutes from "./authRoutes.js"
import userRoutes from "./userRoutes.js"
import businessRoutes from "./businessRoutes.js"
import businessOwnersRoutes from "./businessOwnersRoutes.js"
import claimsRoutes from "./claimsRoutes.js"
import retirementRoutes from "./retirementRoutes.js"
import employessRoutes from "./employessRoutes.js"
import servicesRoutes from "./servicesRoutes.js"
import retirementIndemnificationRoutes from "./retirementIndemnificationRoutes.js"
import retirementSalaryRoutes from "./retirementSalaryRoutes.js"
import retirementSalarySuccessorRoutes from "./retirementSalarySuccessorRoutes.js"
import servicesWagesRoutes from "./servicesWagesRoutes.js"
import unpaidVacationsRoutes from "./unpaidVacationsRoutes.js"
import personalInformationsRoutes from "./personalInformationsRoutes.js"
import retirementSalaryAuthorizedAcquireRoutes from "./retirementSalaryAuthorizedAcquireRoutes.js"

// router.use("/auth", authRoutes)
router.use("/user", userRoutes)
router.use("/business", businessRoutes)
router.use("/retirementIndemnification", retirementIndemnificationRoutes)
router.use("/claims", claimsRoutes)
router.use("/retirement", retirementRoutes)
router.use("/businessOwners", businessOwnersRoutes)
router.use("/employess", employessRoutes)
router.use("/services", servicesRoutes)
router.use("/retirementSalary", retirementSalaryRoutes)
router.use("/servicesWages", servicesWagesRoutes)
router.use("/unpaidVacations", unpaidVacationsRoutes)
router.use("/personalInformations", personalInformationsRoutes)
router.use("/retirementSalarySuccessor", retirementSalarySuccessorRoutes)
router.use("/retirementSalaryAuthorizedAcquire", retirementSalaryAuthorizedAcquireRoutes)

export default router;