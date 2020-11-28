import Validator from 'validator'
import isEmpty from 'is-empty'

const validateRegisterInput = (data, req) => {
    
    const errors = {}

    // Register with name, email, password and confirm password
    // convert empty filed to string
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password: "";
    data.password2 = !isEmpty(data.password2) ? data.password2: "";

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required"
    }

    // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

    // Email checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password filed is required"   
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password = "Confirm password is required"
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Password must be at least 6 characters"
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords not match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
} 

export default validateRegisterInput;
