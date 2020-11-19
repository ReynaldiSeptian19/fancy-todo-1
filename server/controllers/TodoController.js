const { Todo } =  require('../models/index')

class Controller {
    static addTodo(req, res, next){
        let date = new Date()
        const obj = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date,
            UserId:req.decoded.id,
            createdAt: date,
            updatedAt: date
        }
        Todo.create(obj)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })
    }

    static readTodo(req,res){
        Todo.findAll({
            where:{
                UserId: req.decoded.id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static readById(req, res) {
        const id = +req.params.id
        Todo.findByPk(id)
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static editTodo(req,res) {
        console.log('satu satu')
        const id = +req.params.id
        console.log(id)
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        console.log(obj)
        Todo.update(obj, {
            where: {
                id: id
            },
        })
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static updateTodo(req, res, next){
        const id = +req.params.id
        const obj = {
            status: req.body.status
        }
        Todo.update(obj, {
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        const id = +req.params.id
        Todo.destroy({
            where:{
                id
            }
        })
        .then(result => {    
        res.status(200).json({message: 'Deleted Success'})
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = Controller