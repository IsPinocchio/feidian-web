var fs = require('fs')
const { json } = require('body-parser')

var dbpath = './db.json'

exports.find = function(callback){
    fs.readFile(dbpath,function(err,data){
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}
exports.findbyid = function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function(item){
            return item.id === id
        })
        callback(null,ret)
    })
}

exports.save = function(student,callback){
    fs.readFile(dbpath,function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = JSON.stringify(parseInt(students[students.length-1].id)+1)
        student.num = JSON.stringify(parseInt(students[students.length-1].num)+1)
        // console.log(student.id)
        students.push(student)
        var ret = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,ret,function(err,data){
            if(err){
                return callback(err)
            }
            callback(null)
        })
        // callback(null)
    })
}
exports.delete = function(id,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students  = JSON.parse(data).students
        var idd = students.findIndex(function(item){
            return item.id === id
        })
        students.splice(idd,1)
        console.log(idd)
        var ret = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,ret,function(err,data){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}
exports.update = function(student,callback){
    fs.readFile(dbpath,function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        var stu  = students.find(function(item){
            return item.id  === student.id
        })
        for(var key in student){
            stu[key] = student[key]
        }
        var ret = JSON.stringify({
            students:students
        })
        fs.writeFile(dbpath,ret,function(err,data){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}