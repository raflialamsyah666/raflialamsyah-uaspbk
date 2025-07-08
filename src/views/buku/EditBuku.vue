<template>
  <div class="form-page">
    <h1>✏️ Edit Buku</h1>
    <form @submit.prevent="updateBuku" class="form-container">
      <input v-model="form.judul" type="text" placeholder="Judul Buku" required />
      <input v-model="form.penulis" type="text" placeholder="Penulis" required />
      <input v-model.number="form.tahun" type="number" placeholder="Tahun Terbit" required />
      <input v-model="form.kategori" type="text" placeholder="Kategori" required />
      <button type="submit">Simpan Perubahan</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const form = ref({
  judul: '',
  penulis: '',
  tahun: null,
  kategori: ''
})

const fetchBuku = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/buku/${route.params.id}`)
    form.value = res.data
  } catch (err) {
    alert('Gagal memuat data buku')
  }
}

const updateBuku = async () => {
  try {
    await axios.put(`http://localhost:3000/buku/${route.params.id}`, form.value)
    alert('Buku berhasil diperbarui!')
    router.push('/buku')
  } catch (err) {
    alert('Gagal memperbarui buku')
  }
}

onMounted(fetchBuku)
</script>

<style scoped>
.form-page {
  max-width: 500px;
  margin: auto;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  background: #2ecc71;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #27ae60;
}
</style>
