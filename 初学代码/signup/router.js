var fs = require('fs')
var express = require('express')
var Students = require('./Students')

var router = express.Router()

router.get('/',function(req,res){
    return res.render('index.html')
})

router.get('/a',function(req,res){
    Students.find(function(err,students){
        if(err){
            return res.send('error')
        }
        res.render('list.html',{
            students:students
        })
    })
})

router.post('/a',function(req,res){
    var student = req.body
    Students.save(student,function(err){
        if(err){
            return res.send('server error')
        }
        Students.find(function(err,students){
            if(err){
                return res.send('error')
            }
            res.render('list.html',{
                students:students
            })
        })
    })
    
})
router.get('/a/edit',function(req,res){
    Students.findbyid(req.query.id,function(err,student){
        if(err){
            return res.send('error')
        }
        res.render('edit.html',{
            student:student
        })
    })
})
router.post('/a/edit',function(req,res){
    Students.update(req.body,function(err){
        if(err){
            return res.end('error')
        }
        res.redirect('/a')
    })
})


router.get('/a/delete',function(req,res){
    Students.delete(req.query.id,function(err){
        if(err){
            return res.end('error')
        }
        res.redirect('/a')
    })
})

module.exports = router