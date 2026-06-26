'use client'
import { uploadToSupabase } from "@/lib/supabase"
import { useMutation } from "@tanstack/react-query"
import { Inbox, Loader2 } from "lucide-react"
import { useDropzone } from "react-dropzone"
import axios from 'axios'
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const FileUpload = (props: any) => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const uploadQuery = searchParams.get('upload') === 'true'
    const [hasOpenedPicker, setHasOpenedPicker] = useState(false)
    const [uploading, setUploading] = useState(false)

    const mutation = useMutation({
        mutationFn: async ({file_key, file_name}: {file_key:string, file_name:string})=>{
            const response = await axios.post('/api/create-chat', {
                file_key,
                file_name
            })
            return response.data
        }
    })

    const {getRootProps, getInputProps, open} = useDropzone({
        accept:{'application/pdf': [".pdf"]},
        maxFiles: 1,
        onDrop: async (acceptedFiles)=>{
            console.log(acceptedFiles)
            const file = acceptedFiles[0]
            if(file.size > 10*1024*1024){
                toast.error("File too large")
                return
            }

            try {
                setUploading(true)
                const data = await uploadToSupabase(file)
                if(!data.file_key || !data.file_name){
                    toast.error("Something went wrong!!")
                    return
                }
                mutation.mutate(data, {
                    onSuccess: ({ chat_id })=>{
                        console.log(data)
                        toast.success("Chat has been created")
                        router.push(`/chat/${chat_id}`)
                    },
                    onError: (err)=>{
                        toast.error("Error creating chat")
                        console.error(err)
                    }
                })
                console.log("data ",data)
            } catch (error) {
                console.log(error)
            } finally {
                setUploading(false)
            }

        }
    })

    useEffect(() => {
        if (uploadQuery && !hasOpenedPicker) {
            setHasOpenedPicker(true)
            open()
        }
    }, [uploadQuery, hasOpenedPicker, open])

    return (
        <div className="w-full max-w-xl">
            <div
                {...getRootProps({
                    className:
                        "border-2 border-dashed border-gray-400 hover:border-black rounded-2xl bg-white px-10 py-10 cursor-pointer transition-all duration-200 flex items-center justify-center",
                })}
            >
                {/* Hidden native file input to keep the same upload flow and allow programmatic opening */}
                <input {...getInputProps()} className="hidden" />

                {uploading || mutation.isPending ? (
                    <div className="flex flex-col items-center">
                        <Loader2 className="h-10 w-10 animate-spin" />
                        <p className="mt-2 text-sm text-gray-500">
                            Spilling Tea to GPT...
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Inbox className="w-10 h-10" />
                        <p className="mt-2 text-sm text-gray-500">
                            Drop PDF here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

}

export default FileUpload