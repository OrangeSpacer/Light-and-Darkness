export const choise = () => {
    const personBlock = document.querySelectorAll('.person__characther')
    const nextButton = document.querySelector('.btn__next')

    let choiseHero = false
    let choiseMonster = false

    let counterChoise = 0

    function activeChoise(item,activeClass){
        let itemBlcok = item.closest('.person__characther').querySelectorAll('.person__item')
        itemBlcok.forEach(item => {
            item.classList.remove(activeClass)
        })
    }

    personBlock.forEach(item => {
        item.addEventListener('click', (e) => {
            let target = e.target
            if(target.classList.contains('knights')){
                activeChoise(target,'active__knights')
                target.closest('.person__item').classList.add('active__knights')
                choiseHero = true
                console.log(target)
            }
            if(target.classList.contains('monster')){
                console.log(target)
                activeChoise(target,'active__monster')
                target.closest('.person__item').classList.add('active__monster')
                choiseMonster = true
                console.log(target)
            }
            Next()
        })
    })
    function Next(){
        console.log(choiseHero,choiseMonster)
        if(choiseHero && choiseMonster){
            nextButton.style.display = 'block'
        }
    }
}