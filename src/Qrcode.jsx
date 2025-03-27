import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { saveAs } from "file-saver";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [fileType, setFileType] = useState("png");
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    if (fileType === "svg") {
      const svg = qrRef.current.innerHTML;
      const blob = new Blob([svg], { type: "image/svg+xml" });
      saveAs(blob, `qrcode.svg`);
    } else if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const url = canvas.toDataURL(`image/${fileType}`);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode.${fileType}`;
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <div className="flex gap-1.5 items-center py-3">
        <input
          type="text"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded-md px-4 w-64 py-2"
        />
        {text && (
          <button
            onClick={downloadQRCode}
            className=" px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Download QR Code
          </button>
        )}
      </div>
      <select
        value={fileType}
        onChange={(e) => setFileType(e.target.value)}
        className="border rounded-md p-2 mb-4"
      >
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
        <option value="webp">WEBP</option>
        <option value="svg">SVG</option>
      </select>
      <div ref={qrRef}>
        {text && (
          <>
            <div className="p-4 border rounded-md shadow-md bg-white">
              <QRCodeCanvas
                value={text}
                size={500}
                renderAs={fileType === "svg" ? "svg" : "canvas"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
