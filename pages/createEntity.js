import { useState } from 'react'
import Study from "./entities/Study"
import Sample from "./entities/Sample"
import Patient from "./entities/Patient"
import CustomEntity from "./entities/CustomEntity"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFlask,
    faGraduationCap,
    faUser,
    faCogs
} from '@fortawesome/free-solid-svg-icons'

// Entity names
const entityList = ["Study", "Sample", "Patient", "CustomEntity"]

// Map entity name to its component
const entityMap = {
    Study,
    Sample,
    Patient,
    CustomEntity
}

// Map entity name to Font Awesome icon
const entityIconMap = {
    Study: faGraduationCap,
    Sample: faFlask,
    Patient: faUser,
    CustomEntity: faCogs
}

export default function CreateEntity() {
    const [selected, setSelected] = useState(entityList[0])
    const SelectedComponent = entityMap[selected] // ✅ Corrected this

    return (
        <div className="space-y-4">
            {/* Badge row */}
            <div className="flex flex-wrap gap-2">
                {entityList.map((name) => {
                    const icon = entityIconMap[name];
                    return (
                        <button
                            key={name}
                            onClick={() => setSelected(name)}
                            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium ring-1 ring-indigo-700/10 ring-inset transition
                                ${selected === name
                                ? "bg-indigo-600 text-white ring-indigo-600"
                                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"}
                            `}
                        >
                            <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                            {name}
                        </button>
                    );
                })}
            </div>

            {/* Dynamic content */}
            <div className="p-4 border rounded-md bg-white">
                <SelectedComponent />
            </div>
        </div>
    )
}
