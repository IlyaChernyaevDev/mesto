export class CardList {
    constructor(cardList, card, popup, api) {
        this.cardList = cardList;
        this.card = card;
        this.popup = popup;
        this.api = api;
    }

    addCard(event) {

        event.preventDefault();

        let newCard = {
            name: document.forms.card.elements.title.value,
            link: document.forms.card.elements.link.value,
            likes: []
        };

        this.api.addNewCard(newCard)
            .then(data => {
                this.cardList.insertAdjacentHTML('beforeend', this.card.create(data));
                this.popup.close();
            })
            .catch(err => console.log(`Ошибка добавления новой карточки. Код ошибки: ${err}`));

        
    }

    render(initialCards) {
        const cardContainer = this.cardList;
        const objCard = this.card;
        initialCards.forEach(function (card) {
            cardContainer.insertAdjacentHTML('beforeend',objCard.create(card));
        });

    }

    loadingCard() {
        this.api.getInitialCards()
            .then(data => {
                this.render(data);
            })
            .catch(err => console.log(`Ошибка загрузки карточек. Код ошибки: ${err}`));
    }


}
