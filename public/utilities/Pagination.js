export class Pagination {
    constructor() {

    }

    updatePagination() {
        const paginationContainer = this.paginationBarContainer;

        const prevPageButton = document.getElementById('prev-page').cloneNode(true);
        const nextPageButton = document.getElementById('next-page').cloneNode(true);
        const pageItemTemplate = paginationContainer.querySelector('.page-num');

        paginationContainer.innerHTML = '';
        this.addPrevPageButton(paginationContainer, prevPageButton);
        this.addPageButtons(paginationContainer, pageItemTemplate);
        this.addNextPageButton(paginationContainer, nextPageButton);
        this.addEventListeners();
    }

    addPrevPageButton(container, prevPageButton) {
        const prevPageLink = prevPageButton.querySelector('.page-link');
        prevPageLink.setAttribute('data-page', this.currentPage - 1);

        if (this.currentPage === 1) {
            prevPageButton.classList.add('d-none');
        } else {
            prevPageButton.classList.remove('d-none');
        }

        container.appendChild(prevPageButton);
    }

    addPageButtons(container, pageItemTemplate) {
        const [pageStart, pageEnd] = this.calculatePageRange();

        for (let i = pageStart; i <= pageEnd; i++) {
            const pageItem = pageItemTemplate.cloneNode(true);
            const pageLink = pageItem.querySelector('.page-link');
            pageLink.textContent = i;
            pageLink.setAttribute('data-page', i);

            if (i === this.currentPage) {
                pageItem.classList.add('active');
            } else {
                pageItem.classList.remove('active');
            }

            pageItem.classList.remove('d-none');
            container.appendChild(pageItem);
        }
    }

    addNextPageButton(container, nextPageButton) {
        const nextPageLink = nextPageButton.querySelector('.page-link');
        nextPageLink.setAttribute('data-page', this.currentPage + 1);

        if (this.currentPage === this.totalPages) {
            nextPageButton.classList.add('d-none');
        } else {
            nextPageButton.classList.remove('d-none');
        }

        container.appendChild(nextPageButton);
    }

    calculatePageRange() {
        let pageStart = Math.max(1, this.currentPage - 1);
        let pageEnd = Math.min(this.totalPages, this.currentPage + 1);

        if (this.currentPage === 1) {
            pageEnd = Math.min(this.totalPages, 3);
        } else if (this.currentPage === this.totalPages) {
            pageStart = Math.max(1, this.totalPages - 2);
        }

        return [pageStart, pageEnd];
    }

    updateItemsPerPageSelect() {
        const selector = this.itemsPerPageSelector;
        if (!selector) return;

        const options = selector.querySelectorAll('option');
        options.forEach(option => {
            option.selected = parseInt(option.value) === this.itemsPerPage;
        });
    }

    addEventListeners() {
        const pageLinks = this.paginationBarContainer.querySelectorAll('.page-link');
        pageLinks.forEach(link => {
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const page = parseInt(link.getAttribute('data-page'));
                if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
                    await this.onPageChange(page);
                }
            });
        });
        this.itemsPerPageSelector.addEventListener('change', async (e) => {
            e.preventDefault();
            await this.onItemsPerPageChange(e.target.value);
        })
    }

    updateOptions(container, selector, options = {}) {
        this.paginationBarContainer = container;
        this.itemsPerPageSelector = selector
        this.itemsPerPage = options.itemsPerPage;
        this.currentPage = options.currentPage;
        this.totalPages = options.totalPages;

        this.onParametersChangeCallBack = options.onParametersChange || function () {};
    }

    async onPageChange(page) {
        this.currentPage = page;
        await this.onParametersChangeCallBack();
    }

    async onItemsPerPageChange(itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
        await this.onParametersChangeCallBack();
    }
}