const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalsModel');
const User = require('../model/userModel');

const getGoals = asyncHandler(async(req, res) => {

    const goals = await Goal.find({user: req.user.id});

    res.status(200).json(goals);
})

const setGoals = asyncHandler(async(req, res) => {


    if(!req.body.text){
        res.status(400)
        throw new Error('Please fill the required field.')
    }

    const goals = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(201).json(goals);
})

const updateGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.findById(req.params.id);

    if(!goals){
        res.status(400)
        throw new Error('Goal is not found');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('not found')
    }

    if(goals.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    const updateGoals = await Goal.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json(updateGoals);
})

const deleteGoals = asyncHandler(async(req, res) => {

    const goals = await Goal.findById(req.params.id);

    if(!goals){
        res.status(400)
        throw new Error('Goal is not found');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401)
        throw new Error('not found')
    }

    if(goals.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }

    await goals.remove();

    res.status(200).json(`id: ${req.params.id}`);
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}