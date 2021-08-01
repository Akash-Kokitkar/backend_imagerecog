const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '8ceb033c08e7479e9f37b92e06254394'
});

const handleapi = (req, res) => {
    console.log('yes')
    console.log(req.body.input)
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data => { res.json(data) })
        .catch(err => res.status(400).json("ok"))
}


const handleimage = (req, res,db) => {
    const { id } = req.body;
    console.log(id)
    db('users').where('id', '=', id).increment('enteries', 1)
        .returning('enteries').then(enteries => res.json(enteries[0])).catch(err => res.status(400).json("Not loading"))
}


module.exports = {
    handleimage: handleimage,
    handleapi: handleapi
}
