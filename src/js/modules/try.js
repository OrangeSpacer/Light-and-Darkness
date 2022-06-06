export const newGame = () => {
    const newTryBtn = document.querySelector('.btn__try')

    newTryBtn.addEventListener('click', () => {
        location.reload()
    })
}