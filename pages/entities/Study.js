import { useState } from 'react'
export default function Study() {
    const [form, setForm] = useState({
        studyName: '',
        description: '',
        departmentName: '',
        sampleId: '',
        sampleName: '',
        lab: '',
        bioMaterialId: ''
    })

    // messageType: 'success' | 'error'
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const user = sessionStorage.getItem('login') || '{}';

    const { fname = '' } = JSON.parse(user);

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setMessageType('')
        try {
            const res = await fetch('/api/v2/studies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    study_name: form.studyName,
                    description: form.description,
                    department_name: form.departmentName,
                    sample_id: form.sampleId,
                    sample_name: form.sampleName,
                    lab: form.lab,
                    bio_material_id: form.bioMaterialId,
                    created_by: fname
                })
            })
            const data = await res.json()
            if (data.success) {
                setMessage('✔ Study saved successfully')
                setMessageType('success')
                setForm({ studyName: '', description: '', departmentName: '', sampleId: '', sampleName: '', lab: '', bioMaterialId: '' })
            } else {
                setMessage(`✖ ${data.message || 'Error saving study'}`)
                setMessageType('error')
            }
        } catch (err) {
            console.error(err)
            setMessage('✖ Network error')
            setMessageType('error')
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {message && (
                <p
                    className={`mb-4 text-center text-sm font-medium ${
                        messageType === 'success' ? 'text-green-800 bg-green-100 border border-green-200 p-2 rounded' :
                            'text-red-800 bg-red-100 border border-red-200 p-2 rounded'
                    }`}
                >
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Study</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        The fields marked with (*) are mandatory. Please fill the details accordingly.
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="studyName" className="block text-sm font-medium text-gray-900">
                                Study Name *
                            </label>
                            <input
                                type="text"
                                name="studyName"
                                id="studyName"
                                value={form.studyName}
                                onChange={handleChange}
                                required
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                                placeholder="AthenaX-12"
                            />
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={form.description}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                                placeholder="Write a few sentences about study."
                            />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Study Information</h2>
                    <p className="mt-1 text-sm text-gray-600">Study meta data could vary from study to study.</p>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="departmentName" className="block text-sm font-medium text-gray-900">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="departmentName"
                                id="departmentName"
                                value={form.departmentName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="sampleId" className="block text-sm font-medium text-gray-900">
                                Sample ID
                            </label>
                            <input
                                type="text"
                                name="sampleId"
                                id="sampleId"
                                value={form.sampleId}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="sampleName" className="block text-sm font-medium text-gray-900">
                                Sample Name
                            </label>
                            <input
                                type="text"
                                name="sampleName"
                                id="sampleName"
                                value={form.sampleName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="lab" className="block text-sm font-medium text-gray-900">
                                Lab
                            </label>
                            <input
                                type="text"
                                name="lab"
                                id="lab"
                                value={form.lab}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="bioMaterialId" className="block text-sm font-medium text-gray-900">
                                Bio Material ID
                            </label>
                            <input
                                type="text"
                                name="bioMaterialId"
                                id="bioMaterialId"
                                value={form.bioMaterialId}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={() => setForm({ studyName: '', description: '', departmentName: '', sampleId: '', sampleName: '', lab: '', bioMaterialId: '' })} className="text-sm font-semibold text-gray-900">
                        Cancel
                    </button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}