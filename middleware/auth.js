import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET =
  process.env.SECRET || "my-32-character-ultra-secure-and-ultra-long-secret";

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const isCustomAuth = token.length < 500;

    let decodeData;

    //If token is custom token do this
    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, SECRET);
      req.role = decodeData.role == 1 ? "admin" : "business";
      req.userId = decodeData?.id;
    } else {
      //Else of token is google token then do this
      console.log(decodeData);
      decodeData = jwt.decode(token);
      req.role = decodeData.role = 1 ? "admin" : "business";
      req.userId = decodeData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
