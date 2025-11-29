'use client'

import { useState, useCallback } from "react"
import { X, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"

interface ImageUploaderProps {
    onChange?: (file: File | null) => void
    defaultPreview?: string
    className?: string
}

export default function ImageUploader({ 
    onChange,
    defaultPreview,
    className,
}: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(defaultPreview || null)
    const [isDragging, setIsDragging] = useState(false)

    const handleFileChange = useCallback((file?: File) => {
        if (file) {
            setPreview(URL.createObjectURL(file))
            onChange?.(file)
        }
    }, [onChange])

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith("image/")) {
            handleFileChange(file)
        }
    }, [handleFileChange])

    const removeImage = () => {
        setPreview(null)
        onChange?.(null)
    }

    return (
        <div className={clsx("flex flex-col gap-2", className)}>
             
            {!preview ? (
                <div
                    onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={clsx(
                        "flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all",
                        isDragging
                            ? "border-primary bg-primary/10"
                            : "border-muted-foreground/30 hover:border-primary"
                    )}
                    onClick={() => document.getElementById("image-input")?.click()}
                >
                    <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                        Drag & drop or <span className="text-primary font-medium">browse</span>
                    </p>
                    <input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileChange(file)
                        }}
                    />
                </div>
            ) : (
                <div className="relative group w-56 h-36 rounded-2xl overflow-hidden shadow-md border">
                    <img
                        src={preview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={removeImage}
                            className="rounded-full"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
