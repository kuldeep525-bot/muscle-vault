import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    //authorization se header ko lna
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    // Bearer TOKEN_ME_SEPARATE_KARNA
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expire ho gaya — dobara login karo",
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
