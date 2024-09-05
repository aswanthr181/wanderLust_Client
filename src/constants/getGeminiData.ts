import axios from "axios";
import { geminiApi } from "./api"

export const getGeminiData = async ({ place }: { place: string }) => {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${geminiApi}`
    const payload = {
        prompt: {
            text: `get me result as json format attraction of ${place} including the text,description, for that place`
        }
    };
    const res = await axios.post(geminiUrl, payload)
    if (res.data) {
        const output = res.data.candidates[0].output
        const jsonRegex = /{[\s\S]*}/;
        const jsonString = output.match(jsonRegex)[0]
        // return jsonString
        let jsonData = JSON.parse(jsonString);
        return jsonData
    } else {
        return null
    }
}