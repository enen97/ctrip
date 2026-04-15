import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    nickname: localStorage.getItem("nickname") || "",
    token: localStorage.getItem("token") || "",
    avatar: localStorage.getItem("avatar") || "",
    userId: localStorage.getItem("userId") || "",
  }),
  actions: {
    setUserInfo(data) {
      if (data.token) {
        this.token = data.token;
        localStorage.setItem("token", data.token);
      }
      if (data.user && data.user.id) {
        this.userId = data.user.id;
        localStorage.setItem("userId", data.user.id);
      }
      if (data.user && data.user.nickname) {
        this.nickname = data.user.nickname;
        localStorage.setItem("nickname", data.user.nickname);
      }
      if (data.user && data.user.avatar) {
        this.avatar = data.user.avatar;
        localStorage.setItem("avatar", data.user.avatar);
      }
    },
    clearUserInfo() {
      this.nickname = "";
      this.token = "";
      this.avatar = "";
      this.userId = "";
      localStorage.removeItem("nickname");
      localStorage.removeItem("token");
      localStorage.removeItem("avatar");
      localStorage.removeItem("userId");
    }
  }
});