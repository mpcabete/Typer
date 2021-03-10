import React, { Component } from 'react';

class AttemptsList extends Component {
    state = { 
        charList:[]
     }

     getErrors(log){
        //  retorna uma lista não ordenada dos erros para cada caractere
         let errList = {}
         log.forEach(p=>{
            if(p.attempts.length >0){

                errList[p.char] = p.attempts.length + (errList[p.char] ?? 0)
            }
        })
        
        return errList
    }
        render() { 
            const attemptsList = Object.entries(this.getErrors(this.props.log))
            const elementList = attemptsList.sort((a,b)=>b[1]-a[1]).map(char => {
                return(
                <li key={char[0]}>{char[0]} : {char[1]}</li>
            )})

        
        return (
            <ul>
                {elementList}
            </ul>
        );
    }
}
 
export default AttemptsList;