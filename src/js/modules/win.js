export const  winner = (player,enemy,timeClear) => {
    clearTimeout(timeClear)
    const endBlock = document.querySelector('.game__end')
    const endGame = document.querySelector('.game__end-text')

    const tlTry = gsap.timeline()
    if(player.health > enemy.health){
        tlTry.to(endBlock,{display:'block', opacity: 1, top:'35%'})
        endGame.innerHTML = 'Player 1 Win'
    }
    if(player.health < enemy.health){
        tlTry.to(endBlock,{display:'block', opacity: 1, top:'35%'})
        endGame.innerHTML = 'Player 2 Win'
    }
    if(player.health == enemy.health){
        tlTry.to(endBlock,{display:'block', opacity: 1, top:'35%'})
        endGame.innerHTML = 'Tie'
    }
}     