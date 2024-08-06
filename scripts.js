// Fungsi untuk mendeteksi elemen dalam viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Memperbarui elemen dengan kelas visible jika ada di viewport
function onVisibilityChange(el, callback) {
    let oldVisible;
    return function () {
        const visible = isElementInViewport(el);
        if (visible !== oldVisible) {
            oldVisible = visible;
            if (typeof callback === 'function') {
                callback(visible);
            }
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.fade-section');

    sections.forEach(function (section) {
        const handler = onVisibilityChange(section, function (visible) {
            if (visible) {
                section.classList.add('visible');
                section.classList.remove('fade-out');
            } else {
                section.classList.add('fade-out');
            }
        });

        handler(); // Memeriksa saat memuat
        window.addEventListener('scroll', handler, false);
    });

    // Sidebar toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');

    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('hidden');
    });

    closeSidebar.addEventListener('click', function () {
        sidebar.classList.add('hidden');
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            // Tutup sidebar setelah klik tautan di sidebar
            if (!sidebar.classList.contains('hidden')) {
                sidebar.classList.add('hidden');
            }
        });
    });

    // Efek asap untuk mouse dan layar sentuh
    const createSmokeEffect = (x, y) => {
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        smoke.style.left = `${x}px`;
        smoke.style.top = `${y}px`;
        document.body.appendChild(smoke);

        setTimeout(() => {
            smoke.remove();
        }, 1000);
    };

    document.addEventListener('mousemove', function (e) {
        createSmokeEffect(e.pageX, e.pageY);
    });

    document.addEventListener('touchmove', function (e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            createSmokeEffect(touch.pageX, touch.pageY);
        }
    });

    // Buat bintang jatuh
    const createShootingStar = () => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `-${Math.random() * 100}px`;
        document.querySelector('.bg-animated').appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 3000);
    };

    setInterval(createShootingStar, 4000); // Interval untuk bintang jatuh

    // Buat kunang-kunang
    const createFirefly = () => {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = `${Math.random() * window.innerWidth}px`;
        firefly.style.top = `${Math.random() * window.innerHeight}px`;
        document.querySelector('.bg-animated').appendChild(firefly);

        setTimeout(() => {
            firefly.remove();
        }, 8000);
    };

    for (let i = 0; i < 10; i++) {
        createFirefly(); // Tambahkan beberapa kunang-kunang
    }
});
