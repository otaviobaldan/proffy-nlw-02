document.querySelector("#add-time").addEventListener("click", cloneFields);

function cloneFields() {
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
    const fieldsToModify = newFieldContainer.querySelectorAll("input");
    fieldsToModify.forEach(field => {
        field.value = "";
    });
    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}