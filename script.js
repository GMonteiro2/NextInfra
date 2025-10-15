// Carrossel de serviços otimizado
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.services-carousel');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Criar dots de navegação
    function createDots() {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < cards.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Atualizar carrossel
    function updateCarousel() {
        // Remover classe active de todos os cards
        cards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Adicionar classe active ao card atual
        cards[currentIndex].classList.add('active');
        
        // Atualizar dots
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Navegar para um slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Próximo slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Iniciar slideshow automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Muda a cada 5 segundos
    }
    
    // Resetar slideshow automático
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Inicializar
    createDots();
    startAutoSlide();
    
    // Pausar auto-slide quando o mouse estiver sobre o carrossel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Retomar auto-slide quando o mouse sair do carrossel
    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});