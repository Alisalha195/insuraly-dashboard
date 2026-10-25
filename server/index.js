
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
   'http://localhost:5173',
   'http://localhost:8081'
];

// app.use(cors({
//    origin: (origin, callback) => {
//      // Android apps often send a null origin or no origin header at all
//      if (!origin || allowedOrigins.includes(origin)) {
//        callback(null, true);
//      } else {
//        callback(new Error('Not allowed by CORS'));
//      }
//    }
//  }));


const corsOptions = {
   origin: (origin, callback) => {
     // 1. Allow requests with no origin (like mobile apps, Postman, or curl)
     if (!origin) return callback(null, true);
 
     // 2. Allow explicitly listed static origins
     if (allowedOrigins.indexOf(origin) !== -1) {
       return callback(null, true);
     }
 
     // 3. Match local network IPs for Expo Development Builds (e.g., http://192.168.1.5:8081)
     const localIpRegex = /^http:\/\/(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?$/;
     
     // 4. Match Ngrok or Expo tunnel URLs if using Expo CLI tunnels
     const tunnelRegex = /.*\.ngrok-free\.app$|.*\.expo\.direct$/;
 
     if (localIpRegex.test(origin) || tunnelRegex.test(origin)) {
       return callback(null, true);
     }
 
     // Reject other origins
     return callback(new Error('Not allowed by CORS'));
   },
   credentials: true, 
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
 };
 
 app.use(cors(corsOptions));
 
 
 app.options('*', cors(corsOptions));

 
//  app.use(cors({
//    origin: function (origin, callback) {
//      // Check if the request origin matches our allowed list, 
//      // or if it has no origin (like mobile apps/postman)
//      if (!origin || allowedOrigins.includes(origin)) {
//        callback(null, true);
//      } else {
//        console.log("Blocked by CORS. Origin was:", origin);
//        callback(new Error('Not allowed by CORS'));
//      }
//    },
//    credentials: true
//  }));
 
 
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
