import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { useBukuStore } from '../stores/bukuStore';

describe('Buku Store', () => {
  beforeEach(() => {
    setActivePinia(createTestingPinia({
      createSpy: vi.fn,
      stubActions: false
    }));
  });

  it('menambahkan buku ke dalam daftar', () => {
    const store = useBukuStore();

    const bukuBaru = {
      id: '1',
      judul: 'Belajar Vue',
      penulis: 'Rafli',
      tahun: 2025,
      kategori: 'Teknologi'
    };

    store.tambahBuku(bukuBaru);

    expect(store.daftar).toHaveLength(1);
    expect(store.daftar[0]).toEqual(bukuBaru);
  });
});
