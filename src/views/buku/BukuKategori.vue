<template>
  <div class="kategori-page">
    <h1>📂 Kategori Buku</h1>

    <div class="filter-box">
      <label for="kategori">Pilih Kategori:</label>
      <select id="kategori" v-model="kategoriDipilih">
        <option value="">-- Semua Kategori --</option>
        <option v-for="kategori in daftarKategori" :key="kategori" :value="kategori">
          {{ kategori }}
        </option>
      </select>
    </div>

    <div class="buku-grid">
      <div
        v-for="b in bukuTersaring"
        :key="b.id"
        class="buku-card"
      >
        <h3>{{ b.judul }}</h3>
        <p><strong>Penulis:</strong> {{ b.penulis }}</p>
        <p><strong>Tahun:</strong> {{ b.tahun }}</p>
        <p><strong>Kategori:</strong> {{ b.kategori }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const buku = ref([]);
const kategoriDipilih = ref('');

const fetchBuku = async () => {
  try {
    const res = await axios.get('http://localhost:3000/buku');
    buku.value = res.data;
  } catch (err) {
    alert('Gagal memuat data buku');
  }
};

const daftarKategori = computed(() => {
  const kategoriUnik = new Set(buku.value.map(b => b.kategori));
  return Array.from(kategoriUnik);
});

const bukuTersaring = computed(() => {
  return kategoriDipilih.value
    ? buku.value.filter(b => b.kategori === kategoriDipilih.value)
    : buku.value;
});

onMounted(fetchBuku);
</script>

<style scoped>
.kategori-page {
  padding: 2rem;
}

.filter-box {
  margin-bottom: 1.5rem;
}

select {
  margin-left: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.buku-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.buku-card {
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  transition: 0.3s ease;
  animation: fadeIn 0.4s ease forwards;
  opacity: 0;
}

.buku-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
