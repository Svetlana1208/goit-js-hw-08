import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form  textarea'),
  };
  
const formData = {};
let savedMessage;
let parsedMessage;

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onDataInput, 500));

populateTextarea();

function onFormSubmit(evt) {
    savedMessage = localStorage.getItem("feedback-form-state");
    parsedMessage = JSON.parse(savedMessage);
    console.log(parsedMessage);
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
    for (let q in formData) {
        delete formData[q] 
        };
}

function onDataInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
};

function populateTextarea () {
    savedMessage = localStorage.getItem("feedback-form-state");
    parsedMessage = JSON.parse(savedMessage);

    if (savedMessage && savedMessage.includes("email")) {
        refs.input.value = parsedMessage.email;
      }
    
    if (savedMessage && savedMessage.includes("message")) {
        refs.textarea.value = parsedMessage.message;
    }
}
