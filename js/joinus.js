// Join Us form -> Google Form (back end)
// Entry IDs come from the Google Form's pre-filled link.

const CONFIG = {
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdRcuRZGzLjbVEYVWoW2SJCEIqmtq-DB_0zYjj-XAur3bN4lg/formResponse",

    entries: {
        fullname: "entry.31414593",
        email: "entry.928234848",
        phone: "entry.1662124608",
        dob: "entry.790732369",               // Date question
        gender: "entry.1035762172",         // Multiple choice question
        activities: "entry.1446018950"  // Checkboxes question
    }
};

const form = document.getElementById("joinForm");
const statusMessage = document.getElementById("form-status");
const submitButton = form.querySelector('button[type="submit"]');
const genderSelect = document.getElementById("gender");
const genderOther = document.getElementById("gender-other");

// Date of birth can't be in the future
document.getElementById("dob").max = new Date().toISOString().split("T")[0];

// Show a text box when "Other" is chosen
genderSelect.addEventListener("change", function () {
    const isOther = genderSelect.value === "Other";
    genderOther.hidden = !isOther;
    genderOther.required = isOther;
    if (!isOther) genderOther.value = "";
});

// Messages follow the chosen language (translations are in the lang folder)
function tr(text) {
    return window.STKi18n ? window.STKi18n.t(text) : text;
}

// Change the button text without removing its icon
function setButtonLabel(text) {
    const icon = submitButton.querySelector(".icon");
    submitButton.textContent = tr(text);
    if (icon) submitButton.insertBefore(icon, submitButton.firstChild);
}

function showStatus(message, type) {
    statusMessage.textContent = message ? tr(message) : "";
    statusMessage.className = type || "";
}

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Safety check: don't pretend to send if the entry IDs are not filled in yet
    const idsMissing = Object.values(CONFIG.entries).some(function (id) {
        return id.includes("REPLACE_ME");
    });
    if (idsMissing) {
        showStatus("This form is not connected yet. Please try again later.", "error");
        return;
    }

    const data = new FormData(form);
    const body = new URLSearchParams();

    body.append(CONFIG.entries.fullname, data.get("fullname").trim());
    body.append(CONFIG.entries.email, data.get("email").trim());
    body.append(CONFIG.entries.phone, data.get("phone").trim());

    // Gender: Google's "Other:" option needs a special value + text
    if (data.get("gender") === "Other") {
        body.append(CONFIG.entries.gender, "__other_option__");
        body.append(CONFIG.entries.gender + ".other_option_response",
            (data.get("gender-other") || "Other").trim());
    } else {
        body.append(CONFIG.entries.gender, data.get("gender"));
    }

    // Google Forms expects dates as separate year / month / day values
    const [year, month, day] = data.get("dob").split("-");
    body.append(CONFIG.entries.dob + "_year", year);
    body.append(CONFIG.entries.dob + "_month", String(Number(month)));
    body.append(CONFIG.entries.dob + "_day", String(Number(day)));

    // Checkboxes: repeat the same entry for every ticked option
    data.getAll("activities").forEach(function (activity) {
        body.append(CONFIG.entries.activities, activity);
    });

    submitButton.disabled = true;
    setButtonLabel("Sending...");
    showStatus("");

    try {
        // no-cors: Google does not let us read the response, so we can only
        // tell that the request was sent, not that Google accepted it.
        await fetch(CONFIG.formUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString()
        });

        form.reset();
        genderOther.hidden = true;
        showStatus("Thank you! Your details have been sent.", "success");
    } catch (error) {
        showStatus("Something went wrong. Please try again later.", "error");
    } finally {
        submitButton.disabled = false;
        setButtonLabel("Join Us");
    }
});
