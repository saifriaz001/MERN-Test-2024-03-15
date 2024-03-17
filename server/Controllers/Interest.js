
const express = require("express")
const Interest = require('../Models/Interest');

exports.addInterest =  async(req,res) =>{
    const { category  , userId } = req.body;

    try {
        const interest = new Interest({ category , userId});
        await interest.save();
         res.status(201).send('Interesst Added successfully')
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');

    }
};

exports.removeInterest = async(req , res)=>{
    const {category , userId} = req.body;
     try {
        await Interest.deleteOne({category, userId});
        res.status(200).send('Interest Removed Successfully')
     } catch (error) {
        console.error(error);
        res.status(500).send('serverError')
        
     }
};
