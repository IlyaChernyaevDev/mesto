class Card {
    
    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
          }
    }

    remove(event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            event.target.parentElement.parentElement.remove();
          }
    }

    create(card) {
        const template = `<div class="place-card" id="${card._id}">
                            <div class="place-card__image" style="background-image: url(${card.link})">
                                <button class="place-card__delete-icon"></button>
                            </div>
                            <div class="place-card__description">
                                <h3 class="place-card__name">${card.name}</h3>
                                <div class="place-card__like-container">
                                    <button class="place-card__like-icon place-card__like-container_like-icon"></button>
                                    <p class="place-card__like-container_number">${card.likes.length}</p>
                                </div>
                            </div>
                        </div>`
        return template;
    }
}