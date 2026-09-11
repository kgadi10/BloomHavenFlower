/* ==========================================================
   BLOOM HAVEN FLOWERS
   JavaScript File
   Part 2 - Form Validation and Interaction
   ========================================================== */


/* ==========================================================
   1. ENQUIRY FORM
   ========================================================== */

const enquiryForm = document.getElementById("enquiryForm");


/* Only runs if the enquiry form exists on the page */
if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        /* Prevents the form from submitting before validation */
        event.preventDefault();


        /* Gets the customer's information */
        const name =
            document.getElementById("enquiryName").value.trim();

        const email =
            document.getElementById("enquiryEmail").value.trim();

        const phone =
            document.getElementById("enquiryPhone").value.trim();

        const flowerType =
            document.getElementById("flowerType").value;

        const eventDate =
            document.getElementById("eventDate").value;

        const message =
            document.getElementById("enquiryMessage").value.trim();


        /* Gets the error message areas */
        const nameError =
            document.getElementById("enquiryNameError");

        const emailError =
            document.getElementById("enquiryEmailError");

        const phoneError =
            document.getElementById("enquiryPhoneError");

        const flowerTypeError =
            document.getElementById("flowerTypeError");

        const eventDateError =
            document.getElementById("eventDateError");

        const messageError =
            document.getElementById("enquiryMessageError");

        const response =
            document.getElementById("enquiryResponse");


        /* Clears previous error messages */
        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        flowerTypeError.textContent = "";
        eventDateError.textContent = "";
        messageError.textContent = "";
        response.textContent = "";


        /* Assumes the form is valid */
        let valid = true;


        /* Checks the name */
        if (name.length < 2) {

            nameError.textContent =
                "Please enter your full name.";

            valid = false;
        }


        /* Checks the email */
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;
        }


        /* Checks the phone number */
        if (!/^[0-9]{10}$/.test(phone)) {

            phoneError.textContent =
                "Please enter a 10-digit phone number.";

            valid = false;
        }


        /* Checks the selected flower arrangement */
        if (flowerType === "") {

            flowerTypeError.textContent =
                "Please select a flower arrangement.";

            valid = false;
        }


        /* Checks the event date */
        if (eventDate === "") {

            eventDateError.textContent =
                "Please select an event date.";

            valid = false;
        }


        /* Checks the message */
        if (message.length < 10) {

            messageError.textContent =
                "Please provide at least 10 characters.";

            valid = false;
        }


        /* Runs when everything is valid */
        if (valid) {

            response.textContent =
                "Thank you, " +
                name +
                "! Your enquiry for " +
                flowerType +
                " has been received. We will contact you about availability and pricing.";


            response.style.backgroundColor = "#d9f2d9";

            response.style.color = "#2f5233";


            /* Clears the form after successful submission */
            enquiryForm.reset();
        }

    });

}


/* ==========================================================
   2. CONTACT FORM
   ========================================================== */

const contactForm = document.getElementById("contactForm");


/* Only runs if the contact form exists */
if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        /* Stops normal form submission */
        event.preventDefault();


        /* Gets the customer's information */
        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const phone =
            document.getElementById("contactPhone").value.trim();

        const messageType =
            document.getElementById("messageType").value;

        const message =
            document.getElementById("contactMessage").value.trim();


        /* Gets error message areas */
        const nameError =
            document.getElementById("contactNameError");

        const emailError =
            document.getElementById("contactEmailError");

        const phoneError =
            document.getElementById("contactPhoneError");

        const typeError =
            document.getElementById("messageTypeError");

        const messageError =
            document.getElementById("contactMessageError");

        const response =
            document.getElementById("contactResponse");


        /* Clears old errors */
        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        typeError.textContent = "";
        messageError.textContent = "";
        response.textContent = "";


        /* Assumes the form is valid */
        let valid = true;


        /* Name validation */
        if (name.length < 2) {

            nameError.textContent =
                "Please enter your full name.";

            valid = false;
        }


        /* Email validation */
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;
        }


        /* Phone validation */
        if (!/^[0-9]{10}$/.test(phone)) {

            phoneError.textContent =
                "Please enter a 10-digit phone number.";

            valid = false;
        }


        /* Message type validation */
        if (messageType === "") {

            typeError.textContent =
                "Please select a message type.";

            valid = false;
        }


        /* Message validation */
        if (message.length < 10) {

            messageError.textContent =
                "Please enter at least 10 characters.";

            valid = false;
        }


        /* If everything is valid */
        if (valid) {

            /*
                Creates the email subject.
            */
            const subject = encodeURIComponent(
                "Bloom Haven Flowers - " + messageType
            );


            /*
                Creates the email body.
            */
            const body = encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\nPhone: " + phone +
                "\nMessage Type: " + messageType +
                "\n\nMessage:\n" + message
            );


            /*
                Opens the customer's email application.
                The information is automatically added to the email.
            */
            window.location.href =
                "mailto:info@bloomhavenflowers.co.za" +
                "?subject=" +
                subject +
                "&body=" +
                body;


            response.textContent =
                "Your message has been prepared for email.";

            response.style.backgroundColor =
                "#d9f2d9";

            response.style.color =
                "#2f5233";
        }

    });

}