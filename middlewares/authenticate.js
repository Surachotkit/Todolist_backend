const jwt = require('jsonwebtoken')
const prisma = require('../models/prisma')

module.exports = async (req, res, next) => {
    try{
        const authorization = req.headers.authorization
        console.log(authorization);
        if(!authorization){  // ถ้าเป็น undefined 
            return res.status(401).json({ message: 'unauthenticated'})
        }
        if(!authorization.startsWith('Bearer ')){  // ถ้าไม่ขึ้นต้นด้วย Bearer 
            return res.status(401).json({ message: 'unauthenticated'})
        }
        // ถ้า user พิม Bearer_ เว้นวรรคเข้ามา  
        // ถ้าขึ้นต้นด้วย Bearer 
        const token = authorization.split(' ')[1]   // return array เข้าถึงด้วยตัว index
        
        // modify บอกข้อมูล user คนนั้นมี id เป็นอะไร
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'very_secret')
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        })
        if(!user){
            return res.status(401).json({ message: 'unauthenticated'})
        }
        req.user = user

        next()
    }catch(err){
        next(err)
    }
};
