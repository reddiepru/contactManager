const express = require("express");
const router = express.Router();
const {getContact,getContactId, postContact, putContact, deleteContact}=require("../controllers/contactController");
const validateToken = require("../middlewares/validateTokenHander");

router.use(validateToken);
router.get("/", getContact);

router.get("/:id",getContactId);

router.post("/", postContact);

router.put("/:id",putContact );

router.delete("/:id", deleteContact);

module.exports = router;
