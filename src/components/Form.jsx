import openai from '../libs/openai'
import { useState } from 'react'

export default function Form() {
    const [data, setData] = useState('')
    const [prompt, setPrompt] = useState('')
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        try {
            setLoading(true)
            const res = await openai.createCompletion({
                prompt: `Que es ${prompt}, solo responde con una oración.`,
                model: 'text-davinci-003',
                max_tokens: 64,
            })
            const text = res.data.choices[0].text
            setData(text)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setData('Hubo un error al generar el texto.')
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-2xl font-bold text-white">
                Put your medicine name here
            </h2>
            <input
                onChange={(e) => setPrompt(e.target.value)}
                className="w-1/2 px-4 py-2 mt-4 text-black bg-white rounded-md"
                type="text"
                placeholder="Medicine name"
            />
            <button
                className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
                type="button"
                onClick={handleGenerate}
            >
                Submit
            </button>
            {loading ? (
                <p className="mt-4 text-white">Cargando...</p>
            ) : (
                <p className="w-1/2 px-4 py-2 mt-4 text-white bg-gray-800 rounded-md">
                    {data}
                </p>
            )}
        </div>
    )
}
