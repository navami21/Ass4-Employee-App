const express=require('express');
const app=new express();
const morgan=require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
require('./db/connection');
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static('public'));

const nav=[{
    link:'/emp',name:'Home'
},{
    link:'/emp/addemp',name:'Add emp'
}]
const empRoutes=require('./routes/empRoutes')(nav);
app.use('/emp',empRoutes);




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
})