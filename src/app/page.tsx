"use client"

import Image from "next/image";
import React, { useState } from "react";
import ThreeScene from "./threeComponent";
import { queryChatGPT } from "./chatgpt";

export default function Home() {
  const [textureURL, setTextureURL] = useState("")
  const [queryText,setQueryText] = useState("Pixel art image entirely filled with a stone texture, featuring a detailed and realistic stone surface that covers the entire image with no gap or background color, just the stone. The texture is rugged and natural, perfect for seamless tiling in a pixel art game.")
  async function activateGPT()
  {
    if(queryText == "")
      return;
    const result = await queryChatGPT(queryText)  
    console.log("Result:",result);
    setTextureURL(result);
  }
  //setTimeout(()=>{debugger; setTextureURL("https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YEG8Ai5NwGU82CVA9nzVFj/user-h4GZLhSgbW7M9Rs18WOY5gxY/img-pMO2PkS0CccvbtgC7cRz2EOY.png?st=2024-02-01T15%3A58%3A11Z&se=2024-02-01T17%3A58%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-31T21%3A36%3A28Z&ske=2024-02-01T21%3A36%3A28Z&sks=b&skv=2021-08-06&sig=VvVlRxpu25ei/5px/i/HTANvoL%2B30MkkharZyNdNRpE%3D")}, 1000)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to GPT Image Maker
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "} Alex
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <ThreeScene textureURL={textureURL}/>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h2 className={`mb-3 mt-3 text-2xl font-semibold`}>
          Set a new theme
        </h2>
        <textarea id="prompt" onChange={e => setQueryText(e.target.value)} className={`m-0 w-[400px] h-[200px] resize-y w-4/5rounded-md opacity-50 bg-slate-400`} value={queryText} />
        <button onClick={activateGPT} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Generate</button>
      </div>
    </main>
  );
}
