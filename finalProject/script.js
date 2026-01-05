// Funcionalidad de búsqueda
document.addEventListener('DOMContentLoaded', function() {
    // Elementos de búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // Formulario de contacto
    const emailForm = document.getElementById('emailForm');
    
    // Datos de recomendaciones para búsqueda
    const recommendations = {
        playa: {
            title: "Paraísos Playeros",
            content: "Descubre las playas más exóticas y relajantes del mundo.",
            category: "Playa"
        },
        templo: {
            title: "Templos y Cultura",
            content: "Explora los templos más impresionantes y lugares históricos.",
            category: "Templo"
        },
        japón: {
            title: "Japón - Tierra del Sol Naciente",
            content: "Descubre la perfecta combinación de tradición y modernidad.",
            category: "País"
        },
        bali: {
            title: "Bali, Indonesia",
            content: "Isla de los dioses con playas, templos y cultura única.",
            category: "Playa"
        },
        tailandia: {
            title: "Tailandia",
            content: "Playas paradisíacas, templos budistas y comida exquisita.",
            category: "País"
        }
    };
    
    // Funcionalidad de búsqueda
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            clearSearch();
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            alert("Por favor, ingresa un término de búsqueda.");
            return;
        }
        
        // Mostrar resultados de búsqueda
        showSearchResults(searchTerm);
    }
    
    function showSearchResults(term) {
        // Buscar coincidencias en los datos
        const results = [];
        
        for (const key in recommendations) {
            const rec = recommendations[key];
            if (
                rec.title.toLowerCase().includes(term) ||
                rec.content.toLowerCase().includes(term) ||
                rec.category.toLowerCase().includes(term) ||
                key.includes(term)
            ) {
                results.push(rec);
            }
        }
        
        // Mostrar resultados
        if (results.length > 0) {
            let resultsHTML = `<div class="search-results"><h3>Resultados de búsqueda para "${term}":</h3>`;
            
            results.forEach(result => {
                resultsHTML += `
                    <div class="search-result-card">
                        <h4>${result.title}</h4>
                        <p><strong>Categoría:</strong> ${result.category}</p>
                        <p>${result.content}</p>
                    </div>
                `;
            });
            
            resultsHTML += `</div>`;
            
            // Insertar resultados antes de la sección de recomendaciones
            const recommendationsSection = document.getElementById('recommendations');
            if (recommendationsSection) {
                // Eliminar resultados anteriores
                const existingResults = document.querySelector('.search-results');
                if (existingResults) {
                    existingResults.remove();
                }
                
                // Insertar nuevos resultados
                recommendationsSection.insertAdjacentHTML('beforebegin', resultsHTML);
                
                // Desplazar a los resultados
                document.querySelector('.search-results').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        } else {
            alert(`No se encontraron resultados para "${term}". Intenta con "playa", "templo" o "japón".`);
        }
    }
    
    function clearSearch() {
        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }
    }
    
    // Funcionalidad del formulario de contacto
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validación simple
            if (!name || !email || !message) {
                showFormMessage('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Por favor, introduce un correo electrónico válido.', 'error');
                return;
            }
            
            // Simular envío del formulario
            showFormMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            
            // Limpiar formulario
            emailForm.reset();
            
            // Desaparecer el mensaje después de 5 segundos
            setTimeout(() => {
                const formMessage = document.getElementById('formMessage');
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    function showFormMessage(text, type) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }
    
    // Funcionalidad de navegación activa
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Funcionalidad de botones de recomendaciones
    const recommendationButtons = document.querySelectorAll('.btn-secondary');
    
    recommendationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.recommendation-card');
            const title = card.querySelector('h3').textContent;
            
            alert(`¡Gracias por tu interés en ${title}! Te mostraremos más recomendaciones similares próximamente.`);
        });
    });
});