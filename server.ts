import app from './src/app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
})

app.on("error", error => console.log(`Error en servidor ${error}`))