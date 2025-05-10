import { useState } from 'react'

export default function Patient() {
    const [form, setForm] = useState({
        patientId: '',
        patientName: '',
        age: '',
        gender: '',
        dob: '',
        diagnosis: '',
        treatment: '',
        notes: ''
    })

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
            const res = await fetch('/api/v2/patients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patient_id: form.patientId,
                    patient_name: form.patientName,
                    age: form.age,
                    gender: form.gender,
                    dob: form.dob,
                    diagnosis: form.diagnosis,
                    treatment: form.treatment,
                    notes: form.notes,
                    created_by: fname
                })
            })
            const data = await res.json()
            if (data.success) {
                setMessage('✔ Patient saved successfully')
                setMessageType('success')
                setForm({
                    patientId: '',
                    patientName: '',
                    age: '',
                    gender: '',
                    dob: '',
                    diagnosis: '',
                    treatment: '',
                    notes: ''
                })
            } else {
                setMessage(`✖ ${data.message || 'Error saving patient'}`)
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
                <p className={`mb-4 text-center text-sm font-medium ${
                    messageType === 'success'
                        ? 'text-green-800 bg-green-100 border border-green-200 p-2 rounded'
                        : 'text-red-800 bg-red-100 border border-red-200 p-2 rounded'
                }`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-gray-200 pb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Patient</h2>
                    <p className="mt-1 text-sm text-gray-600">The fields marked with (*) are mandatory.</p>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="patientId" className="block text-sm font-medium text-gray-900">
                                Patient ID *
                            </label>
                            <input
                                type="text"
                                name="patientId"
                                id="patientId"
                                required
                                value={form.patientId}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="patientName" className="block text-sm font-medium text-gray-900">
                                Patient Name *
                            </label>
                            <input
                                type="text"
                                name="patientName"
                                id="patientName"
                                required
                                value={form.patientName}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="age" className="block text-sm font-medium text-gray-900">Age</label>
                            <input
                                type="number"
                                name="age"
                                id="age"
                                value={form.age}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-900">Gender</label>
                            <select
                                name="gender"
                                id="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-900">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                id="dob"
                                value={form.dob}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-900">Diagnosis</label>
                            <input
                                type="text"
                                name="diagnosis"
                                id="diagnosis"
                                value={form.diagnosis}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="treatment" className="block text-sm font-medium text-gray-900">Treatment</label>
                            <input
                                type="text"
                                name="treatment"
                                id="treatment"
                                value={form.treatment}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-900">Notes</label>
                            <textarea
                                name="notes"
                                id="notes"
                                rows={3}
                                value={form.notes}
                                onChange={handleChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={() => setForm({
                        patientId: '',
                        patientName: '',
                        age: '',
                        gender: '',
                        dob: '',
                        diagnosis: '',
                        treatment: '',
                        notes: ''
                    })} className="text-sm font-semibold text-gray-900">
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
