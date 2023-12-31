const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'name most be provided']
  },
  price:{
    type:Number,
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

  createdAt:{
    type:Date,
    default:Date.now()
  },

  company:{
   type:String,
   enum:{
    values:['ikea', 'liddy', 'caressa', 'marcos'],
    message:'{VALUE} is not supported',
   }
  }

});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;