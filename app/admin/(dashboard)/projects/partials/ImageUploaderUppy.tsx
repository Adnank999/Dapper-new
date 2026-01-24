"use client"

import React, { useEffect, useRef } from "react"
import Uppy from "@uppy/core"
import Dashboard from "@uppy/dashboard"
import XHRUpload from "@uppy/xhr-upload"

interface ImageUploadProps {
  onUploaded: (data: { original: string }[]) => void
  folderName?: string
  maxNumberOfFiles?: number
}

type UploadPair = { original?: string }

export default function ImageUploaderUppy({
  onUploaded,
  folderName = "projects",
  maxNumberOfFiles = 10,
}: ImageUploadProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const uppyRef = useRef<Uppy | null>(null)
  const onUploadedRef = useRef(onUploaded)

  // keep latest callback without re-creating uppy
  useEffect(() => {
    onUploadedRef.current = onUploaded
  }, [onUploaded])

  // track uploads per file
  const uploadMap = useRef<Record<string, UploadPair>>({})

  useEffect(() => {
    if (!containerRef.current) return

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET

    if (!cloudName || !uploadPreset) {
      console.error("Missing Cloudinary env vars")
      return
    }

    // destroy old instance if folder/max changes (rare)
    if (uppyRef.current) {
      const anyUppy = uppyRef.current as any
      if (typeof anyUppy.destroy === "function") anyUppy.destroy()
      else if (typeof anyUppy.close === "function") anyUppy.close()
      uppyRef.current = null
    }

    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles,
        allowedFileTypes: ["image/*"],
      },
      autoProceed: true,
    })

    uppyRef.current = uppy

    uppy.use(Dashboard, {
      target: containerRef.current,
      inline: true,
      proudlyDisplayPoweredByUppy: false,
      theme: "dark",
      height: 420,
      showProgressDetails: true,
    })

    uppy.setMeta({
      upload_preset: uploadPreset,
      folder: folderName,
    })

    uppy.use(XHRUpload, {
      endpoint: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData: true,
      fieldName: "file",
      method: "POST",
      allowedMetaFields: ["upload_preset", "folder"],
      bundle: false,
    })

    uppy.on("file-added", (file) => {
      uploadMap.current[file.id] = {}
    })

    uppy.on("file-removed", (file) => {
      delete uploadMap.current[file.id]
    })

    uppy.on("cancel-all", () => {
      uploadMap.current = {}
    })

    function emitIfAllUploaded() {
      const files = uppy.getFiles()
      if (!files.length) return

      const allDone = files.every((f) => uploadMap.current[f.id]?.original)
      if (!allDone) return

      const result = files.map((f) => ({
        original: uploadMap.current[f.id].original!,
      }))

      onUploadedRef.current(result)
    }

    uppy.on("upload-success", (file, response) => {
      const originalUrl = response?.body?.secure_url
      if (!file?.id || !originalUrl) return

      uploadMap.current[file.id] = uploadMap.current[file.id] || {}
      uploadMap.current[file.id].original = originalUrl

      emitIfAllUploaded()
    })

    return () => {
      const anyUppy = uppy as any
      if (typeof anyUppy.destroy === "function") anyUppy.destroy()
      else if (typeof anyUppy.close === "function") anyUppy.close()
      uppyRef.current = null
    }
  }, [folderName, maxNumberOfFiles]) // ✅ removed onUploaded from deps

  return <div ref={containerRef} />
}
