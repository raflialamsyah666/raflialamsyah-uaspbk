import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useBukuStore } from '@/stores/bukuStore'

describe('Buku Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useBukuStore()
  })

  it('menambahkan buku ke dalam daftar', () => {
    const bukuBaru = { id: 1, judul: 'Buku A', penulis: 'Rafli' }
    store.tambahBuku(bukuBaru)

    expect(store.bukuList).toContainEqual(bukuBaru)
  })
})
