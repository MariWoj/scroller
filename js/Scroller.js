class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section');
        const sectionArr = [...this.sections];
        const currentSectionIndex = sectionArr.findIndex(this.isScrolledIntoView);
        this.currentSectionIndex = currentSectionIndex < 0 ? 0 : currentSectionIndex;
        this.isThrottled = false;
        this.drawNavigation();
    }

    isScrolledIntoView = el => {
        const rect = el.getBoundingClientRect();
        const elTop = rect.top;
        const elBottom = Math.floor(rect.bottom);

        const isVisible = (elTop >= 0) && (elBottom <= window.innerHeight);
        return isVisible;
    }

    listenScroll = (e) => {
        if (this.isThrottled) return;
        this.isThrottled = true;

        setTimeout(() => {
            this.isThrottled = false;
        }, 1000);

        const direction = e.wheelDelta < 0 ? 1 : -1;

        this.scroll(direction);
    }

    scroll = direction => {
        if (direction === 1) {
            const isLastSection = this.currentSectionIndex === this.sections.length - 1;
            if (isLastSection) return;
        } else if (direction === -1) {
            const firstSection = this.currentSectionIndex === 0;
            if (firstSection) return;
        }
        this.currentSectionIndex = this.currentSectionIndex + direction;

        this.scrollToCurrentSection();
    }

    scrollToCurrentSection = () => {
        this.selectActiveNavItem();
        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    drawNavigation = () => {
        this.navigationContainer = document.createElement('aside');
        this.navigationContainer.setAttribute('class', 'scroller__navigation');
        const list = document.createElement('ul');
        this.sections.forEach((section, index) => {
            const listItem = document.createElement('li');

            listItem.addEventListener('click', () => {
                this.currentSectionIndex = index;
                this.scrollToCurrentSection(this.currentSectionIndex);
            });

            list.appendChild(listItem);
        })
        this.navigationContainer.appendChild(list);

        document.body.appendChild(this.navigationContainer);

        this.selectActiveNavItem();
    }

    selectActiveNavItem = () => {
        if (this.navigationContainer) {
            const navigationItems = this.navigationContainer.querySelectorAll('li');

            navigationItems.forEach((item, index) => {
                if (index === this.currentSectionIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }
}