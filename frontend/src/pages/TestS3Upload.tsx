import { supabase } from "../services/supabaseClient";
import { useState } from "react";

export default function TestS3Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>("idle");


    async function handleUpload() {
        if (!file) return;

        setStatus("requesting signed url");

        // STEP 1: call Edge Function (AUTHENTICATED)
        const { data, error } = await supabase.functions.invoke(
            "s3-upload-url",
            {
                body: {
                    fileName: file.name,
                    contentType: file.type,
                },
            }
        );

        if (error || !data?.uploadUrl || !data?.publicUrl) {
            console.error(error);
            setStatus("edge function error");
            return;
        }

        const { uploadUrl, publicUrl } = data;
        const objectKey = publicUrl.split(".amazonaws.com/")[1];

        setStatus("uploading to S3");

        const blob = new Blob([await file.arrayBuffer()], {
            type: file.type,
        });

        const uploadRes = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: blob,
        });

        if (!uploadRes.ok) {
            console.error(await uploadRes.text());
            setStatus("s3 upload error");
            return;
        }
        
        const { error: dbError } = await supabase.from("post_media").insert({
            post_id,
            bucket: "amzn-s3-frgtn-knwlg",
            object_key: objectKey,
            public_url: publicUrl,
            mime_type: file.type,
            size_bytes: file.size,
            position: 0,
        });

        if(dbError) {
            console.error(dbError);
            setStatus("db insert error");
            return;
        }

        setStatus("done");
        return publicUrl;
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>S3 Upload Test</h2>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

            <button onClick={() => handleUpload()} disabled={!file}>
                Upload
            </button>

            <p>Status: {status}</p>
        </div>
    );
}
