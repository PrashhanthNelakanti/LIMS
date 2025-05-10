import { useState } from 'react'
/*import Study from "./entities/Study"
import Sample from "./entities/Sample"
import Patient from "./entities/Patient"
import CustomEntity from "./entities/CustomEntity"

const entityList = ["Study", "Sample", "Patient", "CustomEntity"]
const entityMap = {
    Study,
    Sample,
    Patient,
    CustomEntity
}*/

export default function CreateEntity() {
    const [selected, setSelected] = useState(entityList[0])
    const SelectedComponent = entityMap[selected]

    return (<></>
        /*<div className="space-y-4">
            {/!* Badge row *!/}
            <div className="flex flex-wrap gap-2">
                {entityList.map((name) => (
                    <button
                        key={name}
                        onClick={() => setSelected(name)}
                        className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium ring-1 ring-indigo-700/10 ring-inset transition
              ${selected === name
                            ? "bg-indigo-600 text-white ring-indigo-600"
                            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}
            `}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        {name}
                    </button>
                ))}
            </div>

            {/!* Dynamic content *!/}
            <div className="p-4 border rounded-md bg-white">
                <SelectedComponent />
            </div>
        </div>*/
    )
}
