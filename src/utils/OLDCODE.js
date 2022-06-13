
<div>

    <div className="modal modal_add-card">
        <div className="modal__box">
            <form className="modal__form modal__form_type_new-place" name="edit-form-add">
                <button className="modal__close-button modal__close-button_type_new-place" id="modal-close-button-new-place"
                    type="button"></button>
                <h2 className="modal__title">New Place</h2>
                <input id="add-card-title" className="modal__info modal__info_place_new-title-input" type="text" name="name"
                    placeholder="Title" required minLength="1" maxLength="30" />
                <span id="add-card-title-error" className="modal__error"></span>
                <input id="add-card-url" className="modal__info modal__info_place_url-input" type="url" name="link"
                    placeholder="Image Link" required />
                <span id="add-card-url-error" className="modal__error"></span>
                <button className="button modal__save-button modal__save-button_type_new-place modal__save-button_disabled"
                    id="add-modal-save-button" type="submit">Create</button>
            </form>
        </div>
    </div>



    <div className="modal modal_profile">
        <div className="modal__box">
            <form className="modal__form modal__form_type_edit-form" name="edit-form-profile">
                <button className="modal__close-button modal__close-button_type_profile" id="modal-close-button-profile"
                    type="button"></button>
                <h2 className="modal__title">Edit profile</h2>
                <input id="name-input" className="modal__info modal__info_place_name-input" type="text" name="name"
                    placeholder="Jacques Cousteau" required minLength="2" maxLength="40" />
                <span id="name-input-error" className="modal__error"></span>
                <input id="about-input" className="modal__info modal__info_place_about-me-input" type="text" name="about"
                    placeholder="Explorer" required minLength="2" maxLength="200" />
                <span id="about-input-error" className="modal__error"></span>
                <button className="button modal__save-button" id="profile-modal-save-button" type="submit">Save</button>
            </form>
        </div>
    </div>










    <template id="elements-template">
        <li className="elements__container">
            <img className="elements__image" src="/images/kirill-pershin-1088404-unsplash-1.png" />
            <div className="elements__delete"></div>
            <div className="elements__text-container">
                <h2 className="elements__text"></h2>
                <div className="elements__heart-container">
                    <button className="elements__heart" type="button"></button>
                    <p className="elements__text elements__heart-number">0</p>
                </div>
            </div>
        </li>
    </template>



    <div className="modal modal_delete">
        <div className="modal__box modal__box_type_delete">
            <form className="modal__form modal__form_type_delete" name="edit-form-delete">
                <button className="modal__close-button modal__close-button_type_delete" id="modal-close-button-delete"
                    type="button"></button>
                <h2 className="modal__title modal__title_type_delete">Are you sure?</h2>
                <button className="button modal__save-button modal__save-button_type_delete" id="delete-modal-save-button"
                    type="submit">Yes</button>
            </form>
        </div>
    </div>







    <div className="modal modal_profile">
        <div className="modal__box">
            <form className="modal__form modal__form_type_edit-form" name="edit-form-profile">
                <button className="modal__close-button modal__close-button_type_profile" id="modal-close-button-profile"
                    type="button"></button>
                <h2 className="modal__title">Edit profile</h2>
                <input id="name-input" className="modal__info modal__info_place_name-input" type="text" name="name"
                    placeholder="Jacques Cousteau" required minLength="2" maxLength="40" />
                <span id="name-input-error" className="modal__error"></span>
                <input id="about-input" className="modal__info modal__info_place_about-me-input" type="text" name="about"
                    placeholder="Explorer" required minLength="2" maxLength="200" />
                <span id="about-input-error" className="modal__error"></span>
                <button className="button modal__save-button" id="profile-modal-save-button" type="submit">Save</button>
            </form>
        </div>
    </div>

    <div className="modal modal_add-card">
        <div className="modal__box">
            <form className="modal__form modal__form_type_new-place" name="edit-form-add">
                <button className="modal__close-button modal__close-button_type_new-place" id="modal-close-button-new-place"
                    type="button"></button>
                <h2 className="modal__title">New Place</h2>
                <input id="add-card-title" className="modal__info modal__info_place_new-title-input" type="text" name="name"
                    placeholder="Title" required minLength="1" maxLength="30" />
                <span id="add-card-title-error" className="modal__error"></span>
                <input id="add-card-url" className="modal__info modal__info_place_url-input" type="url" name="link"
                    placeholder="Image Link" required />
                <span id="add-card-url-error" className="modal__error"></span>
                <button className="button modal__save-button modal__save-button_type_new-place modal__save-button_disabled"
                    id="add-modal-save-button" type="submit">Create</button>
            </form>
        </div>
    </div>

    <div className="modal modal_type_image-expand">
        <div className="modal__box modal__box_type_image-expand">
            <button className="modal__close-button modal__close-button_place_image-expand"
                id="modal-close-button-image-expand" type="button"></button>
            <img className="modal__image-preview" src="#" alt="#" />
            <div className="modal__image-subtitle"></div>
        </div>
    </div>


</div>



export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector)

        this._popupForm = this._modalElement.querySelector(".modal__form");
        this._handleFormSubmit = handleFormSubmit
        this._button = this._modalElement.querySelector(".modal__save-button")
    }

    _getInputValues() {
        this._inputList = Array.from(this._modalElement.querySelectorAll(".modal__info"));

        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        this._modalElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }



    fetchCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({ name, link }),
        }).then((res) => this._checkErrors(res))
    }

    fetchProfileInfo({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ name: name, about: about }),
        }).then((res) => this._checkErrors(res))
    }

    changeProfileAvatar({ avatar }) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ avatar: avatar })
        }).then((res) => this._checkErrors(res));
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        }).then((res) => this._checkErrors(res));
    }

    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this.headers,
        }).then((res) => this._checkErrors(res));
    }

    removeLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        }).then((res) => this._checkErrors(res));
    }






}






