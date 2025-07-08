<template>
  <div class="login-page">
    <div class="left-side">
      <div class="logo">
        <h1>Sistem Informasi Perpustakaan</h1>
        <p>Kelola data buku dan anggota dengan mudah</p>
      </div>
    </div>

    <div class="right-side">
      <div class="login-box">
        <h2>Selamat Datang</h2>
        <p class="desc">Silakan login untuk mengakses sistem</p>

        <input type="text" v-model="username" placeholder="Username" />
        <input type="password" v-model="password" placeholder="Password" />
        <input type="text" v-model="captcha" placeholder="Berapa hasil dari 5 + 9?" />

        <button @click="handleLogin">Login</button>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="extra-links">
          <button>📞 Hubungi Kami</button>
          <button>👤 Lihat Staf Kami</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const captcha = ref('');
const error = ref('');

const handleLogin = () => {
  if (username.value === 'admin' && password.value === 'admin' && captcha.value === '14') {
    router.push('/dashboard');
  } else {
    error.value = 'Login gagal. Periksa username, password, dan captcha.';
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.left-side {
  flex: 1;
  background-color: #e0e7ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.left-side .logo h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.left-side .logo p {
  color: #555;
}

.preview-img {
  max-width: 100%;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.right-side {
  flex: 1;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  text-align: center;
}

.login-box h2 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #2c3e50;
}

.login-box .desc {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  background-color: #3498db;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.error {
  color: red;
  margin-top: 0.5rem;
}

.extra-links {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.extra-links button {
  background-color: #ecf0f1;
  color: #2c3e50;
  border: 1px solid #ccc;
}
</style>