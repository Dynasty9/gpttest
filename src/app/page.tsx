"use client"

import Image from "next/image";
import React, { useState } from "react";
import ThreeScene from "./threeComponent";
import { queryChatGPT } from "./chatgpt";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [textureURL, setTextureURL] = useState("")
  const [queryText,setQueryText] = useState("Pixel art image entirely filled with a stone texture, featuring a detailed and realistic stone surface that covers the entire image with no gap or background color, just the stone. The texture is rugged and natural, perfect for seamless tiling in a pixel art game.")
  async function activateGPT()
  {
    setIsLoading(true);
    if(queryText == "")
      return;
    try{
      const result = await queryChatGPT(queryText)  
      setTextureURL(result);
    }
    finally
    {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to GPT Cube Generator
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            By{" "} Alex
        </div>
      </div>

      <div className="absolute z-[100] bottom-0 mb-32 opacity-80 flex items-center flex-col text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h2 className={`mb-3 mt-3 text-2xl font-semibold`}>
          Set a new theme
        </h2>
        <textarea id="prompt" onChange={e => setQueryText(e.target.value)} className={`m-0 w-[400px] h-[200px] resize-y w-4/5rounded-md bg-slate-400 text-slate-800`} value={queryText} />
        <button onClick={activateGPT} disabled={isLoading} className={"font-semibold hover:text-white py-2 px-4 border rounded" + (!isLoading ? "hover:bg-blue-500 text-blue-700 border-blue-500" : "hover:bg-gray-500 bg-transparent text-grey-700 border-grey-500 rounded")}>{isLoading ? "Generating" : "Create"}</button>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <ThreeScene textureURL={textureURL}/>
      </div>
    </main>
  );
}
