import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No hay token, autorización denegada" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token no valido" });
  }
};

export default auth;
