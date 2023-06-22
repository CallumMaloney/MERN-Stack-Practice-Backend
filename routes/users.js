const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Create
router.post('/', async (req, res) => { 

  const user = new User({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    email: req.body.email,
    dateOfSignUp: req.body.dateOfSignUp
  })
  try{
    const newUser = await user.save()
    res.status(201).json(newUser)
  }catch(error){
    res.status(400).json({error: error.message})
  }
  
})

// Read
router.get('/:id', async (req, res) => {

  try{
    const user = await User.findById(req.params.id)
    if(user===null){
      return res.status(404).json({message: 'User not found'})
    }else{
      res.json(user)
    } 
  } catch(error){
    res.status(500).json({error: error.message})
  }
})
// Read All
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})



// Update
router.patch('/:id', async (req, res) => {

  try{
    const user = await User.findById(req.params.id)
    if(user===null){
      return res.status(404).json({message: 'User not found'})
    }else{
      if(req.body.name!=null){
        user.name = req.body.name
      }
      if(req.body.age!=null){
        user.age = req.body.age
      }
      if(req.body.address!=null){
        user.address = req.body.address
      }
      if(req.body.email!=null){
        user.email = req.body.email
      }
      if(req.body.dateOfSignUp!=null){
        user.dateOfSignUp = req.body.dateOfSignUp
      }
      const updatedUser = await user.save()
      res.json(updatedUser)
    }
  }
  catch(error){
    res.status(400).json({error: error.message})
  }

})

// Delete
router.delete('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if(user===null){
    return res.status(404).json({message: 'User not found'})
  }
  try{
    await user.deleteOne({ _id: user })
    res.json({message: 'User deleted'})
  }catch(error){
    res.status(500).json({error: error.message})
  }
})


module.exports = router