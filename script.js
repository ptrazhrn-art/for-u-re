const pesan = 
  "HALLOWWWWWW TIREREXX, Aku bangga deh sekarang ngeliat kamu lebih happy, Maafin aku ya selama ini aku salah, aku beneran nyesel karena aku selalu egois dan gapernah mikirin perasaan kamu, jujur aku selalu bangga sama kamu, sama pencapaian kamu, apapun itu jika ada kamunya maka aku bakalan bangga, maaff yaa belum bisa jadi apa yang kamu mau, maaf kalo aku dateng cuma buat ngasih trauma lebih doang ke kamu, maaf kalo aku dateng cuma bikin kamu nyesel doang, bikin kamu malah makin ga percaya sama cowo, maafin aku yaa yang selama ini selalu nyakitin kamu, selalu aja mentingin perasaan aku tanpa mikirin kamu, kalo ada kesempatan aku mau berubah, aku mau jadi orang yang bener bener selalu di samping kamu kapanpun itu, aku bakalan jadi orang yang selalu jadi tameng kamu, selalu support kamu dalam keadaan apapun, selalu ngejaga kamu dan ngebela kamu, maafin aku yaa re? semoga kamu bisa terima aku lagi☹️, Aku kangen banget sama kamu, kangen hug-hug kamu, kangen kiss kamu, kangen apapun itu yang bersangkutan sama kamu:(️.";

const openBtn = document.getElementById('openBtn');
const skipBtn = document.getElementById('skipBtn');
const messageEl = document.getElementById('message');
const heartEl = document.getElementById('heart');
const audio = document.getElementById('bgMusic');

let isTyping = false;
let typingTimeout = null;

// Fungsi utama: tampilkan pesan per huruf
function ketikPesan(teks, index) {
  if (index < teks.length) {
    messageEl.textContent += teks.charAt(index);
    const char = teks.charAt(index);
    let delay = 85;
    if (char === '.' || char === ',' || char === '—' || char === '!' || char === '?') {
      delay = 190;
    } else if (char === ' ') {
      delay = 95;
    }

    isTyping = true;
    typingTimeout = setTimeout(() => ketikPesan(teks, index + 1), delay);
  } else {
    selesaikanPesan();
  }
}

// Fungsi saat pesan selesai (normal atau di-skip)
function selesaikanPesan() {
  isTyping = false;
  skipBtn.style.display = 'none'; // sembunyikan tombol skip

  setTimeout(() => {
    heartEl.style.display = 'block';
    setTimeout(() => {
      tampilkanGaleri();
    }, 800);
  }, 300);
}

// Tombol utama: mulai pesan & musik
openBtn.addEventListener('click', () => {
  openBtn.style.display = 'none';
  skipBtn.style.display = 'inline-block'; // munculkan tombol skip

  audio.volume = 0.4;
  audio.play().catch(e => console.warn("Audio tidak bisa diputar:", e));

  messageEl.classList.add('show');
  ketikPesan(pesan, 0);
});

// Tombol skip
skipBtn.addEventListener('click', () => {
  if (isTyping) {
    // Batalkan pengetikan yang sedang berjalan
    clearTimeout(typingTimeout);
    // Tampilkan seluruh pesan sekaligus
    messageEl.textContent = pesan;
    selesaikanPesan();
  }
});

// === Fungsi Galeri (sama seperti sebelumnya) ===
function tampilkanGaleri() {
  const galleryEl = document.getElementById('gallery');
  galleryEl.innerHTML = '';

  for (let i = 1; i <= 6; i++) {
    const img = document.createElement('img');
    const filename = `kenangan${i}.jpg`;
    img.src = filename;
    img.alt = `Kenangan ${i}`;

    img.onerror = () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'missing';
      placeholder.textContent = 'Foto tidak ada';
      img.replaceWith(placeholder);
    };

    galleryEl.appendChild(img);
  }

  setTimeout(() => {
    galleryEl.classList.add('show');
  }, 300);
}