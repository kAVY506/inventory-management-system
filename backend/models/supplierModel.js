const {mongoose} = require("mongoose");

const supplierSchema = mongoose.Schema({
        name:{
            type:String,
            require:true,
            unique:true
        },
        contact_info:{
            type:String,
            require:true
        },
        productsSupplied:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' 
        }],
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
)

const supplierModel = mongoose.model("Supplier",supplierSchema);

module.exports = {supplierModel}