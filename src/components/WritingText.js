
//count number of words typed in the text area
//when user press start, times should start

import { useEffect, useState, useRef } from "react"
     const STARTING_TIME = 5

export default function WritingText(){
    const [initialText, setInitialText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [startTimer, setStartTimer] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)

    function handleChange(e){
        const { value } = e.target;
        setInitialText(value)
         
    }
    
    function calculateWord(text){
        const wordsArr = text.trim().split(" ");
        return  wordsArr.filter((word)=> word !== "").length
    }

    function endGame(){
        setStartTimer(false)
        setWordCount(calculateWord(initialText))
    }
    useEffect(()=>{
        if(startTimer  && timeRemaining > 0){
            setTimeout(()=>{
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if (timeRemaining === 0){
            endGame()
            // console.log(numWords)
        }
    }, [timeRemaining, startTimer])

    function restartStage(){
        setStartTimer(true)
        setTimeRemaining(STARTING_TIME)
        setInitialText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    return(
        <>
        <h1>Please type here</h1>
        <textarea 
            ref = {textBoxRef}
            onChange = {handleChange}
            value = {initialText}
            disabled = {!startTimer}
        />
         <br />  <br /> 
        Time remaining : {timeRemaining}
        <button
        onClick={restartStage}
        disabled = {startTimer}
        >start</button> 

            <br /> 
            
            <br />
        Word count : {wordCount}
        
        </>
    )
}