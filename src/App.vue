<template>
  <div class="layout">
    <aside class="sidebar">
      <router-link to="/dashboard" class="menu-item">🏠 Dashboard</router-link>
      <router-link to="/buku" class="menu-item">📚 Buku</router-link>
      <router-link to="/buku/tambah" class="menu-sub">➕ Tambah Buku</router-link>
      <router-link to="/buku/kategori" class="menu-sub">📂 Kategori Buku</router-link>
      <router-link to="/anggota" class="menu-item">👥 Anggota</router-link>
      <router-link to="/anggota/tambah" class="menu-sub">➕ Tambah Anggota</router-link>
      <router-link to="/transaksi/peminjaman" class="menu-item">🔄 Peminjaman</router-link>
      <router-link to="/transaksi/pengembalian" class="menu-sub">🔁 Pengembalian</router-link>
      <router-link to="/transaksi/riwayat" class="menu-sub">📜 Riwayat</router-link>
      <router-link to="/laporan/peminjaman" class="menu-item">📊 Laporan Peminjaman</router-link>
      <router-link to="/laporan/inventaris" class="menu-sub">📦 Laporan Inventaris</router-link>
      <router-link to="/profil/pengaturan" class="menu-item">⚙️ Pengaturan</router-link>
      <button class="logout-button" @click="logout">🚪 Logout</button>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.clear();
  router.push('/login');
};
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #001f3f;
  color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}

.menu-item, .menu-sub {
  text-decoration: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.3s;
}

.menu-item:hover, .menu-sub:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-sub {
  margin-left: 1rem;
  font-size: 0.9rem;
  opacity: 0.85;
}

.logout-button {
  margin-top: auto;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
}

.content {
  margin-left: 250px;
  padding: 2rem;
  width: 100%;
}
</style>
