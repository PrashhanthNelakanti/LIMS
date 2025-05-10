const { connectToDatabase } = require('../../lib/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'POST': {
            return validate(req, res);
        }
    }
}

// Getting all posts.
async function validate(req, res) {
    const email =req.body.emailId;
    const otp =req.body.otp;
    console.log(req.body)
    try {
        let { db } = await connectToDatabase();
        let posts = await db
            .collection('info')
            .find({ email: email , otp: otp ,isActive: false}, { $exists: true }).toArray(function (err, doc){
                if (doc && doc.length)
                {
                    console.log(doc);
                    doc[0].otp='0' ;
                    doc[0].isActive=true;
                    updateUser(doc);
                    return res.json({
                        message: 'Sign-in SuccessFul',
                        success: true,
                    });
                }else{
                    return res.json({ 
                        message: 'Sign-in Failed',
                        success: false,
                    });
                }
            }); 
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Updating a post
 async function updateUser(req) {
    var myquery = {email:req[0].email};
    var newvalues = { $set: req[0] };
        let { db } = await connectToDatabase();
        let posts =  await db
            .collection('info')
            .updateOne(myquery, newvalues, function (err, res){
                if (err) throw err;
                console.log("1 document updated");
            }); 
        return 'User updated successfully';
}