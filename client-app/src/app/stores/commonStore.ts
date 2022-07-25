import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = window.localStorage.getItem("jwt");
  appLoaded = false;

  /**
   *
   */
  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.token, //bu reaction sadece ilk parametrede verdiğimiz expression (burada token) değişiminde çalışacak
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }
  setServerError = (error: ServerError) => {
    this.error = error;
  };

  setToken = (token: string | null) => {
    if (token) {
      // window.localStorage.setItem("jwt", token);  bunu reactionun içinde yaptığımız için artık gerek yok.
      this.token = token;
    }
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
