/**
 * CAMADA DE INTELIGÊNCIA - OURO EM PARANAGUÁ
 * Gestão de Dados Dinâmicos e Acessibilidade
 */

document.addEventListener('DOMContentLoaded', () => {
    initAccessibility();
    renderHistoryCards();
    renderCarousel();
    renderAccordion();
    renderTabs();
    initScrollReveal();
});

/* 
    1. GESTÃO DE DADOS (DATASETS)
    Dados centralizados para renderização dinâmica
*/

const historyData = [
    {
        title: "Primeiras Amostras",
        year: "1580",
        description: "A primeira amostra de ouro brasileiro enviada a Portugal veio de Paranaguá, iniciando o interesse pela região.",
        icon: "✨"
    },
    {
        title: "Ilha de Cotinga",
        year: "1550",
        description: "O povoamento começou na Ilha de Cotinga, onde exploradores buscavam o brilho do ouro nas areias dos rios.",
        icon: "🏝️"
    },
    {
        title: "Porto Histórico",
        year: "1648",
        description: "Paranaguá torna-se Vila, consolidando-se como o principal porto de escoamento de minérios e mercadorias.",
        icon: "⚓"
    }
];

const carouselItems = [
    {
        title: "Ouro de Aluvião",
        text: "Diferente das minas subterrâneas, o ouro de Paranaguá era encontrado nos leitos dos rios, extraído com bateias.",
        img: "🌊"
    },
    {
        title: "A Trilha do Ouro",
        text: "Caminhos históricos foram abertos na Serra do Mar para transportar a riqueza até o porto de Paranaguá.",
        img: "⛰️"
    },
    {
        title: "Legado Barroco",
        text: "A riqueza do ouro financiou a construção de igrejas e casarões coloniais que ainda decoram o centro histórico.",
        img: "⛪"
    }
];

const faqData = [
    {
        question: "Por que o ouro de Paranaguá é pouco conhecido?",
        answer: "O ciclo paranaense foi breve e de aluvião (superficial). Logo depois, as gigantescas jazidas de Minas Gerais foram descobertas, ofuscando a produção litorânea."
    },
    {
        question: "Onde ficavam as principais minas?",
        answer: "As minas localizavam-se principalmente nos arredores da baía de Paranaguá, subindo os rios que descem da Serra do Mar."
    },
    {
        question: "Como visitar o patrimônio do ouro hoje?",
        answer: "O Centro Histórico de Paranaguá e o Museu de Arqueologia e Etnologia (MAE) preservam artefatos e a arquitetura desse período."
    }
];

const tabData = [
    {
        id: "tab-panel-1",
        title: "Arquitetura Colonial",
        content: "Casarões do século XVIII com fachadas decoradas e estruturas robustas que resistem ao tempo no litoral paranaense."
    },
    {
        id: "tab-panel-2",
        title: "O Porto de Paranaguá",
        content: "O segundo maior complexo portuário do Brasil, peça fundamental para a economia nacional desde os tempos do império."
    },
    {
        id: "tab-panel-3",
        title: "Santuário de Natureza",
        content: "A Baía de Paranaguá abriga uma das áreas de Mata Atlântica mais preservadas do país, berço de biodiversidade."
    }
];

/* 
    2. RENDERIZAÇÃO DINÂMICA
*/

function renderHistoryCards() {
    const container = document.getElementById('history-cards-container');
    if (!container) return;

    historyData.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card scroll-reveal';
        card.innerHTML = `
            <div class="card-icon" style="font-size: 2rem; margin-bottom: 10px;">${item.icon}</div>
            <h3 class="card-title">${item.title} (${item.year})</h3>
            <p class="card-text">${item.description}</p>
        `;
        container.appendChild(card);
    });
}

function renderCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    carouselItems.forEach(item => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <div style="font-size: 3rem;">${item.img}</div>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
        `;
        track.appendChild(slide);
    });

    // Lógica do Carrossel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    });
}

function renderAccordion() {
    const container = document.getElementById('accordion-container');
    if (!container) return;

    faqData.forEach((item, index) => {
        const accItem = document.createElement('div');
        accItem.className = 'accordion-item scroll-reveal';
        accItem.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="acc-content-${index}">
                ${item.question}
                <span class="icon">+</span>
            </button>
            <div id="acc-content-${index}" class="accordion-content" role="region">
                <p>${item.answer}</p>
            </div>
        `;
        container.appendChild(accItem);

        const header = accItem.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = accItem.classList.contains('active');
            // Fecha todos
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            // Abre o atual
            if (!isActive) {
                accItem.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

function renderTabs() {
    const container = document.getElementById('tab-content-container');
    const tabButtons = document.querySelectorAll('[role="tab"]');
    
    tabData.forEach((item, index) => {
        const panel = document.createElement('div');
        panel.id = item.id;
        panel.role = 'tabpanel';
        panel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
        panel.setAttribute('aria-labelledby', `tab-${index + 1}`);
        panel.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
        `;
        container.appendChild(panel);
    });

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('aria-controls');
            
            // Atualiza botões
            tabButtons.forEach(b => {
                b.setAttribute('aria-selected', 'false');
                b.setAttribute('tabindex', '-1');
            });
            btn.setAttribute('aria-selected', 'true');
            btn.setAttribute('tabindex', '0');

            // Atualiza painéis
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            document.getElementById(targetId).classList.add('active');
        });
    });
}

/* 
    3. ACESSIBILIDADE E UX
*/

function initAccessibility() {
    const body = document.body;
    let fontSize = 16;

    // Tamanho da Fonte
    document.getElementById('increase-font').addEventListener('click', () => {
        if (fontSize < 24) {
            fontSize += 2;
            document.documentElement.style.fontSize = fontSize + 'px';
        }
    });

    document.getElementById('decrease-font').addEventListener('click', () => {
        if (fontSize > 12) {
            fontSize -= 2;
            document.documentElement.style.fontSize = fontSize + 'px';
        }
    });

    // Alto Contraste
    document.getElementById('toggle-contrast').addEventListener('click', () => {
        body.classList.toggle('high-contrast');
        const isHighContrast = body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', isHighContrast);
    });

    // Persistência do contraste
    if (localStorage.getItem('highContrast') === 'true') {
        body.classList.add('high-contrast');
    }
}

/* 
    4. ANIMAÇÕES (SCROLL REVEAL)
*/

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observa elementos existentes e os que serão injetados
    const observeElements = () => {
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    };

    // Timeout para garantir que o JS renderizou os elementos dinâmicos
    setTimeout(observeElements, 500);
}
