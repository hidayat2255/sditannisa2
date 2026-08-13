/* ==========================================================================
   SDIT ANNISA - APP LOGIC & GOOGLE SHEETS CLOUD SYNC (APP.JS)
   ========================================================================== */

const DB_KEY = 'sdit_annisa_db_v2';
const ADMIN_PASSWORD_CORRECT = 'hdt123';

// 🌟 ISI DENGAN URL APPS SCRIPT ANDA DARI GOOGLE SHEETS
// Contoh: "https://script.google.com/macros/s/AKfycbx.../exec"
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyX0v9Cq9eD3I3Ov3dLpq0p5DjAsG0GvlQp92LpqyfOlqbgdSfoYpTmcumyIwVFTNXj/exec";

// INITIAL DEFAULT STATE (NPSN: 20231556, NAMA KEPALA SEKOLAH: Abdul Yakub, S.Ag)
const DEFAULT_PROFIL = {
  namaSekolah: 'SDIT ANNISA',
  tagline: 'Mendidik Generasi Rabbani yang Unggul, Beradab, dan Bertaqwa Berlandaskan Al-Qur\'an dan As-Sunnah.',
  akreditasi: 'A (Sangat Baik)',
  npsn: '20231556',
  kota: 'Jakarta Selatan',
  namaKepala: 'Abdul Yakub, S.Ag',
  jabatanKepala: 'Kepala Sekolah SDIT ANNISA',
  fotoKepala: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  sambutanText: `Assalamu'alaikum Warahmatullahi Wabarakatuh.

Puji syukur kehadirat Allah SWT yang telah memberikan rahmat dan karunia-Nya. SDIT ANNISA berkomitmen penuh untuk menghadirkan pendidikan Islam terpadu berkelas tinggi yang menyeimbangkan antara ilmu syar'i, pembentukan karakter akhlakul karimah, serta keunggulan akademik dan penguasaan sains teknologi.

Kami percaya bahwa setiap anak adalah amanah berharga yang memiliki potensi istimewa. Dengan bimbingan para pendidik yang berdedikasi dan ikhlas, mari bersama-sama kita wujudkan generasi Rabbani yang siap memimpin masa depan.`,
  visiText: '"Menjadi Sekolah Dasar Islam Terpadu Unggulan yang Membentuk Generasi Rabbani, Berakhlak Mulia, Cerdas, Mandiri, dan Berwawasan Global pada Tahun 2030."',
  misiList: [
    "Menyelenggarakan pendidikan Islam terpadu yang mengintegrasikan nilai Al-Qur'an dan As-Sunnah dalam setiap pembelajaran.",
    "Membimbing pembiasaan ibadah harian, adab sopan santun, dan tahfidz Al-Qur'an juz 30 & 29.",
    "Mengembangkan potensi minat bakat siswa secara optimal melalui kurikulum berbasis karakter & STEM.",
    "Menjalin kemitraan sinergis yang erat dengan orang tua dan masyarakat dalam pendidikan anak."
  ],
  namaLengkap: 'SDIT ANNISA (Sekolah Dasar Islam Terpadu)',
  alamat: 'Jl. Wibawa Mukti II No.05 RT.03 RW.06 Jatiasih, Jatiasih Bekasi',
  telepon: '(021) 8243-1220',
  email: 'info@sditannisa.sch.id • www.sditannisa.sch.id'
};

const DEFAULT_BERITA_LIST = [
  {
    judul: "Penerimaan Peserta Didik Baru (PPDB) T.A 2026/2027 Resmi Dibuka",
    kategori: "Pengumuman",
    tanggal: "12 Agustus 2026",
    fotos: [
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
    ],
    ringkasan: "SDIT ANNISA secara resmi membuka pendaftaran calon peserta didik baru tahun ajaran 2026/2027 Gelombang 1. Segera daftarkan putra-putri Anda sebelum kuota terpenuhi."
  },
  {
    judul: "Juara 1 Lomba Tahfidz Al-Qur'an Juz 30 Tingkat Kota Bekasi",
    kategori: "Prestasi",
    tanggal: "08 Agustus 2026",
    fotos: [
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80"
    ],
    ringkasan: "Selamat kepada ananda Umar Jordan atas raihan pretasi membanggakan meraih Juara 1 Musabaqah Hifdzil Qur'an (MHQ) Juz 30 antar SD/MI se-Kota Bekasi."
  },
  {
    judul: "Pelaksanaan Outing Class & Literasi Digital Santri SDIT ANNISA",
    kategori: "Kegiatan",
    tanggal: "01 Agustus 2026",
    fotos: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
    ],
    ringkasan: "Kegiatan edukatif outdoor mengenalkan sains teknologi, lingkungan hidup, serta pembiasaan tadarus Al-Qur'an bersama para ustadz/ustadzah."
  }
];

const DEFAULT_INVENTARIS_LIST = [
  { "Nama Ruang": "Ruang Kelas 1", "Nama Barang": "Meja Siswa", "Jumlah": "20", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Kayu Jati Awet" },
  { "Nama Ruang": "Ruang Kelas 1", "Nama Barang": "Kursi Siswa", "Jumlah": "20", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Kayu Jati Awet" },
  { "Nama Ruang": "Ruang Kelas 1", "Nama Barang": "Meja Guru", "Jumlah": "1", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Lengkap Laci" },
  { "Nama Ruang": "Ruang Kelas 1", "Nama Barang": "Kursi Guru", "Jumlah": "1", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Busa Empuk" },
  { "Nama Ruang": "Ruang Kelas 1", "Nama Barang": "Papan Tulis Whiteboard", "Jumlah": "1", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Ukuran 120x240 cm" },
  
  { "Nama Ruang": "Ruang Kelas 2", "Nama Barang": "Meja Siswa", "Jumlah": "22", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Standar Sekolah" },
  { "Nama Ruang": "Ruang Kelas 2", "Nama Barang": "Kursi Siswa", "Jumlah": "22", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Standar Sekolah" },
  { "Nama Ruang": "Ruang Kelas 2", "Nama Barang": "Meja Guru", "Jumlah": "1", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Lengkap Laci" },
  { "Nama Ruang": "Ruang Kelas 2", "Nama Barang": "Kursi Guru", "Jumlah": "1", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Busa Empuk" },

  { "Nama Ruang": "Ruang Guru", "Nama Barang": "Meja Kerja Guru", "Jumlah": "15", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Sekat Partisi" },
  { "Nama Ruang": "Ruang Guru", "Nama Barang": "Kursi Kerja Putar", "Jumlah": "15", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Roda Rapi" },
  { "Nama Ruang": "Ruang Guru", "Nama Barang": "Lemari Arsip Besi", "Jumlah": "4", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Pintu Kunci" },
  { "Nama Ruang": "Ruang Guru", "Nama Barang": "Printer Laserjet", "Jumlah": "2", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Siap Pakai" },

  { "Nama Ruang": "Perpustakaan", "Nama Barang": "Rak Buku Kayu Tingkat", "Jumlah": "8", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Kapasitas Besar" },
  { "Nama Ruang": "Perpustakaan", "Nama Barang": "Meja Baca Lesehan", "Jumlah": "6", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Bahan Kayu" },
  { "Nama Ruang": "Perpustakaan", "Nama Barang": "Karpet Empuk Baca", "Jumlah": "4", "Satuan": "Roll", "Kondisi": "Baik", "Keterangan": "Bersih Wangi" },

  { "Nama Ruang": "Ruang UKS", "Nama Barang": "Tempat Tidur Pasien", "Jumlah": "2", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Lengkap Kasur Bantal" },
  { "Nama Ruang": "Ruang UKS", "Nama Barang": "Lemari Obat P3K", "Jumlah": "1", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Kaca Transparan" },
  { "Nama Ruang": "Ruang UKS", "Nama Barang": "Timbangan & Pengukur Tinggi", "Jumlah": "1", "Satuan": "Unit", "Kondisi": "Baik", "Keterangan": "Digital Presisi" }
];

// GLOBAL APP STATE
let db = loadDatabase();
let isAdminLoggedIn = sessionStorage.getItem('sdit_admin_logged_in') === 'true';
let currentSectionId = 'dashboard';
let selectedSiswaIndexForVerification = -1;
let selectedGuruIndexForPhotoUpload = -1;
let selectedLulusanIndexForPhotoUpload = -1;
let selectedSuratIndexForFileUpload = -1;
let currentActiveRoomNameForInventaris = '';
let tempUploadedBeritaPhotos = [];
let beritaAutoSlideIntervals = [];

// CONFIG FOR DYNAMIC MASTER TABLES
const TABLE_CFG = {
  guru: ['Data Guru & Tenaga Kependidikan', ['Nama', 'Jabatan', 'Foto']],
  siswa: ['Data Siswa SDIT ANNISA', ['Nama', 'Kelas']],
  masuk: ['Data Siswa Masuk / Pindahan', ['Nama', 'Kelas', 'Tanggal Masuk', 'Sekolah Asal', 'Alamat']],
  keluar: ['Data Siswa Keluar / Pindah', ['Nama', 'NISN', 'Kelas', 'Tanggal Keluar', 'Alasan', 'Tujuan Sekolah', 'No Surat', 'Keterangan']],
  lulusan: ['Data Lulusan Alumni', ['Nama', 'Tahun', 'Foto']],
  kelas: ['Data Kelompok Kelas', ['Nama Kelas', 'Wali Kelas', 'Tahun Pelajaran', 'Ruang', 'Keterangan']],
  administrasi: ['Administrasi & Arsip Surat', ['Jenis Surat', 'Nomor Surat', 'Tanggal', 'Perihal', 'Tujuan/Pemohon', 'File Surat', 'Keterangan']],
  inventaris: ['Data Inventaris Sarpras', ['Nama Ruang', 'Jumlah Inventaris', 'Detail Inventaris']],
  ruangan: ['Data Ruangan & Gedung', ['Kode Ruang', 'Nama Ruang', 'Jenis', 'Penanggung Jawab', 'Luas', 'Kondisi', 'Keterangan']],
  uks: ['Catatan Layanan UKS', ['Tanggal', 'Nama Siswa', 'Kelas', 'Keluhan', 'Tindakan', 'Obat', 'Petugas', 'Keterangan']],
  perpustakaan: ['Katalog Buku Perpustakaan', ['Kode Buku', 'Judul', 'Pengarang', 'Penerbit', 'Tahun', 'Jumlah', 'Kondisi', 'Keterangan']]
};

const SISWA_DAPODIK_FIELDS = [
  "Nama", "NISN", "Tempat Lahir", "Tanggal Lahir", "Alamat", "RT", "RW", "Kelurahan", "Kecamatan", "Nama Ayah", "Nama Ibu", "Kelas", "Sekolah Asal"
];

const TEMPLATE_SAMPLES = {
  guru: ["Contoh Nama Guru, S.Pd.", "Guru Kelas 1", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"],
  siswa: ["Contoh Nama Siswa", "3200809988", "Jakarta", "30/12/2016", "Jl. Contoh Raya No. 10", "1", "2", "Jatiasih", "Kec. Jatiasih", "Nama Ayah Contoh", "Nama Ibu Contoh", "Kelas 1A-IBNU SINA", "TK Contoh"],
  masuk: ["Contoh Nama Siswa Masuk", "Kelas 1A-IBNU SINA", "15/07/2024", "TK Asal Contoh", "Jl. Contoh Alamat No. 10"],
  lulusan: ["Contoh Nama Alumni", "Angkatan 2025/2026", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"],
  administrasi: ["Surat Keluar", "015/SDIT_ANNISA/VIII/2025", "10/08/2025", "Permohonan Pindah Sekolah", "Orang Tua Siswa", "", "Telah diarsipkan"],
  inventaris: ["Ruang Kelas 1", "Meja Siswa", "20", "Unit", "Baik", "Keterangan Contoh"]
};

// INITIALIZATION ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  updateCurrentDate();
  updateAdminUIState();
  updateDashboardStats();
  renderBeritaGrid();
  renderProfilView();
  restoreSavedSidebarState();
  syncFromGoogleSheetsCloud();
});

// CLOUD SYNC WITH GOOGLE SHEETS API
function syncFromGoogleSheetsCloud() {
  if (!GOOGLE_SHEETS_WEB_APP_URL || GOOGLE_SHEETS_WEB_APP_URL.trim() === '') return;

  fetch(GOOGLE_SHEETS_WEB_APP_URL)
    .then(res => res.json())
    .then(cloudDb => {
      if (cloudDb && typeof cloudDb === 'object') {
        let hasData = false;
        Object.keys(cloudDb).forEach(k => {
          if (Array.isArray(cloudDb[k]) && cloudDb[k].length > 0) {
            db[k] = cloudDb[k];
            hasData = true;
          }
        });
        if (hasData) {
          saveDatabaseLocalOnly();
          updateDashboardStats();
          renderBeritaGrid();
          refreshCurrentSection();
        }
      }
    })
    .catch(err => {
      console.warn('Sync Google Sheets offline / fallback to local storage:', err);
    });
}

function syncToGoogleSheetsCloud() {
  if (!GOOGLE_SHEETS_WEB_APP_URL || GOOGLE_SHEETS_WEB_APP_URL.trim() === '') return;

  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(db)
  }).catch(err => console.warn('Cloud sync error:', err));
}

// TOGGLE COLLAPSE & AUTO-HIDE SIDEBAR MENU DENGAN ICON SEGITIGA (◀ / ▶)
function toggleSidebarCollapse() {
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main');
  const icon = document.getElementById('sidebarToggleIcon');

  if (!sidebar || !main) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    const isMobileOpen = sidebar.classList.toggle('mobile-open');
    let backdrop = document.querySelector('.sidebar-mobile-backdrop');

    if (isMobileOpen) {
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-mobile-backdrop';
        backdrop.onclick = () => toggleSidebarCollapse();
        document.body.appendChild(backdrop);
      }
      if (icon) icon.className = 'fa-solid fa-caret-left';
    } else {
      if (backdrop) backdrop.remove();
      if (icon) icon.className = 'fa-solid fa-caret-right';
    }
  } else {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    main.classList.toggle('expanded', isCollapsed);

    if (icon) {
      if (isCollapsed) {
        icon.className = 'fa-solid fa-caret-right';
      } else {
        icon.className = 'fa-solid fa-caret-left';
      }
    }

    localStorage.setItem('sdit_sidebar_collapsed', isCollapsed ? 'true' : 'false');
  }
}

function restoreSavedSidebarState() {
  const isMobile = window.innerWidth <= 768;
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main');
  const icon = document.getElementById('sidebarToggleIcon');

  if (isMobile) {
    if (sidebar) sidebar.classList.remove('mobile-open', 'collapsed');
    if (main) main.classList.remove('expanded');
    if (icon) icon.className = 'fa-solid fa-caret-right';
  } else {
    const isCollapsed = localStorage.getItem('sdit_sidebar_collapsed') === 'true';
    if (isCollapsed && sidebar && main) {
      sidebar.classList.add('collapsed');
      main.classList.add('expanded');
      if (icon) icon.className = 'fa-solid fa-caret-right';
    } else if (icon) {
      icon.className = 'fa-solid fa-caret-left';
    }
  }
}

function loadDatabase() {
  const dataStr = localStorage.getItem(DB_KEY);
  if (!dataStr) {
    const initDb = {
      profil: DEFAULT_PROFIL,
      berita: DEFAULT_BERITA_LIST,
      guru: [],
      siswa: [],
      masuk: [],
      keluar: [],
      lulusan: [],
      kelas: [],
      administrasi: [],
      inventaris: DEFAULT_INVENTARIS_LIST,
      ruangan: [],
      uks: [],
      perpustakaan: []
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initDb));
    return initDb;
  }
  try {
    const parsed = JSON.parse(dataStr);
    if (!parsed.profil) parsed.profil = DEFAULT_PROFIL;
    if (!parsed.berita || parsed.berita.length === 0) parsed.berita = DEFAULT_BERITA_LIST;
    
    parsed.berita.forEach(b => {
      if (!b.fotos || !Array.isArray(b.fotos) || b.fotos.length === 0) {
        b.fotos = b.foto ? [b.foto] : ["https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"];
      }
    });

    parsed.profil.npsn = "20231556";
    parsed.profil.namaKepala = "Abdul Yakub, S.Ag";
    if (!parsed.guru) parsed.guru = [];
    if (!parsed.siswa) parsed.siswa = [];
    if (!parsed.masuk) parsed.masuk = [];
    if (!parsed.lulusan) parsed.lulusan = [];
    if (!parsed.administrasi) parsed.administrasi = [];
    if (!parsed.inventaris || parsed.inventaris.length === 0) parsed.inventaris = DEFAULT_INVENTARIS_LIST;
    return parsed;
  } catch (e) {
    return {
      profil: DEFAULT_PROFIL,
      berita: DEFAULT_BERITA_LIST,
      guru: [],
      siswa: [],
      masuk: [],
      lulusan: [],
      administrasi: [],
      inventaris: DEFAULT_INVENTARIS_LIST
    };
  }
}

function saveDatabaseLocalOnly() {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function saveDatabase() {
  saveDatabaseLocalOnly();
  updateDashboardStats();
  syncToGoogleSheetsCloud();
}

function updateCurrentDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = new Date().toLocaleDateString('id-ID', options);
  const dateEl = document.getElementById('currentDateDisplay');
  if (dateEl) dateEl.textContent = '📅 ' + dateStr;
}

// HANDLER EXCEL SERIAL DATE & VARIOUS DATE PARSERS
function parseDateComponents(str) {
  if (str === null || str === undefined || str === '') return null;

  const cleanStr = String(str).trim();

  const isNumeric = /^\d{5}(\.\d+)?$/.test(cleanStr) || (typeof str === 'number' && str > 25569 && str < 100000);
  if (isNumeric) {
    const serial = parseFloat(cleanStr);
    if (serial > 25569 && serial < 100000) {
      const utcDays = Math.floor(serial - 25569);
      const utcSeconds = utcDays * 86400;
      const dateObj = new Date(utcSeconds * 1000);
      return {
        day: dateObj.getUTCDate(),
        month: dateObj.getUTCMonth() + 1,
        year: dateObj.getUTCFullYear()
      };
    }
  }

  const dmYMatch = cleanStr.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (dmYMatch) {
    return {
      day: parseInt(dmYMatch[1], 10),
      month: parseInt(dmYMatch[2], 10),
      year: parseInt(dmYMatch[3], 10)
    };
  }

  const YmdMatch = cleanStr.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
  if (YmdMatch) {
    return {
      day: parseInt(YmdMatch[3], 10),
      month: parseInt(YmdMatch[2], 10),
      year: parseInt(YmdMatch[1], 10)
    };
  }

  const d = new Date(cleanStr);
  if (!isNaN(d.getTime()) && d.getFullYear() > 1900 && d.getFullYear() < 2100) {
    return {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear()
    };
  }

  return null;
}

function formatIndonesianDate(dateStr) {
  if (!dateStr) return '-';
  const parsed = parseDateComponents(dateStr);
  if (!parsed) return String(dateStr);

  const monthsIndo = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const monthName = monthsIndo[parsed.month - 1] || parsed.month;
  return `${parsed.day} ${monthName} ${parsed.year}`;
}

// ADMIN AUTHENTICATION LOGIC (ICON ONLY 👤)
function handleAdminIconClick() {
  if (isAdminLoggedIn) {
    if (confirm('Anda berada dalam Mode Admin.\n\nApakah Anda ingin keluar (Logout)?')) {
      isAdminLoggedIn = false;
      sessionStorage.removeItem('sdit_admin_logged_in');
      updateAdminUIState();
      alert('Anda telah keluar dari Mode Admin.');
      refreshCurrentSection();
    }
  } else {
    document.getElementById('adminPasswordInput').value = '';
    openModal('adminAuthModal');
  }
}

function handleAdminLoginSubmit(e) {
  e.preventDefault();
  const inputPass = document.getElementById('adminPasswordInput').value;

  if (inputPass === ADMIN_PASSWORD_CORRECT) {
    isAdminLoggedIn = true;
    sessionStorage.setItem('sdit_admin_logged_in', 'true');
    closeModal('adminAuthModal');
    updateAdminUIState();
    alert('🎉 Login Admin Berhasil!\n\nSeluruh menu Edit, Hapus, Tambah Data, Unggah Foto, Unggah File Surat PDF/Dokumen, Kelola Ruangan Inventaris, Menu Sistem Backup/Restore, serta Unduh/Unggah Excel telah diaktifkan.');
    refreshCurrentSection();
  } else {
    alert('❌ Password Salah!');
  }
}

function updateAdminUIState() {
  const btnAdmin = document.getElementById('btnAdminIcon');
  if (btnAdmin) {
    if (isAdminLoggedIn) {
      btnAdmin.classList.add('is-logged-in');
    } else {
      btnAdmin.classList.remove('is-logged-in');
    }
  }

  // PROTEKSI MENU SISTEM (BACKUP & RESTORE HANYA TAMPIL SAAT ADMIN LOGIN)
  const sysWrapper = document.getElementById('adminSystemNavWrapper');
  if (sysWrapper) {
    sysWrapper.style.display = isAdminLoggedIn ? 'block' : 'none';
  }

  // PROTEKSI TOMBOL DASHBOARD HEADER (LIHAT PROFIL SEKOLAH & EXPORT BACKUP HANYA SAAT ADMIN LOGIN)
  const dashHeaderBtnWrapper = document.getElementById('adminDashHeaderBtnWrapper');
  if (dashHeaderBtnWrapper) {
    if (isAdminLoggedIn) {
      dashHeaderBtnWrapper.innerHTML = `
        <div style="display:flex;gap:10px;align-items:center;">
          <button class="btn btn-secondary" onclick="quickNav('profil')">
            <i class="fa-solid fa-school"></i> 🏫 Lihat Profil Sekolah
          </button>
          <button class="btn btn-primary" onclick="exportAllData()">
            <i class="fa-solid fa-download"></i> 💾 Export Data Backup
          </button>
        </div>
      `;
    } else {
      dashHeaderBtnWrapper.innerHTML = '';
    }
  }

  // PROTEKSI TOMBOL "+ TAMBAH BERITA" DI DASHBOARD
  const beritaBtnWrapper = document.getElementById('adminTambahBeritaBtnWrapper');
  if (beritaBtnWrapper) {
    if (isAdminLoggedIn) {
      beritaBtnWrapper.innerHTML = `
        <button class="btn btn-emerald" style="padding:6px 14px;font-size:12px;" onclick="openFormModalBerita()">
          <i class="fa-solid fa-plus"></i> + Tambah Berita Baru
        </button>
      `;
    } else {
      beritaBtnWrapper.innerHTML = '';
    }
  }
}

function refreshCurrentSection() {
  renderBeritaGrid();
  if (currentSectionId === 'profil') {
    renderProfilView();
  } else if (currentSectionId !== 'dashboard') {
    renderTable(currentSectionId);
  }
}

// NAVIGATION SWITCHER
function showSection(id, btn) {
  currentSectionId = id;
  
  document.querySelectorAll('#navMenu button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.getElementById('dashboard').classList.toggle('hide', id !== 'dashboard');
  document.getElementById('profil').classList.toggle('hide', id !== 'profil');
  document.getElementById('contentSection').classList.toggle('hide', id === 'dashboard' || id === 'profil');

  if (window.innerWidth <= 768) {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.querySelector('.sidebar-mobile-backdrop');
    const icon = document.getElementById('sidebarToggleIcon');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (backdrop) backdrop.remove();
    if (icon) icon.className = 'fa-solid fa-caret-right';
  }

  if (id === 'profil') {
    renderProfilView();
  } else if (id !== 'dashboard') {
    renderTable(id);
  } else {
    renderBeritaGrid();
  }
}

function quickNav(id) {
  const targetBtn = document.querySelector(`#navMenu button[onclick*="'${id}'"]`);
  showSection(id, targetBtn);
}

// DASHBOARD STATS
function updateDashboardStats() {
  const keys = ['siswa', 'guru', 'inventaris', 'kelas'];
  keys.forEach(k => {
    const el = document.getElementById('st-' + k);
    if (el && db[k]) el.textContent = db[k].length;
  });

  const prof = db.profil || DEFAULT_PROFIL;
  const dashProfilBox = document.getElementById('dashProfilBox');
  if (dashProfilBox) {
    dashProfilBox.innerHTML = `
      <div style="font-size:16px;font-weight:800;color:var(--primary);margin-bottom:4px">${esc(prof.namaSekolah)}</div>
      <div style="color:var(--text-muted);font-size:12px;margin-bottom:8px">Akreditasi: <b>${esc(prof.akreditasi)}</b> • NPSN: <b>${esc(prof.npsn || '20231556')}</b></div>
      <div><strong>Kepala Sekolah:</strong> ${esc(prof.namaKepala || "Abdul Yakub, S.Ag")}</div>
      <div><strong>Alamat:</strong> ${esc(prof.alamat)}</div>
      <div style="margin-top:6px;font-size:12px;color:var(--emerald);font-weight:700"><i class="fa-solid fa-phone"></i> ${esc(prof.telepon)}</div>
    `;
  }

  const activityLog = document.getElementById('activityLog');
  if (activityLog) {
    const logs = [];
    logs.push(`Data Terdaftar: <b>${(db.siswa || []).length} Siswa Aktif</b>`);
    logs.push(`Tenaga Pendidik: <b>${(db.guru || []).length} Guru & Tendik</b>`);
    logs.push(`Aset Sekolah: <b>${(db.inventaris || []).length} Barang Terdata</b>`);
    logs.push(`Administrasi: <b>${(db.administrasi || []).length} Surat Tersimpan</b>`);
    
    activityLog.innerHTML = logs.map(l => `<div style="padding:8px 0;border-bottom:1px solid #e2e8f0"><i class="fa-solid fa-check" style="color:var(--emerald)"></i> ${l}</div>`).join('');
  }
}

// BERITA TERKINI RENDERER & MODE SLIDE CAROUSEL OTOMATIS
function clearBeritaAutoSlideTimers() {
  beritaAutoSlideIntervals.forEach(t => clearInterval(t));
  beritaAutoSlideIntervals = [];
}

function renderBeritaGrid() {
  clearBeritaAutoSlideTimers();
  const container = document.getElementById('beritaGrid');
  if (!container) return;

  const bList = db.berita || DEFAULT_BERITA_LIST;

  if (bList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: span 3;padding:24px;text-align:center;color:var(--text-muted)">
        Belum ada berita atau informasi terkini yang diunggah.
      </div>
    `;
    return;
  }

  container.innerHTML = bList.map((item, bIdx) => {
    let photoArr = item.fotos && Array.isArray(item.fotos) && item.fotos.length > 0 ? item.fotos : (item.foto ? [item.foto] : ['https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80']);
    const isMultiPhoto = photoArr.length > 1;

    return `
      <div class="berita-card-minimal">
        <div>
          <div class="berita-img-frame" id="beritaFrame_${bIdx}">
            <span class="berita-category-chip"><i class="fa-solid fa-tag"></i> ${esc(item.kategori || 'Berita')}</span>
            
            <div class="berita-carousel-track" id="beritaTrack_${bIdx}">
              ${photoArr.map(pUrl => `
                <img src="${esc(pUrl)}" class="berita-carousel-slide" alt="${esc(item.judul)}">
              `).join('')}
            </div>

            ${isMultiPhoto ? `
              <button class="berita-slide-btn prev" onclick="moveBeritaSlide(${bIdx}, -1)"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="berita-slide-btn next" onclick="moveBeritaSlide(${bIdx}, 1)"><i class="fa-solid fa-chevron-right"></i></button>
              
              <div class="berita-slide-dots" id="beritaDots_${bIdx}">
                ${photoArr.map((_, pIdx) => `
                  <span class="berita-slide-dot ${pIdx === 0 ? 'active' : ''}" onclick="goToBeritaSlide(${bIdx}, ${pIdx})"></span>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <div class="berita-body">
            <div class="berita-date">
              <i class="fa-regular fa-calendar"></i> ${esc(item.tanggal || '12 Agustus 2026')}
              ${isMultiPhoto ? `<span style="margin-left:auto;color:var(--emerald);font-weight:700;"><i class="fa-solid fa-images"></i> ${photoArr.length} Foto Slide</span>` : ''}
            </div>
            <div class="berita-title-text">${esc(item.judul)}</div>
            <div class="berita-snippet-text">${esc(item.ringkasan)}</div>
          </div>
        </div>

        ${isAdminLoggedIn ? `
          <div style="padding:10px 16px;border-top:1px dashed var(--border);display:flex;justify-content:flex-end;gap:8px;">
            <button class="btn btn-secondary" style="padding:4px 8px;font-size:11px" onclick="openFormModalBerita(${bIdx})" title="Edit Berita"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn btn-danger" style="padding:4px 8px;font-size:11px" onclick="deleteBerita(${bIdx})" title="Hapus Berita"><i class="fa-solid fa-trash"></i> Hapus</button>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  bList.forEach((item, bIdx) => {
    let photoArr = item.fotos && Array.isArray(item.fotos) && item.fotos.length > 0 ? item.fotos : (item.foto ? [item.foto] : []);
    if (photoArr.length > 1) {
      let currentSlide = 0;
      const interval = setInterval(() => {
        currentSlide = (currentSlide + 1) % photoArr.length;
        goToBeritaSlide(bIdx, currentSlide);
      }, 3500);
      beritaAutoSlideIntervals.push(interval);
    }
  });
}

function moveBeritaSlide(bIdx, direction) {
  const track = document.getElementById(`beritaTrack_${bIdx}`);
  const dotsContainer = document.getElementById(`beritaDots_${bIdx}`);
  if (!track) return;

  const totalSlides = track.children.length;
  let currentActive = 0;

  if (dotsContainer) {
    const dots = Array.from(dotsContainer.children);
    currentActive = dots.findIndex(d => d.classList.contains('active'));
    if (currentActive < 0) currentActive = 0;
  }

  let newIdx = (currentActive + direction + totalSlides) % totalSlides;
  goToBeritaSlide(bIdx, newIdx);
}

function goToBeritaSlide(bIdx, slideIdx) {
  const track = document.getElementById(`beritaTrack_${bIdx}`);
  const dotsContainer = document.getElementById(`beritaDots_${bIdx}`);
  if (!track) return;

  track.style.transform = `translateX(-${slideIdx * 100}%)`;

  if (dotsContainer) {
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === slideIdx);
    });
  }
}

// UPLOAD BANYAK FOTO BERITA KHUSUS ADMIN
function triggerBeritaPhotosUpload() {
  document.getElementById('beritaPhotosFileInput').value = '';
  document.getElementById('beritaPhotosFileInput').click();
}

function handleBeritaPhotosUpload(event) {
  const files = Array.from(event.target.files);
  if (!files || files.length === 0) return;

  let loadedCount = 0;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      tempUploadedBeritaPhotos.push(e.target.result);
      loadedCount++;
      if (loadedCount === files.length) {
        updateBeritaPhotoPreviewList();
      }
    };
    reader.readAsDataURL(file);
  });
}

function removeTempUploadedPhoto(idx) {
  tempUploadedBeritaPhotos.splice(idx, 1);
  updateBeritaPhotoPreviewList();
}

function updateBeritaPhotoPreviewList() {
  const previewBox = document.getElementById('beritaPhotoPreviewBox');
  if (!previewBox) return;

  if (tempUploadedBeritaPhotos.length === 0) {
    previewBox.innerHTML = `
      <div style="font-size:12px;color:var(--text-muted);text-align:center;padding:10px;border:1px dashed var(--border);border-radius:10px;">
        Belum ada foto diunggah. Klik <strong>"📤 Unggah File Foto Berita"</strong> di atas.
      </div>
    `;
    return;
  }

  previewBox.innerHTML = `
    <div style="font-size:12px;font-weight:700;color:var(--emerald);margin-bottom:8px;">
      <i class="fa-solid fa-images"></i> Terunggah ${tempUploadedBeritaPhotos.length} Foto (Mode Slide Otomatis Aktif):
    </div>
    <div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;">
      ${tempUploadedBeritaPhotos.map((url, idx) => `
        <div style="position:relative;width:90px;height:70px;flex-shrink:0;border-radius:8px;overflow:hidden;border:1px solid var(--border)">
          <img src="${esc(url)}" style="width:100%;height:100%;object-fit:cover">
          <button type="button" onclick="removeTempUploadedPhoto(${idx})" style="position:absolute;top:2px;right:2px;background:#ef4444;color:#fff;border:0;width:20px;height:20px;border-radius:50%;cursor:pointer;font-size:10px;display:grid;place-items:center;">&times;</button>
        </div>
      `).join('')}
    </div>
  `;
}

function openFormModalBerita(idx = -1) {
  if (!isAdminLoggedIn) {
    handleAdminIconClick();
    return;
  }

  const bList = db.berita || DEFAULT_BERITA_LIST;
  const item = idx >= 0 ? bList[idx] : {};

  tempUploadedBeritaPhotos = item.fotos && Array.isArray(item.fotos) && item.fotos.length > 0 ? [...item.fotos] : (item.foto ? [item.foto] : []);

  const bodyEl = document.getElementById('formModalBody');
  document.getElementById('formModalTitle').textContent = (idx >= 0 ? 'Edit ' : 'Tambah ') + 'Berita / Informasi Sekolah';

  bodyEl.innerHTML = `
    <form onsubmit="saveBeritaForm(event, ${idx})">
      <div class="form-grid">
        <div class="form-group full-width">
          <label>Judul Berita / Pengumuman</label>
          <input type="text" id="fBeritaJudul" value="${esc(item.judul || '')}" placeholder="Contoh: Pembukaan PPDB Gelombang 1 T.A 2026/2027" required autofocus>
        </div>
        <div class="form-group">
          <label>Kategori Berita</label>
          <select id="fBeritaKategori">
            <option value="Pengumuman" ${item.kategori === 'Pengumuman' ? 'selected' : ''}>Pengumuman</option>
            <option value="Prestasi" ${item.kategori === 'Prestasi' ? 'selected' : ''}>Prestasi</option>
            <option value="Kegiatan" ${item.kategori === 'Kegiatan' ? 'selected' : ''}>Kegiatan</option>
            <option value="Berita" ${item.kategori === 'Berita' ? 'selected' : ''}>Berita Umum</option>
          </select>
        </div>
        <div class="form-group">
          <label>Tanggal Berita</label>
          <input type="text" id="fBeritaTanggal" value="${esc(item.tanggal || '12 Agustus 2026')}" required>
        </div>

        <div class="form-group full-width">
          <label>Unggah Galeri Foto Berita (Pilih 1 atau Banyak Foto Sekaligus)</label>
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;">
            <button type="button" class="btn btn-emerald" onclick="triggerBeritaPhotosUpload()">
              <i class="fa-solid fa-file-arrow-up"></i> 📤 Unggah File Foto Berita (Bisa Banyak)
            </button>
            <span style="font-size:12px;color:var(--text-muted)">Dapat memilih lebih dari 1 foto untuk mode slide otomatis.</span>
          </div>

          <div id="beritaPhotoPreviewBox">
            <!-- Dynamic Uploaded Photo Previews -->
          </div>
        </div>

        <div class="form-group full-width">
          <label>Atau Input Manual URL Foto (Pisahkan koma jika lebih dari 1 URL)</label>
          <input type="text" id="fBeritaFotoUrlInput" placeholder="https://..., https://..." value="${esc(tempUploadedBeritaPhotos.filter(p => p.startsWith('http')).join(', '))}">
        </div>

        <div class="form-group full-width">
          <label>Ringkasan Isi Berita / Informasi</label>
          <textarea id="fBeritaRingkasan" rows="4" required>${esc(item.ringkasan || '')}</textarea>
        </div>
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
        <button type="button" class="btn btn-secondary" onclick="closeModal('formModal')">Batal</button>
        <button type="submit" class="btn btn-emerald"><i class="fa-solid fa-floppy-disk"></i> Simpan Berita</button>
      </div>
    </form>
  `;

  updateBeritaPhotoPreviewList();
  openModal('formModal');
}

function saveBeritaForm(e, idx) {
  e.preventDefault();

  const urlInputRaw = document.getElementById('fBeritaFotoUrlInput').value.trim();
  let manualUrls = [];
  if (urlInputRaw) {
    manualUrls = urlInputRaw.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }

  let finalPhotos = [...tempUploadedBeritaPhotos];
  manualUrls.forEach(url => {
    if (!finalPhotos.includes(url)) {
      finalPhotos.push(url);
    }
  });

  if (finalPhotos.length === 0) {
    finalPhotos = ["https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"];
  }

  const newBerita = {
    judul: document.getElementById('fBeritaJudul').value.trim(),
    kategori: document.getElementById('fBeritaKategori').value,
    tanggal: document.getElementById('fBeritaTanggal').value.trim(),
    fotos: finalPhotos,
    foto: finalPhotos[0],
    ringkasan: document.getElementById('fBeritaRingkasan').value.trim()
  };

  if (!db.berita) db.berita = [];

  if (idx >= 0) {
    db.berita[idx] = newBerita;
  } else {
    db.berita.unshift(newBerita);
  }

  saveDatabase();
  closeModal('formModal');
  renderBeritaGrid();
  alert('✨ Berita / Informasi Sekolah berhasil disimpan (Mode Slide Otomatis Aktif)!');
}

function deleteBerita(idx) {
  if (!isAdminLoggedIn) {
    handleAdminIconClick();
    return;
  }

  if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
    db.berita.splice(idx, 1);
    saveDatabase();
    renderBeritaGrid();
  }
}

// PROFIL SEKOLAH RENDER ENGINE
function renderProfilView() {
  const p = db.profil || DEFAULT_PROFIL;

  document.getElementById('viewNamaSekolah').textContent = p.namaSekolah;
  document.getElementById('viewTaglineSekolah').textContent = p.tagline;
  document.getElementById('viewAkreditasi').textContent = p.akreditasi;
  document.getElementById('viewNPSN').textContent = p.npsn || '20231556';
  document.getElementById('viewKota').textContent = p.kota || 'Jakarta';

  document.getElementById('viewNamaKepala').textContent = p.namaKepala || 'Abdul Yakub, S.Ag';
  document.getElementById('viewJabatanKepala').textContent = p.jabatanKepala || 'Kepala Sekolah SDIT ANNISA';
  document.getElementById('viewFotoKepala').src = p.fotoKepala;
  document.getElementById('viewSambutanText').innerText = p.sambutanText;

  document.getElementById('viewVisiText').textContent = p.visiText;

  const misiUl = document.getElementById('viewMisiList');
  if (p.misiList && Array.isArray(p.misiList)) {
    misiUl.innerHTML = p.misiList.map(m => `<li>${esc(m)}</li>`).join('');
  }

  document.getElementById('viewNamaLengkap').textContent = p.namaLengkap;
  document.getElementById('viewAlamat').textContent = p.alamat;
  document.getElementById('viewTelepon').textContent = p.telepon;
  document.getElementById('viewEmail').textContent = p.email;

  const btnWrapper = document.getElementById('adminEditProfilBtnWrapper');
  if (isAdminLoggedIn) {
    btnWrapper.innerHTML = `
      <button class="btn btn-emerald" onclick="openEditProfilModal()">
        <i class="fa-solid fa-pen-to-square"></i> ✏️ Edit Profil & Sambutan
      </button>
    `;
  } else {
    btnWrapper.innerHTML = '';
  }
}

function openEditProfilModal() {
  if (!isAdminLoggedIn) {
    handleAdminIconClick();
    return;
  }

  const p = db.profil || DEFAULT_PROFIL;
  document.getElementById('editNamaKepala').value = p.namaKepala || 'Abdul Yakub, S.Ag';
  document.getElementById('editJabatanKepala').value = p.jabatanKepala || 'Kepala Sekolah SDIT ANNISA';
  document.getElementById('editFotoKepala').value = p.fotoKepala || '';
  document.getElementById('editSambutanText').value = p.sambutanText || '';

  document.getElementById('editVisiText').value = p.visiText || '';
  document.getElementById('editMisiText').value = Array.isArray(p.misiList) ? p.misiList.join('\n') : '';

  document.getElementById('editNamaSekolah').value = p.namaSekolah || '';
  document.getElementById('editAkreditasi').value = p.akreditasi || '';
  document.getElementById('editNPSN').value = p.npsn || '20231556';
  document.getElementById('editTelepon').value = p.telepon || '';
  document.getElementById('editAlamat').value = p.alamat || '';
  document.getElementById('editEmail').value = p.email || '';

  openModal('editProfilModal');
}

function saveProfilEdits(e) {
  e.preventDefault();

  const misiRaw = document.getElementById('editMisiText').value;
  const misiArr = misiRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0);

  db.profil = {
    namaSekolah: document.getElementById('editNamaSekolah').value,
    tagline: db.profil.tagline || DEFAULT_PROFIL.tagline,
    akreditasi: document.getElementById('editAkreditasi').value,
    npsn: document.getElementById('editNPSN').value,
    kota: db.profil.kota || DEFAULT_PROFIL.kota,
    namaKepala: document.getElementById('editNamaKepala').value,
    jabatanKepala: document.getElementById('editJabatanKepala').value,
    fotoKepala: document.getElementById('editFotoKepala').value,
    sambutanText: document.getElementById('editSambutanText').value,
    visiText: document.getElementById('editVisiText').value,
    misiList: misiArr,
    namaLengkap: document.getElementById('editNamaSekolah').value + ' (Sekolah Dasar Islam Terpadu)',
    alamat: document.getElementById('editAlamat').value,
    telepon: document.getElementById('editTelepon').value,
    email: document.getElementById('editEmail').value
  };

  saveDatabase();
  closeModal('editProfilModal');
  renderProfilView();
  alert('✨ Perubahan Profil Sekolah & Kata Sambutan berhasil disimpan!');
}

function resetProfilDefault() {
  if (confirm('Apakah Anda yakin ingin mengembalikan data Profil Sekolah ke setelan default awal?')) {
    db.profil = JSON.parse(JSON.stringify(DEFAULT_PROFIL));
    saveDatabase();
    closeModal('editProfilModal');
    renderProfilView();
    alert('Data profil berhasil di-reset ke default.');
  }
}

// HANDLER UNGGAH FOTO GURU & LULUSAN KHUSUS ADMIN
function triggerGuruPhotoUpload(realIdx) {
  if (!isAdminLoggedIn) {
    alert('Silakan login via Icon Admin (👤) terlebih dahulu untuk mengunggah foto.');
    handleAdminIconClick();
    return;
  }
  selectedGuruIndexForPhotoUpload = realIdx;
  document.getElementById('guruPhotoFileInput').value = '';
  document.getElementById('guruPhotoFileInput').click();
}

function handleGuruPhotoUploadSubmit(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (selectedGuruIndexForPhotoUpload >= 0 && db.guru[selectedGuruIndexForPhotoUpload]) {
      db.guru[selectedGuruIndexForPhotoUpload].Foto = e.target.result;
      saveDatabase();
      renderTable('guru');
      alert(`🎉 Foto guru ${db.guru[selectedGuruIndexForPhotoUpload].Nama} berhasil diperbarui!`);
    }
  };
  reader.readAsDataURL(file);
}

function triggerLulusanPhotoUpload(realIdx) {
  if (!isAdminLoggedIn) {
    alert('Silakan login via Icon Admin (👤) terlebih dahulu untuk mengunggah foto alumni.');
    handleAdminIconClick();
    return;
  }
  selectedLulusanIndexForPhotoUpload = realIdx;
  document.getElementById('lulusanPhotoFileInput').value = '';
  document.getElementById('lulusanPhotoFileInput').click();
}

function handleLulusanPhotoUploadSubmit(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (selectedLulusanIndexForPhotoUpload >= 0 && db.lulusan[selectedLulusanIndexForPhotoUpload]) {
      db.lulusan[selectedLulusanIndexForPhotoUpload].Foto = e.target.result;
      saveDatabase();
      renderTable('lulusan');
      alert(`🎉 Foto alumni ${db.lulusan[selectedLulusanIndexForPhotoUpload].Nama} berhasil diperbarui!`);
    }
  };
  reader.readAsDataURL(file);
}

// HANDLER UNGGAH FILE SURAT (PDF / DOKUMEN) KHUSUS ADMIN
function triggerSuratFileUpload(realIdx) {
  if (!isAdminLoggedIn) {
    alert('Silakan login via Icon Admin (👤) terlebih dahulu untuk mengunggah berkas surat.');
    handleAdminIconClick();
    return;
  }
  selectedSuratIndexForFileUpload = realIdx;
  document.getElementById('suratFileInput').value = '';
  document.getElementById('suratFileInput').click();
}

function handleSuratFileUploadSubmit(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    if (selectedSuratIndexForFileUpload >= 0 && db.administrasi[selectedSuratIndexForFileUpload]) {
      db.administrasi[selectedSuratIndexForFileUpload]['File Surat'] = e.target.result;
      db.administrasi[selectedSuratIndexForFileUpload]['Nama File'] = file.name;
      saveDatabase();
      renderTable('administrasi');
      alert(`🎉 Berkas surat "${file.name}" berhasil diunggah!`);
    }
  };
  reader.readAsDataURL(file);
}

function openSuratFileDocument(realIdx) {
  const row = db.administrasi[realIdx];
  if (!row || !row['File Surat']) {
    alert('File berkas surat belum diunggah.');
    return;
  }
  const dataUrl = row['File Surat'];
  const fileName = row['Nama File'] || 'Dokumen_Surat';

  const win = window.open();
  if (win) {
    win.document.write(`
      <html>
        <head><title>${esc(fileName)}</title></head>
        <body style="margin:0;padding:0;background:#0e1726;display:flex;flex-direction:column;height:100vh;">
          <div style="background:#1e293b;color:#fff;padding:12px 20px;font-family:sans-serif;font-size:14px;display:flex;justify-content:space-between;align-items:center;">
            <span>📄 Dokumen Surat: <strong>${esc(fileName)}</strong></span>
            <a href="${dataUrl}" download="${esc(fileName)}" style="background:#059669;color:#fff;padding:6px 14px;border-radius:6px;text-decoration:none;font-weight:bold;">📥 Unduh File</a>
          </div>
          <iframe src="${dataUrl}" frameborder="0" style="flex:1;width:100%;height:100%;"></iframe>
        </body>
      </html>
    `);
  } else {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.click();
  }
}

// HANDLER GENERATOR SURAT
function openSuratPindahanModal(type, realIdx) {
  const list = db[type] || [];
  const row = list[realIdx] || {};

  const isMasuk = type === 'masuk';
  const namaSiswa = row.Nama || (isMasuk ? 'UMAR JORDAN' : 'Muhammad Al Fatih');
  const tglLahirFormatted = row['Tanggal Lahir'] || row['Tgl Lahir'] ? formatIndonesianDate(row['Tanggal Lahir'] || row['Tgl Lahir']) : 'Bekasi, 10 November 2016';
  const tempatTglLahirStr = row['Tempat Lahir'] ? `${row['Tempat Lahir']}, ${tglLahirFormatted}` : tglLahirFormatted;
  const jenisKelaminStr = row['Jenis Kelamin'] || row.JK || 'Laki-laki';
  const nisnSiswa = row.NISN || row.NIPD || '3174777848';
  const kelasSiswa = row.Kelas || row['Rombel Saat Ini'] || (isMasuk ? 'IV ( Empat )' : 'Kelas 3B-AL KHAWARIZMI');
  const asalSekolahStr = row['Sekolah Asal'] || row['Asal Sekolah'] || 'MIS Fatahillah';
  
  const namaOrtu = row['Nama Ortu'] || row['Nama Ayah'] || row.Ortu || 'Yayat Karyati / Suwito';
  const pekerjaanOrtu = row['Pekerjaan Ortu'] || row['Pekerjaan Ayah'] || row.Pekerjaan || '-';
  const sekolahTujuanFull = row['Sekolah Tujuan'] || row['Tujuan Sekolah'] || 'MADRASAH IBTIDAIYAH NEGERI 7 CIAMIS, Jalan Cibodas No 61 Rancah Girang Rancah – Ciamis 46387';

  const tglKejadian = formatIndonesianDate(row['Tanggal Masuk'] || row['Tanggal Keluar'] || row['Tanggal'] || (isMasuk ? '2026-06-11' : '2026-08-06'));
  const headmasterName = (db.profil && db.profil.namaKepala) ? db.profil.namaKepala : "Abdul Yakub,S.Ag";

  const defaultNoSurat = isMasuk ? `No. 48/SK/SDIT_ANNISA/VI/2026` : `13/SP/SDITANNISA/VIII/2025`;
  const noSurat = row.NoSurat || row['Nomor Surat'] || defaultNoSurat;

  const modalBodyEl = document.getElementById('suratPrintPaper');

  let letterHtml = '';

  if (isMasuk) {
    letterHtml = `
      <div class="no-print" style="background:#f8fafc;border:1px solid #cbd5e1;padding:12px 16px;border-radius:12px;margin-bottom:18px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;">
        <div style="font-weight:800;color:var(--primary);margin-bottom:8px;font-size:13px;display:flex;align-items:center;gap:6px;">
          <i class="fa-solid fa-pen-to-square" style="color:var(--emerald)"></i> Edit Real-Time Surat Keterangan Diterima:
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
          <div>
            <label style="font-size:11px;font-weight:700;">Nomor Surat</label>
            <input type="text" id="rtNoSurat" value="${esc(noSurat)}" oninput="syncSuratRealTimeDiterima()" style="padding:6px;font-size:12px;margin-top:2px;">
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;">Asal Sekolah</label>
            <input type="text" id="rtAsalSekolah" value="${esc(asalSekolahStr)}" oninput="syncSuratRealTimeDiterima()" style="padding:6px;font-size:12px;margin-top:2px;">
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;">Diterima di Kelas</label>
            <input type="text" id="rtDiterimaKelas" value="${esc(kelasSiswa)}" oninput="syncSuratRealTimeDiterima()" style="padding:6px;font-size:12px;margin-top:2px;">
          </div>
        </div>
      </div>

      <div id="actualLetterPaper" class="letter-paper" style="background:#ffffff;padding:20px 42px;font-family:'Times New Roman',Times,serif;color:#000000;line-height:1.5;border:none;">
        <img src="kop_surat.png" class="letter-kop-img" alt="Kop Surat SDIT AN NISA Yayasan Haji Mohammad Thoha Sholeh" style="width:100%;max-height:135px;object-fit:contain;margin-bottom:12px;display:block;">

        <div style="text-align:center;margin-top:8px;margin-bottom:20px;">
          <div style="font-size:15pt;font-weight:bold;text-decoration:underline;text-transform:uppercase;">SURAT KETERANGAN DITERIMA</div>
          <div id="targetNoSurat" style="font-size:11pt;font-weight:bold;margin-top:4px;">${esc(noSurat)}</div>
        </div>

        <div style="font-size:11.5pt;line-height:1.6;text-align:justify;">
          <p style="margin-bottom:6px;">Saya yang bertanda tangan dibawah ini :</p>

          <table style="width:100%;margin:2px 0 8px 24px;border-collapse:collapse;border:none;">
            <tr>
              <td style="width:170px;padding:2px 0;vertical-align:top;border:none;">Nama</td>
              <td style="width:15px;padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">Abdul Yakub,S.Ag</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">NUPTK</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">1847 7496 5120 0092</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">Jabatan</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">Kepala SDIT ANNISA</td>
            </tr>
          </table>

          <p style="margin-bottom:6px;">Dengan ini memberikan keterangan kepada siswa yang dibawah ini :</p>

          <table style="width:100%;margin:2px 0 10px 24px;border-collapse:collapse;border:none;">
            <tr>
              <td style="width:170px;padding:2px 0;vertical-align:top;border:none;">Nama</td>
              <td style="width:15px;padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;"><strong>${esc(namaSiswa)}</strong></td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">Tempat Tanggal Lahir</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">${esc(tempatTglLahirStr)}</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">Jenis Kelamin</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">${esc(jenisKelaminStr)}</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">Asal Sekolah</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td id="targetAsalSekolah" style="padding:2px 0;vertical-align:top;border:none;">${esc(asalSekolahStr)}</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">Diterima di Kelas</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td id="targetDiterimaKelas" style="padding:2px 0;vertical-align:top;border:none;">${esc(kelasSiswa)}</td>
            </tr>
          </table>

          <p style="margin-bottom:8px;text-align:justify;">
            Telah diterima sebagai Siswa/Siswi SDIT ANNISA Kota Bekasi Tahun Pelajaran 2026 / 2027 dan untuk melengkapi persyaratan di harapkan melampirkan beberapa persyaratan sebagai berikut :
          </p>

          <ol style="margin-left:45px;margin-bottom:12px;line-height:1.55;">
            <li>Surat Keterangan di keluarkan dari DAPODIK ONLINE.</li>
            <li>Kartu NISN/Print Out https://nisn.data.kemdikbud.go.id/</li>
            <li>Foto Copy Kartu Keluarga</li>
            <li>Rapor</li>
            <li>Foto Copy Akte Kelahiran</li>
          </ol>

          <p style="margin-bottom:20px;text-align:justify;">
            Demikian surat ini dibuat untuk dapat diketahui dan dipergunakan sebagaimana mestinya.
          </p>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1.2fr;margin-top:24px;">
          <div></div>
          <div style="text-align:center;font-size:11.5pt;">
            <div>Bekasi, ${tglKejadian}</div>
            <div style="font-weight:bold;margin-top:4px;margin-bottom:6px;">Kepala SDIT ANNISA</div>
            
            <div style="height:125px;display:flex;align-items:center;justify-content:center;position:relative;">
              <img src="stempel_ttd.png" alt="Stempel & TTD Resmi SDIT AN NISA Abdul Yakub, S.Ag" style="max-height:145px;width:210px;object-fit:contain;mix-blend-mode:multiply;">
            </div>

            <div style="font-weight:bold;font-size:12pt;margin-top:4px;">Abdul Yakub,S.Ag</div>
          </div>
        </div>
      </div>
    `;
  } else {
    letterHtml = `
      <div class="no-print" style="background:#f8fafc;border:1px solid #cbd5e1;padding:12px 16px;border-radius:12px;margin-bottom:18px;font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;">
        <div style="font-weight:800;color:var(--primary);margin-bottom:8px;font-size:13px;display:flex;align-items:center;gap:6px;">
          <i class="fa-solid fa-pen-to-square" style="color:var(--emerald)"></i> Edit Real-Time Surat Keterangan Pindah Sekolah:
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div>
            <label style="font-size:11px;font-weight:700;">Nomor Surat</label>
            <input type="text" id="rtNoSurat" value="${esc(noSurat)}" oninput="syncSuratRealTimePindah()" style="padding:6px;font-size:12px;margin-top:2px;">
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;">Nama Orang Tua / Wali</label>
            <input type="text" id="rtNamaOrtu" value="${esc(namaOrtu)}" oninput="syncSuratRealTimePindah()" style="padding:6px;font-size:12px;margin-top:2px;">
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;">Pekerjaan Orang Tua</label>
            <input type="text" id="rtPekerjaanOrtu" value="${esc(pekerjaanOrtu)}" oninput="syncSuratRealTimePindah()" style="padding:6px;font-size:12px;margin-top:2px;">
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;">Sekolah & Alamat Tujuan Pindah</label>
            <input type="text" id="rtSekolahTujuan" value="${esc(sekolahTujuanFull)}" oninput="syncSuratRealTimePindah()" style="padding:6px;font-size:12px;margin-top:2px;">
          </div>
        </div>
      </div>

      <div id="actualLetterPaper" class="letter-paper" style="background:#ffffff;padding:20px 42px;font-family:'Times New Roman',Times,serif;color:#000000;line-height:1.5;border:none;">
        <img src="kop_surat.png" class="letter-kop-img" alt="Kop Surat SDIT AN NISA Yayasan Haji Mohammad Thoha Sholeh" style="width:100%;max-height:135px;object-fit:contain;margin-bottom:12px;display:block;">

        <div style="text-align:center;margin-top:8px;margin-bottom:20px;">
          <div style="font-size:15pt;font-weight:bold;text-decoration:underline;text-transform:uppercase;">SURAT KETERANGAN PINDAH SEKOLAH</div>
          <div id="targetNoSurat" style="font-size:11pt;font-weight:bold;margin-top:4px;">${esc(noSurat)}</div>
        </div>

        <div style="font-size:11.5pt;line-height:1.6;text-align:justify;">
          <p style="margin-bottom:8px;">Yang bertanda tangan dibawah ini Kepala SDIT ANNISA Kecamatan Jatiasih Kota Bekasi Propinsi Jawa Barat, menerangkan bahwa :</p>

          <table style="width:100%;margin:4px 0 8px 24px;border-collapse:collapse;border:none;">
            <tr>
              <td style="width:170px;padding:2px 0;vertical-align:top;border:none;">Nama</td>
              <td style="width:15px;padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">${esc(namaSiswa)}</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">NISN</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">${esc(nisnSiswa)}</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">Jenis Kelamin</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">${esc(jenisKelaminStr)}</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">Murid Kelas</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">${esc(kelasSiswa)}</td>
            </tr>
          </table>

          <p style="margin-bottom:6px;">Sesuai surat permohonan pindah sekolah oleh Orang Tua / Wali Murid :</p>

          <table style="width:100%;margin:4px 0 8px 24px;border-collapse:collapse;border:none;">
            <tr>
              <td style="width:170px;padding:2px 0;vertical-align:top;border:none;">Nama</td>
              <td style="width:15px;padding:2px 0;vertical-align:top;border:none;">:</td>
              <td id="targetNamaOrtu" style="padding:2px 0;vertical-align:top;border:none;">${esc(namaOrtu)}</td>
            </tr>
            <tr>
              <td style="padding:2px 0;vertical-align:top;border:none;">Pekerjaan</td>
              <td style="padding:2px 0;vertical-align:top;border:none;">:</td>
              <td id="targetPekerjaanOrtu" style="padding:2px 0;vertical-align:top;border:none;">${esc(pekerjaanOrtu)}</td>
            </tr>
          </table>

          <p style="margin-bottom:20px;text-align:justify;">
            Telah mengajukan pindah ke <span id="targetSekolahTujuan">${esc(sekolahTujuanFull)}</span> . Bersama ini kami sertakan Buku Laporan Pendidikan (Raport) yang bersangkutan dan surat permohonan oleh Orang Tua / Wali Murid.
          </p>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1.2fr;margin-top:24px;">
          <div></div>
          <div style="text-align:center;font-size:11.5pt;">
            <div>Bekasi, ${tglKejadian}</div>
            <div style="font-weight:bold;margin-top:4px;margin-bottom:6px;">Kepala SDIT ANNISA</div>
            
            <div style="height:125px;display:flex;align-items:center;justify-content:center;position:relative;">
              <img src="stempel_ttd.png" alt="Stempel & TTD Resmi SDIT AN NISA Abdul Yakub, S.Ag" style="max-height:145px;width:210px;object-fit:contain;mix-blend-mode:multiply;">
            </div>

            <div style="font-weight:bold;text-decoration:underline;font-size:12pt;margin-top:4px;">${esc(headmasterName)}</div>
          </div>
        </div>
      </div>
    `;
  }

  modalBodyEl.innerHTML = letterHtml;
  openModal('suratPrintModal');
}

function syncSuratRealTimeDiterima() {
  const valNo = document.getElementById('rtNoSurat')?.value || '';
  const valAsal = document.getElementById('rtAsalSekolah')?.value || '';
  const valKelas = document.getElementById('rtDiterimaKelas')?.value || '';

  const elNo = document.getElementById('targetNoSurat');
  const elAsal = document.getElementById('targetAsalSekolah');
  const elKelas = document.getElementById('targetDiterimaKelas');

  if (elNo) elNo.textContent = valNo;
  if (elAsal) elAsal.textContent = valAsal;
  if (elKelas) elKelas.textContent = valKelas;
}

function syncSuratRealTimePindah() {
  const valNo = document.getElementById('rtNoSurat')?.value || '';
  const valOrtu = document.getElementById('rtNamaOrtu')?.value || '';
  const valPekerjaan = document.getElementById('rtPekerjaanOrtu')?.value || '';
  const valTujuan = document.getElementById('rtSekolahTujuan')?.value || '';

  const elNo = document.getElementById('targetNoSurat');
  const elOrtu = document.getElementById('targetNamaOrtu');
  const elPekerjaan = document.getElementById('targetPekerjaanOrtu');
  const elTujuan = document.getElementById('targetSekolahTujuan');

  if (elNo) elNo.textContent = valNo;
  if (elOrtu) elOrtu.textContent = valOrtu;
  if (elPekerjaan) elPekerjaan.textContent = valPekerjaan;
  if (elTujuan) elTujuan.textContent = valTujuan;
}

function printSuratDokumen() {
  window.print();
}

// HANDLER KELOLA / EDIT RUANGAN INVENTARIS VIA TOMBOL PENSIL (✏️)
function openEditRuangModal(namaRuangOld) {
  if (!isAdminLoggedIn) {
    alert('Silakan login via Icon Admin (👤) terlebih dahulu untuk mengedit ruangan.');
    handleAdminIconClick();
    return;
  }

  const bodyEl = document.getElementById('formModalBody');
  document.getElementById('formModalTitle').textContent = `✏️ Kelola Ruangan: ${namaRuangOld}`;

  bodyEl.innerHTML = `
    <form onsubmit="saveRenameRuangan(event, '${esc(namaRuangOld)}')">
      <div class="form-grid">
        <div class="form-group full-width">
          <label>Nama Ruangan (Ubah nama ruangan untuk memperbarui seluruh barang di dalamnya)</label>
          <input type="text" id="editNamaRuangInput" value="${esc(namaRuangOld)}" required autofocus style="font-weight:700;font-size:14px;color:var(--primary)">
        </div>
      </div>
      
      <div style="background:#fef3c7;border:1px solid #fde68a;padding:12px;border-radius:10px;margin-top:10px;margin-bottom:14px;font-size:12px;color:#92400e">
        <i class="fa-solid fa-circle-info"></i> Mengubah nama ruangan akan otomatis memperbarui data ruangan pada seluruh barang inventaris terkait.
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
        <button type="button" class="btn btn-danger" onclick="deleteRuanganInventaris('${esc(namaRuangOld)}')">
          <i class="fa-solid fa-trash"></i> 🗑️ Hapus Ruangan Ini
        </button>
        <div style="display:flex;gap:10px">
          <button type="button" class="btn btn-secondary" onclick="closeModal('formModal')">Batal</button>
          <button type="submit" class="btn btn-emerald"><i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan</button>
        </div>
      </div>
    </form>
  `;

  openModal('formModal');
}

function saveRenameRuangan(e, oldName) {
  e.preventDefault();
  const newName = document.getElementById('editNamaRuangInput').value.trim();
  if (!newName) return;

  let updateCount = 0;
  db.inventaris.forEach(item => {
    const curRoom = (item['Nama Ruang'] || item.Lokasi || item.Ruang || '').trim();
    if (curRoom.toLowerCase() === oldName.toLowerCase()) {
      item['Nama Ruang'] = newName;
      item.Lokasi = newName;
      updateCount++;
    }
  });

  saveDatabase();
  closeModal('formModal');
  renderTable('inventaris');
  alert(`🎉 Berhasil memperbarui nama ruangan menjadi "${newName}" (${updateCount} barang ter-update)!`);
}

function deleteRuanganInventaris(namaRuang) {
  if (!isAdminLoggedIn) {
    handleAdminIconClick();
    return;
  }

  if (confirm(`Apakah Anda yakin ingin menghapus seluruh Ruangan "${namaRuang}" dan SELURUH barang inventaris di dalamnya?`)) {
    db.inventaris = db.inventaris.filter(item => {
      const curRoom = (item['Nama Ruang'] || item.Lokasi || item.Ruang || '').trim();
      return curRoom.toLowerCase() !== namaRuang.toLowerCase();
    });

    saveDatabase();
    closeModal('formModal');
    renderTable('inventaris');
    alert(`🗑️ Ruangan "${namaRuang}" beserta barang di dalamnya telah dihapus.`);
  }
}

// HANDLER DETIL INVENTARIS PER RUANGAN
function openDetailInventarisRuangModal(namaRuang) {
  currentActiveRoomNameForInventaris = namaRuang;

  const titleEl = document.getElementById('detailRuangTitle');
  if (titleEl) titleEl.textContent = namaRuang;

  const allItems = db.inventaris || [];
  const roomItems = allItems.filter(r => (r['Nama Ruang'] || r.Lokasi || '').trim().toLowerCase() === namaRuang.trim().toLowerCase());

  const modalBody = document.getElementById('detailInventarisRuangBody');

  let totalUnitSum = 0;
  roomItems.forEach(i => {
    const qty = parseInt(i.Jumlah || i.QTY || 0, 10);
    if (!isNaN(qty)) totalUnitSum += qty;
  });

  modalBody.innerHTML = `
    <div style="background:#fffbeb;border:1px solid #fde68a;padding:12px 16px;border-radius:12px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;">
      <div style="font-size:13px;color:#b45309;font-weight:700;">
        <i class="fa-solid fa-layer-group"></i> Total Barang Terdaftar: <strong>${roomItems.length} Jenis (${totalUnitSum} Unit)</strong>
      </div>
      ${isAdminLoggedIn ? `
        <button class="btn btn-emerald" style="padding:6px 12px;font-size:12px;" onclick="openTambahBarangKeRuangModal('${esc(namaRuang)}')">
          <i class="fa-solid fa-plus"></i> + Tambah Barang Baru
        </button>
      ` : ''}
    </div>

    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th style="width:40px">No</th>
            <th>Nama Barang</th>
            <th style="width:90px;text-align:center">Jumlah</th>
            <th style="width:80px">Satuan</th>
            <th style="width:90px">Kondisi</th>
            <th>Keterangan</th>
            ${isAdminLoggedIn ? `<th style="width:90px;text-align:center">Aksi</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${roomItems.length === 0 ? `
            <tr>
              <td colspan="${isAdminLoggedIn ? 7 : 6}" style="text-align:center;padding:24px;color:var(--text-muted)">
                Belum ada data barang terdaftar di ${esc(namaRuang)}.
              </td>
            </tr>
          ` : roomItems.map((item, idx) => {
            const realIdx = db.inventaris.indexOf(item);
            return `
              <tr>
                <td style="color:var(--text-muted);font-weight:600">${idx + 1}</td>
                <td style="font-weight:700;color:var(--text-main);">${esc(item['Nama Barang'] || item.Nama)}</td>
                <td style="text-align:center;font-weight:800;color:var(--primary);">${esc(item.Jumlah || item.QTY || '1')}</td>
                <td>${esc(item.Satuan || 'Unit')}</td>
                <td><span class="stat-badge" style="background:#ecfdf5;color:#047857">${esc(item.Kondisi || 'Baik')}</span></td>
                <td style="font-size:12px;color:var(--text-muted);">${esc(item.Keterangan || item.Kategori || '-')}</td>
                ${isAdminLoggedIn ? `
                  <td style="text-align:center">
                    <button class="btn btn-secondary" style="padding:3px 6px;font-size:11px" onclick="openFormModal(${realIdx})" title="Edit Barang"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-danger" style="padding:3px 6px;font-size:11px" onclick="deleteTableRow(${realIdx}); openDetailInventarisRuangModal('${esc(namaRuang)}')" title="Hapus Barang"><i class="fa-solid fa-trash"></i></button>
                  </td>
                ` : ''}
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>

    <div style="display:flex;justify-content:flex-end;margin-top:20px;">
      <button class="btn btn-secondary" onclick="closeModal('detailInventarisRuangModal')">Tutup</button>
    </div>
  `;

  openModal('detailInventarisRuangModal');
}

function openTambahBarangKeRuangModal(namaRuang) {
  closeModal('detailInventarisRuangModal');
  
  if (!TABLE_CFG.inventaris) return;
  
  const bodyEl = document.getElementById('formModalBody');
  document.getElementById('formModalTitle').textContent = `Tambah Barang di ${namaRuang}`;

  bodyEl.innerHTML = `
    <form onsubmit="saveBarangBaruKeRuang(event, '${esc(namaRuang)}')">
      <div class="form-grid">
        <div class="form-group full-width">
          <label>Nama Ruangan</label>
          <input type="text" id="fRuangName" value="${esc(namaRuang)}" readonly style="background:#f8fafc;font-weight:700;color:var(--primary)">
        </div>
        <div class="form-group full-width">
          <label>Nama Barang</label>
          <input type="text" id="fNamaBarang" placeholder="Contoh: Meja Siswa, Laptop Asus, Proyektor" required autofocus>
        </div>
        <div class="form-group">
          <label>Jumlah (QTY)</label>
          <input type="number" id="fJumlah" value="1" min="1" required>
        </div>
        <div class="form-group">
          <label>Satuan</label>
          <input type="text" id="fSatuan" value="Unit" required>
        </div>
        <div class="form-group">
          <label>Kondisi Barang</label>
          <select id="fKondisi">
            <option value="Baik">Baik</option>
            <option value="Rusak Ringan">Rusak Ringan</option>
            <option value="Rusak Berat">Rusak Berat</option>
          </select>
        </div>
        <div class="form-group full-width">
          <label>Keterangan Tambahan</label>
          <input type="text" id="fKeterangan" placeholder="Contoh: Pengadaan BOS 2024, Bahan Kayu Jati">
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
        <button type="button" class="btn btn-secondary" onclick="closeModal('formModal'); openDetailInventarisRuangModal('${esc(namaRuang)}')">Batal</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Simpan Barang</button>
      </div>
    </form>
  `;

  openModal('formModal');
}

function saveBarangBaruKeRuang(e, namaRuang) {
  e.preventDefault();

  const newObj = {
    "Nama Ruang": namaRuang,
    "Nama Barang": document.getElementById('fNamaBarang').value.trim(),
    "Jumlah": document.getElementById('fJumlah').value,
    "Satuan": document.getElementById('fSatuan').value.trim(),
    "Kondisi": document.getElementById('fKondisi').value,
    "Keterangan": document.getElementById('fKeterangan').value.trim()
  };

  db.inventaris.push(newObj);
  saveDatabase();
  closeModal('formModal');
  renderTable('inventaris');
  openDetailInventarisRuangModal(namaRuang);
}

// GENERIC DYNAMIC MASTER TABLES RENDER
function renderTable(id) {
  if (!TABLE_CFG[id]) return;
  const [title, fields] = TABLE_CFG[id];

  document.getElementById('tablePageTitle').textContent = title;
  document.getElementById('tablePageSubtitle').textContent = `Menampilkan total ${db[id] ? db[id].length : 0} data tercatat`;
  
  const topActionsEl = document.getElementById('tableTopActions');
  const adminToolbarEl = document.getElementById('adminToolbarActions');

  if (isAdminLoggedIn) {
    topActionsEl.innerHTML = `
      <button class="btn btn-primary" onclick="openFormModal()">
        <i class="fa-solid fa-plus"></i> Tambah ${id === 'guru' ? 'Guru Baru' : (id === 'lulusan' ? 'Alumni Baru' : (id === 'administrasi' ? 'Surat Baru' : (id === 'inventaris' ? 'Barang Inventaris' : 'Data Baru')))}
      </button>
    `;
    adminToolbarEl.innerHTML = `
      <button class="btn btn-excel" onclick="downloadCurrentExcelTemplate()" title="Unduh Format Template Excel (.xlsx)">
        <i class="fa-solid fa-file-excel"></i> 📥 Unduh Template Excel
      </button>
      <button class="btn btn-emerald" onclick="triggerExcelUpload()" title="Unggah Data dari Excel (.xlsx/.xls)">
        <i class="fa-solid fa-file-arrow-up"></i> 📤 Unggah Data Excel
      </button>
      <button class="btn btn-secondary" onclick="exportCurrentExcel()" title="Export Excel Data Saat Ini">
        <i class="fa-solid fa-file-excel"></i> Export Excel
      </button>
    `;
  } else {
    topActionsEl.innerHTML = '';
    adminToolbarEl.innerHTML = '';
  }

  const searchVal = (document.getElementById('searchInput')?.value || '').toLowerCase();
  let items = db[id] || [];

  if (searchVal) {
    items = items.filter(row => Object.values(row).join(' ').toLowerCase().includes(searchVal));
  }

  const tableContainer = document.getElementById('tableContainer');
  
  if (items.length === 0) {
    tableContainer.innerHTML = `
      <div style="padding:48px 20px;text-align:center;color:var(--text-muted)">
        <i class="fa-solid fa-folder-open" style="font-size:42px;margin-bottom:12px;color:#cbd5e1"></i><br>
        <strong style="font-size:16px;color:var(--text-main)">Belum ada data ${title} yang tersimpan.</strong><br>
        <span style="font-size:13px;display:inline-block;margin-top:6px">
          ${isAdminLoggedIn ? 'Silakan klik <strong>"📤 Unggah Data Excel"</strong> atau <strong>"+ Tambah Data Baru"</strong> untuk mengisi data.' : 'Silakan hubungi Administrator Sekolah untuk mengisi data ini.'}
        </span>
      </div>
    `;
    return;
  }

  if (id === 'guru') {
    tableContainer.innerHTML = `
      <div class="guru-cards-grid">
        ${items.map((row) => {
          const realIdx = db[id].indexOf(row);
          const kelasLabel = row.Jabatan || row.Kelas || 'Guru Kelas 1';
          const defaultAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
          const photoUrl = row.Foto || defaultAvatar;

          return `
            <div class="guru-card-minimal">
              <div>
                <div class="guru-card-class-tag">
                  <i class="fa-solid fa-chalkboard-user"></i> ${esc(kelasLabel)}
                </div>

                <div class="guru-card-photo-frame">
                  <img src="${esc(photoUrl)}" alt="${esc(row.Nama)}">
                  ${isAdminLoggedIn ? `
                    <button class="btn-change-photo" onclick="triggerGuruPhotoUpload(${realIdx})" title="Unggah / Ubah Foto Guru">
                      <i class="fa-solid fa-camera"></i>
                    </button>
                  ` : ''}
                </div>

                <div class="guru-card-teacher-name">
                  ${esc(row.Nama)}
                </div>
              </div>

              ${isAdminLoggedIn ? `
                <div class="guru-card-actions">
                  <button class="btn btn-secondary" style="padding:4px 10px;font-size:11px" onclick="openFormModal(${realIdx})" title="Edit"><i class="fa-solid fa-pen"></i> Edit</button>
                  <button class="btn btn-danger" style="padding:4px 10px;font-size:11px" onclick="deleteTableRow(${realIdx})" title="Hapus"><i class="fa-solid fa-trash"></i> Hapus</button>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
    return;
  }

  if (id === 'lulusan') {
    tableContainer.innerHTML = `
      <div class="lulusan-cards-grid">
        ${items.map((row) => {
          const realIdx = db[id].indexOf(row);
          const angkatanLabel = row.Tahun || row['Tahun Pelajaran'] || row.Angkatan || 'Angkatan 2025/2026';
          const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
          const photoUrl = row.Foto || defaultAvatar;

          return `
            <div class="lulusan-card-minimal">
              <div>
                <div class="lulusan-card-name-top">
                  ${esc(row.Nama)}
                </div>

                <div class="lulusan-card-photo-frame">
                  <img src="${esc(photoUrl)}" alt="${esc(row.Nama)}">
                  ${isAdminLoggedIn ? `
                    <button class="btn-change-photo" onclick="triggerLulusanPhotoUpload(${realIdx})" title="Unggah / Ubah Foto Alumni">
                      <i class="fa-solid fa-camera"></i>
                    </button>
                  ` : ''}
                </div>

                <div class="lulusan-card-angkatan-tag">
                  <i class="fa-solid fa-graduation-cap"></i> ${esc(angkatanLabel)}
                </div>
              </div>

              ${isAdminLoggedIn ? `
                <div class="guru-card-actions">
                  <button class="btn btn-secondary" style="padding:4px 10px;font-size:11px" onclick="openFormModal(${realIdx})" title="Edit"><i class="fa-solid fa-pen"></i> Edit</button>
                  <button class="btn btn-danger" style="padding:4px 10px;font-size:11px" onclick="deleteTableRow(${realIdx})" title="Hapus"><i class="fa-solid fa-trash"></i> Hapus</button>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
    return;
  }

  if (id === 'inventaris') {
    const roomMap = {};
    items.forEach(row => {
      const roomName = (row['Nama Ruang'] || row.Lokasi || row.Ruang || 'Lain-lain').trim();
      if (!roomMap[roomName]) {
        roomMap[roomName] = { roomName, items: [], totalUnitSum: 0 };
      }
      roomMap[roomName].items.push(row);

      const qty = parseInt(row.Jumlah || row.QTY || 0, 10);
      if (!isNaN(qty)) roomMap[roomName].totalUnitSum += qty;
    });

    const roomList = Object.values(roomMap);

    tableContainer.innerHTML = `
      <table>
        <thead>
          <tr>
            <th style="width:50px">No</th>
            <th>Nama Ruangan</th>
            <th style="width:200px">Jumlah Inventaris</th>
            <th style="width:160px;text-align:center">Detail Inventaris</th>
            ${isAdminLoggedIn ? `<th style="width:100px;text-align:center">Aksi</th>` : ''}
          </tr>
        </thead>
        <tbody>
          ${roomList.map((rm, idx) => `
            <tr>
              <td style="color:var(--text-muted);font-weight:600">${idx + 1}</td>
              <td>
                <div style="font-weight:800;color:var(--text-main);font-size:14px;display:flex;align-items:center;gap:8px;">
                  <i class="fa-solid fa-door-open" style="color:var(--gold)"></i> ${esc(rm.roomName)}
                </div>
              </td>
              <td>
                <span class="hero-chip" style="background:#fffbeb;color:#b45309;border:1px solid #fde68a;font-size:12px;">
                  <i class="fa-solid fa-boxes-stacked"></i> ${rm.items.length} Jenis (${rm.totalUnitSum} Unit)
                </span>
              </td>
              <td style="text-align:center">
                <button class="btn btn-emerald" style="padding:5px 12px;font-size:12px" onclick="openDetailInventarisRuangModal('${esc(rm.roomName)}')" title="Lihat Rincian Barang di ${esc(rm.roomName)}">
                  <i class="fa-solid fa-list-check"></i> 📋 Detail Inventaris
                </button>
              </td>
              ${isAdminLoggedIn ? `
                <td style="text-align:center">
                  <button class="btn btn-secondary" style="padding:4px 8px;font-size:11px" onclick="openEditRuangModal('${esc(rm.roomName)}')" title="Ubah Nama Ruangan / Hapus Ruangan"><i class="fa-solid fa-pen"></i></button>
                </td>
              ` : ''}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    return;
  }

  const isPindahanSection = id === 'masuk' || id === 'keluar';
  const isAdministrasiSection = id === 'administrasi';

  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th style="width:40px">No</th>
          ${fields.map(f => `<th>${esc(f)}</th>`).join('')}
          ${isPindahanSection ? `<th style="width:130px;text-align:center">Cetak Surat</th>` : ''}
          ${isAdminLoggedIn ? `<th style="width:110px;text-align:center">Aksi</th>` : ''}
        </tr>
      </thead>
      <tbody>
        ${items.map((row, idx) => {
          const realIdx = db[id].indexOf(row);
          return `
            <tr>
              <td style="color:var(--text-muted);font-weight:600">${idx + 1}</td>
              ${fields.map(f => {
                let cellVal = row[f] || '-';
                
                if (id === 'siswa' && f === 'Nama') {
                  return `
                    <td>
                      <a class="student-name-link" onclick="handleStudentNameClick(${realIdx})" title="Klik untuk lihat detail siswa">
                        <i class="fa-solid fa-user-graduate"></i> ${esc(row.Nama)}
                      </a>
                    </td>
                  `;
                }

                if (isAdministrasiSection && f === 'File Surat') {
                  const fileData = row['File Surat'];
                  if (fileData) {
                    return `
                      <td>
                        <div style="display:flex;gap:6px;align-items:center;">
                          <button class="btn btn-emerald" style="padding:4px 10px;font-size:11px" onclick="openSuratFileDocument(${realIdx})" title="Buka / Unduh Berkas Surat PDF/Dokumen">
                            <i class="fa-solid fa-file-pdf"></i> 📄 Buka File
                          </button>
                          ${isAdminLoggedIn ? `
                            <button class="btn btn-secondary" style="padding:4px 8px;font-size:11px" onclick="triggerSuratFileUpload(${realIdx})" title="Unggah Ulang / Ganti Berkas">
                              <i class="fa-solid fa-upload"></i>
                            </button>
                          ` : ''}
                        </div>
                      </td>
                    `;
                  } else {
                    return `
                      <td>
                        ${isAdminLoggedIn ? `
                          <button class="btn btn-emerald" style="padding:4px 10px;font-size:11px" onclick="triggerSuratFileUpload(${realIdx})" title="Unggah File Surat PDF/Dokumen">
                            <i class="fa-solid fa-file-arrow-up"></i> 📤 Unggah File Surat
                          </button>
                        ` : `<span style="color:var(--text-muted);font-size:12px">Belum Ada File</span>`}
                      </td>
                    `;
                  }
                }

                if (f.toLowerCase().includes('tanggal') || f.toLowerCase().includes('tgl')) {
                  cellVal = formatIndonesianDate(cellVal);
                }
                return `<td>${esc(cellVal)}</td>`;
              }).join('')}
              ${isPindahanSection ? `
                <td style="text-align:center">
                  <button class="btn btn-emerald" style="padding:4px 10px;font-size:11px" onclick="openSuratPindahanModal('${id}', ${realIdx})" title="Cetak Surat Resmi (PDF)">
                    <i class="fa-solid fa-print"></i> Cetak PDF
                  </button>
                </td>
              ` : ''}
              ${isAdminLoggedIn ? `
                <td style="text-align:center">
                  <button class="btn btn-secondary" style="padding:4px 8px;font-size:11px" onclick="openFormModal(${realIdx})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                  <button class="btn btn-danger" style="padding:4px 8px;font-size:11px" onclick="deleteTableRow(${realIdx})" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                </td>
              ` : ''}
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

function filterCurrentTable() {
  if (currentSectionId !== 'dashboard' && currentSectionId !== 'profil') {
    renderTable(currentSectionId);
  }
}

// KLIK NAMA SISWA & VERIFIKASI TANGGAL LAHIR
function handleStudentNameClick(realIdx) {
  selectedSiswaIndexForVerification = realIdx;
  const s = db.siswa[realIdx];
  if (!s) return;

  if (isAdminLoggedIn) {
    showSiswaDetailModal(realIdx);
  } else {
    document.getElementById('verifyNamaDisplay').value = s.Nama;
    document.getElementById('verifyTglLahirInput').value = '';
    openModal('verifySiswaModal');
  }
}

function handleSiswaVerificationSubmit(e) {
  e.preventDefault();
  const inputTglStr = document.getElementById('verifyTglLahirInput').value.trim();
  const s = db.siswa[selectedSiswaIndexForVerification];

  if (!s) {
    alert('Siswa tidak ditemukan.');
    return;
  }

  const targetTglRaw = String(s['Tanggal Lahir'] || s['Tgl Lahir'] || '').trim();
  const parsedInput = parseDateComponents(inputTglStr);
  const parsedTarget = parseDateComponents(targetTglRaw);

  let isMatched = false;

  if (!parsedTarget || inputTglStr === targetTglRaw) {
    isMatched = true;
  } else if (parsedInput && parsedTarget) {
    if (parsedInput.day === parsedTarget.day &&
        parsedInput.month === parsedTarget.month &&
        parsedInput.year === parsedTarget.year) {
      isMatched = true;
    }
  }

  if (isMatched) {
    closeModal('verifySiswaModal');
    showSiswaDetailModal(selectedSiswaIndexForVerification);
  } else {
    alert('❌ Tanggal Lahir tidak cocok!\n\nPastikan Anda memasukkan Tanggal Lahir dengan format DD/MM/YYYY (Contoh: 30/12/2016 atau 10/02/2020).');
  }
}

// POPUP DETAIL RINGKAS SISWA
function showSiswaDetailModal(idx) {
  const s = db.siswa[idx];
  if (!s) return;

  const detailBody = document.getElementById('detailSiswaBody');

  const rawTglLahir = s['Tanggal Lahir'] || s['Tgl Lahir'] || s['TANGGAL LAHIR'] || '';
  const tglFormatted = formatIndonesianDate(rawTglLahir);
  const tempatTglStr = `${esc(s['Tempat Lahir'] || s['TEMPAT LAHIR'] || '-')}, ${tglFormatted}`;

  const rtRwStr = (s.RT || s.RW) ? `(RT ${esc(s.RT || '-')}/RW ${esc(s.RW || '-')})` : '';
  const kelKecStr = [s.Kelurahan, s.Kecamatan].filter(Boolean).map(x => esc(x)).join(', ');
  const alamatFull = `${esc(s.Alamat || '-')} ${rtRwStr} ${kelKecStr}`.trim();

  detailBody.innerHTML = `
    <div class="student-detail-header-card">
      <div>
        <div class="student-detail-name-title">${esc(s.Nama)}</div>
        <div style="font-size:14px;opacity:0.9;margin-top:6px">
          NISN: <strong>${esc(s.NISN || '-')}</strong>
        </div>
      </div>
      <div style="text-align:right">
        <span class="stat-badge" style="background:rgba(255,255,255,0.25);color:#fff;font-size:13px">${esc(s.Kelas || s['Rombel Saat Ini'] || 'Kelas 1A')}</span>
      </div>
    </div>

    <!-- 1. DATA DIRI RINGKAS -->
    <div class="student-detail-section-title">
      <i class="fa-solid fa-user"></i> 1. Data Diri
    </div>
    <div class="student-detail-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="student-detail-item">
        <label>NISN</label>
        <div>${esc(s.NISN || '-')}</div>
      </div>
      <div class="student-detail-item">
        <label>Tempat, Tanggal Lahir</label>
        <div>${tempatTglStr}</div>
      </div>
      <div class="student-detail-item" style="grid-column: span 2">
        <label>Alamat Rumah</label>
        <div>${alamatFull}</div>
      </div>
    </div>

    <!-- 2. DATA ORANG TUA -->
    <div class="student-detail-section-title" style="color:var(--emerald)">
      <i class="fa-solid fa-users"></i> 2. Data Orang Tua
    </div>
    <div class="student-detail-grid" style="grid-template-columns: 1fr 1fr;">
      <div class="student-detail-item">
        <label>Nama Ayah</label>
        <div>${esc(s['Nama Ayah'] || '-')}</div>
      </div>
      <div class="student-detail-item">
        <label>Nama Ibu</label>
        <div>${esc(s['Nama Ibu'] || '-')}</div>
      </div>
    </div>

    <!-- 3. SEKOLAH ASAL -->
    <div class="student-detail-section-title" style="color:var(--gold)">
      <i class="fa-solid fa-school"></i> 3. Data Sekolah
    </div>
    <div class="student-detail-grid" style="grid-template-columns: 1fr;">
      <div class="student-detail-item">
        <label>Sekolah Asal</label>
        <div>${esc(s['Sekolah Asal'] || '-')}</div>
      </div>
    </div>

    <div style="display:flex;justify-content:flex-end;margin-top:24px">
      <button class="btn btn-secondary" onclick="closeModal('detailSiswaModal')">Tutup</button>
    </div>
  `;

  openModal('detailSiswaModal');
}

// MASTER FORM MODAL HANDLERS (ADMIN)
function openFormModal(idx = -1) {
  if (!isAdminLoggedIn) {
    handleAdminIconClick();
    return;
  }

  if (!TABLE_CFG[currentSectionId]) return;
  
  if (currentSectionId === 'inventaris') {
    openTambahBarangKeRuangModal('Ruang Kelas 1');
    return;
  }

  const [title, fields] = TABLE_CFG[currentSectionId];
  const row = idx >= 0 ? db[currentSectionId][idx] : {};

  document.getElementById('formModalTitle').textContent = (idx >= 0 ? 'Edit ' : 'Tambah ') + title;

  const bodyEl = document.getElementById('formModalBody');
  bodyEl.innerHTML = `
    <form onsubmit="saveFormModal(event, ${idx})">
      <div class="form-grid">
        ${fields.filter(f => f !== 'File Surat' && f !== 'Jumlah Inventaris' && f !== 'Detail Inventaris').map(f => `
          <div class="form-group ${f === 'Foto' || f === 'Keterangan' ? 'full-width' : ''}">
            <label>${esc(f)}</label>
            <input type="text" data-field="${esc(f)}" value="${esc(row[f] || '')}" placeholder="${f === 'Foto' ? 'https://...' : ''}">
          </div>
        `).join('')}
      </div>
      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
        <button type="button" class="btn btn-secondary" onclick="closeModal('formModal')">Batal</button>
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Simpan Data</button>
      </div>
    </form>
  `;

  openModal('formModal');
}

function saveFormModal(e, idx) {
  e.preventDefault();
  const fields = TABLE_CFG[currentSectionId][1];
  const newRow = idx >= 0 ? { ...db[currentSectionId][idx] } : {};

  fields.forEach(f => {
    if (f !== 'File Surat' && f !== 'Jumlah Inventaris' && f !== 'Detail Inventaris') {
      const input = document.querySelector(`#formModalBody input[data-field="${f}"]`);
      newRow[f] = input ? input.value : (newRow[f] || '');
    }
  });

  if (idx >= 0) {
    db[currentSectionId][idx] = newRow;
  } else {
    if (!db[currentSectionId]) db[currentSectionId] = [];
    db[currentSectionId].push(newRow);
  }

  saveDatabase();
  closeModal('formModal');
  renderTable(currentSectionId);
}

function deleteTableRow(idx) {
  if (!isAdminLoggedIn) {
    handleAdminIconClick();
    return;
  }

  if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
    db[currentSectionId].splice(idx, 1);
    saveDatabase();
    renderTable(currentSectionId);
  }
}

// FITUR EXCEL & DAPODIK IMPORT/EXPORT
function downloadCurrentExcelTemplate() {
  if (!isAdminLoggedIn) {
    alert('Silakan login via Icon Admin (👤) terlebih dahulu.');
    handleAdminIconClick();
    return;
  }

  const fields = currentSectionId === 'siswa' ? SISWA_DAPODIK_FIELDS : TABLE_CFG[currentSectionId][1];
  const sampleRow = TEMPLATE_SAMPLES[currentSectionId] || fields.map(f => `Contoh ${f}`);
  const wsData = [fields, sampleRow];

  try {
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template_Data");

    const fileName = `Template_Import_${currentSectionId.toUpperCase()}_SDIT_ANNISA.xlsx`;
    XLSX.writeFile(wb, fileName);
  } catch (err) {
    alert('Gagal menghasilkan file Excel.');
  }
}

function triggerExcelUpload() {
  if (!isAdminLoggedIn) {
    alert('Silakan login via Icon Admin (👤) terlebih dahulu untuk mengunggah file.');
    handleAdminIconClick();
    return;
  }
  document.getElementById('excelFileInput').value = '';
  document.getElementById('excelFileInput').click();
}

function handleExcelFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      let jsonRows = [];

      if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        const text = new TextDecoder('utf-8').decode(e.target.result);
        const lines = text.split(/\r\n|\n/).filter(l => l.trim().length > 0);
        
        let headerIdx = lines.findIndex(l => l.includes('Nama;') || l.includes('NISN;'));
        if (headerIdx < 0) headerIdx = 0;

        const headers = lines[headerIdx].split(';').map(h => h.replace(/^["']|["']$/g, '').trim());
        
        for (let i = headerIdx + 1; i < lines.length; i++) {
          const rawVals = lines[i].split(';').map(v => v.replace(/^["']|["']$/g, '').trim());
          if (rawVals.length < 2) continue;

          const rowObj = {};
          headers.forEach((h, hIdx) => {
            if (h) rowObj[h] = rawVals[hIdx] || '';
          });
          
          if (rowObj.Nama) {
            if (!rowObj.Kelas && rowObj['Rombel Saat Ini']) rowObj.Kelas = rowObj['Rombel Saat Ini'];
            jsonRows.push(rowObj);
          }
        }
      } else {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array', cellDates: false });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        jsonRows = XLSX.utils.sheet_to_json(worksheet, { defval: '', raw: true });
      }

      if (!jsonRows || jsonRows.length === 0) {
        alert('File kosong atau format data tidak dapat terbaca.');
        return;
      }

      let addedCount = 0;
      jsonRows.forEach(row => {
        const newObj = {};
        const fields = currentSectionId === 'siswa' ? SISWA_DAPODIK_FIELDS : TABLE_CFG[currentSectionId][1];
        
        fields.forEach(field => {
          const matchedKey = Object.keys(row).find(k => k.trim().toLowerCase() === field.trim().toLowerCase());
          newObj[field] = matchedKey ? String(row[matchedKey]).trim() : (row[field] ? String(row[field]).trim() : '');
        });

        if (!newObj.Nama && row.Nama) newObj.Nama = row.Nama;
        if (!newObj.Kelas && row['Rombel Saat Ini']) newObj.Kelas = row['Rombel Saat Ini'];

        if (!db[currentSectionId]) db[currentSectionId] = [];
        db[currentSectionId].push(newObj);
        addedCount++;
      });

      saveDatabase();
      renderTable(currentSectionId);
      alert(`🎉 Berhasil mengunggah & mengimpor ${addedCount} data baru dari file ke ${TABLE_CFG[currentSectionId][0]}!`);
    } catch (err) {
      alert('Gagal membaca file. Pastikan format file sesuai.');
    }
  };

  reader.readAsArrayBuffer(file);
}

function exportCurrentExcel() {
  if (!TABLE_CFG[currentSectionId]) return;
  const [title, fields] = TABLE_CFG[currentSectionId];
  const exportFields = currentSectionId === 'siswa' ? SISWA_DAPODIK_FIELDS : fields;
  const rows = db[currentSectionId] || [];

  try {
    const wsData = [exportFields, ...rows.map(r => exportFields.map(f => r[f] || ''))];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title.substring(0, 30));

    XLSX.writeFile(wb, title.replace(/[^a-z0-9]/gi, '_') + '_SDIT_ANNISA.xlsx');
  } catch (err) {
    alert('Gagal mengekspor data ke file Excel.');
  }
}

function exportAllData() {
  downloadFile(JSON.stringify(db, null, 2), 'backup_sdit_annisa_full.json', 'application/json');
}

function backupData() {
  if (!isAdminLoggedIn) {
    alert('Silakan login via Icon Admin (👤) terlebih dahulu.');
    handleAdminIconClick();
    return;
  }
  exportAllData();
  alert('💾 Backup data JSON berhasil diunduh.');
}

function restoreData() {
  if (!isAdminLoggedIn) {
    alert('Silakan login via Icon Admin (👤) terlebih dahulu.');
    handleAdminIconClick();
    return;
  }
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const restored = JSON.parse(evt.target.result);
        if (restored && restored.profil) {
          db = restored;
          saveDatabase();
          alert('🎉 Data berhasil dipulihkan dari file backup!');
          location.reload();
        } else {
          alert('File backup JSON tidak valid.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function downloadFile(content, name, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

// HELPER MODAL UTILS
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('show');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('show');
}

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}
