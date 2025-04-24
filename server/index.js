
import express from 'express';
import dotenv from "dotenv"
import cors from "cors"; 
import {supabase} from "./db/connection.js"
import serverRoutes from "./routes/serverRoutes.js"

dotenv.config();
const app = express();
app.use(cors());
app.use("/", serverRoutes);

const port = process.env.PORT || 5000;
try {
   app.listen(port , () => {console.log(`Server is running on port ${port}`)})
   console.log("supabase is : ",supabase)
 } catch(error) {
   console.log(error)
 }
