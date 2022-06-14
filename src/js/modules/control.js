export const control = () => {
    const controlInfo = document.querySelector('.game__control-block')
    const conrolBtn = document.querySelector('.game__control-info')
    const closeControl = document.querySelector('.btn__close')

    const to = gsap.timeline()

    conrolBtn.addEventListener('click', () => {
        console.log(conrolBtn.classList.contains('not-active'))
        if(conrolBtn.classList.contains('not-active')){
            to.fromTo(controlInfo,{display:'flex',opacity: 0,y:'-50%'}, {display:'flex',opacity: 1, y:'0'})
            conrolBtn.classList.remove('not-active')
        }
        // controlInfo.style.display = 'flex'
    })
    closeControl.addEventListener('click', () => {
        conrolBtn.classList.add('not-active')
        to.to(controlInfo,{display:'none',opacity: 0, y:'-50%'})
    })
}