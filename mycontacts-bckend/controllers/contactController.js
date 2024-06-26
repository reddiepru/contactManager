const asyncHandler= require("express-async-handler");
const Contact= require("../models/contactModel");
// Get all contacts
//@route GET /api/contacts
//@access public

const getContact= asyncHandler(async(req, res) => {
    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

// Get id contact
// @route GET /api/contacts

const getContactId= asyncHandler(async(req, res) => {
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

//Post contact
//@route POST /api/contacts

const postContact= asyncHandler(async(req, res) => {
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });
    res.status(200).json(contact);
});

//Update contact
//@route PUT /api/contacts
const putContact= asyncHandler(async(req, res) => {

    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if(contact.user_id.toString() !== req.user_id){
        res.status(403);
        throw new Error("User dont have permm to update other user")
    }

    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
    );

    res.status(200).json(updatedContact);
});

//Delete contact
const deleteContact = asyncHandler(async (req, res) => {
    try {
        const deletedContact = await Contact.findById(req.params.id);
        
        if (!deletedContact) {
            res.status(404).json({ message: "Contact Not Found" });
            return;
        }
        
        if (deletedContact.user_id.toString() !== req.user_id) {
            res.status(403);
            throw new Error("User doesn't have permission to delete this contact");
        }

        await Contact.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: "Contact Deleted", deletedContact });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});




module.exports= {getContact,getContactId,postContact,putContact,deleteContact};