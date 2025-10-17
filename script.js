// NextInfo Tech - Script Profissional
document.addEventListener('DOMContentLoaded', function() {
    // Observador de interseção para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.section-title, .about-text, .about-image').forEach(el => {
        observer.observe(el);
    });

    // Carrossel de serviços
    const carousel = document.querySelector('.services-carousel');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let autoSlideInterval;
    let isAnimating = false;
    
    // Criar dots de navegação
    function createDots() {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < cards.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Ir para serviço ${i + 1}`);
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Atualizar carrossel com animação suave
    function updateCarousel() {
        if (isAnimating) return;
        
        isAnimating = true;
        const translateX = -currentIndex * 100;
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Resetar flag de animação após a transição
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }
    
    // Navegar para um slide específico
    function goToSlide(index) {
        if (isAnimating) return;
        
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Próximo slide
    function nextSlide() {
        if (isAnimating) return;
        
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Slide anterior
    function prevSlide() {
        if (isAnimating) return;
        
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Iniciar slideshow automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Resetar slideshow automático
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners para controles do carrossel
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Swipe para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Inicializar carrossel
    create
