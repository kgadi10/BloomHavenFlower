/* ==========================================================
   BLOOM HAVEN FLOWERS - PART 3 JAVASCRIPT
   Includes product search, sorting, image lightbox,
   enquiry form validation and AJAX contact form submission.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------
       1. PRODUCT SEARCH, FILTER AND SORT
       ------------------------------------------------------ */
    const productGrid = document.querySelector(".products-grid");
    const searchInput = document.getElementById("productSearch");
    const sortSelect = document.getElementById("productSort");
    const searchStatus = document.getElementById("productSearchStatus");

    if (productGrid && searchInput && sortSelect) {
        const cards = Array.from(productGrid.querySelectorAll(".product-card"));

        const filterAndSort = () => {
            const query = searchInput.value.trim().toLowerCase();

            const visibleCards = cards.filter(card => {
                const cardText = card.textContent.toLowerCase();
                const imageAlt = (card.querySelector("img")?.alt || "").toLowerCase();
                const matches = cardText.includes(query) || imageAlt.includes(query);

                card.hidden = !matches;
                return matches;
            });

            visibleCards.sort((a, b) => {
                const aName = a.querySelector("h2")?.textContent.trim().toLowerCase() || "";
                const bName = b.querySelector("h2")?.textContent.trim().toLowerCase() || "";

                if (sortSelect.value === "az") {
                    return aName.localeCompare(bName);
                }

                if (sortSelect.value === "za") {
                    return bName.localeCompare(aName);
                }

                return cards.indexOf(a) - cards.indexOf(b);
            });

            visibleCards.forEach(card => productGrid.appendChild(card));

            if (searchStatus) {
                searchStatus.textContent = visibleCards.length
                    ? `Showing ${visibleCards.length} of ${cards.length} flower products.`
                    : "No products match your search. Try another word.";
            }
        };

        searchInput.addEventListener("input", filterAndSort);
        sortSelect.addEventListener("change", filterAndSort);
    }

    /* ------------------------------------------------------
       2. PRODUCT IMAGE LIGHTBOX
       Allows visitors to enlarge product images.
       ------------------------------------------------------ */
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeLightbox = document.getElementById("closeLightbox");

    if (productGrid && lightbox && lightboxImage) {
        productGrid.querySelectorAll(".product-card img").forEach(img => {
            img.tabIndex = 0;
            img.setAttribute("role", "button");
            img.setAttribute("aria-label", `Enlarge image: ${img.alt}`);

            img.addEventListener("click", () => {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;

                if (lightboxCaption) {
                    lightboxCaption.textContent = img.alt;
                }

                if (typeof lightbox.showModal === "function") {
                    lightbox.showModal();
                } else {
                    lightbox.setAttribute("open", "");
                }
            });

            img.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    img.click();
                }
            });
        });

        closeLightbox?.addEventListener("click", () => {
            if (typeof lightbox.close === "function") {
                lightbox.close();
            } else {
                lightbox.removeAttribute("open");
            }
        });

        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                if (typeof lightbox.close === "function") {
                    lightbox.close();
                } else {
                    lightbox.removeAttribute("open");
                }
            }
        });
    }

    /* ------------------------------------------------------
       3. SHARED FORM VALIDATION FUNCTIONS
       ------------------------------------------------------ */
    const emailIsValid = value =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const phoneIsValid = value =>
        /^[0-9]{10}$/.test(value);

    const showError = (id, message) => {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = message;
        }
    };

    const clearErrors = ids => {
        ids.forEach(id => showError(id, ""));
    };

    /* ------------------------------------------------------
       4. ENQUIRY FORM VALIDATION AND RESPONSE
       Shows an illustrative starting estimate based on the
       selected arrangement. These are not live prices.
       ------------------------------------------------------ */
    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        const errorIds = [
            "enquiryNameError",
            "enquiryEmailError",
            "enquiryPhoneError",
            "flowerTypeError",
            "eventDateError",
            "enquiryMessageError"
        ];

        // Prevent selecting a past event date.
        const eventDateInput = document.getElementById("eventDate");

        if (eventDateInput) {
            const today = new Date();
            const localToday = new Date(
                today.getTime() - today.getTimezoneOffset() * 60000
            ).toISOString().slice(0, 10);

            eventDateInput.min = localToday;
        }

        enquiryForm.addEventListener("submit", event => {
            event.preventDefault();
            clearErrors(errorIds);

            const name = document.getElementById("enquiryName").value.trim();
            const email = document.getElementById("enquiryEmail").value.trim();
            const phone = document.getElementById("enquiryPhone").value.trim();
            const flowerType = document.getElementById("flowerType").value;
            const eventDate = document.getElementById("eventDate").value;
            const message = document.getElementById("enquiryMessage").value.trim();
            const response = document.getElementById("enquiryResponse");

            let valid = true;

            if (name.length < 2) {
                showError("enquiryNameError", "Please enter your full name (at least 2 characters).");
                valid = false;
            }

            if (!emailIsValid(email)) {
                showError("enquiryEmailError", "Please enter a valid email address.");
                valid = false;
            }

            if (!phoneIsValid(phone)) {
                showError("enquiryPhoneError", "Enter a 10-digit phone number without spaces.");
                valid = false;
            }

            if (!flowerType) {
                showError("flowerTypeError", "Please select an arrangement.");
                valid = false;
            }

            if (!eventDate) {
                showError("eventDateError", "Please select an event date.");
                valid = false;
            } else {
                const today = new Date();
                const localToday = new Date(
                    today.getTime() - today.getTimezoneOffset() * 60000
                ).toISOString().slice(0, 10);

                if (eventDate < localToday) {
                    showError("eventDateError", "Please choose today or a future date.");
                    valid = false;
                }
            }

            if (message.length < 10) {
                showError("enquiryMessageError", "Please enter at least 10 characters describing your requirements.");
                valid = false;
            }

            if (!valid) {
                response.textContent = "Please correct the highlighted fields and submit again.";
                response.className = "form-response form-error";
                return;
            }

            // Example estimates for a student prototype, not confirmed live prices.
            const estimates = {
                "Birthday Bouquets": "Estimated starting price: R350.",
                "Wedding Flowers": "Estimated starting price: R1,500; final cost depends on the number of arrangements.",
                "Sympathy Flowers": "Estimated starting price: R450.",
                "Custom Bouquets": "Estimated starting price: R400."
            };

            response.textContent =
                `Thank you, ${name}. Your enquiry is valid. ` +
                `${estimates[flowerType] || "Pricing will be discussed."} ` +
                `Your requested date is ${eventDate}. These are illustrative estimates only; ` +
                "availability and final pricing must be confirmed by the florist.";

            response.className = "form-response form-success";
            enquiryForm.reset();
        });
    }

    /* ------------------------------------------------------
       5. CONTACT FORM VALIDATION AND AJAX SUBMISSION
       Replace the sample email below with an email address
       you control. FormSubmit may require first-time
       recipient activation before messages can be delivered.
       ------------------------------------------------------ */
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        const errorIds = [
            "contactNameError",
            "contactEmailError",
            "contactPhoneError",
            "messageTypeError",
            "contactMessageError"
        ];

        contactForm.addEventListener("submit", async event => {
            event.preventDefault();
            clearErrors(errorIds);

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const phone = document.getElementById("contactPhone").value.trim();
            const type = document.getElementById("messageType").value;
            const message = document.getElementById("contactMessage").value.trim();
            const response = document.getElementById("contactResponse");

            let valid = true;

            if (name.length < 2) {
                showError("contactNameError", "Please enter your full name.");
                valid = false;
            }

            if (!emailIsValid(email)) {
                showError("contactEmailError", "Please enter a valid email address.");
                valid = false;
            }

            if (!phoneIsValid(phone)) {
                showError("contactPhoneError", "Enter a 10-digit phone number without spaces.");
                valid = false;
            }

            if (!type) {
                showError("messageTypeError", "Please select a message type.");
                valid = false;
            }

            if (message.length < 10) {
                showError("contactMessageError", "Please enter at least 10 characters.");
                valid = false;
            }

            if (!valid) {
                response.textContent = "Please correct the highlighted fields and try again.";
                response.className = "form-response form-error";
                return;
            }

            response.textContent = "Sending your message…";
            response.className = "form-response";

            // IMPORTANT: Replace this sample recipient with your real email.
            const recipientEmail = "info@bloomhavenflowers.co.za";
            const endpoint = `https://formsubmit.co/ajax/${recipientEmail}`;

            const payload = {
                name: name,
                email: email,
                phone: phone,
                message_type: type,
                message: message,
                _subject: `Bloom Haven Flowers - ${type}`,
                _template: "table"
            };

            try {
                const result = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                if (!result.ok) {
                    throw new Error("The email service returned an error.");
                }

                const data = await result.json();

                if (data.success === "false" || data.success === false) {
                    throw new Error(data.message || "The email service could not accept the message.");
                }

                response.textContent =
                    "Thank you. Your message has been submitted to the email service. " +
                    "If this is the first submission, the recipient may need to activate the email address.";

                response.className = "form-response form-success";
                contactForm.reset();

            } catch (error) {
                // Fallback: prepare the message in the visitor's email application.
                const subject = encodeURIComponent(`Bloom Haven Flowers - ${type}`);
                const body = encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n` +
                    `Phone: ${phone}\n` +
                    `Message type: ${type}\n\n` +
                    `Message:\n${message}`
                );

                response.textContent =
                    "The online email service could not be reached. " +
                    "Your email application will open so you can send the message manually.";

                response.className = "form-response form-error";

                window.location.href =
                    `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
            }
        });
    }
});