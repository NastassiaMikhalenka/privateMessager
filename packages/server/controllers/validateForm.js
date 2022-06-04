const Yup = require("yup");

const formSchema = Yup.object({
    username: Yup.string().required("Username required")
        .min(6, "Username to short")
        .max(20, "Username to long"),
    password: Yup.string().required("Password required")
        .min(6, "Password to short")
        .max(20, "Password to long"),
});

const validateForm = (req, res) => {
    const formData = req.body;
    formSchema
        .validate(formData)
        .catch(err => {
            res.status(422).send();
            console.log(err.errors)
        })
        .then(valid => {
            if (valid) {
                console.log("form is good");
            }
        });
}

module.exports = validateForm;