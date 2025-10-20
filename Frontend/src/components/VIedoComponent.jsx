import { useEffect, useRef, useState } from 'react';

export default function CameraComponent() {
  const videoRef = useRef(null);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const streamRef = useRef(null);
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Ошибка доступа к камере:', err);
      }
    }
    if (hasCameraAccess) {
      initCamera();
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [hasCameraAccess]);

  return (
    <div>
      <button
        className="bg-gray-400/20 rounded-2xl p-2 my-2  cursor-pointer"
        onClick={() => setHasCameraAccess(!hasCameraAccess)}
      >
        {hasCameraAccess ? 'Выключить камеру' : 'Включить камеру'}
      </button>
      {hasCameraAccess && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="mx-auto mb-2 rounded-2xl border-4 border-gray-300 w-80 h-60 object-cover"
          />
        </>
      )}
    </div>
  );
}
