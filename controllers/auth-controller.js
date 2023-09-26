const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../models/prisma')
exports.register = async (req,res,next) =>{
    try{
        // valdate data
        const {username, email, password, confirmPassword} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword
            }
        })
        res.status(201).json({message: 'success'})
        
    }catch(err){
        // ส่ง err นี้ โยนไปที่ errormiddleware
        next(err)
    }
    
}

exports.login = async (req,res,next) =>{
    try{
        
        
        const {username,password} = req.body
        // return เจอ = {id,username,password} // ไม่เจอ เป็น null
        const tagetUser = await prisma.user.findUnique({
            where:{
                username
            }
        })
        // กรอก username มั่วๆ ถ้าเป็น null 
        if(!tagetUser){
            return res.status(400).json({message: 'invalid credential'})
        }
        const isMatch = await bcrypt.compare(password, tagetUser.password)
        if(!isMatch){
            return res.status(400).json({message: 'invalid credentail'})
        }

        const payload = {
            id: tagetUser.id
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY || 'secret',{
            expiresIn: process.env.JWT_EXPIRE || '1'
        })
        // ส่งอะไรไปให้ Client บ้าง
        res.status(200).json({accessToken})
    }catch(err){
        next(err)
    }
}