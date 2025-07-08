import { defineStore } from 'pinia'

export const useBukuStore = defineStore('buku', {
  state: () => ({
    bukuList: [] 
  }),
  actions: {
    tambahBuku(buku) {
      this.bukuList.push(buku)
    }
  }
})
