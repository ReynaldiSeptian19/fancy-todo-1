const { Todo } = require('../models/index')

function authorization(req, res, next){
    const id = +req.params.id
    Todo.findByPk(id)
    .then(result => {
        if(!result) { 
            throw { msg: 'Not found', status: 404}
        }
        else if(result.UserId === req.decoded.id){
            next()
        }
        else{
            throw { msg: 'Not authorized', status: 401}
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
}

module.exports = authorization