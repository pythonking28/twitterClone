import jwt from "jsonwebtoken";
const isAuthenticated = async (req,res,next) => {
    try {
        const {token} = await req.cookies;
        if(!token){
            return res.status(400).json({
                message: "User not logged in",
                success: false
            })
        }
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = decodedToken.id;
        next();

    } catch (error) {
        console.log(error)
    }
    
}

export default isAuthenticated;