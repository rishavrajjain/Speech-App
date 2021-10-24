const express=require('express');
require('dotenv').config()

const Dictionary = require('../models/dictionary');
const jwt=require('jsonwebtoken');

const auth=require('../middleware/auth');

const router=express.Router();


router.get('/text/:id',async(req,res)=>{
    try{
        const dict = await Dictionary.findOne({_id:req.params.id});
        res.status(200).json({
            dictionary:dict
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }
})

router.post('/allTextOneUser',auth,async(req,res)=>{
    try{
        const dictionaries = await Dictionary.find({owner:req.user._id});
        res.status(200).json({
            dictionaries
        })
    }catch(err){
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }
})







router.post('/addText',auth,async(req,res)=>{


    try{

        const dictionary = new Dictionary(req.body);
        dictionary.owner = req.user._id;
        await dictionary.save();

        
        res.status(200).json({
            data:{
                dictionary,
                message:'Data added successfully'
            }
        })
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            data:{
                message:'Internal Server Error'
            }
        })
    }

})

router.post('/editText/:id',auth,async(req,res)=>{

    const id = req.params.id;

    try{
        const dictionary = await Dictionary.findOne({_id:id});
        

        dictionary.title = req.body.title;
        dictionary.text = req.body.text;
        await dictionary.save();
        res.status(200).json({
            dictionary,
            message:'Update successfull'
        })
    }catch(err){
        res.status(200).json({
            data:err
        })
    }
})

router.delete('/deleteText/:id',auth,async(req,res)=>{
    const id = req.params.id;

    try{
        const dictionary = Dictionary.findOne({_id:id});
        if(dictionary.owner !== req.user._id){
            res.status(401).json({
                message:'Unauthorised'
            })
        }

        await Dictionary.findOneAndDelete({_id:id});
        
        res.status(200).json({
            message:'Deletion successfull'
        })
    }catch(err){
        res.status(200).json({
            data:err
        })
    }
})










module.exports=router;