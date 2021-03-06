
const express=require('express');
const cors=require('cors');
const knex=require('knex');
const bcrypt = require('bcrypt-nodejs');
const register=require('./controllers/register');
const signin=require('./controllers/signin')
const image=require('./controllers/image.js')
const profile=require('./controllers/profile.js')

const app=express();
app.use(express.json())
app.use(cors());
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 


const db=knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:true
    }
  });


app.get('/' ,(req,res)=>{
   res.send('All working');
})

app.post('/signin',(req,res)=>{signin.handlesignin(req,res,db,bcrypt)})

app.post(('/register'),(req,res)=>{register.handleregister(req,res,db,bcrypt)})


app.get('/profile/:id',(req,res)=>{profile.handleprofile(req,res,db)}
)  

app.put('/image',(req,res)=>{image.handleimage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleapi(req,res)})



    


app.listen(process.env.PORT || 3000,()=>{console.log('App is running')})