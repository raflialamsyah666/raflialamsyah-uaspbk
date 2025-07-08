<template>
  <div class="peminjaman-page">
    <h1>🔄 Peminjaman Buku</h1>
    <form @submit.prevent="simpanPeminjaman" class="form-box">
      <div class="form-group">
        <label for="anggota">Nama Anggota</label>
        <select id="anggota" v-model.number="peminjaman.anggotaId" required>
          <option value="">-- Pilih Anggota --</option>
          <option v-for="a in anggota" :key="a.id" :value="a.id">
            {{ a.nama }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="buku">Judul Buku</label>
        <select id="buku" v-model.number="peminjaman.bukuId" required>
          <option value="">-- Pilih Buku --</option>
          <option v-for="b in buku" :key="b.id" :value="b.id">
            {{ b.judul }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="tanggal">Tanggal Peminjaman</label>
        <input type="date" id="tanggal" v-model="peminjaman.tanggal" required />
      </div>

      <button type="submit" class="btn-simpan">✅ Simpan</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const peminjaman = ref({
  anggotaId: null,
  bukuId: null,
  tanggal: ''
});

const anggota = ref([]);
const buku = ref([]);

const fetchData = async () => {
  try {
    const [resAnggota, resBuku] = await Promise.all([
      axios.get('http://localhost:3000/anggota'),
      axios.get('http://localhost:3000/buku')
    ]);
    anggota.value = resAnggota.data;
    buku.value = resBuku.data;
  } catch (err) {
    alert('❌ Gagal memuat data anggota/buku');
  }
};

const simpanPeminjaman = async () => {
  try {
await axios.post('http://localhost:3000/transaksi', {
  anggotaId: peminjaman.value.anggotaId,
  bukuId: peminjaman.value.bukuId,
  tanggal: peminjaman.value.tanggal,
  status: "dipinjam"
});
    alert('✅ Peminjaman berhasil disimpan!');
    router.push('/transaksi/riwayat');
  } catch (err) {
    console.error('❌ Gagal menyimpan peminjaman:', err);
    alert('Gagal menyimpan peminjaman');
  }
};

onMounted(fetchData);
</script>

<style scoped>
.peminjaman-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  animation: fadeInSlide 0.5s ease forwards;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #2c3e50;
}

.form-box {
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

input,
select {
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border 0.3s, box-shadow 0.3s;
}

input:focus,
select:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
  outline: none;
}

.btn-simpan {
  background: linear-gradient(135deg, #42e695, #3bb2b8);
  color: white;
  padding: 0.8rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;
}

.btn-simpan:hover {
  background: linear-gradient(135deg, #3bb2b8, #42e695);
  transform: scale(1.03);
}

@keyframes fadeInSlide {
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
