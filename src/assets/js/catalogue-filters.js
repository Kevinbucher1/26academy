document.addEventListener('DOMContentLoaded', () => {
    // Les données `allFormations` sont déjà fournies par le template Nunjucks

    // Options pour les filtres (générées dynamiquement à partir des données réelles)
    const filterOptions = {
        thematique: [...new Set(allFormations.map(f => f.category).filter(Boolean))],
        typeFormation: ["Courte", "Longue"],
        financement: [...new Set(allFormations.flatMap(f => f.financementsPossibles).filter(Boolean))],
        certification: [...new Set(allFormations.map(f => f.certification).filter(Boolean))],
        partenaire: [...new Set(allFormations.map(f => f.partenaire).filter(Boolean))]
    };

    // Variables d'état
    let searchTerm = "";
    let selectedFilters = {
        thematique: [],
        typeFormation: [],
        financement: [],
        certification: [],
        partenaire: []
    };
    let showMoreCount = 20; // Nombre de formations à afficher initialement

    const grid = document.getElementById('formations-grid');
    const resultsCountEl = document.getElementById('results-count');
    const loadMoreContainer = document.getElementById('load-more-container');
    const noResultsEl = document.getElementById('no-results');
    const remainingCountEl = document.getElementById('remaining-count');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const desktopSearch = document.getElementById('desktop-search');
    const mobileSearch = document.getElementById('mobile-search');
    const clearFiltersButtons = [document.getElementById('clear-filters'), document.getElementById('clear-filters-no-results')];
    const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
    const closeMobileFilters = document.getElementById('close-mobile-filters');

    // --- FONCTIONS PRINCIPALES ---

    function applyFilters() {
        const filtered = allFormations.filter(formation => {
            const searchMatch = !searchTerm || formation.title.toLowerCase().includes(searchTerm.toLowerCase());
            const thematiqueMatch = selectedFilters.thematique.length === 0 || selectedFilters.thematique.includes(formation.category);
            const typeMatch = selectedFilters.typeFormation.length === 0 || selectedFilters.typeFormation.includes(formation.typeFormation);
            const financementMatch = selectedFilters.financement.length === 0 || selectedFilters.financement.some(f => formation.financementsPossibles.includes(f));
            const certifMatch = selectedFilters.certification.length === 0 || selectedFilters.certification.includes(formation.certification);
            const partenaireMatch = selectedFilters.partenaire.length === 0 || selectedFilters.partenaire.includes(formation.partenaire);
            
            return searchMatch && thematiqueMatch && typeMatch && financementMatch && certifMatch && partenaireMatch;
        });
        
        renderFormations(filtered);
        updateFilterUI();
    }

    function renderFormations(formations) {
        const formationsToShow = formations.slice(0, showMoreCount);
        
        if (formations.length === 0) {
            grid.innerHTML = '';
            noResultsEl.classList.remove('hidden');
            loadMoreContainer.classList.add('hidden');
            resultsCountEl.textContent = 'Aucune formation trouvée';
        } else {
            noResultsEl.classList.add('hidden');
            grid.innerHTML = formationsToShow.map(createFormationCard).join('');
            
            const count = formations.length;
            resultsCountEl.textContent = `${count} formation${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
            
            if (formations.length > showMoreCount) {
                loadMoreContainer.classList.remove('hidden');
                remainingCountEl.textContent = formations.length - showMoreCount;
            } else {
                loadMoreContainer.classList.add('hidden');
            }
            
            lucide.createIcons();
        }
    }

    function createFormationCard(formation) {
        return `
            <a href="/parcours/${formation.slug}/" class="block">
                <div class="card group cursor-pointer h-full flex flex-col">
                    <div class="relative overflow-hidden h-48">
                        <img
                            src="${formation.image}"
                            alt="${formation.title}"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div class="absolute bottom-4 left-4">
                            <span class="badge badge-secondary">${formation.category}</span>
                        </div>
                    </div>
                    <div class="p-6 flex flex-col justify-between flex-grow">
                        <div>
                            <h3 class="font-semibold line-clamp-2 group-hover:text-primary transition-colors text-xl mb-4">
                                ${formation.title}
                            </h3>
                            <div class="flex flex-wrap gap-1 mb-4">
                                ${formation.eligibleCPF ? `<span class="badge badge-outline text-xs text-black"><i data-lucide="graduation-cap" class="h-3 w-3 mr-1"></i>ÉLIGIBLE CPF</span>` : ''}
                                <span class="badge badge-outline text-xs text-black"><i data-lucide="clock" class="h-3 w-3 mr-1"></i>${formation.duree.heures}H • ${formation.duree.mois} MOIS</span>
                                <span class="badge badge-outline text-xs text-black">${formation.certification}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    function updateFilterUI() {
        const filterCategoriesContainer = document.getElementById('filter-categories');
        const categoryLabels = {
            thematique: "Thématique",
            typeFormation: "Type de formation",
            financement: "Financement",
            certification: "Type de certification",
            partenaire: "Partenaire académique"
        };

        const filtersHtml = Object.entries(filterOptions).map(([category, options]) => {
            if (options.length === 0) return '';
            return `
                <div class="filter-section">
                    <h3 class="font-medium mb-3 text-primary">${categoryLabels[category]}</h3>
                    <div class="space-y-3">
                        ${options.map(option => `
                            <div class="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="${category}-${option}"
                                    class="checkbox-custom filter-checkbox"
                                    data-category="${category}"
                                    data-value="${option}"
                                    ${selectedFilters[category].includes(option) ? 'checked' : ''}
                                />
                                <label for="${category}-${option}" class="text-sm font-medium leading-none cursor-pointer">
                                    ${option}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');

        filterCategoriesContainer.innerHTML = filtersHtml;
        
        // Attacher les écouteurs d'événements aux nouvelles checkboxes
        document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const { category, value } = e.target.dataset;
                if (e.target.checked) {
                    if (!selectedFilters[category].includes(value)) {
                        selectedFilters[category].push(value);
                    }
                } else {
                    selectedFilters[category] = selectedFilters[category].filter(item => item !== value);
                }
                showMoreCount = 20; // Réinitialiser le "voir plus"
                applyFilters();
            });
        });
    }

    function clearAllFilters() {
        selectedFilters = { thematique: [], typeFormation: [], financement: [], certification: [], partenaire: [] };
        searchTerm = "";
        desktopSearch.value = "";
        mobileSearch.value = "";
        showMoreCount = 20;
        applyFilters();
    }
    
    // --- ÉCOUTEURS D'ÉVÉNEMENTS INITIAUX ---

    [desktopSearch, mobileSearch].forEach(input => {
        input.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            showMoreCount = 20;
            applyFilters();
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        showMoreCount += 20;
        applyFilters();
    });
    
    clearFiltersButtons.forEach(btn => btn.addEventListener('click', clearAllFilters));
    
    // Pour la gestion de l'affichage des filtres sur mobile
    const sidebar = document.getElementById('filter-sidebar');
    const mobileHeader = document.getElementById('mobile-filter-header');
    
    function toggleMobileFilters() {
        const isHidden = sidebar.classList.contains('mobile-hidden');
        if (isHidden) {
            sidebar.classList.remove('mobile-hidden');
            // Appliquer les styles pour l'affichage en plein écran
            Object.assign(sidebar.style, {
                display: 'block', position: 'fixed', top: '0', left: '0', right: '0',
                bottom: '0', backgroundColor: 'white', zIndex: '50',
                overflow: 'auto', padding: '1rem'
            });
            mobileHeader.style.display = 'flex';
        } else {
            sidebar.classList.add('mobile-hidden');
            // Retirer les styles
            Object.assign(sidebar.style, {
                display: '', position: '', top: '', left: '', right: '',
                bottom: '', backgroundColor: '', zIndex: '',
                overflow: '', padding: ''
            });
            mobileHeader.style.display = 'none';
        }
    }
    
    mobileFilterToggle.addEventListener('click', toggleMobileFilters);
    closeMobileFilters.addEventListener('click', toggleMobileFilters);

    // --- INITIALISATION ---
    updateFilterUI();
    applyFilters();
});