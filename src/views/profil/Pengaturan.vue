<template>
  <div class="pengaturan-page">
    <h1>⚙️ Pengaturan Akun</h1>

    <form class="pengaturan-form" @submit.prevent="simpanPengaturan">
      <div class="form-group">
        <label for="nama">Nama Pengguna</label>
        <input type="text" id="nama" v-model="form.nama" required />
      </div>

      <div class="form-group">
        <label for="email">Email Pengguna</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="password">Password Baru</label>
        <input type="password" id="password" v-model="form.password" />
      </div>

      <button class="btn-simpan" type="submit">💾 Simpan Perubahan</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nama: 'Admin Perpustakaan',
  email: 'admin@example.com',
  password: ''
})

const simpanPengaturan = () => {
  // Diimplementasikan sesuai backend, disimpan ke API / localStorage / emit ke store
  alert('Pengaturan berhasil disimpan!')
}
</script>

<style scoped>
.pengaturan-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.05);
  animation: fadeIn 0.4s ease forwards;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.pengaturan-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #34495e;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s;
}

input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  outline: none;
}

.btn-simpan {
  background: linear-gradient(135deg, #42e695, #3bb2b8);
  color: white;
  font-weight: bold;
  padding: 0.8rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
}

.btn-simpan:hover {
  background: linear-gradient(135deg, #3bb2b8, #42e695);
  transform: scale(1.03);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>
