import express  from 'express'
import {createServer} from 'http'
import { Server } from 'socket.io'
import ConnectToDB from './db/connection.js'
import  jwt  from 'jsonwebtoken'
import dotenv from 'dotenv'
import MessageModel from './models/message.model.ts'
import UserModel from './models/User.model.ts'


dotenv.config()
const app = express()
const server = createServer(app)
const port = 3000
const io = new Server(server,{
    cors:{
        origin:"*",
    },
})


ConnectToDB()
io.on('connection', (socket) => {
    console.log('a user connected')
    console.log(socket.id)
    socket.on('updateSocketId',async(data)=>{
           ///// TODO Validation
           if(!data.token) return 
           const {token} = data
           try{
               const isValidDecoded = await jwt.verify (token,process.env.SECRET)
               const {_id}=isValidDecoded
               await UserModel.findByIdAndUpdate(_id,{socketId:socket.id})
   
           }
           catch(error){
               console.log(error)
               return
           }
   
          
    })
    socket.on('getMessages', async(data) => {
        ///// TODO Validation
        if(!data.token||!data.to) return 
        const {token ,to} = data
        try{
            const isValidDecoded = await jwt.verify (token,process.env.SECRET)
            const {_id}=isValidDecoded
            const messages = await MessageModel.find({$or:[
                {from:_id,to},
                {from:to,to:_id},
    
                ],
            })
            socket.emit('RetriveMessages',{messages})

        }
        catch(error){
            console.log(error)
            return
        }

       
        
    })

    socket.on('addMessage', async(data) => {
        ///// TODO Validation
        if(!data.token||!data.to||!data.message) return 
        const {token ,to,message} = data
        try{
            const isValidDecoded = await jwt.verify (token,process.env.SECRET)
            
            const {_id}=isValidDecoded
            const newMessage = await MessageModel.create({from:_id,to,text:message})
            
            const {socketId} = await UserModel.findById(to)

            socket.to([socketId,socket.id]).emit('newMessage',{message:newMessage})

        }
        catch(error){
            console.log(error)
            return
        }
    })
})



// const{_id,name} = await UserModel.findOne({Name:'Ahmed'})
// const token = await jwt.sign({_id,name},process.env.SECRET)
// console.log(token)
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
