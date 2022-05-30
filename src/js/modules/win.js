export const  winner = (player,enemy,timeClear) => {
    clearTimeout(timeClear)
    const endGame = document.querySelector('.game__end')
    if(player.health > enemy.health){
        endGame.style.display = 'block'
        endGame.innerHTML = 'Player 1 Win'
    }
    if(player.health < enemy.health){
        endGame.style.display = 'block'
        endGame.innerHTML = 'Player 2 Win'
    }
    if(player.health == enemy.health){
        endGame.style.display = 'block'
        endGame.innerHTML = 'Tie'
    }
}     