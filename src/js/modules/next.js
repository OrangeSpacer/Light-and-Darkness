export const next = () => {
    const bodyBlcok = document.querySelector('body')

    const mainBlock = document.querySelector('.header')
    const choiseBlock = document.querySelector('.person')
    
    const nextMain = document.querySelector('.btn__start')
    const nextPerson = document.querySelector('.btn__next')

    nextMain.addEventListener('click', () => {
        bodyBlcok.style.overflowY = 'scroll'
        setTimeout(() => {
            mainBlock.style.display = 'none'
        },500)
        bodyBlcok.style.overflowY = 'hidden'
    })

    nextPerson.addEventListener('click', () => {
        bodyBlcok.style.overflowY = 'scroll'
        setTimeout(() => {
            choiseBlock.style.display = 'none'
        },500)
        bodyBlcok.style.overflowY = 'hidden'
    })

}