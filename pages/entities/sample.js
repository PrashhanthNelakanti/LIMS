import { useState } from 'react'

export default function Sample() {
    const [formData, setFormData] = useState({
        sampleId: '',
        sampleName: '',
        sourceType: '',
        collectionDate: '',
        prepProtocol: '',
        storageConditions: '',
        attachments: [],
    })

    const [status, setStatus] = useState(null)

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'attachments') {
            setFormData({ ...formData, attachments: Array.from(files).map(file => file.name) }) // Or handle actual upload
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            sample_id: formData.sampleId,
            sample_name: formData.sampleName,
            source_type: formData.sourceType,
            collection_date: formData.collectionDate || null,
            prep_protocol: formData.prepProtocol,
            storage_conditions: formData.storageConditions,
            attachments: formData.attachments,
        }

        try {
            const res = await fetch('/api/v2/samples', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })

            const data = await res.json()
            if (data.success) {
                setStatus('Sample saved successfully.')
                setFormData({
                    sampleId: '',
                    sampleName: '',
                    sourceType: '',
                    collectionDate: '',
                    prepProtocol: '',
                    storageConditions: '',
                    attachments: [],
                })
            } else {
                setStatus(`Error: ${data.message}`)
            }
        } catch (err) {
            setStatus(`Request failed: ${err.message}`)
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Sample Header */}
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Sample</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        The fields marked with (*) are mandatory.
                    </p>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="sampleId" className="block text-sm font-medium text-gray-900">
                                Sample ID *
                            </label>
                            <input
                                type="text"
                                name="sampleId"
                                id="sampleId"
                                required
                                value={formData.sampleId}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                                placeholder="e.g. SAMP-00123"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="sampleName" className="block text-sm font-medium text-gray-900">
                                Sample Name *
                            </label>
                            <input
                                type="text"
                                name="sampleName"
                                id="sampleName"
                                required
                                value={formData.sampleName}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                                placeholder="e.g. Liver Tissue"
                            />
                        </div>
                    </div>
                </div>

                {/* Sample Details */}
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Sample Details</h2>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="sourceType" className="block text-sm font-medium text-gray-900">
                                Source Type
                            </label>
                            <select
                                id="sourceType"
                                name="sourceType"
                                value={formData.sourceType}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            >
                                <option value="">--Select--</option>
                                <option>Blood</option>
                                <option>Tissue</option>
                                <option>Cell Line</option>
                                <option>Environmental</option>
                            </select>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="collectionDate" className="block text-sm font-medium text-gray-900">
                                Collection Date
                            </label>
                            <input
                                type="date"
                                name="collectionDate"
                                id="collectionDate"
                                value={formData.collectionDate}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="prepProtocol" className="block text-sm font-medium text-gray-900">
                                Preparation Protocol
                            </label>
                            <textarea
                                id="prepProtocol"
                                name="prepProtocol"
                                rows={3}
                                value={formData.prepProtocol}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                                placeholder="Describe how the sample was prepared..."
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="storageConditions" className="block text-sm font-medium text-gray-900">
                                Storage Conditions
                            </label>
                            <input
                                type="text"
                                name="storageConditions"
                                id="storageConditions"
                                value={formData.storageConditions}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                                placeholder="e.g. -80°C freezer"
                            />
                        </div>
                    </div>
                </div>

                {/* Auxiliary Data */}
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Auxiliary Data</h2>
                    <p className="mt-1 text-sm text-gray-600">Attach any relevant files or links.</p>
                    <div className="mt-6">
                        <label htmlFor="attachments" className="block text-sm font-medium text-gray-900">
                            Attachments
                        </label>
                        <input
                            type="file"
                            name="attachments"
                            id="attachments"
                            multiple
                            onChange={handleChange}
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-4">
                    <button type="button" className="text-sm font-semibold text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        Save Sample
                    </button>
                </div>

                {status && (
                    <p className="mt-4 text-sm text-indigo-700">
                        {status}
                    </p>
                )}
            </form>
        </div>
    )
}
