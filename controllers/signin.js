const handlesignin=(req,res,db,bcrypt)=>{

    db.select('email','hash').from('login').where({email:req.body.email}).then(data=>
        { isvalid=bcrypt.compareSync(req.body.password, data[0].hash)
             console.log(isvalid)
            if(isvalid)
            {
              db.select('*').from('users').where({email:req.body.email}).then(user=>res.json(user[0])) 
              .catch(err=>res.status(400).json("in sign errro")) 
            }
            else{
                res.status(400).json("400")
            }
        
        
        }).catch(err=>res.json('err'))
    

}

module.exports={
    handlesignin:handlesignin
}