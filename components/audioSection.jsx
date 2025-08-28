"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
import WaveSurfer from "wavesurfer.js";

const AudioSection = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    if (audio) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#e5e7eb", // gray-200
        progressColor: "#6366f1", // indigo-500
        cursorColor: "#6366f1",
        barWidth: 2,
        height: 50,
        responsive: true,
      });

      wavesurferRef.current.load(audio);

      wavesurferRef.current.on("finish", () => setIsPlaying(false));

      return () => {
        if (wavesurferRef.current && wavesurferRef.current.isReady) {
          wavesurferRef.current.destroy();
        }
      };
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [audio]);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    if (!audio) return;
    const link = document.createElement("a");
    link.href = audio;
    link.download = "audio.mp3";
    link.target = "_self";
    link.click();
  };

  if (!audio) return null;

  return (
    <div className="w-72 bg-white border border-gray-200 rounded-xl shadow p-3 flex items-center justify-between space-x-3 h-12">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="text-white bg-[#4b2e2e] hover:bg-[#4b2e2e] rounded-full p-2"
      >
        {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
      </button>

      {/* Waveform - Centered */}
      <div className="flex-1 flex justify-center">
        <div ref={waveformRef} className="w-full max-w-full" />
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="text-gray-500 hover:text-green-700"
        title="Download"
      >
        <FaDownload size={16} />
      </button>
    </div>
  );
};

export default AudioSection;
