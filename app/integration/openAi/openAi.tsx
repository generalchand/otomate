"use client"
import React from 'react'
import { useState } from 'react'
import { OpenAI } from 'langchain/llms/openai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain, SimpleSequentialChain } from 'langchain/chains'

function OpenAiComponent({data, mailBody}) {
    const [apiKey, setApiKey] = useState('')
    const handleChange = async (e) => {
        //process logic here
        const model = new OpenAI({ openAIApiKey : apiKey})
        switch(e.target.value){
            case 'classify':

                const delay = async (ms) => { return new Promise((resolve) => setTimeout(resolve, ms)) }

                const makeApiCall = async () => {
                try {
                    const firstTemplate = "You are a classifier, you classify the following body of the mail: {mailBody} into\
                   two classes, which are 'CUSTOMER COMPLAINT' and 'ORDER CONFIRMATION', IMPORTANT: strictly output '1' for 'CUSTOMER COMPLAINT'\
                   and '2' for 'ORDER CONFIRMATION'";

                    const firstPrompt = new PromptTemplate({inputVariables: ["mailBody"], template: firstTemplate})
                    const firstChain = new LLMChain({ llm: model, prompt: firstPrompt})

                    const firstOutput = await firstChain.call({ mailBody });

                    console.log("FIRST CLASSIFICATION",firstOutput.text);

                    if(firstOutput.text == 1)
                            console.log('Summary to slack, customer support problem')
                    else if(firstOutput.text == 2){
                            const secondTemplate = "You are a classifier, you classify the following body of the mail: {mailBody} into\
                                two classes, which are 'SHIPPING TAKES MORE THAN 3 DAYS' and 'SHIPPING TAKES LESS THAN 3 DAYS', IMPORTANT: strictly output '1' for 'SHIPPING TAKES MORE THAN 3 DAYS'\
                                and '2' for 'SHIPPING TAKES LESS THAN 3 DAYS'"
                            const secondPrompt = new PromptTemplate({inputVariables: ["mailBody"], template: secondTemplate})
                            const secondChain = new LLMChain({ llm: model, prompt: secondPrompt})

                            const secondOutput = await secondChain.call({mailBody});
                            console.log(secondOutput.text)
                            if(secondOutput.text == 1)
                                console.log("Add to MongoDB")
                            else if(secondOutput.text == 2){
                                console.log("Delayed message to slack")
                            }
                    }

                    await delay(1000);
                } catch (error) {
                    console.error(error);
                }
                }

                await makeApiCall();
                break;

            default:
                console.log('NA')
        }
    }
  return (
    <div>
        <label htmlFor="apiKey">Api-Key :</label>
        <input
          type="text"
          name="apiKey"
          id='apiKey'
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <br />
        <label htmlFor="prompts">Prompts</label>
        <select name="prompts" id='prompts' onChange={handleChange}>
            <option value="none">None</option>
            <option value="classify">Classify</option>
        </select>
    </div>
  )
}

export default OpenAiComponent
