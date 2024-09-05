import { base64Audio } from "./fileToUrl";

interface recordArgumentType {
    mediaStream: React.MutableRefObject<MediaStream | null>;
    mediaRecorder: React.MutableRefObject<MediaRecorder | null>;
    chunks: React.MutableRefObject<Blob[]>;
    setImage: (image: string) => void;
    setIsRecording:(isRecording:boolean)=>void
}

interface stopArgumentType {
    mediaStream: React.MutableRefObject<MediaStream | null>;
    mediaRecorder: React.MutableRefObject<MediaRecorder | null>;
    setIsRecording:(isRecording:boolean)=>void


}

export const recordAudio = async ({ mediaStream, mediaRecorder, chunks, setImage,setIsRecording }: recordArgumentType) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true)
        mediaStream.current = stream
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
            if (e.data.size > 0) {
                chunks.current.push(e.data);
            }
        };

        mediaRecorder.current.onstop = () => {
            const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' });
            base64Audio(recordedBlob, setImage)

            chunks.current = [];
        };
        mediaRecorder.current.start();
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
}

export const stopAudioRecord = async ({ mediaRecorder, mediaStream,setIsRecording }: stopArgumentType) => {
    try {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop();
        }
        if (mediaStream.current) {
            mediaStream.current.getTracks().forEach((track) => track.stop());
        }
        setIsRecording(false)
    } catch (error) {
        console.error(error);

    }
}