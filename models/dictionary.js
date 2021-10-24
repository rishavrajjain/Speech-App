const mongoose=require('mongoose');

const dictSchema=mongoose.Schema({
    title:{
        type:String
    },
    icon:{
        type:String
    },
    text:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId
    }
    
})


const Dictionary=mongoose.model('Dictionary',dictSchema);
module.exports=Dictionary;