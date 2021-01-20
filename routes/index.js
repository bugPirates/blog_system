const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

router.route("/register")
.get((req, res) => {
    res.render("register", { errors: null });
})
.post([
    body("username").not().isEmpty().withMessage("Enter a valid username").escape(),
    body("email").not().isEmpty().withMessage("Enter a valid email")
                    .isEmail().withMessage("your email is not valid").escape(),
    body("password").not().isEmpty().withMessage("Enter a valid password")
                    .isLength({ min:8 }).withMessage("The password musbe at least 8 characters long!"),
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
        res.render("register", { errors: result.errors });
    }
});

module.exports = router;