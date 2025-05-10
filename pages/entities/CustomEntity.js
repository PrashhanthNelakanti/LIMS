import { useState } from 'react';

export default function CustomEntity() {
    const [entityName, setEntityName] = useState('');
    const [fields, setFields] = useState([{ name: '', type: 'TEXT' }]);
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const handleFieldChange = (index, key, value) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value;
        setFields(updatedFields);
    };

    const addField = () => {
        setFields([...fields, { name: '', type: 'TEXT' }]);
    };

    const removeField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');

        try {
            const res = await fetch('/api/v2/custom-entity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entityName, fields }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Entity created successfully.');
                setMessageType('success');
                setEntityName('');
                setFields([{ name: '', type: 'TEXT' }]);
            } else {
                setMessage(data.error || 'Failed to create entity.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Something went wrong while creating the entity.');
            setMessageType('error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Custom Entity</h1>
            {message && (
                <p className={`mb-4 text-center text-sm font-medium ${
                    messageType === 'success'
                        ? 'text-green-800 bg-green-100 border border-green-200 p-2 rounded'
                        : 'text-red-800 bg-red-100 border border-red-200 p-2 rounded'
                }`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Entity Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={entityName}
                        onChange={(e) => setEntityName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Fields</h2>
                    {fields.map((field, index) => (
                        <div key={index} className="flex items-center gap-3 mb-3">
                            <input
                                type="text"
                                placeholder="Field Name"
                                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                value={field.name}
                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                required
                            />
                            <select
                                value={field.type}
                                onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="TEXT">TEXT</option>
                                <option value="INTEGER">INTEGER</option>
                                <option value="BOOLEAN">BOOLEAN</option>
                                <option value="DATE">DATE</option>
                                <option value="FLOAT">FLOAT</option>
                                <option value="VARCHAR(255)">VARCHAR(255)</option>
                            </select>
                            <button
                                type="button"
                                onClick={() => removeField(index)}
                                className="text-red-600 text-sm hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addField}
                        className="mt-2 inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                        Add Field
                    </button>
                </div>

                <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                    Create Entity
                </button>
            </form>
        </div>
    );
}
