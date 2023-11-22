import { Router } from "express";
import jwt from 'jsonwebtoken'
const router = Router()
import { config } from "dotenv";

config()

router.post("/api/v1/login", async(req, res) => {
    const {username , password} = await req.body

    if(username === process.env.USERNAME && password === process.env.PASSWORD){
        const token = jwt.sign({username:'Blona'}, process.env.ACCESS_TOKEN_SECRET! , {expiresIn: 3600})
        res.status(200).json(token)
    }else{
        res.status(401)
    }
})

router.post("/api/v1/validate-token", (req, res) => {
    const { token } = req.body
    if(!token){
      return res.status(400).json({message:"no token provided"})
    }
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
      res.status(200).json({message: "token is valid"})
    } catch (error) {
      res.status(401).json({meessage:"token is invalid"})
    }
  })