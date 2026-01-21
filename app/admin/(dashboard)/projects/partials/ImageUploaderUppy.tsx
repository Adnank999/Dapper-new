"use client";

import React, { useEffect, useRef } from "react";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import XHRUpload from "@uppy/xhr-upload";
import ThumbnailGenerator from "@uppy/thumbnail-generator";

interface ImageUploadProps {
  onUploaded: (data: { original: string; thumbnail: string }[]) => void;
  folderName?: string;
  maxNumberOfFiles?: number;
}

type UploadPair = { original?: string; thumbnail?: string };

export default function ImageUploaderUppy({
  onUploaded,
  folderName = "projects",
  maxNumberOfFiles = 10,
}: ImageUploadProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // track uploads for original + thumbnail per file
  const uploadMap = useRef<Record<string, UploadPair>>({});
  const uploadedThumbs = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_PRESET;

    if (!cloudName || !uploadPreset) {
      console.error("Missing Cloudinary env vars");
      return;
    }

    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles,
        allowedFileTypes: ["image/*"],
      },
      autoProceed: true,
    });

    // Mount DEFAULT dashboard UI into our div
    uppy.use(Dashboard, {
      target: containerRef.current,
      inline: true,
      proudlyDisplayPoweredByUppy: false,
      theme: "dark",
      height: 420,
      showProgressDetails: true,
    });

    uppy.setMeta({
      upload_preset: uploadPreset,
      folder: folderName,
    });

    uppy.use(ThumbnailGenerator, { thumbnailWidth: 500 });

    uppy.use(XHRUpload, {
      endpoint: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData: true,
      fieldName: "file",
      method: "POST",
      allowedMetaFields: ["upload_preset", "folder"],
      bundle: false,
    });

    uppy.on("file-added", (file) => {
      uploadMap.current[file.id] = {};
    });

    uppy.on("file-removed", (file) => {
      delete uploadMap.current[file.id];
      uploadedThumbs.current.delete(file.id);
    });

    uppy.on("cancel-all", () => {
      uploadMap.current = {};
      uploadedThumbs.current = new Set();
    });

    function maybeEmitAllUploaded() {
      const fileIds = uppy.getFiles().map((f) => f.id);
      if (!fileIds.length) return;

      const allDone = fileIds.every((id) => {
        const pair = uploadMap.current[id];
        return pair?.original && pair?.thumbnail;
      });

      if (!allDone) return;

      const result = fileIds.map((id) => ({
        original: uploadMap.current[id].original!,
        thumbnail: uploadMap.current[id].thumbnail!,
      }));

      onUploaded(result);
    }

    uppy.on("upload-success", (file, response) => {
      const originalUrl = response?.body?.secure_url;
      if (!file?.id || !originalUrl) return;

      uploadMap.current[file.id] = uploadMap.current[file.id] || {};
      uploadMap.current[file.id].original = originalUrl;
      maybeEmitAllUploaded();
    });

    uppy.on("thumbnail:generated", async (file, preview) => {
      if (!file?.id) return;
      if (uploadedThumbs.current.has(file.id)) return;

      uploadedThumbs.current.add(file.id);

      try {
        const blob = await fetch(preview).then((res) => res.blob());

        const formData = new FormData();
        formData.append("file", blob, `thumb-${file.id}-${file.name}`);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", `${folderName}/thumbnails`);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();

        if (data?.secure_url) {
          uploadMap.current[file.id] = uploadMap.current[file.id] || {};
          uploadMap.current[file.id].thumbnail = data.secure_url;
          maybeEmitAllUploaded();
        }
      } catch (err) {
        console.error("Thumbnail upload failed:", err);
      }
    });

    return () => {
      // Newer versions: destroy(), older: close()
      const anyUppy = uppy as any;
      if (typeof anyUppy.destroy === "function") anyUppy.destroy();
      else if (typeof anyUppy.close === "function") anyUppy.close();
    };
  }, [folderName, maxNumberOfFiles, onUploaded]);

  return <div ref={containerRef} />;
}
