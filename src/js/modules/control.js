export const control = () => {
    const controlInfo = document.querySelector('.game__control-block')
    const conrolBtn = document.querySelector('.game__control-info')

    conrolBtn.addEventListener('mouseover', () => {
        controlInfo.style.display = 'flex'
    })
    conrolBtn.addEventListener('mouseleave', () => {
        controlInfo.style.display = 'none'
    })
}