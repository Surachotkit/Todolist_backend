const prisma = require('../models/prisma')

exports.createTodo = async (req,res,next) =>{
    try{
        const {title,completed,dueDate} = req.body
        // Validate  
        //1. Manual --> สร้างฟังชั่นมาเช็ค completed เป็น true,false / dueDate เป็น d/m/y 
        //2. Validation Library
        await prisma.todo.create({
            data: {
                title,
                completed,
                dueDate,
                user: {
                    connect: req.user
                }
            
            }
        })
        res.status(201).json({message: 'created'})
    }catch(err){
        next(err)
    }
} 