export let personPlayer
export let enemyPlayer
export const choise = () => {
    const personBlock = document.querySelectorAll('.person__characther')
    const nextButton = document.querySelector('.btn__next')

    let choiseHero = false
    let choiseMonster = false


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
                personPlayer = target.getAttribute('id')
                choiseHero = true
                return personPlayer
            }
            if(target.classList.contains('monster')){
                activeChoise(target,'active__monster')
                target.closest('.person__item').classList.add('active__monster')
                enemyPlayer = target.getAttribute('id')
                choiseMonster = true
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