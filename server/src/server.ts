import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import routes from './router/loginRoutes'


config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(process.env.PORT, () => {
    console.log(`STARTED SERVER ON PORT ${process.env.PORT}`)
})