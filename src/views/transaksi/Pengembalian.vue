<template>
  <div class="pengembalian-page">
    <h1>🔁 Pengembalian Buku</h1>

    <div v-if="transaksi.length === 0">Tidak ada buku yang sedang dipinjam.</div>

    <div class="transaksi-list">
      <div
        v-for="t in transaksi"
        :key="t.id"
        class="transaksi-card"
      >
        <p><strong>Anggota:</strong> {{ getNamaAnggota(t.anggotaId) }}</p>
        <p><strong>Buku:</strong> {{ getJudulBuku(t.bukuId) }}</p>
        <p><strong>Tanggal Peminjaman:</strong> {{ t.tanggal }}</p>
        <button @click="kembalikanBuku(t.id)" class="btn-kembali">✔️ Kembalikan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const transaksi = ref([]);
const anggota = ref([]);
const buku = ref([]);

const fetchData = async () => {
  try {
    const [resTransaksi, resAnggota, resBuku] = await Promise.all([
      axios.get('http://localhost:3000/transaksi'),
      axios.get('http://localhost:3000/anggota'),
      axios.get('http://localhost:3000/buku')
    ]);
    transaksi.value = resTransaksi.data.filter(t => t.status === 'dipinjam');
    anggota.value = resAnggota.data;
    buku.value = resBuku.data;
  } catch (err) {
    alert('Gagal memuat data');
  }
};

const getNamaAnggota = id => {
  const found = anggota.value.find(a => a.id == id);
  return found ? found.nama : '-';
};

const getJudulBuku = id => {
  const found = buku.value.find(b => b.id == id);
  return found ? found.judul : '-';
};

const kembalikanBuku = async id => {
  try {
    await axios.patch(`http://localhost:3000/transaksi/${id}`, {
      status: 'dikembalikan',
      tanggalPengembalian: new Date().toISOString().split('T')[0]
    });
    transaksi.value = transaksi.value.filter(t => t.id !== id);
    alert('✅ Buku berhasil dikembalikan!');
  } catch (err) {
    alert('❌ Gagal mengembalikan buku');
  }
};

onMounted(fetchData);
</script>

<style scoped>
.pengembalian-page {
  padding: 2rem;
  max-width: 700px;
  margin: auto;
}

.transaksi-list {
  display: grid;
  gap: 1rem;
}

.transaksi-card {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
}

.transaksi-card:hover {
  transform: translateY(-2px);
}

.btn-kembali {
  background: linear-gradient(135deg, #4caf50, #2ecc71);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;
}

.btn-kembali:hover {
  background: linear-gradient(135deg, #2ecc71, #4caf50);
}
</style>
