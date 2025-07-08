<template>
  <div class="buku-page">
    <header class="buku-header">
      <h1>📚 Daftar Buku</h1>
      <div class="header-actions">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="🔍 Cari judul atau penulis..."
          class="search-input"
        />
        <router-link to="/buku/tambah" class="btn-tambah">➕ Tambah Buku</router-link>
      </div>
    </header>

    <transition-group name="fade" tag="div" class="buku-grid">
      <div
        class="buku-card fade-in"
        v-for="b in filteredBuku"
        :key="b.id"
      >
        <h3>{{ b.judul }}</h3>
        <p><strong>Penulis:</strong> {{ b.penulis }}</p>
        <p><strong>Tahun:</strong> {{ b.tahun }}</p>
        <p><strong>Kategori:</strong> {{ b.kategori }}</p>
        <div class="buku-actions">
          <button class="btn-edit">✏️ Edit</button>
          <button class="btn-delete" @click="hapusBuku(b.id)">🗑️ Hapus</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const buku = ref([]);
const searchTerm = ref('');

const fetchBuku = async () => {
  try {
    const res = await axios.get('http://localhost:3000/buku');
    buku.value = res.data;
  } catch (error) {
    console.error('Gagal mengambil data buku:', error);
  }
};

const hapusBuku = async (id) => {
  if (confirm('Yakin ingin menghapus buku ini?')) {
    try {
      await axios.delete(`http://localhost:3000/buku/${id}`);
      buku.value = buku.value.filter((b) => b.id !== id);
    } catch (error) {
      console.error('Gagal menghapus buku:', error);
    }
  }
};

const filteredBuku = computed(() => {
  return buku.value.filter(
    (b) =>
      b.judul.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      b.penulis.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

onMounted(fetchBuku);
</script>

<style scoped>
.buku-page {
  padding: 2rem;
}

.buku-header {
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.search-input {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
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

.buku-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.buku-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.buku-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.buku-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-edit,
.btn-delete {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: none;
  }
}
</style>