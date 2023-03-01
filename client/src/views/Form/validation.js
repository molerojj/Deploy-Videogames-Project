export const validation = (form) => {
    
    let errors = {}

    if(!form.name) {
        errors.name = "Name is required";
    } else if (!/^[a-zA-Z0-9 ]*$/.test(form.name)){
        errors.name = "The name cannot contain special characters";
    }

    if(!form.description){
        errors.description = "Description is required";
    }

    if(form.platforms.length < 1){
        errors.platforms = "Platforms is required";
    }
    
    

    if(!/^[0-5]+(.[0-9]{2})?$/.test(form.rating)){
        errors.rating = "The rating must be between 0 and 5 with two decimals";
    }
    return errors;
}