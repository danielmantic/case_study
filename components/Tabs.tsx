"use client";

import React, { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  return (
    <div className="flex flex-col items-start">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("tab1")}
          className={`p-[10px] m-[5px] bg-[#000000] font-[600] outline-none focus:outline-none ${
            activeTab === "tab1" ? "text-[#ff4100]" : "text-[#ffffff]"
        }`}
        >
          Popis
        </button>
        <button
          onClick={() => setActiveTab("tab2")}
          className={`p-[10px] m-[5px] bg-[#000000] font-[600] outline-none focus:outline-none ${
            activeTab === "tab2" ? "text-[#ff4100]" : "text-[#ffffff]"
        }`}
        >
          Recenzie
        </button>
        <button
          onClick={() => setActiveTab("tab3")}
          className={`p-[10px] m-[5px] bg-[#000000] font-[600] outline-none focus:outline-none ${
            activeTab === "tab3" ? "text-[#ff4100]" : "text-[#ffffff]"
        }`}
        >
          Detail produktu
        </button>
      </div>

      <div className="w-full h-[500px] overflow-y-auto">
        {activeTab === "tab1" && 
            <div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit architecto deleniti pariatur nostrum ab rerum voluptate magni dolore possimus. Ut sit dignissimos eaque debitis minima. Necessitatibus quis ea molestias ab? Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus culpa non aliquam labore quibusdam nisi quae, adipisci, hic distinctio et eos possimus quas alias blanditiis! Dolorem cupiditate excepturi enim non!</p>
            </div>}
        {activeTab === "tab2" && 
            <div>
                <div className="border border-gray-300 p-[10px] m-[5px]">
                    <p className="font-[600] text-[#ff4100]">Daniel</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ea beatae quaerat repellendus iure tempore enim voluptas rerum veritatis harum quod dolore autem officiis quae expedita nesciunt, natus alias architecto.</p>
                </div>

                <div className="border border-gray-300 p-[10px] m-[5px]">
                    <p className="font-[600] text-[#ff4100]">Martin</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ea beatae quaerat repellendus iure tempore enim voluptas rerum veritatis harum quod dolore autem officiis quae expedita nesciunt, natus alias architecto.</p>
                </div>

                <div className="border border-gray-300 p-[10px] m-[5px]">
                    <p className="font-[600] text-[#ff4100]">Alexia</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ea beatae quaerat repellendus iure tempore enim voluptas rerum veritatis harum quod dolore autem officiis quae expedita nesciunt, natus alias architecto.</p>
                </div>
            
            </div>}
        {activeTab === "tab3" && 
            <div>
                <p>EAN	8586024620193</p>
                <p>Vyrobené v	EU</p>
                <p>Výška	14.00 cm</p>
                <p>Šírka	28.00 cm</p>
            </div>
        }
      </div>
    </div>
  );
}
