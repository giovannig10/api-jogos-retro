import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class AuthController {
  //Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  //Registrar novo usuario
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      //Validação básica
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Os campos nome, email e senha são obrigátorios" });
      }

      //Verificar se o usuário ja existe
      const userExists = await userModel.findByemail(email);
      if (userExists) {
        return res.status(400).json({ error: "Este email já está em uso!" });
      }

      //Hash da senha
       const hashedPassword = await bcrypt.hash(password, 10);

       //Criar objeto do usuário
       const data = {
         name,
         email,
         password: hashedPassword,
       };

        //Criar usuário
        const user = await userModel.create(data);

        return res.status(201).json({
            message: "Usuário criado com sucesso!",
            user,
        });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }

  //Login do usuário
  async login(req,res) {
    try {
        const { email, password} = req.body;

        if (!email || !password) {
            return res
              .status(400)
              .json({ error: "Os campos nome, email e senha são obrigátorios" });
          }

          //Verificar se o usuário existe
      const userExists = await userModel.findByemail(email);
      if (!userExists) {
        return res.status(401).json({ error: "Credenciais invalidas!" });
      }

      //Verificar senha
      const isPasswordValid = await bcrypt.compare(password, userExists.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais invalidas!"});
      }

        //Gerar token
        const token = jwt.sign({id: userExists.id,
            name: userExists.name,
            email: userExists.email
        },
        process.env.JWT_SECRET, {
            expiresIn: "24h",
        }
        );
 
        return res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
            userExists,
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}

export default new AuthController();
