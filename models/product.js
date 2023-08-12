const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'name most be provided']
  },
  price:{
    type:String,
    required:[true, 'price most be provided']
  },
  rating:{
    type:Number,
    default:4.5
  },

  featured:{
    type:Boolean,
    default:false
  },

  company:{
   type:String,
   enum:{
    value:['ikea', 'liddy', 'caressa', 'marcos'],
    message:'{value} is not supported'
   }
  }

}, {timestamps:true});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;