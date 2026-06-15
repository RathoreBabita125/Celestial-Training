import { emailField, nameField, passwordField, phoneField } from "../constants/const";

export const validateUserInput=(userData:any, inputFields:string[])=>{

    //check fullname  valid
    if(inputFields.includes('fullName')){
        if(!userData.fullName || userData.fullName.trim()==='')
            throw new Error("Name is required");
        if (!nameField.test(userData.fullName))
            throw new Error("Only letters and space are allow");
    }

    //check email  valid
    if(inputFields.includes('email')){
        if(!userData.email || userData.email.trim()==='')
            throw new Error("Email is required");
        if (!emailField.test(userData.email))
            throw new Error("Please enter valid email");
    }

    //check password  valid
    if(inputFields.includes('password')){
        if (!userData.password || userData.password === "") 
            throw new Error("Password is required");
        if(!passwordField.test(userData.password))
            throw new Error("Password should contain at least one lowercase, one uppercase, one number and one symbol. Minimum length should be 8");
    }

    //check confim password valid
    if(inputFields.includes('confirmPassword')){
        if (!userData.confirmPassword || userData.confirmPassword === "") 
            throw new Error("Password does not match");
        if (userData.password != userData.confirmPassword)
            throw new Error("Password does not match");
    }
    
    //check phone valid
    if(inputFields.includes('phone')){
        if (!userData.phone || userData.phone === "")
            throw new Error("Phone number is required");
        if (!phoneField.test(userData.phone))
            throw new Error("Enter 10 valid digits contact number");
    }

    //check role valid
    if(inputFields.includes('role')){
        if(!userData.role || userData.role.trim() === "")
            throw new Error("Role field is required");
    }
}

