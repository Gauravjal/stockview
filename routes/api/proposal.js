const express = require('express')
const Job = require('../../models/Job')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Proposal = require('../../models/Proposal');


const router = express.Router();



//GET api/posts
//Test route
//public route
router.post('/addproposal', auth,async (req, res) => {
    const {
        biddescription,
        days,
        bidprice,
        jobid,
    } = req.body;
    // console.log("")
    try{
        const proposalFields = {};
        console.log("JobId "+jobid)
        proposalFields.biduser = req.user.id;
        proposalFields.jobid = jobid;
        if (biddescription) proposalFields.biddescription = biddescription;
        if (days) proposalFields.days = days;
        if (bidprice) proposalFields.bidprice = bidprice;
        const newProposal = new Proposal(proposalFields);
        newProposal.save(err=>{
            if(err){
                console.log(err);
            }
            else{
                // console.log(newProposal._id)
                const proposal_id = newProposal._id;
                Job.updateOne({_id:jobid},{$push:{proposal:proposal_id}},{new:true},(err,output)=>{
                        if(err) console.log(err);
                        else{
                            console.log("Job bee updated with proposal");
                        }})
                // console.log(job);

                // Job.updateOne({ _id: jobid }, { $push: { proposal: proposal_id } }, (err, output) => {
                //     if (err) console.log(err);
                //     else {
                //         // console.log(output);
                //     }
                // })
            }
        })
       
        res.json({message:"proposal added successfully"});
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('!!post error in creating the proposal database!!!');
    }
});


router.get('/getproposal/:proposal_id', async (req, res) => {
    // const proposal_id = req.params.proposal_id;
    try {
        const proposal = await Proposal.findOne({_id:req.params.proposal_id})
        if (!proposal) {
            return res.status(404).json({ msg: 'Proposal not found' });
        }
        res.json(proposal);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Proposal not found' });
        }
        res.status(500).send('Server Error');
    }
});


// geting the proposal by the userId
//@access Private

router.get('/getproposals',auth, async (req, res) => {
    // const proposal_id = req.params.proposal_id;
    const user = req.user.id;
    try {
        const proposal = await Proposal.find({biduser:req.user.id}).populate('jobid',['jobName','description'])
        if (!proposal) {
            return res.status(404).json({ msg: 'Proposal not found' });
        }
        res.json(proposal);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Proposal not found' });
        }
        res.status(500).send('Server Error');
    }
});

// router.get('/')

module.exports = router;
