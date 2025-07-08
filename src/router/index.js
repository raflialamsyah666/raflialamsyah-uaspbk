import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import BukuList from '@/views/buku/BukuList.vue';
import BukuAdd from '@/views/buku/BukuAdd.vue';
import BukuKategori from '@/views/buku/BukuKategori.vue';
import AnggotaList from '@/views/anggota/AnggotaList.vue';
import AnggotaAdd from '@/views/anggota/AnggotaAdd.vue';
import Peminjaman from '@/views/transaksi/Peminjaman.vue';
import Pengembalian from '@/views/transaksi/Pengembalian.vue';
import Riwayat from '@/views/transaksi/Riwayat.vue';
import LaporanPeminjaman from '@/views/laporan/LaporanPeminjaman.vue';
import LaporanInventaris from '@/views/laporan/LaporanInventaris.vue';
import Pengaturan from '@/views/profil/Pengaturan.vue';
import Logout from '@/views/profil/Logout.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  {
    path: '/buku',
    children: [
      { path: '', component: BukuList },
      { path: 'tambah', component: BukuAdd },
      { path: 'kategori', component: BukuKategori }
    ]
  },
  {
    path: '/anggota',
    children: [
      { path: '', component: AnggotaList },
      { path: 'tambah', component: AnggotaAdd }
    ]
  },
  {
    path: '/transaksi',
    children: [
      { path: 'peminjaman', component: Peminjaman },
      { path: 'pengembalian', component: Pengembalian },
      { path: 'riwayat', component: Riwayat }
    ]
  },
  {
    path: '/laporan',
    children: [
      { path: 'peminjaman', component: LaporanPeminjaman },
      { path: 'inventaris', component: LaporanInventaris }
    ]
  },
  {
    path: '/profil',
    children: [
      { path: 'pengaturan', component: Pengaturan },
      { path: 'logout', component: Logout }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;