<template>
  <div class="anggota-page">
    <header class="anggota-header">
      <h1>👥 Daftar Anggota</h1>
      <router-link to="/anggota/tambah" class="btn-tambah">➕ Tambah Anggota</router-link>
    </header>

    <div class="anggota-grid">
      <div class="anggota-card" v-for="a in anggota" :key="a.id">
        <div class="avatar">{{ a.nama.charAt(0).toUpperCase() }}</div>
        <div class="info">
          <h3>{{ a.nama }}</h3>
          <p><strong>Email:</strong> {{ a.email }}</p>
          <p><strong>Alamat:</strong> {{ a.alamat }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const anggota = ref([])

const fetchAnggota = async () => {
  try {
    const res = await axios.get('http://localhost:3000/anggota')
    anggota.value = res.data
  } catch (err) {
    console.error('Gagal mengambil data anggota:', err)
  }
}

onMounted(fetchAnggota)
</script>

<style scoped>
.anggota-page {
  padding: 2rem;
}

.anggota-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.anggota-header h1 {
  font-size: 1.8rem;
  color: #2c3e50;
}

.btn-tambah {
  background: linear-gradient(135deg, #42e695, #3bb2b8);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.btn-tambah:hover {
  transform: translateY(-2px);
}

.anggota-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.anggota-card {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
  transition: transform 0.3s ease;
}

.anggota-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.avatar {
  width: 50px;
  height: 50px;
  background: #3498db;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.info h3 {
  margin: 0 0 0.3rem;
  color: #2c3e50;
}

.info p {
  margin: 0.2rem 0;
  font-size: 0.95rem;
  color: #555;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: none;
  }
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
