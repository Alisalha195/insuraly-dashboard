import express from 'express';
const router = express.Router();

import userRoutes from "./userRoutes.js"
import businessRoutes from "./userRoutes.js"
import businessOwnersRoutes from "./userRoutes.js"
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

router.use("/user", userRoutes)
router.use("/businessRoutes", businessRoutes)
router.use("/retirementIndemnificationRoutes", retirementIndemnificationRoutes)
router.use("/claimsRoutes", claimsRoutes)
router.use("/retirementRoutes", retirementRoutes)
router.use("/businessOwnersRoutes", businessOwnersRoutes)
router.use("/employessRoutes", employessRoutes)
router.use("/servicesRoutes", servicesRoutes)
router.use("/retirementSalaryRoutes", retirementSalaryRoutes)
router.use("/servicesWagesRoutes", servicesWagesRoutes)
router.use("/unpaidVacationsRoutes", unpaidVacationsRoutes)
router.use("/personalInformationsRoutes", personalInformationsRoutes)
router.use("/retirementSalarySuccessorRoutes", retirementSalarySuccessorRoutes)
router.use("/retirementSalaryAuthorizedAcquireRoutes", retirementSalaryAuthorizedAcquireRoutes)

export default router;