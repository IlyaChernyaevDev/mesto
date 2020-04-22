class UserInfo {

  constructor(popup, userName, userDescription, userAvatar, userInfoBlock, api) {
    this.popup = popup;
    this.userName = userName;
    this.userDescription = userDescription;
    this.userAvatar = userAvatar;
    this.userInfoBlock = userInfoBlock;
    this.api = api;
    this.profileName = '';
    this.profileDescription = '';
    this.profileAvatar = '';
    this.userId = '';
    this.formName = '';
    this.formDescription = '';
  }

  setUserInfo() {
    this.api.getUserInfo()
      .then(data => {
        this.profileName = data.name;
        this.profileDescription = data.about;
        this.profileAvatar = data.avatar;
        this.userId = data._id;

        this.userName.textContent = this.profileName;
        this.userDescription.textContent = this.profileDescription;
        this.userAvatar.style.backgroundImage = `url(${this.profileAvatar}`;
        this.userInfoBlock.setAttribute('id', this.userId);
      })
      .catch(err => console.log(`Ошибка загрузки данных пользователся. Код ошибки: ${err}`));




  }

  updateUserInfo(event) {
    event.preventDefault();

    this.api.editUserInfo(this.formName.value, this.formDescription.value)
      .then(data => {
        this.profileName = data.name;
        this.profileDescription = data.about;
        this.profileAvatar = data.avatar;

        this.userName.textContent = this.profileName;
        this.userDescription.textContent = this.profileDescription;
        this.popup.close();
      })
      .catch(err => console.log(`Ошибка обновления данных пользователя. Код ошибки: ${err}`));
  }

  fillInputEditPopup() {
    this.formName = document.forms.edit.elements.name;
    this.formDescription = document.forms.edit.elements.description;

    this.formName.value = this.profileName;
    this.formDescription.value = this.profileDescription;
  }

}