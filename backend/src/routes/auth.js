import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(h.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const teacherOrAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "teacher") return next();
  return res.status(403).json({ message: "Permissions denied" });
};
