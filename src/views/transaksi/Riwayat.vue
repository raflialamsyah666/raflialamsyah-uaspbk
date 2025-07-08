<template>
  <div class="riwayat-page">
    <h1>📜 Riwayat Peminjaman</h1>

    <div v-if="riwayat.length === 0">Belum ada riwayat peminjaman.</div>

    <div class="riwayat-list">
      <div
        v-for="r in riwayat"
        :key="r.id"
        class="riwayat-card"
      >
        <p><strong>📘 Buku:</strong> {{ getJudulBuku(r.bukuId) }}</p>
        <p><strong>👤 Anggota:</strong> {{ getNamaAnggota(r.anggotaId) }}</p>
        <p><strong>📅 Tanggal Peminjaman:</strong> {{ r.tanggal }}</p>
        <p v-if="r.tanggalPengembalian"><strong>📆 Tanggal Pengembalian:</strong> {{ r.tanggalPengembalian }}</p>
        <p>
          <strong>📌 Status:</strong>
          <span :class="['status-label', r.status]">
            {{ r.status === 'dipinjam' ? 'Dipinjam' : 'Dikembalikan' }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const riwayat = ref([]);
const anggota = ref([]);
const buku = ref([]);

const fetchData = async () => {
  try {
    const [resRiwayat, resAnggota, resBuku] = await Promise.all([
      axios.get('http://localhost:3000/transaksi'),
      axios.get('http://localhost:3000/anggota'),
      axios.get('http://localhost:3000/buku')
    ]);
    riwayat.value = resRiwayat.data;
    anggota.value = resAnggota.data;
    buku.value = resBuku.data;
  } catch (err) {
    alert('Gagal memuat data riwayat');
  }
};

const getNamaAnggota = (id) => {
  const found = anggota.value.find((a) => a.id == id);
  return found ? found.nama : '-';
};

const getJudulBuku = (id) => {
  const found = buku.value.find((b) => b.id == id);
  return found ? found.judul : '-';
};

onMounted(fetchData);
</script>

<style scoped>
.riwayat-page {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}

.riwayat-list {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
}

.riwayat-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
  border-left: 6px solid #ccc;
}

.riwayat-card:hover {
  transform: translateY(-2px);
}

.status-label {
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 0.9rem;
}

.status-label.dipinjam {
  background-color: #f39c12;
  color: white;
}

.status-label.dikembalikan {
  background-color: #2ecc71;
  color: white;
}
</style>
