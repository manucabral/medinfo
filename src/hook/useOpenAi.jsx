export const useOpenAi = () => {
    const handleGenerate = async () => {
        const res = await openai.createCompletion({
            prompt: 'Decime hola',
            model: 'text-davinci-003',
        })
        console.log(res.data.choices[0].text)
    }

    return {
        handleGenerate,
    }
}
