
import express from 'express';
import dotenv from "dotenv"
import cors from "cors"; 
import serverRoutes from "./routes/serverRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import {authenticated} from "./middlewares/authenticated.js";
import { supabase } from './db/connection.js';

dotenv.config();
const app = express();


const allowedOrigins = [
   'https://vercel.app', 
   'http://localhost:5173'             // Local web testing
];

app.use(cors({
   origin: (origin, callback) => {
     // Android apps often send a null origin or no origin header at all
     if (!origin || allowedOrigins.includes(origin)) {
       callback(null, true);
     } else {
       callback(new Error('Not allowed by CORS'));
     }
   }
 }));
 
// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const refreshTokens = new Map();
// supabase.auth.onAuthStateChange(async (event, session) => {
//    console.log('Auth state changed:', event, 'User:', session?.user?.email);
   
//    switch (event) {
//      case 'SIGNED_IN':
//       case 'TOKEN_REFRESHED':
//          if(session) {
//             refreshTokens.set(session.user.id, session.refresh_token);
//          }
//        break;
       
//      case 'SIGNED_OUT':
//       if(session?.user?.id) {
//          refreshTokens.delete(session.user.id);
//       }
       
//        break; 
//    }
// });

app.use("/test"  ,(req,res)=>{
   res.status(200).json({msg:"ok"})
});
app.use("/auth"  ,authRoutes);
// app.use("/" ,authenticated ,serverRoutes);
app.use("/"  ,serverRoutes);

const port = process.env.PORT || 3000;
try {
   app.listen(port ,'0.0.0.0' , () => {console.log(`Server is running on port ${port}`)})
 } catch(error) {
   console.log(error)
 }
