"use client"
import React from 'react'
import { useState } from 'react'

function OpenAiComponent({data}) {
    const [apiKey, setApiKey] = useState('')
    const handleChange = (e) => {
        //process logic here
        switch(e.target.value){
            case 'classify':
                console.log('Classification is done here')

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
