export const  winner = (player,enemy,timeClear) => {
    clearTimeout(timeClear)
    const endBlock = document.querySelector('.game__end')
    const endGame = document.querySelector('.game__end-text')
    console.log(endGame)
    if(player.health > enemy.health){
        endBlock.style.display = 'block'
        endGame.innerHTML = 'Player 1 Win'
    }
    if(player.health < enemy.health){
        endBlock.style.display = 'block'
        endGame.innerHTML = 'Player 2 Win'
    }
    if(player.health == enemy.health){
        endBlock.style.display = 'block'
        endGame.innerHTML = 'Tie'
    }
}     