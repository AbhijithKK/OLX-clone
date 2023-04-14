const productModel=require('../model/productModel')

module.exports={
    addProduct:async(req,res)=>{
        
        const {name,category,price,description}=req.body
        await productModel.create({
            name:name,
            category:category,
            price:price,
            description:description,
            image:req.file
        }).then((result)=>{
            res.json({err:false,result})
        }).catch(error=>{
            res.json({err:true,error})
        })
    },
    getProducts:async(req,res)=>{
        try{
            const search= req.query.search ?? ""
            const category= req.query.category ?? ""
             
            let products = await productModel.find({$or:[{name:new RegExp(search, 'i')},  {category:new RegExp(search, 'i')}], category:new RegExp(category, 'i')}).lean()
            res.json({err:false, products})
        }catch(err){
            res.json({err:true, err, message:"something went wrong"})
        }
    },
    getCategory:async(req,res)=>{
        try{
            let categories= await productModel.aggregate([{$group:{_id:"$category"}}]);
            return res.json({categories, err:false})
    
        }catch(err){
            console.log(err)
    
        }
    },
    viewProduct:async(req,res)=>{
       try {
        console.log(req.params.id);
        const product=await productModel.findOne({_id:req.params.id})
        res.json({err:false,product})
       } catch (error) {
        console.log(error);
        res.json({err:true,error})
       }
    }
}