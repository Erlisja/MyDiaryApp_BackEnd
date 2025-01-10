import jwt from 'jsonwebtoken';

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if ((!authHeader || !authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ message: 'Access denied. User is not authenticated' });
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; // Attach user data to the request object
        next(); // Move to the next middleware/controller
    }catch(error){
        return res.status(403).json({ message: 'Invalid token' });
    }
}

export default authenticationToken;