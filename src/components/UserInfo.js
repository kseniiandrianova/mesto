export default class UserInfo {
    constructor(name, about, avatar){
        // this._name = name;
        // this._description = description;
        // this._avatar = avatar;
        this._profileName = document.querySelector(name);
        this._profileDescription = document.querySelector(about);
        this._profileAvatar = document.querySelector(avatar);
        this.id = null;

    }
    getUserInfo(){
        this._userInfo = {
           name:  this._profileName.textContent,
           description: this._profileDescription.textContent,
           avatar: this._profileAvatar.src, 
        }
        return this._userInfo;
    }

    setUserInfo({name, about, avatar}){
        this._profileAvatar.src = avatar;
        this._profileName.textContent = name;
        this._profileDescription.textContent = about;
        
    }

   // setUserAvatar(avatar) {
    //    this._profileAvatar.src = avatar;
   //   }

    setUserId(id) {
        this._userId = id;
    }
    returnUserId() {
        return this._userId;
    }
}