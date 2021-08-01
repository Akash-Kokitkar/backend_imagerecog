const handleregister=(req,res,db,bcrypt)=>{
    
    const {email,name,password}=req.body;

    if(!email || !name || !password )
    {
        return res.status(400).json('register error')
    }
  
    const hash=bcrypt.hashSync(password)
    console.log(hash)
  
    db.transaction(trx=>{
        trx.insert(
            {
                hash:hash,
                email:email
            }
        ).into('login').returning('email')
        .then(loginemail=>
          { 
              return  trx('users').returning('*').insert(
              {
                   email:loginemail[0],
                   name:name,
                   joined:new Date()
              }
          ).
          then(usr=>{res.json(usr[0])
          })
      }).then(trx.commit)
      .catch(trx.rollback)
     
          
  
    })
      
      .then(usr=>{res.json(usr)}
          ).catch(err=>res.status(400).json('unable to connect'))
  
     
  } 

  module.exports={
      handleregister:handleregister
  }