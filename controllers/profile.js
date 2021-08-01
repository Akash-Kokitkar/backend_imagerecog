const handleprofile=(req,res,db)=>{
    const{id}=req.params;
    
    db.select('*').from('users').where({id:id}).
    then(resp=>{if(resp.length){return res.json(resp)}else{return res.status(404).json('bot found')}})
        
    
}

module.exports={
    handleprofile:handleprofile
}