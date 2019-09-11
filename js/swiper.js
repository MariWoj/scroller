class Swiper {
    constructor() {
        this.initialY = null;
        this.initialX = null;

        document.addEventListener('touchstart', (e) => this.startTouch(e));
        document.addEventListener('touchmove', (e) => this.moveTouch(e));

        this.events = {
            swipeUp: new Event('swipeUp'),
            swipeDown: new Event('swipeDown'),
            swipeLeft: new Event('swipeLeft'),
            swipeRight: new Event('swipeRight')
        }
    }
    startTouch(e) {
        e.preventDefault();
        this.initialX = e.touches[0].clientX;
        this.initialY = e.touches[0].clientY;
    }
    moveTouch(e) {
        if (!this.initialX || !this.initialY) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const diffX = this.initialX - currentX;
        const diffY = this.initialY - currentY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // oś X
            if (diffX > 0) {
                // w lewo
                document.dispatchEvent(this.events.swipeLeft);
            } else {
                // w prawo
                document.dispatchEvent(this.events.swipeRight);
            }

        } else {
            // oś Y
            if (diffY > 0) {
                // do góry
                document.dispatchEvent(this.events.swipeUp);
            } else {
                // w dół
                document.dispatchEvent(this.events.swipeDown);
            }
        }
        this.initialX = null;
        this.initialY = null;
    }
}

new Swiper();