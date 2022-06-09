export const control = () => {
    const controlInfo = document.querySelector('.game__control-block')
    const conrolBtn = document.querySelector('.game__control-info')

    const to = gsap.timeline()

    conrolBtn.addEventListener('mouseover', () => {
        to.fromTo(controlInfo,{display:'flex',opacity: 0,y:'-50%'}, {display:'flex',opacity: 1, y:'0'})
        // controlInfo.style.display = 'flex'
    })
    conrolBtn.addEventListener('mouseleave', () => {
        to.to(controlInfo,{display:'none',opacity: 0, y:'-50%'})
    })
}