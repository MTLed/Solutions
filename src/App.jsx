import React, { useState, useRef } from "react";

const moduleTypes = {
  P3: { width: 20, height: 20 },
  P5: { width: 32, height: 16 },
  P10: { width: 32, height: 16 },
};

const FASSADE_REAL_WIDTH_CM = 650;  // 6,5m in cm
const FASSADE_REAL_HEIGHT_CM = 450;  // 4,5m in cm
const DISPLAY_START_HEIGHT_CM = 195; // 2,5m vom Boden
const MAX_WIDTH_CM = 650;  // 6,5m max Breite
const MAX_HEIGHT_CM = 250; // 2,5m max Höhe

export default function App() {
  const [selectedModule, setSelectedModule] = useState("P5");
  const [widthCm, setWidthCm] = useState(0);
  const [heightCm, setHeightCm] = useState(0);
  const [rounding, setRounding] = useState("ceil"); // "ceil" oder "floor"
  const [moduleInfo, setModuleInfo] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);

  const drawModules = () => {
    const module = moduleTypes[selectedModule];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;

    canvas.width = image.clientWidth;
    canvas.height = image.clientHeight;

    const scaleX = canvas.width / FASSADE_REAL_WIDTH_CM;
    const scaleY = canvas.height / FASSADE_REAL_HEIGHT_CM;

    const roundFn = rounding === "ceil" ? Math.ceil : Math.floor;

    const moduleCountX = roundFn(widthCm / module.width);
    const moduleCountY = roundFn(heightCm / module.height);

    const modulePxW = module.width * scaleX;
    const modulePxH = module.height * scaleY;

    const displayWidthPx = moduleCountX * modulePxW;
    const displayHeightPx = moduleCountY * modulePxH;

    const displayWidthCm = moduleCountX * module.width;
    const displayHeightCm = moduleCountY * module.height;

    const startX = (canvas.width - displayWidthPx) / 2;
    const startY = canvas.height - DISPLAY_START_HEIGHT_CM * scaleY - displayHeightPx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    setModuleInfo({
      countX: moduleCountX,
      countY: moduleCountY,
      width: displayWidthCm,
      height: displayHeightCm,
    });

    // Video element erstellen
    const video = videoRef.current;
    video.style.position = "absolute";
    video.style.left = `${startX}px`;
    video.style.top = `${startY}px`;
    video.style.width = `${displayWidthPx}px`;
    video.style.height = `${displayHeightPx}px`;
    video.style.zIndex = "1";  // Video hinter den Modulen
    video.style.objectFit = "cover"; // Um das Video zu skalieren und anzupassen
    video.play();  // Video abspielen
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: "900px", margin: "auto" }}>
      <h1>LED Display Konfigurator</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Modultyp:</label>
        <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
          {Object.entries(moduleTypes).map(([key, val]) => (
            <option key={key} value={key}>
              {key} ({val.width}×{val.height} cm)
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Display-Breite (cm): </label>
        <input
          type="number"
          value={widthCm}
          onChange={(e) => setWidthCm(Math.min(Number(e.target.value), MAX_WIDTH_CM))}
          max={MAX_WIDTH_CM}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Display-Höhe (cm): </label>
        <input
          type="number"
          value={heightCm}
          onChange={(e) => setHeightCm(Math.min(Number(e.target.value), MAX_HEIGHT_CM))}
          max={MAX_HEIGHT_CM}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Rundung: </label>
        <select value={rounding} onChange={(e) => setRounding(e.target.value)}>
          <option value="floor">Weniger Module (abrunden)</option>
          <option value="ceil">Mehr Module (aufrunden)</option>
        </select>
      </div>

      <button onClick={drawModules} style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}>
        Vorschau anzeigen
      </button>

      {moduleInfo && (
        <div style={{ marginBottom: "1rem", background: "#f1f1f1", padding: "1rem", borderRadius: "8px" }}>
          <strong>Modulanzahl:</strong> {moduleInfo.countX} × {moduleInfo.countY}  
          <br />
          <strong>Tatsächliche Displaygröße:</strong> {moduleInfo.width} cm × {moduleInfo.height} cm
        </div>
      )}

      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Fassade und Video */}
        <img
          ref={imageRef}
          src="/fassade.png"
          alt="Fassade"
          style={{ display: "block" }}
          onLoad={() => {
            const canvas = canvasRef.current;
            const img = imageRef.current;
            canvas.width = img.clientWidth;
            canvas.height = img.clientHeight;
            drawModules();
          }}
        />

        {/* Canvas für Module */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        />

        {/* Video auf die Module legen */}
        <div
          ref={videoRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: "1", // Video hinter den Modulen
            overflow: "hidden",
          }}
        >
          <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          ></video>
        </div>
      </div>
    </div>
  );
}
