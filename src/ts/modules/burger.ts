export const burger = (menuSelector: string, burgerSelector: string): void => {
    const menuElem = document.querySelector(menuSelector) as HTMLElement;
    const burgerElem = document.querySelector(burgerSelector) as HTMLElement;
    const MOBILE_BREAKPOINT:number = 992;
    
    menuElem.style.display = "none";

    burgerElem.addEventListener('click', () => {
        if(menuElem.style.display == "none" && window.screen.availWidth <= MOBILE_BREAKPOINT){
            menuElem.classList.add('animated', 'fadeInDown')
            menuElem.style.display = "block";
        } else{
            menuElem.style.display = "none";
        }
    });

    window.addEventListener('resize', () => {
        if(window.screen.availWidth > MOBILE_BREAKPOINT){
            menuElem.style.display = "none";
        }
    })
}