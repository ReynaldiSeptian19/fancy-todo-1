const e = require('express')
const { Todo } =  require('../models/index')

class Controller {
    static addTodo(req, res){
        const obj = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date,
        }
        Todo.create(obj)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err=>{
            let status = 500
            if(err.name === 'SequelizeValidationError'){
                    status = 400
                    return err.errors[0].message
            } 
            res.status(status).json(err)  
        })
    }

    static readTodo(req,res){
        Todo.findAll()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readById(req, res) {
        const id = +req.params.id
        Todo.findByPk({
            where: {
                id
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

    static editTodo(req,res) {
        const id = +req.params.id
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
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
            let status = 500
            if(err.name === 'SequelizeValidationError'){
                    status = 400
                    return err.errors[0].message
            } 
            res.status(status).json(err)  
        })
    }

    static updateTodo(req, res){
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
            let status = 500
            if(err.name === 'SequelizeValidationError'){
                    status = 400
                    return err.errors[0].message
            } 
            res.status(status).json(err)  
        })
    }

    static delete(req, res) {
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
            res.status(500).json(err)
        })
    }

}

module.exports = Controller