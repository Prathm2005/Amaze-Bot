import { createContext, useState } from "react";
import run from "../config/gemini"

export const context=createContext();


const ContextProvider=(props)=>{

    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowresult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultdata]=useState("");

    const onSent=async(prompt)=>{
        setResultdata("");
        setLoading(true),
        setShowresult(true)
        let response;
        if(prompt!==undefined){
            response=await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response=await run(input)
        }
        const responseArray = response.split("\n"); 

        let newResponse = "<ul>"; 
        responseArray.forEach((item) => {
          if (item.trim() !== "") {
            newResponse += `<li>${item}</li>`;
          }
        });
        newResponse += "</ul>";
    
      
        newResponse = newResponse.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
        // let responsearray=response.split("**")
        // let newresponse;
        // for(let i=0;i<responsearray.length;i++){
        //     if (i==0 || i%2!==1) {
        //         newresponse+=responsearray[i];
        //     }
        //     else{
        //         newresponse+="<b>"+responsearray[i]+"</b>"
        //     }
        // }
        // let newresponse2=newresponse.split("*").join("</br>")
        setResultdata(newResponse),
        setLoading(false),
        setInput("");
    }
    const newchat = () => {
        setInput(""); 
        setShowresult(false); 
      };


    const contextValue={
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newchat,
    }

    return (
        <context.Provider  value={contextValue}>
            {props.children}
        </context.Provider>
    )

}

export default ContextProvider