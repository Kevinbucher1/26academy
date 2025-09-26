// Catalogue filters JavaScript
(function() {
    'use strict';

    // Function to create truncated placeholder
    function createTruncatedPlaceholder(element, originalPlaceholder) {
        // Only apply truncation on mobile (small screens)
        const isMobileElement = element.offsetWidth < 400;
        
        if (!isMobileElement) {
            // No truncation for desktop - return full placeholder
            return originalPlaceholder;
        }
        
        // Mobile truncation logic
        const computedStyle = window.getComputedStyle(element);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const paddingRight = parseFloat(computedStyle.paddingRight);
        const margin = 25; // Small margin for mobile
        const availableWidth = element.offsetWidth - paddingLeft - paddingRight - margin;
        
        const charWidth = 6.5;
        const maxChars = Math.floor(availableWidth / charWidth);
        
        // Only truncate if we're over the limit on mobile
        if (originalPlaceholder.length > maxChars && maxChars > 12) {
            return originalPlaceholder.substring(0, maxChars - 3) + '...';
        }
        return originalPlaceholder;
    }

    // Function to update placeholders
    function updatePlaceholders() {
        const originalPlaceholder = "Mot clé : Comptable, ...";
        
        const mobileSearch = document.getElementById('mobile-search');
        const desktopSearch = document.getElementById('desktop-search');
        
        if (mobileSearch && mobileSearch.offsetWidth > 0) {
            mobileSearch.placeholder = createTruncatedPlaceholder(mobileSearch, originalPlaceholder);
        }
        if (desktopSearch && desktopSearch.offsetWidth > 0) {
            desktopSearch.placeholder = createTruncatedPlaceholder(desktopSearch, originalPlaceholder);
        }
    }

    // Variables d'état
    let searchTerm = "";
    let selectedFilters = {
        category: [],
        typeFormation: [],
        financement: [],
        certification: [],
        partenaire: []
    };
    let expandedSections = {
        category: true,
        typeFormation: false,
        financement: false,
        certification: false,
        partenaire: false
    };
    let isMobile = window.innerWidth <= 768;
    
    // Variables de pagination
    let currentDisplayCount = 20;
    const itemsPerPage = 20;

    // Mapping des catégories pour les liens externes
    const categoryMapping = {
        'Gestion de projet et agilité': 'Gestion de projet',
        'Intelligence artificielle': 'Intelligence artificielle',
        'Marketing digital': 'Marketing digital',
        'Comptabilité et paie': 'Comptabilité',
        'Bureautique': 'Bureautique',
        'Design': 'Design',
        'Développement web': 'Développement web',
        'Développement': 'Développement web',
        'Sécurité informatique': 'Sécurité informatique',
        'Data': 'Data',
        'Product management': 'Product management',
        'Gestion de projet': 'Gestion de projet'
    };

    // Fonction pour lire les paramètres URL
    function getURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            category: urlParams.get('category')
        };
    }

    // Fonction pour mettre à jour les paramètres URL
    function updateURLParams() {
        const url = new URL(window.location);
        
        // Effacer les paramètres existants
        url.searchParams.delete('category');
        
        // Ajouter les filtres actifs
        if (selectedFilters.category.length > 0) {
            url.searchParams.set('category', selectedFilters.category[0]); // Premier filtre de catégorie
        }
        
        // Mettre à jour l'URL sans recharger la page
        window.history.replaceState({}, '', url);
    }

    // Fonction pour initialiser les filtres depuis l'URL
    function initializeFromURL() {
        const params = getURLParams();
        
        if (params.category) {
            // Vérifier d'abord le mapping des catégories
            const mappedCategory = categoryMapping[params.category] || params.category;
            
            // Vérifier si la catégorie existe dans les formations
            const categoryExists = allFormations.some(f => f.category === mappedCategory);
            
            if (categoryExists) {
                selectedFilters.category = [mappedCategory];
                // Reset pagination when loading from URL
                currentDisplayCount = itemsPerPage;
            }
        }
    }

    // Fonction pour détecter le mobile
    function checkMobile() {
        isMobile = window.innerWidth <= 768;
        updateFormationsDisplay();
    }

    // Écouter les changements de taille d'écran
    window.addEventListener('resize', checkMobile);

    // Fonction pour gérer les filtres
    function handleFilterChange(category, value, checked) {
        if (checked) {
            selectedFilters[category].push(value);
        } else {
            selectedFilters[category] = selectedFilters[category].filter(item => item !== value);
        }
        // Reset pagination when filters change
        currentDisplayCount = itemsPerPage;
        updateFormationsDisplay();
        updateFilterUI();
        updateURLParams();
    }

    // Exposer la fonction globalement
    window.handleFilterChange = handleFilterChange;

    // Fonction pour basculer l'expansion d'une section
    function toggleSection(section) {
        expandedSections[section] = !expandedSections[section];
        updateFilterUI();
    }

    // Exposer la fonction globalement
    window.toggleSection = toggleSection;

    // Fonction pour filtrer les formations
    function filterFormations() {
        return allFormations.filter(formation => {
            // Filtre par terme de recherche
            if (searchTerm && !formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !formation.category.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Filtre par catégorie
            if (selectedFilters.category.length > 0 && 
                !selectedFilters.category.includes(formation.category)) {
                return false;
            }

            // Filtre par type de formation
            if (selectedFilters.typeFormation.length > 0 && 
                !selectedFilters.typeFormation.includes(formation.typeFormation)) {
                return false;
            }

            // Filtre par financement
           if (selectedFilters.financement.length > 0 && 
    !selectedFilters.financement.some(f => formation.financementsPossibles && formation.financementsPossibles.includes(f))) {


                return false;
            }

            // Filtre par certification
            if (selectedFilters.certification.length > 0 && 
                !selectedFilters.certification.includes(formation.certification)) {
                return false;
            }

            // Filtre par partenaire
            if (selectedFilters.partenaire.length > 0 && 
                !selectedFilters.partenaire.includes(formation.partenaire)) {
                return false;
            }

            return true;
        });
    }

    // Fonction pour effacer tous les filtres
    function clearAllFilters() {
        selectedFilters = {
            category: [],
            typeFormation: [],
            financement: [],
            certification: [],
            partenaire: []
        };
        searchTerm = "";
        document.getElementById('desktop-search').value = "";
        document.getElementById('mobile-search').value = "";
        // Reset pagination when clearing filters
        currentDisplayCount = itemsPerPage;
        updateFormationsDisplay();
        updateFilterUI();
        updateURLParams();
    }

    // Exposer la fonction globalement
    window.clearAllFilters = clearAllFilters;

    // Fonction pour compter les filtres actifs
    function getActiveFiltersCount() {
        return Object.values(selectedFilters).flat().length;
    }

    // Fonction pour créer une carte de formation
    function createFormationCard(formation) {
        const dureParts = [];
        if (formation.duree.heures) dureParts.push(`${formation.duree.heures}H`);
        if (formation.duree.mois) dureParts.push(`${formation.duree.mois} MOIS`);
        
        // Ne pas afficher le badge durée si aucune donnée
        const dureeDisplay = dureParts.length > 0 ? dureParts.join(' • ') : null;

        return `
            <a href="/parcours/${formation.slug.current}/" class="block h-full">
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col">
                    <div class="relative overflow-hidden h-48">
                        <img
                            src="${formation.imageHero}"
                            alt="${formation.titre}"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div class="absolute bottom-4 left-4">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800">
                                ${formation.category.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    
                    <div class="p-6 flex-1 flex flex-col">
                        <h3 class="font-semibold text-xl mb-4 line-clamp-2 group-hover:text-primary transition-colors flex-1" style="color: #6644FF;">
                            ${formation.titre}
                        </h3>
                        
                        <div class="flex flex-wrap gap-1 mt-auto min-h-[2rem]">
                            ${formation.eligibleCPF ? `
                                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border border-gray-200 bg-transparent text-gray-700">
                                    <svg class="h-2.5 w-2.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                                    </svg>
                                    ÉLIGIBLE CPF
                                </span>
                            ` : ''}
                            ${dureeDisplay ? `
                                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border border-gray-200 bg-transparent text-gray-700">
                                    <svg class="h-2.5 w-2.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    ${dureeDisplay}
                                </span>
                            ` : ''}
                            ${formation.certification && formation.certification !== '' ? `
                                <span class="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border border-gray-200 bg-transparent text-gray-700">
                                    <svg class="h-2.5 w-2.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    ${formation.certification}
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    // Fonction pour afficher plus de formations
    function loadMoreFormations() {
        currentDisplayCount += itemsPerPage;
        updateFormationsDisplay();
    }

    // Exposer la fonction globalement
    window.loadMoreFormations = loadMoreFormations;

    // Fonction pour mettre à jour l'affichage des formations
    function updateFormationsDisplay() {
        const filteredFormations = filterFormations();
        
        const grid = document.getElementById('formations-grid');
        const resultsCount = document.getElementById('results-count');
        const noResults = document.getElementById('no-results');
        const loadMoreBtn = document.getElementById('load-more-btn');

        if (filteredFormations.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            resultsCount.textContent = 'Aucune formation trouvée';
            if (loadMoreBtn) loadMoreBtn.classList.add('hidden');
        } else {
            noResults.classList.add('hidden');
            
            // Afficher seulement les formations selon la pagination
            const displayedFormations = filteredFormations.slice(0, currentDisplayCount);
            grid.innerHTML = displayedFormations.map(formation => createFormationCard(formation)).join('');
            
            const totalCount = filteredFormations.length;
            const displayedCount = displayedFormations.length;
            resultsCount.textContent = `${totalCount} formation${totalCount > 1 ? 's' : ''}`;
            
            // Gérer le bouton "Afficher plus"
            if (loadMoreBtn) {
                if (displayedCount < totalCount) {
                    const remaining = totalCount - displayedCount;
                    loadMoreBtn.querySelector('span').textContent = `Afficher plus (${remaining} restant${remaining > 1 ? 's' : ''})`;
                    loadMoreBtn.classList.remove('hidden');
                } else {
                    loadMoreBtn.classList.add('hidden');
                }
            }
        }
    }

    // Fonction pour obtenir les options uniques pour chaque filtre
    function getFilterOptions() {
        const options = {
            category: [...new Set(allFormations.map(f => f.category).filter(Boolean))],
            typeFormation: [...new Set(allFormations.map(f => f.typeFormation).filter(Boolean))],
            financement: [...new Set(allFormations.flatMap(f => f.financementsPossibles || []).filter(Boolean))],
            certification: [...new Set(allFormations.map(f => f.certification).filter(Boolean))],
            partenaire: [...new Set(allFormations.map(f => f.partenaire).filter(Boolean))]
        };
        return options;
    }

    // Fonction pour mettre à jour l'interface des filtres
    function updateFilterUI() {
        const activeCount = getActiveFiltersCount();
        const filterCount = document.getElementById('filter-count');
        const mobileFilterCount = document.getElementById('mobile-filter-count');
        const clearFiltersBtn = document.getElementById('clear-filters');

        // Mettre à jour les compteurs
        if (activeCount > 0) {
            filterCount.textContent = activeCount;
            filterCount.classList.remove('hidden');
            mobileFilterCount.textContent = activeCount;
            mobileFilterCount.classList.remove('hidden');
            clearFiltersBtn.classList.remove('hidden');
        } else {
            filterCount.classList.add('hidden');
            mobileFilterCount.classList.add('hidden');
            clearFiltersBtn.classList.add('hidden');
        }

        // Créer les sections de filtres
        const filterCategories = document.getElementById('filter-categories');
        const filterOptions = getFilterOptions();
        const categoryLabels = {
            category: "Thématique",
            typeFormation: "Type de formation",
            financement: "Financement",
            certification: "Type de certification",
            partenaire: "Partenaire académique"
        };

        const filtersHtml = Object.entries(filterOptions).map(([category, options]) => {
            if (options.length === 0) return '';
            
            const isExpanded = expandedSections[category];
            return `
                <div class="filter-section">
                    <button
                        onclick="toggleSection('${category}')"
                        class="flex items-center justify-between w-full text-left font-medium mb-3 transition-colors hover:text-primary"
                        style="color: #6644FF;"
                    >
                        ${categoryLabels[category]}
                        <svg class="h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    
                    ${isExpanded ? `
                        <div class="space-y-3 mb-4">
                            ${options.map(option => `
                                <div class="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="${category}-${option}"
                                        class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                                        ${selectedFilters[category].includes(option) ? 'checked' : ''}
                                        onchange="handleFilterChange('${category}', '${option}', this.checked)"
                                    />
                                    <label
                                        for="${category}-${option}"
                                        class="text-sm font-medium leading-none cursor-pointer"
                                    >
                                        ${option}
                                    </label>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        filterCategories.innerHTML = filtersHtml;
    }

    // Fonction pour basculer les filtres mobiles - Version CSS
    function toggleMobileFilters() {
        const sidebar = document.getElementById('filter-sidebar');
        
        if (sidebar.classList.contains('hidden')) {
            // Activer le mode mobile overlay
            sidebar.classList.remove('hidden');
            sidebar.classList.add('mobile-active');
        } else {
            // Retour au mode desktop
            sidebar.classList.add('hidden');
            sidebar.classList.remove('mobile-active');
        }
    }

    // Exposer la fonction globalement
    window.toggleMobileFilters = toggleMobileFilters;

    // Event listeners
    document.addEventListener('DOMContentLoaded', function() {
        // Debug: Log formations data to see what we're getting
        console.log('All formations loaded:', allFormations);
        console.log('Sample formation financements:', allFormations[0]?.financementsPossibles);
        console.log('First few formations financements:', allFormations.slice(0, 5).map(f => ({ title: f.titre, financements: f.financementsPossibles })));

        // Search functionality
        const desktopSearch = document.getElementById('desktop-search');
        const mobileSearch = document.getElementById('mobile-search');
        
        if (desktopSearch) {
            desktopSearch.addEventListener('input', (e) => {
                searchTerm = e.target.value;
                if (mobileSearch) mobileSearch.value = searchTerm;
                // Reset pagination when searching
                currentDisplayCount = itemsPerPage;
                updateFormationsDisplay();
            });
        }

        if (mobileSearch) {
            mobileSearch.addEventListener('input', (e) => {
                searchTerm = e.target.value;
                if (desktopSearch) desktopSearch.value = searchTerm;
                // Reset pagination when searching
                currentDisplayCount = itemsPerPage;
                updateFormationsDisplay();
            });
        }

        // Mobile filter toggle
        const mobileFilterToggle = document.getElementById('mobile-filter-toggle');
        if (mobileFilterToggle) {
            mobileFilterToggle.addEventListener('click', toggleMobileFilters);
        }

        // Clear filters buttons
        const clearFiltersBtn = document.getElementById('clear-filters');
        const clearFiltersNoResults = document.getElementById('clear-filters-no-results');
        
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', clearAllFilters);
        }
        
        if (clearFiltersNoResults) {
            clearFiltersNoResults.addEventListener('click', clearAllFilters);
        }

        // Initial setup
        initializeFromURL(); // Charger les filtres depuis l'URL d'abord
        checkMobile();
        updateFilterUI();
        updateFormationsDisplay();
        
        // Update placeholders on load and resize
        setTimeout(updatePlaceholders, 100); // Delay to ensure elements are rendered
        window.addEventListener('resize', function() {
            setTimeout(updatePlaceholders, 100);
        });
    });

})();