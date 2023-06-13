function showMessage(message, messageType) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;

    if (messageType === "success") {
        messageElement.style.color = "green";
    } else if (messageType === "failed") {
        messageElement.style.color = "red";
    } 
}

function postFormData(event) {
    event.preventDefault(); // avoid form action

    const formData = new FormData(event.target);
    const nombre = formData.get("nombre");

    fetch("/api/v1/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" //Read json data
        },
        body: JSON.stringify({ nombre: nombre })
    })
    .then(response => {
        if (response.ok) {  
            showMessage("POST SUCCESS", "success");
        } else {
            console.log("Error en la solicitud");
            showMessage("POST FAILED", 'failed')
        }
    })
    .catch(error => {
        console.log(error);
    });
}

document.getElementById("uen").addEventListener("submit", postFormData);
