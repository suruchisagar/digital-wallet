const express= require('express');
const app= express();
const PORT=3000;
const cors= require('cors');

app.use(express.json()); 
app.use(cors());

const userRoutes= require('./routes/Authentication')

app.use('/auth',userRoutes);

const dashboardRoutes= require('./routes/Dashboard')

app.use('/dashboard',dashboardRoutes);



// //ROUTES
// app.get('/',(req,res)=>{
//     res.send("Hello world")
// });

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
}); 