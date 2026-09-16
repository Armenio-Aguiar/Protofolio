/* =========================================================
   ARMENIO MENDES AGUIAR
   PROFESSIONAL PORTFOLIO
   JAVASCRIPT — PURE JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loader =
        document.getElementById("loader");

    const progressBar =
        document.querySelector(".progress-bar");

    const sections =
        document.querySelectorAll(".section");

    const indicators =
        document.querySelectorAll(".indicator");


    /* =====================================================
       PROJECT MODAL ELEMENTS
    ===================================================== */

    const modal =
        document.getElementById("project-modal");

    const modalOverlay =
        document.querySelector(".modal-overlay");

    const modalClose =
        document.querySelector(".modal-close");

    const modalTitle =
        document.getElementById("modal-title");

    const modalDescription =
        document.getElementById("modal-description");

    const modalTechnologies =
        document.getElementById("modal-technologies");

    const modalDemo =
        document.getElementById("modal-demo");

    const modalGithub =
        document.getElementById("modal-github");


    /* =====================================================
       PROJECT CAROUSEL ELEMENTS
    ===================================================== */

    const carousel =
        document.getElementById("project-carousel");

    const carouselTrack =
        document.getElementById("carousel-track");

    const carouselDots =document.getElementById("carousel-dots");

    const carouselPrev =
        document.querySelector(".carousel-prev");

    const carouselNext =
        document.querySelector(".carousel-next");


    /* =====================================================
       PROJECT DATA
       CADA PROJETO POSSUI AS SUAS PRÓPRIAS IMAGENS
    ===================================================== */

    const projectsData = {

        /* =================================================
           MOZ CONNECT
        ================================================= */

        "moz-connect": {

            title: "Moz Connect",

            description:
                "Plataforma digital criada para conectar agricultores, empresas de transporte e motoristas, facilitando a solicitação, gestão e acompanhamento do transporte de milho.",

            technologies: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "PHP",
                "MySQL",
                "Leaflet",
                "REST API"
            ],

            demo: "#",

            github: "#",

            images: [

                "img/projecto transporte/projecto transporte tela pedido do user .png",

                "img/projecto transporte/projecto transporte tela de motorista.png",

                "img/projecto transporte/projecto transporte tela ver pedido do user.png"

            ]

        },


        /* =================================================
           X-ELLENCE
        ================================================= */

        "x-ellence": {

            title: "Repositório X-Ellence",

            description:
                "Sistema institucional desenvolvido para gestão de evidências, utilizadores, cursos, auditoria e relatórios, permitindo organizar e acompanhar processos de evidências e validação.",

            technologies: [
                "React",
                "Vite",
                "Supabase",
                "JavaScript",
                "Database"
            ],

            demo: "#",

            github: "#",

            images: [

                "img/projetos/x-ellence/dashboard.png",

                "img/projetos/x-ellence/utilizadores.png",

                "img/projetos/x-ellence/evidencias.png",

                "img/projetos/x-ellence/auditoria.png"

            ]

        },


        /* =================================================
           DOCUMENT MANAGEMENT SYSTEM
        ================================================= */

        "document-system": {

            title: "Document Management System",

            description:
                "Sistema de gestão documental desenvolvido para permitir upload, organização, categorização, utilização de tags, visualização e controlo de documentos.",

            technologies: [
                "PHP",
                "MySQL",
                "JavaScript",
                "HTML5",
                "CSS3"
            ],

            demo: "#",

            github: "#",

            images: [

                "img/projetos/document-system/dashboard.png",

                "img/projetos/document-system/documentos.png",

                "img/projetos/document-system/upload.png"

            ]

        }

    };


    /* =====================================================
       CAROUSEL STATE
    ===================================================== */

    let currentSlide = 0;

    let currentImages = [];


    /* =====================================================
       LOADER
    ===================================================== */

    function hideLoader() {

        if (!loader) {
            return;
        }

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 900);

    }


    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            {
                once: true
            }
        );

    }


    /* =====================================================
       FALLBACK LOADER
       Evita ficar preso no Loading
    ===================================================== */

    setTimeout(() => {

        if (
            loader &&
            !loader.classList.contains("hidden")
        ) {

            loader.classList.add("hidden");

        }

    }, 3000);


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!progressBar) {
            return;
        }

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {

            progressBar.style.height =
                "100%";

            return;

        }

        const percentage =
            (scrollTop / documentHeight) * 100;

        progressBar.style.height =
            `${Math.min(
                100,
                Math.max(
                    0,
                    percentage
                )
            )}%`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    updateScrollProgress();


    /* =====================================================
       SECTION INDICATORS
    ===================================================== */

    function setActiveIndicator(sectionId) {

        indicators.forEach(
            indicator => {

                indicator.classList.remove(
                    "active"
                );

                if (
                    indicator.dataset.section ===
                    sectionId
                ) {

                    indicator.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                const sectionId =
                                    entry.target.id;

                                setActiveIndicator(
                                    sectionId
                                );

                                entry.target.classList.add(
                                    "section-visible"
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.55
                }

            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       INDICATOR NAVIGATION
    ===================================================== */

    indicators.forEach(
        indicator => {

            indicator.addEventListener(
                "click",
                () => {

                    const sectionId =
                        indicator.dataset.section;

                    const target =
                        document.getElementById(
                            sectionId
                        );

                    if (!target) {
                        return;
                    }

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }
            );

        }
    );


    /* =====================================================
       GET CURRENT SECTION
    ===================================================== */

    function getCurrentSectionIndex() {

        let currentIndex = 0;

        let smallestDistance =
            Infinity;


        sections.forEach(
            (section, index) => {

                const rect =
                    section.getBoundingClientRect();

                const distance =
                    Math.abs(rect.top);


                if (
                    distance <
                    smallestDistance
                ) {

                    smallestDistance =
                        distance;

                    currentIndex =
                        index;

                }

            }
        );


        return currentIndex;

    }


    /* =====================================================
       NEXT SECTION
    ===================================================== */

    function scrollToNextSection() {

        if (!sections.length) {
            return;
        }

        const currentIndex =
            getCurrentSectionIndex();

        const nextIndex =
            Math.min(
                currentIndex + 1,
                sections.length - 1
            );


        sections[nextIndex].scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }


    /* =====================================================
       PREVIOUS SECTION
    ===================================================== */

    function scrollToPreviousSection() {

        if (!sections.length) {
            return;
        }

        const currentIndex =
            getCurrentSectionIndex();

        const previousIndex =
            Math.max(
                currentIndex - 1,
                0
            );


        sections[previousIndex].scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /* Modal aberto */
            if (
                modal &&
                modal.classList.contains("active")
            ) {

                return;

            }


            const activeElement =
                document.activeElement;


            const isInput =
                activeElement &&
                (
                    activeElement.tagName ===
                    "INPUT" ||

                    activeElement.tagName ===
                    "TEXTAREA" ||

                    activeElement.tagName ===
                    "SELECT"
                );


            if (isInput) {
                return;
            }


            /* Arrow Down / Page Down */

            if (
                event.key === "ArrowDown" ||
                event.key === "PageDown"
            ) {

                event.preventDefault();

                scrollToNextSection();

            }


            /* Arrow Up / Page Up */

            if (
                event.key === "ArrowUp" ||
                event.key === "PageUp"
            ) {

                event.preventDefault();

                scrollToPreviousSection();

            }

        }
    );


    /* =====================================================
       MOUSE WHEEL SECTION NAVIGATION
    ===================================================== */

    let wheelTimeout = null;

    let wheelLocked = false;


    window.addEventListener(
        "wheel",
        event => {

            /* Apenas desktop */

            if (
                window.innerWidth <= 700
            ) {

                return;

            }


            /* Modal aberto */

            if (
                modal &&
                modal.classList.contains("active")
            ) {

                return;

            }


            /* Evitar disparos repetidos */

            if (wheelLocked) {
                return;
            }


            if (
                Math.abs(event.deltaY) < 20
            ) {

                return;

            }


            wheelLocked = true;


            if (event.deltaY > 0) {

                scrollToNextSection();

            } else {

                scrollToPreviousSection();

            }


            clearTimeout(
                wheelTimeout
            );


            wheelTimeout =
                setTimeout(
                    () => {

                        wheelLocked =
                            false;

                    },
                    850
                );

        },

        {
            passive: true
        }
    );


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .service-card,
            .project-card,
            .timeline-item,
            .skill,
            .highlight,
            .skill-category
            `
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "reveal-visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.15
                }

            );


        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-element"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "reveal-visible"
                );

            }
        );

    }


    /* =====================================================
       DYNAMIC YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date().getFullYear();

        }
    );


    /* =====================================================
       CONTACT LINKS
    ===================================================== */

    const contactButtons =
        document.querySelectorAll(
            ".contact-button"
        );


    contactButtons.forEach(
        button => {

            button.addEventListener(
                "mouseenter",
                () => {

                    button.classList.add(
                        "contact-hover"
                    );

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.classList.remove(
                        "contact-hover"
                    );

                }
            );

        }
    );


    /* =====================================================
       PROJECT MODAL
       ABRIR PROJETO
    ===================================================== */

    const projectButtons =
        document.querySelectorAll(
            ".project-link"
        );


    function openProjectModal(projectId) {

        if (!modal) {
            return;
        }


        const project =
            projectsData[projectId];


        if (!project) {

            console.error(
                "Projeto não encontrado:",
                projectId
            );

            return;

        }


        /* =================================================
           TÍTULO
        ================================================= */

        if (modalTitle) {

            modalTitle.textContent =
                project.title;

        }


        /* =================================================
           DESCRIÇÃO
        ================================================= */

        if (modalDescription) {

            modalDescription.textContent =
                project.description;

        }


        /* =================================================
           TECNOLOGIAS
        ================================================= */

        if (modalTechnologies) {

            modalTechnologies.innerHTML =
                "";


            project.technologies.forEach(
                technology => {

                    const span =
                        document.createElement(
                            "span"
                        );


                    span.textContent =
                        technology;


                    modalTechnologies.appendChild(
                        span
                    );

                }
            );

        }


        /* =================================================
           LINKS
        ================================================= */

        if (modalDemo) {

            modalDemo.href =
                project.demo || "#";

        }


        if (modalGithub) {

            modalGithub.href =
                project.github || "#";

        }


        /* =================================================
           IMAGENS DO PROJETO
        ================================================= */

        currentImages =
            Array.isArray(project.images)
                ? project.images
                : [];


        currentSlide = 0;


        /* =================================================
           CRIAR CARROSSEL
        ================================================= */

        createProjectCarousel();


        /* =================================================
           ABRIR MODAL
        ================================================= */

        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );


        /* =================================================
           FOCO
        ================================================= */

        if (modalClose) {

            setTimeout(
                () => {

                    modalClose.focus();

                },
                100
            );

        }

    }


    /* =====================================================
       EVENTOS DOS PROJETOS
    ===================================================== */

    projectButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const projectId =
                        button.dataset.project;


                    openProjectModal(
                        projectId
                    );

                }
            );

        }
    );


    /* =====================================================
       CRIAR CARROSSEL
    ===================================================== */

    function createProjectCarousel() {

        if (
            !carousel ||
            !carouselTrack ||
            !carouselDots
        ) {

            console.warn(
                "Elementos do carousel não encontrados."
            );

            return;

        }


        /* =================================================
           LIMPAR
        ================================================= */

        carouselTrack.innerHTML =
            "";

        carouselDots.innerHTML =
            "";


        carousel.classList.remove(
            "single-image",
            "no-images"
        );


        /* =================================================
           SEM IMAGENS
        ================================================= */

        if (
            currentImages.length === 0
        ) {

            carousel.classList.add(
                "no-images"
            );


            carouselTrack.innerHTML = `

                <div class="carousel-empty">

                    <i class="fa-regular fa-image"></i>

                    <span>
                        Imagem não disponível
                    </span>

                </div>

            `;


            return;

        }


        /* =================================================
           UMA IMAGEM
        ================================================= */

        if (
            currentImages.length === 1
        ) {

            carousel.classList.add(
                "single-image"
            );

        }


        /* =================================================
           CRIAR CADA SLIDE
        ================================================= */

        currentImages.forEach(
            (imagePath, index) => {

                const slide =
                    document.createElement(
                        "div"
                    );


                slide.className =
                    "carousel-slide";


                if (
                    index === 0
                ) {

                    slide.classList.add(
                        "active"
                    );

                }


                /* =========================================
                   IMAGEM
                ========================================= */

                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    imagePath;


                image.alt =
                    `${modalTitle ? modalTitle.textContent : "Projeto"} — imagem ${index + 1}`;


                image.loading =
                    index === 0
                        ? "eager"
                        : "lazy";


                image.onerror =
                    () => {

                        image.style.display =
                            "none";


                        const errorMessage =
                            document.createElement(
                                "span"
                            );


                        errorMessage.className =
                            "carousel-image-error";


                        errorMessage.textContent =
                            "Imagem não encontrada";


                        slide.appendChild(
                            errorMessage
                        );

                    };


                slide.appendChild(
                    image
                );


                carouselTrack.appendChild(
                    slide
                );


                /* =========================================
                   DOT
                ========================================= */

                const dot =
                    document.createElement(
                        "button"
                    );


                dot.type =
                    "button";


                dot.className =
                    "carousel-dot";


                if (
                    index === 0
                ) {

                    dot.classList.add(
                        "active"
                    );

                }


                dot.setAttribute(
                    "aria-label",
                    `Ir para imagem ${index + 1}`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        showProjectSlide(
                            index
                        );

                    }
                );


                carouselDots.appendChild(
                    dot
                );

            }
        );


        /* =================================================
           MOSTRAR / ESCONDER SETAS
        ================================================= */

        const hasMultipleImages =
            currentImages.length > 1;


        if (carouselPrev) {

            carouselPrev.style.display =
                hasMultipleImages
                    ? "flex"
                    : "none";

        }


        if (carouselNext) {

            carouselNext.style.display =
                hasMultipleImages
                    ? "flex"
                    : "none";

        }

    }


    /* =====================================================
       MOSTRAR SLIDE
    ===================================================== */

    function showProjectSlide(index) {

        if (!carouselTrack) {
            return;
        }


        const slides =
            carouselTrack.querySelectorAll(
                ".carousel-slide"
            );


        const dots =
            carouselDots
                ? carouselDots.querySelectorAll(
                    ".carousel-dot"
                )
                : [];


        if (!slides.length) {
            return;
        }


        /* =================================================
           LOOP
        ================================================= */

        if (
            index < 0
        ) {

            index =
                slides.length - 1;

        }


        if (
            index >= slides.length
        ) {

            index = 0;

        }


        currentSlide =
            index;


        /* =================================================
           SLIDES
        ================================================= */

        slides.forEach(
            (slide, slideIndex) => {

                slide.classList.toggle(
                    "active",
                    slideIndex ===
                    currentSlide
                );

            }
        );


        /* =================================================
           DOTS
        ================================================= */

        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex ===
                    currentSlide
                );

            }
        );

    }


    /* =====================================================
       PRÓXIMA IMAGEM
    ===================================================== */

    if (carouselNext) {

        carouselNext.addEventListener(
            "click",
            event => {

                event.preventDefault();


                showProjectSlide(
                    currentSlide + 1
                );

            }
        );

    }


    /* =====================================================
       IMAGEM ANTERIOR
    ===================================================== */

    if (carouselPrev) {

        carouselPrev.addEventListener(
            "click",
            event => {

                event.preventDefault();


                showProjectSlide(
                    currentSlide - 1
                );

            }
        );

    }


    /* =====================================================
       FECHAR MODAL
    ===================================================== */

    function closeProjectModal() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        currentSlide =
            0;

        currentImages =
            [];

    }


    /* =====================================================
       BOTÃO X
    ===================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProjectModal
        );

    }


    /* =====================================================
       OVERLAY
    ===================================================== */

    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProjectModal
        );

    }


    /* =====================================================
       ESC + SETAS DO CARROSSEL
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !modal ||
                !modal.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            /* ESC */

            if (
                event.key === "Escape"
            ) {

                closeProjectModal();

                return;

            }


            /* Direita */

            if (
                event.key === "ArrowRight"
            ) {

                event.preventDefault();

                showProjectSlide(
                    currentSlide + 1
                );

            }


            /* Esquerda */

            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                showProjectSlide(
                    currentSlide - 1
                );

            }

        }
    );


    /* =====================================================
       PREVENT EMPTY LINKS
    ===================================================== */

    function preventEmptyLinks() {

        const links =
            document.querySelectorAll(
                'a[href="#"]'
            );


        links.forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        if (
                            link.getAttribute(
                                "href"
                            ) === "#"
                        ) {

                            event.preventDefault();

                        }

                    }
                );

            }
        );

    }


    preventEmptyLinks();


    /* =====================================================
       SKILLS — PERCENTAGEM
       ANIMAÇÃO SUAVE
    ===================================================== */

    const skills =
        document.querySelectorAll(
            ".skill"
        );


    skills.forEach(
        skill => {

            const level =
                Number(
                    skill.dataset.level
                );


            const percentage =
                skill.querySelector(
                    ".skill-tooltip strong"
                );


            if (
                !percentage ||
                Number.isNaN(level)
            ) {

                return;

            }


            let animationFrame =
                null;


            skill.addEventListener(
                "mouseenter",
                () => {

                    let startTime =
                        null;


                    cancelAnimationFrame(
                        animationFrame
                    );


                    function animate(
                        currentTime
                    ) {

                        if (!startTime) {

                            startTime =
                                currentTime;

                        }


                        const elapsed =
                            currentTime -
                            startTime;


                        const duration =
                            900;


                        const progress =
                            Math.min(
                                elapsed /
                                duration,
                                1
                            );


                        /* 
                           Ease-out
                           suave
                        */

                        const easing =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        const currentValue =
                            Math.round(
                                level *
                                easing
                            );


                        percentage.textContent =
                            `${currentValue}%`;


                        if (
                            progress < 1
                        ) {

                            animationFrame =
                                requestAnimationFrame(
                                    animate
                                );

                        } else {

                            percentage.textContent =
                                `${level}%`;

                        }

                    }


                    animationFrame =
                        requestAnimationFrame(
                            animate
                        );

                }
            );


            skill.addEventListener(
                "mouseleave",
                () => {

                    cancelAnimationFrame(
                        animationFrame
                    );

                }
            );

        }
    );


    /* =====================================================
       MOBILE OPTIMIZATION
    ===================================================== */

    function handleMobileMode() {

        if (
            window.innerWidth <= 700
        ) {

            document.body.classList.add(
                "mobile-device"
            );

        } else {

            document.body.classList.remove(
                "mobile-device"
            );

        }

    }


    handleMobileMode();


    window.addEventListener(
        "resize",
        handleMobileMode
    );


    /* =====================================================
       PREVENT DOUBLE TAP ZOOM
    ===================================================== */

    let lastTouchEnd =
        0;


    document.addEventListener(
        "touchend",
        event => {

            const now =
                Date.now();


            if (
                now - lastTouchEnd <= 300
            ) {

                if (
                    event.target.closest(
                        "button, a"
                    )
                ) {

                    event.preventDefault();

                }

            }


            lastTouchEnd =
                now;

        }
    );


    /* =====================================================
       FINAL INITIALIZATION
    ===================================================== */

    updateScrollProgress();

    console.log(
        "ARMENIO PORTFOLIO — JavaScript carregado correctamente."
    );

});



/* =========================================================
   EXPERIENCE DATA
========================================================= */

const experienceData = [

    /* =====================================================
       01 — NOVA TECH
    ===================================================== */

    {
        number: "01",

        date: "2026 — ACTUAL",

        title: "Técnico de TI",

        company: "NOVA TECH · Quelimane",

        description:
            "Atuação em infraestrutura tecnológica, cabeamento estruturado, manutenção e assistência técnica de sistemas de segurança eletrónica, suporte a clientes e desenvolvimento de soluções tecnológicas.",

        responsibilities: [

            "Execução de cabeamento estruturado e infraestrutura de rede.",

            "Manutenção e assistência técnica de sistemas de segurança eletrónica, incluindo CCTV.",

            "Prestação de serviços de TI a clientes corporativos e instituições públicas.",

            "Diagnóstico e resolução de problemas técnicos em equipamentos e sistemas.",

            "Apoio na implementação e manutenção de soluções tecnológicas.",

            "Desenvolvimento de sistemas personalizados e automação de processos.",

            "Apoio técnico aos utilizadores e acompanhamento das necessidades dos clientes."

        ],

        tags: [
            "Infraestrutura",
            "CCTV",
            "Cabeamento",
            "Suporte TI",
            "Sistemas",
            "Automação"
        ]

    },


    /* =====================================================
       02 — X-ELLENCE
    ===================================================== */

    {
        number: "02",

        date: "2026 — ACTUAL",

        title:
            "Formador de Suporte Informático e Programação Web",

        company:
            "INSTITUTO POLITÉCNICO X-ELLENCE · Chimoio",

        description:
            "Atuação na formação prática e teórica de estudantes nas áreas de suporte informático, redes, bases de dados e programação web.",

        responsibilities: [

            "Planeamento e condução de aulas práticas e teóricas.",

            "Formação prática em suporte informático, redes, bases de dados e programação web.",

            "Desenvolvimento de conteúdos e documentação técnica.",

            "Orientação de estudantes na utilização e configuração de tecnologias informáticas.",

            "Apoio na resolução de problemas técnicos e utilização de sistemas informáticos."

        ],

        tags: [
            "Formação",
            "Suporte Informático",
            "Redes",
            "Bases de Dados",
            "Programação Web"
        ]

    },


    /* =====================================================
       03 — INFORDATA
    ===================================================== */

    {
        number: "03",

        date: "2024 — 2026",

        title:
            "Técnico de TI / Analista de Sistemas",

        company:
            "INFORDATA, LDA · Cidade de Maputo",

        description:
            "Experiência em infraestrutura de TI, suporte técnico, redes, equipamentos informáticos, gestão de utilizadores e manutenção dos serviços tecnológicos.",

        responsibilities: [

            "Instalação, configuração e manutenção de computadores, impressoras e equipamentos informáticos.",

            "Diagnóstico e resolução de problemas de hardware, software e conectividade.",

            "Configuração e monitoramento de redes locais e Wi-Fi.",

            "Identificação das necessidades técnicas dos utilizadores e apoio na definição de soluções.",

            "Elaboração de relatórios e documentação técnica.",

            "Gestão de contas de utilizadores, acessos e permissões.",

            "Apoio à manutenção e melhoria contínua dos serviços tecnológicos.",

            "Colaboração com equipas técnicas na resolução de incidentes e problemas operacionais."

        ],

        tags: [
            "IT Support",
            "Help Desk",
            "Redes",
            "Hardware",
            "Software",
            "Wi-Fi",
            "Utilizadores"
        ]

    },


    /* =====================================================
       04 — UNIVERSIDADE LICUNGO
    ===================================================== */

    {
        number: "04",

        date: "2022 — 2023",

        title:
            "Estagiário de Suporte Técnico e Redes",

        company:
            "UNIVERSIDADE LICUNGO · Quelimane",

        description:
            "Participação em atividades de suporte técnico e projetos de infraestrutura de redes, envolvendo cablagem, fibra óptica, equipamentos de rede e conectividade.",

        responsibilities: [

            "Montagem e configuração de redes Ethernet e sistemas informáticos.",

            "Teste e monitoramento de conectividade em cabos de cobre e fibra óptica.",

            "Instalação, configuração e gestão de roteadores, switches e pontos de acesso Wi-Fi.",

            "Participação em projetos de infraestrutura de rede.",

            "Montagem de cablagem e organização de racks.",

            "Prestação de suporte técnico a utilizadores."

        ],

        tags: [
            "LAN",
            "Ethernet",
            "Wi-Fi",
            "Fibra Óptica",
            "Routers",
            "Switches",
            "Racks"
        ]

    },


    /* =====================================================
       05 — NS DEVIL
    ===================================================== */

    {
        number: "05",

        date: "2020 — 2022",

        title:
            "Estagiário Desenvolvedor Júnior",

        company:
            "NS DEVIL · Sede Coreia do Sul / Quelimane",

        description:
            "Participação ativa no desenvolvimento de sistemas informáticos, desde a análise de requisitos até à implementação, testes, depuração e manutenção.",

        responsibilities: [

            "Participação na análise de requisitos e design de sistemas.",

            "Codificação e desenvolvimento de soluções informáticas.",

            "Realização de testes e identificação de problemas.",

            "Depuração, correção de bugs e otimização de código.",

            "Manutenção e otimização de código existente.",

            "Colaboração em ambiente internacional utilizando Git.",

            "Aplicação de metodologias Agile no desenvolvimento de soluções tecnológicas."

        ],

        tags: [
            "Desenvolvimento",
            "Git",
            "Testes",
            "Debug",
            "Agile",
            "Sistemas"
        ]

    },


    /* =====================================================
       06 — COPY COMPANY
    ===================================================== */

    {
        number: "06",

        date: "2018 — 2020",

        title:
            "Técnico de Suporte Informático / Help Desk",

        company:
            "COPY COMPANY SERVICE · Quelimane",

        description:
            "Atuação no suporte técnico a utilizadores e clientes, manutenção de equipamentos informáticos, redes locais, hardware, software e documentação técnica.",

        responsibilities: [

            "Instalação, configuração e manutenção de equipamentos informáticos e redes locais.",

            "Diagnóstico e reparação de hardware, software e sistemas de conectividade.",

            "Apoio técnico a utilizadores e clientes corporativos.",

            "Colaboração com equipas técnicas na resolução de incidentes.",

            "Apoio na melhoria contínua dos serviços TIC.",

            "Gestão de documentação técnica e relatórios de manutenção preventiva e corretiva.",

            "Atendimento ao cliente e manutenção de documentos digitais."

        ],

        tags: [
            "Help Desk",
            "Hardware",
            "Software",
            "LAN",
            "Suporte Técnico",
            "Documentação"
        ]

    }

];


/* =========================================================
   ELEMENTOS DO DOM
========================================================= */

const experienceModal =
    document.getElementById("experienceModal");

const experienceModalOverlay =
    document.getElementById("experienceModalOverlay");

const experienceModalClose =
    document.getElementById("experienceModalClose");

const experienceModalNumber =
    document.getElementById("experienceModalNumber");

const experienceModalDate =
    document.getElementById("experienceModalDate");

const experienceModalTitle =
    document.getElementById("experienceModalTitle");

const experienceModalCompany =
    document.getElementById("experienceModalCompany");

const experienceModalDescription =
    document.getElementById("experienceModalDescription");

const experienceModalResponsibilities =
    document.getElementById(
        "experienceModalResponsibilities"
    );

const experienceModalTags =
    document.getElementById("experienceModalTags");

const experiencePrev =
    document.getElementById("experiencePrev");

const experienceNext =
    document.getElementById("experienceNext");

const experienceCounter =
    document.getElementById("experienceCounter");

const openExperienceOverview =
    document.getElementById(
        "openExperienceOverview"
    );


/* =========================================================
   ESTADO
========================================================= */

let currentExperience = 0;


/* =========================================================
   ABRIR EXPERIÊNCIA
========================================================= */

function openExperience(index) {

    if (
        !experienceModal ||
        !experienceData[index]
    ) {
        return;
    }

    currentExperience = index;

    renderExperience(index);

    experienceModal.classList.add("active");

    experienceModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    document.body.style.overflow = "hidden";

}


/* =========================================================
   RENDERIZAR EXPERIÊNCIA
========================================================= */

function renderExperience(index) {

    const experience =
        experienceData[index];

    if (!experience) {
        return;
    }


    /* Número */

    experienceModalNumber.textContent =
        experience.number;


    /* Data */

    experienceModalDate.textContent =
        experience.date;


    /* Título */

    experienceModalTitle.textContent =
        experience.title;


    /* Empresa */

    experienceModalCompany.textContent =
        experience.company;


    /* Descrição */

    experienceModalDescription.textContent =
        experience.description;


    /* Responsabilidades */

    experienceModalResponsibilities.innerHTML =
        "";

    experience.responsibilities.forEach(
        responsibility => {

            const li =
                document.createElement("li");

            li.textContent =
                responsibility;

            experienceModalResponsibilities.appendChild(
                li
            );

        }
    );


    /* Tags */

    experienceModalTags.innerHTML =
        "";

    experience.tags.forEach(
        tag => {

            const span =
                document.createElement("span");

            span.textContent =
                tag;

            experienceModalTags.appendChild(
                span
            );

        }
    );


    /* Contador */

    experienceCounter.textContent =
        `${index + 1} / ${experienceData.length}`;


    /* Botões */

    experiencePrev.disabled =
        index === 0;

    experienceNext.disabled =
        index === experienceData.length - 1;

}


/* =========================================================
   FECHAR EXPERIÊNCIA
========================================================= */

function closeExperience() {

    if (!experienceModal) {
        return;
    }

    experienceModal.classList.remove(
        "active"
    );

    experienceModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    document.body.style.overflow = "";

}


/* =========================================================
   BOTÕES VER DETALHES
========================================================= */

const experienceButtons =
    document.querySelectorAll(
        ".experience-details-btn"
    );

experienceButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const index =
                Number(
                    button.dataset.experience
                );

            openExperience(index);

        }
    );

});


/* =========================================================
   FECHAR
========================================================= */

if (experienceModalClose) {

    experienceModalClose.addEventListener(
        "click",
        closeExperience
    );

}


if (experienceModalOverlay) {

    experienceModalOverlay.addEventListener(
        "click",
        closeExperience
    );

}


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            experienceModal &&
            experienceModal.classList.contains("active")
        ) {

            closeExperience();

        }

    }
);


/* =========================================================
   ANTERIOR
========================================================= */

if (experiencePrev) {

    experiencePrev.addEventListener(
        "click",
        () => {

            if (currentExperience > 0) {

                currentExperience--;

                renderExperience(
                    currentExperience
                );

            }

        }
    );

}


/* =========================================================
   PRÓXIMA
========================================================= */

if (experienceNext) {

    experienceNext.addEventListener(
        "click",
        () => {

            if (
                currentExperience <
                experienceData.length - 1
            ) {

                currentExperience++;

                renderExperience(
                    currentExperience
                );

            }

        }
    );

}


/* =========================================================
   TRAJETÓRIA — ABRIR PRIMEIRA EXPERIÊNCIA
========================================================= */

if (openExperienceOverview) {

    openExperienceOverview.addEventListener(
        "click",
        () => {

            openExperience(0);

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {

            formStatus.textContent =
                "Preencha todos os campos.";

            return;
        }

        /*
         * Por enquanto criamos uma mensagem através
         * do cliente de e-mail do utilizador.
         */

        const destination =
            "SEUEMAIL@gmail.com";

        const mailSubject =
            encodeURIComponent(
                subject + " — Contacto pelo Portfólio"
            );

        const mailBody =
            encodeURIComponent(
                "Nome: " + name + "\n\n" +
                "E-mail: " + email + "\n\n" +
                "Mensagem:\n" + message
            );

        formStatus.textContent =
            "A preparar a mensagem...";

        window.location.href =
            `mailto:${destination}?subject=${mailSubject}&body=${mailBody}`;

    });

}