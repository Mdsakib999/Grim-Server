import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './App/Routes';
import cookieParser from 'cookie-parser';
import notFound from './App/middlewares/notFound';
import globalErrorHandler from './App/middlewares/globalErrorHandler';

const app: Application = express()

// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send('hello word')
})

app.use('/api/v1', router)

app.use(notFound)
app.use(globalErrorHandler)

export default app