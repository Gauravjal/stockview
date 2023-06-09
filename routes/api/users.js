const express=require('express')
//connect to express router
const router=express.Router();
//pull express validator
const {check,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
//Import json web token
const jwt=require('jsonwebtoken');
//import User schema
const User=require('../../models/User');
const auth=require('../../middleware/auth')
//GET api/users
//Register user
//public route
router.post('/'
,[
    //check if name field in the request.body is not empty
    check('username','Username is required').not().isEmpty(),
    //check email in the request.body is valid email
    check('email','Please include a valid email').isEmail(),
    //check if password field in request.body is at least 6 characters long
    check('password','Password should be at least 6 characters long').isLength({min:6})
]
,async (req,res)=>{
    //check the errors in req.body
    console.log(req.body);
    const errors=validationResult(req);
    //Check errors are not empty
    if(!errors.isEmpty())
    return res.status(400).json({
        errors:errors.array()
    });

    //destructing req.body 
    const {username,email,password}=req.body;
    
    try{
        //find user if same email already exists
        let user=await User.findOne({email});
        if(user)
        {
            res.status(400).json({
                errors:[{
                    msg:'User already exists'
                }]
            });
        }
    // }catch(err)
    // {
    //     //display error message
    //     console.log(err.message);
    //     // set status 500 Internal server error
    //     res.status(500).send('Server error');
    // }
    //see if user exists
    //Get users gravatar
    const avatar="default.png"
    const stocks=[{stockSymbol:"AAPL"}]
    user=new User({
        username,
        email,
        avatar,
        password,
        stocks
    });

    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(password,salt);
    await user.save();
    const payload={
        user:{
            id:user.id
        }
    }

    jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500);
    }
  }
);

//@route    PUT api/user/stocks
//@desc     Add stock
//@access   private

router.put('/stocks',[auth,[
]],async(req,res)=>{
    try{
        // const errors=validationResult(req);
        // if(!errors.isEmpty())
        // {
        //     return res.status(400).json({errors:errors.array()});
        // }
        const stockSymbol=req.body.stockSymbol;
        const newStock={
            stockSymbol
        }

        try{
            // const user=await User.findOne({
            //     user:req.user.id
            // });
            _id=req.user.id;
            let user = await User.findOne({ _id });
             console.log("new",newStock)
            user.stocks.unshift(newStock);
            await user.save();
            res.json(user);
        } catch(err){
            console.error(err.message);
            res.status(500).send();
        }
    }
    catch(err){
        if(err.kind=='ObjectId')
        return res.status(400).json({
            msg:'User not found'
        });
    
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

)


module.exports = router;