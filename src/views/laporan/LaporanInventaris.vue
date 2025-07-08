<template>
  <div class="inventaris-page">
    <h1>📦 Laporan Inventaris Buku</h1>
    <div class="inventaris-grid">
      <div class="inventaris-card" v-for="b in buku" :key="b.id">
        <h3>{{ b.judul }}</h3>
        <p><strong>Penulis:</strong> {{ b.penulis }}</p>
        <p><strong>Kategori:</strong> {{ b.kategori }}</p>
        <p><strong>Tahun:</strong> {{ b.tahun }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const buku = ref([]);

const fetchInventaris = async () => {
  const res = await axios.get('http://localhost:3000/buku');
  buku.value = res.data;
};

onMounted(fetchInventaris);
</script>

<style scoped>
.inventaris-page {
  padding: 2rem;
  max-width: 1100px;
  margin: auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.inventaris-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.inventaris-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
  animation: zoomIn 0.5s ease forwards;
  opacity: 0;
}

.inventaris-card:hover {
  transform: translateY(-5px);
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
