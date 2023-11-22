import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import loginRoutes from './router/loginRoutes'
import uploadRoutes from './router/uploadRoutes'


config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(loginRoutes, uploadRoutes)


app.listen(process.env.PORT, () => {
    console.log(`STARTED SERVER ON PORT ${process.env.PORT}`)
})