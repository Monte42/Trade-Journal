console.log("Welcome to Trade Journal");

window.onresize = function(event) {
    console.log(event);
};


export const setFooter = () => {

    const display = document.getElementById('main')
    const viewPort = window.innerHeight
    const footer = document.getElementById('foot') 
    if (display.offsetHeight<viewPort) footer.classList.add('bottom-out')
}

window.onload = setFooter;