import Validator from 'validator'
import isEmpty from 'is-empty'


const validateLoginInput = (data) => {

    const errors = {}

    // Login with email and password
    data.email = !isEmpty(data.email) ? data.email : "",
    data.password = !isEmpty(data.password) ? data.password : ""

    // Email Check
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email filed is required"
    } else if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid"
    }

    // Password check
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password filed is required"
    }
    return {
        errors,
        isValid : isEmpty(errors)
    }
}


export default validateLoginInput