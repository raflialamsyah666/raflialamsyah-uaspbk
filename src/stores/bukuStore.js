
import { defineStore } from 'pinia';

export const useBukuStore = defineStore('buku', {
  state: () => ({
    daftar: []
  }),
  actions: {
    tambahBuku(bukuBaru) {
      this.daftar.push(bukuBaru);
    }
  }
});
