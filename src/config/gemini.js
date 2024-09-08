
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
   const apiKey ="AIzaSyBnPCQtfubofsaiJm3unI6DqosUPwSDRdM";
   async function run(prompt) {
   
    const genAI = new GoogleGenerativeAI(apiKey);
  
    
    const model =  genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const chatSession =  model.startChat({
    generationConfig,
    history: [],
  });
  
    const result = await chatSession.sendMessage(prompt);
    const response=result.response;
    console.log(response.text());
    return response.text()
    }
  
  export default run;