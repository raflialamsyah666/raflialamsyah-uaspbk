<template>
  <div class="dashboard-layout">
    <div class="overlay" :class="{ active: isSidebarOpen }" @click="toggleSidebar"></div>

    <aside :class="['sidebar', { open: isSidebarOpen }]">
      <div class="sidebar-header">
        <button class="close-sidebar" @click="toggleSidebar">×</button>
      </div>
      <nav class="menu">
        <router-link to="/dashboard" class="menu-item" exact @click="closeSidebar">🏠 Dashboard</router-link>
        <router-link to="/buku" class="menu-item" @click="closeSidebar">📖 Buku</router-link>
        <router-link to="/buku/tambah" class="menu-sub" @click="closeSidebar">➕ Tambah Buku</router-link>
        <router-link to="/buku/kategori" class="menu-sub" @click="closeSidebar">📂 Kategori Buku</router-link>
        <router-link to="/anggota" class="menu-item" @click="closeSidebar">👥 Anggota</router-link>
        <router-link to="/anggota/tambah" class="menu-sub" @click="closeSidebar">➕ Tambah Anggota</router-link>
        <router-link to="/transaksi/peminjaman" class="menu-item" @click="closeSidebar">🔄 Peminjaman</router-link>
        <router-link to="/transaksi/pengembalian" class="menu-sub" @click="closeSidebar">🔁 Pengembalian</router-link>
        <router-link to="/transaksi/riwayat" class="menu-sub" @click="closeSidebar">📜 Riwayat</router-link>
        <router-link to="/laporan/peminjaman" class="menu-item" @click="closeSidebar">📊 Laporan Peminjaman</router-link>
        <router-link to="/laporan/inventaris" class="menu-sub" @click="closeSidebar">📦 Laporan Inventaris</router-link>
        <router-link to="/profil/pengaturan" class="menu-item" @click="closeSidebar">⚙️ Pengaturan</router-link>
      </nav>
      <button class="logout-button" @click="logout">🚪 Logout</button>
    </aside>

    <main class="main" :class="{ 'main-shift': isSidebarOpen }">
      <header class="main-header">
        <h1 class="fade-in"> Selamat Datang di Sistem Informasi Perpustakaan</h1>
      </header>

      <section class="main-content">
        <div class="cards">
          <div class="card gradient-card bounce">
            <h3>Total Buku</h3>
            <p>{{ totalBuku }}</p>
          </div>
          <div class="card gradient-card bounce">
            <h3>Total Anggota</h3>
            <p>{{ totalAnggota }}</p>
          </div>
          <div class="card gradient-card bounce">
            <h3>Peminjaman Aktif</h3>
            <p>1</p>
          </div>
        </div>

        <div class="announcement pulse">
          <h2>📢 Pengumuman</h2>
          <ul>
            <li>📅 Perpustakaan tutup tanggal 17 Agustus.</li>
            <li>📌 Kembalikan buku tepat waktu untuk menghindari denda.</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const isSidebarOpen = ref(false);
const totalBuku = ref(0);
const totalAnggota = ref(0);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const logout = () => {
  localStorage.clear();
  router.push('/login');
};

const fetchCounts = async () => {
  try {
    const bukuRes = await axios.get('http://localhost:3000/buku');
    const anggotaRes = await axios.get('http://localhost:3000/anggota');
    totalBuku.value = bukuRes.data.length;
    totalAnggota.value = anggotaRes.data.length;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
};

onMounted(fetchCounts);
</script>

<style scoped>
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes bounceIn {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255, 193, 7, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0); }
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

.bounce {
  animation: bounceIn 1.5s ease-in-out infinite alternate;
}

.pulse {
  animation: pulse 2s infinite;
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.menu-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1101;
  background: #0074D9;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.close-sidebar {
  background: transparent;
  color: white;
  font-size: 1.5rem;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1100;
  display: none;
}

.overlay.active {
  display: block;
}

.sidebar {
  width: 260px;
  background: #001f3f;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 1102;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
}

.sidebar.open {
  transform: translateX(0);
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item, .menu-sub {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: white;
  text-decoration: none;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  transition: background 0.2s, transform 0.2s;
}

.menu-sub {
  font-size: 0.9rem;
  margin-left: 1rem;
  opacity: 0.85;
}

.menu-item:hover, .menu-sub:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.02);
}

.logout-button {
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: white;
  padding: 0.7rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  width: 100%;
  transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 65, 108, 0.2);
}

.logout-button:hover {
  background: linear-gradient(to right, #e84118, #c23616);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(255, 65, 108, 0.4);
}

.main {
  flex: 1;
  background: #f4f6f9;
  padding: 2rem;
  margin-left: 0;
  transition: margin-left 0.3s ease-in-out;
}

.main-shift {
  margin-left: 260px;
}

.main-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.cards {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  text-align: center;
  min-width: 200px;
  flex: 1;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-4px);
}

.gradient-card {
  background: linear-gradient(135deg, #6dd5ed, #2193b0);
  color: white;
}

.announcement {
  background: #fff3cd;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: 0 auto;
}

.announcement h2 {
  margin-bottom: 0.5rem;
  color: #856404;
}

.announcement ul {
  padding: 0;
  list-style: none;
}

.announcement li {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
}
</style>