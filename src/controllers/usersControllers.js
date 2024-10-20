import { User } from "../models/index.js";
import bcrypt from "bcrypt"
import { generateToken } from "../config/tokens.js";

const userController = {
  register: async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;
    if (!fullName)return res.status(400).json({ message: "Nombre completo no proporcionado." }); 
    if (!email)return res.status(400).json({ message: "Email no proporcionado." });
    if (!password)return res.status(400).json({ message: "Contraseña no proporcionada." }); 
    if (password !== confirmPassword)return res.status(400).json({ message: "Las contraseñas no coinciden." }); 
    try {
      const userExist = await User.findOne({ where: { email } });
      if (userExist)return res.status(400).json({ message: "El usuario ya se encuentra registrado." }); 
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
      const userResponse = { ...newUser.toJSON(), password: undefined };
      res.status(201).json(userResponse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al registrar el usuario." });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email)return res.status(400).json({ message: "Email no proporcionado." }); 
    if (!password)return res.status(400).json({ message: "Contraseña no proporcionada." });
    try {
      const user = await User.findOne({ where: { email } });
      if (!user)return res.status(400).json({ message: "Usuario no encontrado." }); 
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)return res.status(400).json({ message: "Contraseña inválida." });
      await user.update();
      const payload = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      };
      const token = generateToken(payload);
      res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None'});
      res.status(200).json({ payload, message: "Usuario logeado con éxito." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error de servidor." });
    }
  },
  logout: (req, res) => {
    if (!req.cookies.token)return res.status(400).json({ message: "No hay sesión iniciada." }); 
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'None' });
    res.status(204).json({ message: "Deslogueado correctamente" });
  },
  me: async (req, res) => {
    const userId = req.user?.id;
    if (!userId)return res.status(400).json({ message: "Id no encontrado en el token." });
    try {
      const user = await User.findOne({
        where: { id: userId },
        attributes: [
          "id",
          "email",
          "fullName",
        ],
      });
      if (!user)return res.status(404).json({ message: "Usuario no encontrado." }); 
      res.json(user.get({ plain: true }));
    } catch (error) {
      console.error(error);
      res.status(500).send("Error de servidor");
    }
  },
}
export default userController