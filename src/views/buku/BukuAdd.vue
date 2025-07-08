<template>
  <div class="form-container">
    <h1>➕ Tambah Buku</h1>
    <form @submit.prevent="tambahBuku">
      <div class="form-group">
        <label for="judul">Judul Buku</label>
        <input type="text" id="judul" v-model="buku.judul" required />
      </div>

      <div class="form-group">
        <label for="penulis">Penulis</label>
        <input type="text" id="penulis" v-model="buku.penulis" required />
      </div>

      <div class="form-group">
        <label for="tahun">Tahun Terbit</label>
        <input type="number" id="tahun" v-model="buku.tahun" required />
      </div>

      <div class="form-group">
        <label for="kategori">Kategori</label>
        <select id="kategori" v-model="buku.kategori" required>
          <option value="">-- Pilih Kategori --</option>
          <option>Fiksi</option>
          <option>Non-Fiksi</option>
          <option>Teknologi</option>
          <option>Sejarah</option>
          <option>Sains</option>
        </select>
      </div>

      <button type="submit" class="btn-submit">📚 Simpan Buku</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const buku = ref({
  judul: '',
  penulis: '',
  tahun: '',
  kategori: ''
})

const tambahBuku = async () => {
  try {
    await axios.post('http://localhost:3000/buku', buku.value)
    router.push('/buku')
  } catch (err) {
    alert('Gagal menambahkan buku')
    console.error(err)
  }
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.6s ease forwards;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #34495e;
}

input,
select {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.btn-submit {
  background: linear-gradient(135deg, #42e695, #3bb2b8);
  border: none;
  color: white;
  padding: 0.8rem;
  width: 100%;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.btn-submit:hover {
  transform: scale(1.03);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
