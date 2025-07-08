<template>
  <div class="laporan-page">
    <h1>📊 Laporan Peminjaman</h1>

    <div v-if="laporan.length === 0">Tidak ada data peminjaman.</div>

    <table class="laporan-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Judul Buku</th>
          <th>Nama Anggota</th>
          <th>Tanggal Peminjaman</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in laporan" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ getJudulBuku(item.bukuId) }}</td>
          <td>{{ getNamaAnggota(item.anggotaId) }}</td>
          <td>{{ item.tanggal }}</td>
          <td>
            <span :class="['status-badge', item.status]">
              {{ item.status === 'dipinjam' ? 'Dipinjam' : 'Dikembalikan' }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const laporan = ref([]);
const buku = ref([]);
const anggota = ref([]);

const fetchData = async () => {
  try {
    const [resLaporan, resBuku, resAnggota] = await Promise.all([
      axios.get('http://localhost:3000/transaksi'),
      axios.get('http://localhost:3000/buku'),
      axios.get('http://localhost:3000/anggota')
    ]);
    laporan.value = resLaporan.data;
    buku.value = resBuku.data;
    anggota.value = resAnggota.data;
  } catch (err) {
    alert('Gagal memuat data laporan');
  }
};

const getJudulBuku = id => {
  const found = buku.value.find(b => b.id == id);
  return found ? found.judul : '-';
};

const getNamaAnggota = id => {
  const found = anggota.value.find(a => a.id == id);
  return found ? found.nama : '-';
};

onMounted(fetchData);
</script>

<style scoped>
.laporan-page {
  padding: 2rem;
}

.laporan-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.laporan-table th,
.laporan-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.laporan-table th {
  background: #f0f2f5;
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 0.9rem;
}

.status-badge.dipinjam {
  background-color: #f39c12;
  color: white;
}

.status-badge.dikembalikan {
  background-color: #2ecc71;
  color: white;
}
</style>
