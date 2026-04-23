import { TryCatch } from "./error.js";

const isAuthenticated = TryCatch(async (req, res, next) => {
    
    const token = req.cookies["chattu-token"];

    next();
})

export { isAuthenticated };