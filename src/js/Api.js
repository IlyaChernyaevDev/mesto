export class Api {

    constructor(options) {
        this.options = options;
    }

    getUserInfo() {

        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: {
                authorization: this.options.headers.authorization
            }
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(err => {
                console.log(`Ошибка: ${err}`);
                throw err;
            });
    }

    getInitialCards() {

        return fetch(`${this.options.baseUrl}/cards`, {
            headers: {
                authorization: this.options.headers.authorization
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(err => {
            console.log(`Ошибка: ${err}`);
            throw err;
        });
    }

    editUserInfo(profileName, profileDescription) {

        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: profileName,
                about: profileDescription
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(err => {
            console.log(`Ошибка: ${err}`);
            throw err;
        });
    }

    addNewCard(newCard) {

        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
        })
            .then(res => res.ok ? res.json() : Promise.reject(res.status))
            .catch(err => {
                console.log(`Ошибка: ${err}`);
                throw err;
            });
    }

}
