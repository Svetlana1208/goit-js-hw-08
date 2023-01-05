import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form  textarea'),
  };
  
const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onDataInput, 500));

populateTextarea();

function onFormSubmit(evt) {
    console.log(formData);
    evt.preventDefault();
    evt.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
}

function onDataInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
};

function populateTextarea () {
    const savedMessage = localStorage.getItem("feedback-form-state");
    const ggg = JSON.parse(savedMessage);

    if (savedMessage) {
        refs.input.value = ggg.email;
        refs.textarea.value = ggg.message;
      }
}