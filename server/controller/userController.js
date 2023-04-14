const userModel=require('../model/userModel')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')

module.exports={
    postSignup:async(req,res)=>{
        try {
            console.log(req.body);
        const {name,email,password,number}=req.body;
        const olderUser=await userModel.findOne({email:email})
        if(olderUser){
            res.json({err:true,message:'User already excist'})
        }else{
            let bcrypPassword=await bcrypt.hash(password,10)
            const newUser=await userModel.create({
                name:name,
                email:email,
                password:bcrypPassword,
                number:number,
                
            })
            const token=jwt.sign({
                id:newUser._id
            },
            "00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
            console.log(token);
            return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "none",
            }).json({ err: false ,message:'User registration success'});
        
        }
        } catch (error) {
            console.log(error);
            res.json({err:true,error,message:'Error occured'})
        }
    },
    postLogin:async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user=await userModel.findOne({email:email})
        if(user){
            let status= await bcrypt.compare(password,user.password)
            if(status){
                const token=jwt.sign({
                    id:user._id
                },"00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa");
                return res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: "none",
                }).json({ err: false ,message:'User login success'}); 
            }else{
                res.json({err:true,message:"Invalid email or password"})
            }
        }else{
            res.json({err:true,message:'No user found, please signup.'})
        }
    } catch (error) {
        res.json({err:true,error})
    }
    },
    getLogout:(req,res)=>{
        return res.cookie("token", '', {
            httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: "none",
        }).json({ err: false ,message:'Logged out successfully'}); 
    },
    checkAuth:async(req,res)=>{
        const token = req.cookies.token;
        if(token){
        const verifyJwt= jwt.verify(token,'00f3f20c9fc43a29d4c9b6b3c2a3e18918f0b23a379c152b577ceda3256f3ffa');
        const user=await userModel.findById(verifyJwt.id,{password:0})
        res.json({logged:true,details:user})
        }else{
         res.json({logged:false,err:true,message:'No token'})
        }
     },
}