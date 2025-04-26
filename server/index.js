
import express from 'express';
import dotenv from "dotenv"
import cors from "cors"; 
import serverRoutes from "./routes/serverRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import {authenticated} from "./middlewares/authenticated.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth"  ,authRoutes);
app.use("/" ,authenticated ,serverRoutes);

const port = process.env.PORT || 5000;
try {
   app.listen(port , () => {console.log(`Server is running on port ${port}`)})
 } catch(error) {
   console.log(error)
 }
