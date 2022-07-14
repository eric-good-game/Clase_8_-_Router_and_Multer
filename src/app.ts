import express from 'express'
import routerProducts from './routes/productRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'))

app.use('/api/products',routerProducts)

export default app;