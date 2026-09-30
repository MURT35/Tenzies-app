import React from "react"
import { nanoid } from "nanoid"
import Die from "./Die"
import Confetti from 'react-confetti'
export default function App(){
   
;
function generateAllNewDice(){
   return new Array(10)
            .fill(0)
            .map(() =>( {
               value:Math.ceil(Math.random() * 6),
               isHeld: false,
               id: nanoid()
            }))

}


const [dice,setDice]=React.useState(()=>generateAllNewDice())
const gameWon=dice.every(die=>die.isHeld)&&
dice.every(die=>die.value===dice[0].value)
function holdDie(id){
  setDice(
   prevDie=>prevDie.map(
    die=>
     die.id=== id?
      {...die,isHeld:!die.isHeld}
      : die     
      )
  )
}
const DiceElement=dice.map((dieObj)=>(
                <Die key={dieObj.id} value={dieObj.value}
                isHeld={dieObj.isHeld}
                hold={()=>holdDie(dieObj.id)}
                         />
             ))
function  rollDice(){

  if(!gameWon){

   setDice(prevheld=>prevheld.map(
     die=> die.isHeld? die
     : {...die,value:Math.ceil(Math.random() * 6)} 

   ))
  }
  else{
setDice(generateAllNewDice())
  }

}      

    return(
       <main>
         {gameWon&&<Confetti/>}
          <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
             {DiceElement}
            </div>
            <button className="roll-btn" onClick={rollDice}>{gameWon?"New Game":"Roll"}</button>
       </main> 
    )
}