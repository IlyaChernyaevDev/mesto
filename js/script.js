(function () {

  const mainPopup = document.querySelector('.popup');
  const cardList = document.querySelector('.places-list');
  const editProfileButton = document.querySelector('.user-info__button_edit-profile');
  const openNewCardFormButton = document.querySelector('#openCardPopup');
  const userInfoBlock = document.querySelector('.user-info');
  const userName = document.querySelector('.user-info__name');
  const userDescription = document.querySelector('.user-info__job');
  const userAvatar = document.querySelector('.user-info__photo');
  const textError = {
    validationLenght: 'Должно быть от 2 до 30 символов',
    validationNecessarily: 'Это обязательное поле',
    validationLink: 'Здесь должна быть ссылка'
  };
  const MAIN_URL = 'https://praktikum.tk/cohort8';
  const TOKEN = 'b1372024-e1ec-4a0b-b0a8-32d4b8e053a5';
  const api = new Api({
    baseUrl: MAIN_URL,
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    }
  });
  const card = new Card();
  const loudCard = new CardList(cardList, card, new Popup(mainPopup), api);
  const userInfo = new UserInfo(
    new Popup(mainPopup),
    userName,
    userDescription,
    userAvatar,
    userInfoBlock,
    api
  );
  const formValidator = new FormValidator(loudCard, userInfo, textError);
  const popup = new Popup(mainPopup, formValidator, userInfo);

  userInfo.setUserInfo();

  loudCard.loadingCard();

  cardList.addEventListener('click', (event) => {
    card.like(event);
  });

  cardList.addEventListener('click', (event) => {
    card.remove(event);
  });

  editProfileButton.addEventListener('click', (event) => {
    popup.open(event);

  });

  openNewCardFormButton.addEventListener('click', (event) => {
    popup.open(event);
  });

  cardList.addEventListener('click', (event) => {
    popup.open(event);
  });

}());