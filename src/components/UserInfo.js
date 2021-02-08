export default class UserInfo {
    constructor({name, description}){
        this._name = name;
        this._description = description;
        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
        //this._form = document.querySelector('.profile__add-button');

    }
    getUserInfo(){
        this._userInfo = {
           name:  this._profileName.textContent,
           description: this._profileDescription.textContent, 
        }
        return this._userInfo;
    }

    setUserInfo(name, description){
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }
}