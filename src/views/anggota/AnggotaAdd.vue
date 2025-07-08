<template>
  <div class="form-page">
    <h1>➕ Tambah Anggota</h1>
    <form @submit.prevent="submitForm" class="form-container">
      <input v-model="form.nama" type="text" placeholder="Nama Lengkap" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.alamat" type="text" placeholder="Alamat" required />
      <button type="submit">Simpan</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  nama: '',
  email: '',
  alamat: ''
})

const submitForm = async () => {
  try {
   
    const res = await axios.get('http://localhost:3000/anggota')
    const anggotaList = res.data

    const maxId = anggotaList.length
      ? Math.max(...anggotaList.map(a => Number(a.id) || 0))
      : 0

    const newAnggota = {
      id: maxId + 1,
      ...form.value
    }

    await axios.post('http://localhost:3000/anggota', newAnggota)
    alert('Anggota berhasil ditambahkan!')
    router.push('/anggota')
  } catch (err) {
    console.error(err)
    alert('Gagal menambahkan anggota')
  }
}
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
  background: #3498db;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #2980b9;
}
</style>
