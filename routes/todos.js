var express = require('express');
const createError = require('http-errors');
var router = express.Router();


const todos=[{
        id:1,
        name:'Do Something',
        completed:false
    }];


// /todos/
router.get('/', function(req, res, next) {
  res.json(todos);
});

// /todos/:id
router.get('/:id', function(req, res, next){
    const foundtodo = todos.find((todo)=>todo.id === Number(req.params.id));
    if(!foundtodo){
        //404
        return next(createError(404, 'Not Found'));
    }
    res.json(foundtodo);
})

router.post('/',function(req, res, next){
    const {body}=req;
    if(typeof body.name !== 'string'){
        return next(createError(422, 'Validation Error'))
    }
    const newTodo = {
        id:todos.length +1,
        name: body.name,
        completed:false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
})
module.exports = router;
