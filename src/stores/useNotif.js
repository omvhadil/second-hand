import { defineStore } from "pinia";
import { instance } from "../plugin";

export const useNotifStore = defineStore("notif", {
  state: () => ({
    notification: [],
  }),
  getters: {
    jmlNotif() {
      return this.notification.length;
    },
  },
  actions: {
    async getNotif() {
      await instance.get("/notification").then((res) => {
        this.notification = res.data;
      });
    },
    async patchNotif(idNotif) {
      await instance.patch("/notification/" + idNotif).then(() => {
        this.getNotif();
      });
    },
  },
});
