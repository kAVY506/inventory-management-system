const { productModel } = require("../models/productModel");
const {productSupplierModel} = require("../models/productSupplierModel");
const { supplierModel } = require("../models/supplierModel");



exports.createProduct = async (req,res)=>{
    try{
        const {name, sku, description, price, current_stock, reorder_level,supplier_id} = req.body;
        
        const newProduct = new productModel({name, sku, description, price, current_stock, reorder_level,supplier_id});
        await newProduct.save();
        const newProductSupplier = new productSupplierModel({product_id:newProduct._id,supplier_id})
        await newProductSupplier.save();
        await supplierModel.updateOne({_id:supplier_id},{ $push: {productsSupplied:newProduct._id}});
        UpdatestockValueHistory(req,res,current_stock);

        res.status(201).json({
            success:true,
            message:"created a product successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllProducts = async (req,res)=>{
    try{
        const allProducts = await productModel.find({isDeleted:false});
        res.status(200).json({
            success:true,
            data:allProducts
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.updateProduct = async (req,res)=>{
    try{
        const id = req.query.id;
        const {name, sku, description, price, current_stock, reorder_level,supplier_id} = req.body;

        const updateObj = {};
        if (name !== undefined) updateObj.name = name;
        if (sku !== undefined) updateObj.sku = sku;
        if (description !== undefined) updateObj.description = description;
        if (price !== undefined) updateObj.price = price;
        if (current_stock !== undefined) updateObj.current_stock = current_stock;
        if (reorder_level !== undefined) updateObj.reorder_level = reorder_level;
        if (supplier_id !== undefined) updateObj.supplier_id = supplier_id;

        const response = await productModel.updateOne({_id:id},updateObj);
        
        const product = await productModel.findById(id);
        if(!(current_stock - product.current_stock)){
            await UpdatestockValueHistory(req,res,current_stock - product.current_stock);
        }
        
        if(!response.matchedCount){
            res.status(404).json({
                success:false,
                message:"cannot find the product"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Product updated successfully"
            });
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteProduct = async (req,res)=>{
    try{
        const id = req.query.id;
        const product = await productModel.findById(id);
        await UpdatestockValueHistory(req,res,(-1*product.current_stock));
        const response = await productModel.updateOne({_id:id},{isDeleted:true})
        if(!response.matchedCount){
            res.status(404).json({
                success:false,
                message:"cannot find the product"
            })
        }else{
            res.status(200).json({
                success:true,
                message:"successfully deleted the product"
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

