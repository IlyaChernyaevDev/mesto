export class Popup {
    constructor(mainPopup, formValidator, userInfo) {
        this.mainPopup = mainPopup;
        this.formValidator = formValidator;
        this.userInfo = userInfo;
    }

    open(event) {

        if(event.target.classList.contains('user-info__button')) {

            this.mainPopup.insertAdjacentHTML('beforeend', this.newCardPopupTemplate());

            this.mainPopup.classList.add('popup_is-opened');

            this.formValidator.setEventListeners(document.forms.card);
            
            this.setupCloseEventListener();

        }

        if(event.target.classList.contains('user-info__button_edit-profile')) {

            this.mainPopup.insertAdjacentHTML('beforeend', this.editPopupTemplate());

            this.mainPopup.classList.add('popup_is-opened');
            
            this.userInfo.fillInputEditPopup();

            this.formValidator.setEventListeners(document.forms.edit);
            
            this.setupCloseEventListener();
            
        }

        if(event.target.classList.contains('place-card__image')) {

            this.mainPopup.insertAdjacentHTML('beforeend', this.imgPopupTemplate());

            this.setupImg(event);

            this.mainPopup.classList.add('popup_is-opened');

            this.setupCloseEventListener();

        }
    }

    close() {
        this.mainPopup.classList.remove('popup_is-opened');
        this.mainPopup.lastElementChild.remove();
    }


    setupImg(event) {
        let backImg = event.target.style.backgroundImage;
        backImg = backImg.slice(5, backImg.length - 2);
        document.querySelector('.popup__img-full-screen').src = backImg;
    }

    setupCloseEventListener() {
        // Оставил этe переменную, т.к. элемент появляются только во время открытия попапа.
        const closeButton = document.querySelector('.popup__close');

        document.addEventListener('keyup', this.keyHandler.bind(this), {once: true});

        closeButton.addEventListener('click',  this.clickHandler.bind(this),  {once: true});
    }

    keyHandler(event) {
        if(event.keyCode === 27 && this.mainPopup.lastElementChild) {
            this.close();
        }
    }

    clickHandler() {
        this.close();
    }

    imgPopupTemplate() {
        const tamplate =    `<div class="popup__content popup__content_img">
                                <button class="popup__close popup__close_img-full-screen"></button>
                                <img class="popup__img-full-screen" alt="">
                            </div>`;
        return tamplate;
    }

    editPopupTemplate() {
        const tamplate =    `<div class="popup__content">
                                <button class="popup__close popup__close_edit-profile"></button>
                                <h3 class="popup__title">Редактировать профиль</h3>
                                <form class="popup__form" name="edit" novalidate id="editProfile">
                                    <input id="nameProfile" type="text" name="name" class="popup__input popup__input_type_name" placeholder="Имя" required minlength="2" maxlength="30">
                                    <span class="popup__error" id="error-name"></span>
                                    <input id="descriptionProfile" type="text" name="description" class="popup__input popup__input_type_description" placeholder="О себе" required minlength="2" maxlength="30">
                                    <span class="popup__error" id="error-description"></span>
                                    <button type class="button popup__button popup__button_save popup__button_active" id="popup-button-save">Сохранить</button>
                                </form>
                            </div>`;
        return tamplate;
    }

    newCardPopupTemplate() {
        const tamplate =    `<div class="popup__content">
                                <button class="popup__close popup__close_new-card"></button>
                                <h3 class="popup__title">Новое место</h3>
                                <form class="popup__form" name="card" novalidate id="addNewPlace">
                                    <input id="namePlace" type="text" name="title" class="popup__input popup__input_type_name" placeholder="Название" required minlength="2" maxlength="30">
                                    <span class="popup__error" id="error-title"></span>
                                    <input id="urlPlace" required type="url" name="link" class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
                                    <span class="popup__error" id="error-link"></span>
                                    <button type class="button popup__button" id="popup-button-add" disabled>+</button>
                                </form>
                            </div>`;
        return tamplate;
    }

}
