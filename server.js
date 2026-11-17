import 'dotenv/config'
import connectDB from './src/config/db.js'
import app from './src/app.js'

const PORT = process.env.PORT || 3200

const startServer = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Quizzo server running on port ${PORT}`)
    })
}

startServer()