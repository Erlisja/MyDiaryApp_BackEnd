import jwt from 'jsonwebtoken';

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and if it starts with 'Bearer '
    if ((!authHeader || !authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ message: 'Access denied. User is not authenticated' });
    }
    // Get the token from the Authorization header
    // The token is in the format 'Bearer <token>', we are interested in the token part
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("Token received: ", token);
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(403).send("Token is not valid");
            req.user = decoded.user; // Add the user object to the request object
            next();
        });
    } else {
        return res.status(401).send("Access denied");
    }
}



export default authenticationToken;