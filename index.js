import express from "express";
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import sequelize from "./src/config/db.js";
import router from "./src/routes/index.js";

const app = express();
const corsOrigin = process.env.CORS_ORIGIN || "https://productos-front-end-d7xm.vercel.app";
const serverHost = process.env.SERVER_HOST 
const serverPort = process.env.SERVER_PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use( cors({ origin: corsOrigin, credentials: true }) );
app.use("/", router);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);  
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
    app.listen(serverPort, () => {
      console.log(`Servidor escuchando en ${serverHost}:${serverPort}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar con la base de datos:", err);
  });

  export default app;


