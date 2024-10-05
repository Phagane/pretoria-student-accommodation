const User = require('./../models/userModel')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

dotenv.config({path: './../config/config.env'})

exports.signUp = async (req, res) =>{
    const {email, name, role, phoneNumber, password, confirmPassword} = req.body

    if(password !== confirmPassword){
        return(
            res.status(400).json({
                status: 'fail',
                message: 'Passwords do not match'
            })
        )
    }
    try{
        let user = await User.findOne({email})
        if(user){
            return(
                res.status(400).json({
                    status: 'fail',
                    message: 'User already exists'
                })
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        user = new User({
            email,
            password: hashedPassword,
            name: name,
            role: role,
            phoneNumber: phoneNumber,
        })
    
        await user.save()
    
        const sender = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
    
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: user.email,
            subject: 'You have joined Pretoria Student Accommodation',
            text: `Good day ${user.name}

You have successfully registered on Pretoria Student Accommodation. You can now Apply for accommodation. Visit to www.pretoriastudentaccommodation.com for more info

Kind regards,
Pretoria Student Accommodation Team`

        }
    
        sender.sendMail(mailOptions)

        res.status(200).json({
            status:'success',
            message: `Email confirmatioin has been sent to ${user.email}`
        })  

    }catch(err){
        console.log(err.message)
    }    
}

exports.signIn = async (req, res)=>{
    const {email, password} = req.body
    
    try{

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password'
            })
        }

        const payload = {
            id: user._id,
            email: user.email,
          }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'5h'})
        const role = user.role

        res.status(200).json({
            status: 'success',
            token,
            role,
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            status: 'fail',
            message: 'Server error'
        })
    }
}
exports.userInfo = async (req, res) => {
    try {
  
      const userId = req.user.id
  
      const user = await User.findById(userId).select('-password')
  
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        })
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          user
        },
      })
  
    } catch (error) {
      console.error(error)
      res.status(500).json({
        status: 'fail',
        message: 'Server Error',
      })
    }
  };