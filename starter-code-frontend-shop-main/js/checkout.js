function validate() {
    var error = 0;
    var errorMsg = "";
    
    // Get the input fields
    var fName = document.getElementById("fName");
    var fLastN = document.getElementById("fLastN");
    var fEmail = document.getElementById("fEmail");
    var fPassword = document.getElementById("fPassword");
    var fPhone = document.getElementById("fPhone");
    
    // Get the error elements
    var errorName = document.getElementById("errorName");
    var errorLastN = document.getElementById("errorLastN");
    var errorEmail = document.getElementById("errorEmail");
    var errorPassword = document.getElementById("errorPassword");
    var errorPhone = document.getElementById("errorPhone");
    
    // Reset all previous error messages
    resetErrors();

    // Validate first name (only letters, min 3 characters)
    if (!/^[a-zA-Z]{3,}$/.test(fName.value)) {
        showError(fName, errorName);
        error++;
    }

    // Validate last name (only letters, min 3 characters)
    if (!/^[a-zA-Z]{3,}$/.test(fLastN.value)) {
        showError(fLastN, errorLastN);
        error++;
    }

    // Validate email (must be in email format)
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(fEmail.value)) {
        showError(fEmail, errorEmail);
        error++;
    }

    // Validate password (must include letters and numbers, min 4 and max 8 characters)
    if (!/(?=.*[a-zA-Z])(?=.*\d).{4,8}/.test(fPassword.value)) {
        showError(fPassword, errorPassword);
        error++;
    }

    // Validate phone number (only 9 digits)
    if (!/^\d{9}$/.test(fPhone.value)) {
        showError(fPhone, errorPhone);
        error++;
    }

    // If there are errors, prevent form submission
    if (error > 0) {
        return false;
    } else {
        alert("Form submitted successfully!");
        return true;
    }
}

function showError(input, errorElement) {
    input.classList.add("is-invalid");
    errorElement.style.display = "block";
}

function resetErrors() {
    // Reset error messages and styles
    var inputs = document.querySelectorAll(".form-control");
    inputs.forEach(function(input) {
        input.classList.remove("is-invalid");
    });

    var errorMessages = document.querySelectorAll(".invalid-feedback");
    errorMessages.forEach(function(message) {
        message.style.display = "none";
    });
}
