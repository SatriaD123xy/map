document.addEventListener("DOMContentLoaded", function () {
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const mapContent = document.getElementById('map-content');

    let zoomLevel = 1;
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let originX = 0, originY = 0;

    function updateTransform() {
      mapContent.style.transform = `scale(${zoomLevel}) translate(${currentX}px, ${currentY}px)`;
    }

    zoomInBtn.addEventListener("click", () => {
      if (zoomLevel < 2) {
        zoomLevel = Math.round((zoomLevel + 0.1) * 10) / 10;
        updateTransform();
      }
    });

    zoomOutBtn.addEventListener("click", () => {
      if (zoomLevel > 1.01) {
        zoomLevel = Math.round((zoomLevel - 0.1) * 10) / 10;
        updateTransform();
      } else {
        zoomLevel = 1;
        currentX = 0;
        currentY = 0;
        updateTransform();
      }
    });

    mapContent.addEventListener("mousedown", (e) => {
      if (zoomLevel <= 1) return;
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      originX = currentX;
      originY = currentY;
      mapContent.style.cursor = "grabbing";
      e.preventDefault();
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      mapContent.style.cursor = "grab";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging || zoomLevel <= 1) return;

      const moveX = e.clientX - startX;
      const moveY = e.clientY - startY;

      const simulatedX = originX + moveX;
      const simulatedY = originY + moveY;

      const containerRect = document.getElementById('map-container').getBoundingClientRect();
      const contentWidth = mapContent.offsetWidth * zoomLevel;
      const contentHeight = mapContent.offsetHeight * zoomLevel;

      const maxX = (contentWidth - containerRect.width) / 2;
      const maxY = (contentHeight - containerRect.height) / 2;

      currentX = Math.max(-maxX, Math.min(maxX, simulatedX));
      currentY = Math.max(-maxY, Math.min(maxY, simulatedY));
      updateTransform();
    });

    // Marker InfoWindow Logic
    const markers = document.querySelectorAll('.marker');
    const infoWindow = document.getElementById('info-window');
    const infoTitle = document.getElementById('info-title');
    const infoDesc = document.getElementById('info-desc');
    const infoImg = document.getElementById('info-img');

    markers.forEach(marker => {
      marker.addEventListener('click', (e) => {
        const title = marker.getAttribute('data-title');
        const desc = marker.getAttribute('data-desc');
        const imgSrc = marker.getAttribute('data-img');

        infoTitle.textContent = title;
        infoDesc.textContent = desc;
        if (imgSrc) {
          infoImg.src = imgSrc;
          infoImg.style.display = 'block';
        } else {
          infoImg.style.display = 'none';
        }

        const top = marker.offsetTop;
        const left = marker.offsetLeft;
        infoWindow.style.top = `${top + 340}px`;
        infoWindow.style.left = `${left + 10}px`;
        infoWindow.classList.add('active');
      });
    });

    window.closeInfo = function () {
      infoWindow.classList.remove('active');
    };
  });
  
  const toggleMapBtn = document.getElementById('toggle-map');
  const miniMap = document.getElementById('mini-map');

  toggleMapBtn.addEventListener('click', function () {
    if (miniMap.style.display === 'block') {
      miniMap.style.display = 'none';
    } else {
      miniMap.style.display = 'block';
    }
  });
  
  const toggleSchoolBtn = document.getElementById('toggle-school');
const schoolInfo = document.getElementById('school-info-window');

toggleSchoolBtn.addEventListener('click', function () {
  schoolInfo.style.display = schoolInfo.style.display === 'block' ? 'none' : 'block';
});

function closeSchoolInfo() {
  schoolInfo.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
const fasilitasItems = document.querySelectorAll('.fasilitas-item');

fasilitasItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target');
    const targetMarker = document.getElementById(targetId);

    if (targetMarker) {
      // Simulasikan klik marker
      targetMarker.click();

      // Scroll agar marker terlihat (jika peta besar)
      targetMarker.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      // Tambahkan animasi ringkas
      targetMarker.style.animation = 'highlight 0.6s ease';

      // Hapus animasi setelah selesai
      setTimeout(() => {
        targetMarker.style.animation = '';
      }, 600);
    }
  });
});
});

document.addEventListener('DOMContentLoaded', () => {
const toggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Saat halaman dimuat, cek apakah dark mode aktif
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
  toggle.textContent = 'Light Mode';
  toggle.style.background = '#f3f4f6';
  toggle.style.color = '#111';
} else {
  toggle.textContent = 'Dark Mode';
  toggle.style.background = '#111';
  toggle.style.color = '#fff';
}

// Saat tombol ditekan
toggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

  // Ubah teks dan warna tombol sesuai mode
  toggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  toggle.style.background = isDark ? '#f3f4f6' : '#111';
  toggle.style.color = isDark ? '#111' : '#fff';
});
});

document.addEventListener("DOMContentLoaded", () => {
const playAudioBtn = document.getElementById("play-audio-btn");
const descElement = document.getElementById("info-desc");

if (playAudioBtn && descElement) {
  playAudioBtn.addEventListener("click", () => {
    const text = descElement.textContent;
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    speechSynthesis.speak(utterance);
  });
}
});

const swiper = new Swiper(".swiper", {
loop: true,
autoplay: {
    delay: 3000,
    disableOnInteraction: false,
},
pagination: {
  el: ".swiper-pagination",
  clickable: true,
},
navigation: {
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
},
});

function openInfo(markerElement) {
const info = document.getElementById("info-window");
const rect = markerElement.getBoundingClientRect();
info.style.top = rect.bottom + window.scrollY + "px";
info.style.left = rect.left + rect.width / 2 + "px";
info.classList.add("active");
}