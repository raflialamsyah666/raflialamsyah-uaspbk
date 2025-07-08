import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TambahBuku from '@/views/buku/BukuAdd.vue'

describe('TambahBuku.vue', () => {
  it('menampilkan form tambah buku', () => {
    const wrapper = mount(TambahBuku)
    expect(wrapper.html()).toContain('Tambah Buku')
  })
})
