const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.get("/register")
.get((req, res) => {
    res.render("register");
})
.post([
    body("username").not().isEmpty().withMessage("Enter a valid username").escape(),
    body("email").not().isEmpty().withMessage("Enter a valid email")
                 .isEmail().withMessage("your email is not valid").escape(),
    body("password").not().isEmpty().withMessage("Enter a valid password"),
    body("confirm_password").custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error("the password doesn't match");
        }
        return true;
    })
], (req, res) => {
    console.log(req.body.username);
    const result = validationResult(req);
    if(!result.isEmpty()) {
        console.log(result.errors);
    }
});

module.exports = router;