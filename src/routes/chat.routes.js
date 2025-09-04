const express = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller");
const { authUserMiddleware } = require("../middleware/auth.middleware");
const { createChat } = require("../controller/chat.controller");
const  router  = express.Router();


router.post("/", authUserMiddleware, createChat );


module.exports = router;