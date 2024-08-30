const { orderModel } = require("../models/orderModel");
const {productModel} = require("../models/productModel");

exports.createOrder = async (req,res)=>{
    try{
        const {product_id, quantity, order_date} = req.body;
        
        await checkStock(req,res,product_id,quantity);
        if (!res.headersSent) {
            
            await UpdatestockValueHistory(quantity);
            
            const newOrder = new orderModel({product_id, quantity, order_date});
            await newOrder.save();
            const newInventoryMovement = new inventoryMovementModel({product_id,movement_type:"sale",quantity});
            await newInventoryMovement.save();
            res.status(201).json({
                success:true,
                message:"created a order successfully"
            })
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllOrders = async (req,res)=>{
    try{
        const allOrders = await orderModel.find({}).populate('product_id');;
        res.status(200).json({
            success:true,
            data:allOrders
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.changeStatus = (value)=>{
    return  async (req,res)=>{
        try{
            const id = req.query.id;
            const order = await orderModel.find({_id:id});
            updateStockLevel(id,value,order[0].quantity);
            UpdatestockValueHistory(order[0].quantity);
            const response = await orderModel.updateOne({_id:id},{status:value})
            if(!response.matchedCount){
                return res.status(404).json({
                    success:false,
                    message:"cannot find the order"
                })
            }else{
                return res.status(200).json({
                    success: true,
                    message: "order updated successfully"
                });
            }
        }catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }    
}