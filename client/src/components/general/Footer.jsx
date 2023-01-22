import { useEffect } from "react"

const Footer = () => {

    useEffect(() => {
        setFooter()
    },[])

    window.onresize = () => {
        setFooter()
    };

    const setFooter = () => {
        const display = document.getElementById('main')
        const viewPort = window.innerHeight
        const footer = document.getElementById('foot')
        display.offsetHeight<viewPort-17 ? footer.classList.add('bottom-out') : footer.classList.remove('bottom-out')
    }

    return (
        <footer id="foot">
            <h6>Web Ground Designs</h6>
            <p>Gary DuMond</p>
            <p>Coding Dojo</p>
        </footer>
    )
}

export default Footer