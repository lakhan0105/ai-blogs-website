import { createContext, useContext, useState } from "react";
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const myContext = createContext();

function ContextProvider({ children }) {
  // state to save the response from the api (this is read only data)
  const [blogText, setBlogText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInputBox, setShowInputBox] = useState(true);

  async function talkToOpenAi(prompt) {
    const apiBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a detailed, structured blog post based on the following input. Regardless of how vague or unclear the input is, generate a blog post that is informative, engaging, and easy to read. The blog should include an introduction, body sections with headers, and a conclusion. User's input:${prompt} .If the input is not a specific or clear topic, create a general and informative post based on common knowledge or related subjects that would still provide value to the reader. provide the output in HTML format and only body element. it must be less than 60 words`,
        },
      ],
      temperature: 0.7,
    };

    try {
      setIsLoading(true);
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify(apiBody),
      });

      const data = await resp.json();
      setIsLoading(false);
      setShowInputBox(false);

      setBlogText(data?.choices[0]?.message?.content);
      return { blogRes: data?.choices[0]?.message?.content };
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <myContext.Provider
      value={{ talkToOpenAi, blogText, isLoading, showInputBox }}
    >
      {children}
    </myContext.Provider>
  );
}

export function useMyContext() {
  return useContext(myContext);
}

export default ContextProvider;
