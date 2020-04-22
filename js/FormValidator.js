class FormValidator {

    constructor(cardList, userInfo, textError) {
        this.cardList = cardList;
        this.userInfo = userInfo;
        this.textError = textError;
        this.buttonChecker = {};
    }

    // Функция добавления обработчиков
    setEventListeners (form) {

        const formElements = Array.from(form.elements);
        formElements.forEach(elem => {
            switch (elem.type) {

            case 'text':
                form.addEventListener('input', (event) => {
                    this.checkInputValidity(event.target);
                });
                break;
            case 'submit':
                if (elem.id === 'popup-button-add') {
                form.addEventListener('submit', (event) => {
                    this.cardList.addCard(event);
                });
                break;
                } else if (elem.id === 'popup-button-save') {
                form.addEventListener('submit', (event) => {
                    this.userInfo.updateUserInfo(event);
                });
                break;
                }
            case 'url':
                form.addEventListener('input', (event) => {
                    this.checkInputValidity(event.target);
                });
                break;
            }
        });
    }

    //Функция меняющая состояние кнопки сабмита
    setSubmitButtonState (formReady, eventId) {
        // Оставил эти переменные, т.к. элементы появляются только во время открытия попапа.
        const addCardButton = document.querySelector('#popup-button-add');
        const saveСhangesProfileButton = document.querySelector('.popup__button_save');
        let button = '';

        if (eventId === 'nameProfile' || eventId === 'descriptionProfile') {
            this.buttonChecker[eventId] = formReady;
            button = saveСhangesProfileButton;
        } else if (eventId === 'namePlace' || eventId === 'urlPlace') {
            this.buttonChecker[eventId] = formReady;
            button = addCardButton;
        }

        if (Object.keys(this.buttonChecker).length === 1 && this.buttonChecker[eventId] === true) {
            this.buttonActivate(button);
        } else if ((this.buttonChecker.nameProfile && this.buttonChecker.descriptionProfile) || (this.buttonChecker.namePlace && this.buttonChecker.urlPlace)) {
            this.buttonActivate(button);
        } else{
            this.buttonDeactivate(button);
        }
    }

    //Функция валидации поля
    checkInputValidity (eventTarget) {
        const errorElement = document.querySelector(`#error-${eventTarget.name}`);

        if (eventTarget.validity.valueMissing) {
            errorElement.textContent = this.textError.validationNecessarily;
            this.setSubmitButtonState(false, eventTarget.id);
        }
        if (eventTarget.validity.tooShort) {
            errorElement.textContent = this.textError.validationLenght;
            this.setSubmitButtonState(false, eventTarget.id);
        }
        if (eventTarget.validity.typeMismatch) {
            errorElement.textContent = this.textError.validationLink;
            this.setSubmitButtonState(false, eventTarget.id);
        }
        if (eventTarget.checkValidity()) {
            errorElement.textContent = '';
            this.setSubmitButtonState(true, eventTarget.id);
        }

    }

    buttonDeactivate (button)  {
        button.setAttribute('disabled', true);
        button.classList.remove('popup__button_active');
    }

    buttonActivate (button)  {
        button.removeAttribute('disabled');
        button.classList.add('popup__button_active');
    }
}
