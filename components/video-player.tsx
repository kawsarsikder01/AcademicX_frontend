'use client';

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    PictureInPicture2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Props = {
    src: string;
    lessonId: string;
    title: string;
    onComplete: (lessonId: string) => void;
    playingVideo: string | null;
    setPlayingVideo: (id: string | null) => void;
};

export const AdvancedLessonVideo = ({
    src,
    lessonId,
    title,
    onComplete,
    playingVideo,
    setPlayingVideo,
}: Props) => {

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [buffered, setBuffered] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const isPlaying = playingVideo === lessonId;
    let controlsTimeout: any = null;

    // Auto-hide controls
    const triggerControls = () => {
        setShowControls(true);
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => setShowControls(false), 2000);
    };

    useEffect(() => {
        triggerControls();
        return () => clearTimeout(controlsTimeout);
    }, []);

    const togglePlay = () => {
        const el = videoRef.current;
        if (!el) return;

        if (isPlaying) {
            el.pause();
            setPlayingVideo(null);
        } else {
            el.play();
            setPlayingVideo(lessonId);
        }
    };

    const toggleFullscreen = () => {
        const el = containerRef.current;
        if (!el) return;

        if (!document.fullscreenElement) {
            el.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const toggleMute = () => {
        const el = videoRef.current;
        if (!el) return;

        el.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleTimeUpdate = () => {
        const el = videoRef.current;
        if (!el) return;
        setCurrentTime(el.currentTime);
        setDuration(el.duration);

        // Buffered progress
        if (el.buffered.length > 0) {
            setBuffered(el.buffered.end(0));
        }
    };

    const handleSeek = (value: number[]) => {
        const el = videoRef.current;
        if (!el) return;
        el.currentTime = value[0];
        setCurrentTime(value[0]);
    };

    const handleVolumeChange = (value: number[]) => {
        const el = videoRef.current;
        if (!el) return;
        el.volume = value[0];
        setVolume(value[0]);
        setIsMuted(value[0] === 0);
    };

    const handleRateChange = (rate: number) => {
        const el = videoRef.current;
        if (!el) return;
        el.playbackRate = rate;
        setPlaybackRate(rate);
    };

    const formatTime = (time: number) => {
        if (!Number.isFinite(time)) return "0:00";
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleEnded = () => {
        setPlayingVideo(null);
        onComplete(lessonId);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const el = videoRef.current;
        if (!el) return;

        const handleKeys = (e: KeyboardEvent) => {
            switch (e.key) {
                case " ":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "ArrowLeft":
                    el.currentTime -= 5;
                    break;
                case "ArrowRight":
                    el.currentTime += 5;
                    break;
                case "ArrowUp":
                    el.volume = Math.min(1, el.volume + 0.1);
                    setVolume(el.volume);
                    break;
                case "ArrowDown":
                    el.volume = Math.max(0, el.volume - 0.1);
                    setVolume(el.volume);
                    break;
                case "f":
                case "F":
                    toggleFullscreen();
                    break;
                case "m":
                case "M":
                    toggleMute();
                    break;
                case ">":
                    handleRateChange(Math.min(2, playbackRate + 0.25));
                    break;
                case "<":
                    handleRateChange(Math.max(0.5, playbackRate - 0.25));
                    break;
            }
        };

        window.addEventListener("keydown", handleKeys);
        return () => window.removeEventListener("keydown", handleKeys);
    });

    // Double-click fullscreen / seeking
    const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bounds.left;

        if (e.detail === 2) {
            // Double-click
            toggleFullscreen();
            return;
        }

        // Single click play/pause
        togglePlay();
    };

    return (
        <div
            ref={containerRef}
            className="relative bg-black rounded-lg overflow-hidden group"
            onMouseMove={triggerControls}
        >
            <video
                ref={videoRef}
                className="w-full aspect-video"
                onClick={handleVideoClick}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate}
                onEnded={handleEnded}
                src={src}
            />

            {/* Controls */}
            <div
                className={`absolute inset-x-0 bottom-0 p-4 bg-black/40 backdrop-blur-sm transition-opacity ${
                    showControls ? "opacity-100" : "opacity-0"
                }`}
            >
                {/* Time + progress bar */}
                <div className="text-xs text-white/80 mb-1">{title}</div>

                <div className="relative w-full">
                    {/* Buffered bar */}
                    <div
                        className="absolute h-1 bg-white/30 rounded"
                        style={{ width: `${(buffered / duration) * 100}%` }}
                    />
                    {/* Progress slider */}
                    <Slider
                        value={[currentTime]}
                        max={duration || 0}
                        step={0.1}
                        onValueChange={handleSeek}
                        className="relative z-10"
                    />
                </div>

                <div className="flex justify-between items-center mt-3 text-white">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={togglePlay}
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </Button>

                        <span className="text-xs">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>

                        {/* Volume */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMute}
                            className="text-white hover:bg-white/20"
                        >
                            {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                        </Button>

                        <Slider
                            value={[volume]}
                            max={1}
                            step={0.05}
                            onValueChange={handleVolumeChange}
                            className="w-24"
                        />

                        {/* Playback Rate */}
                        <select
                            className="bg-black/50 text-xs px-2 py-1 rounded border border-white/20"
                            value={playbackRate}
                            onChange={(e) => handleRateChange(Number(e.target.value))}
                        >
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                                <option key={rate} value={rate}>
                                    {rate}x
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fullscreen + PiP */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => videoRef.current?.requestPictureInPicture()}
                            className="text-white hover:bg-white/20"
                        >
                            <PictureInPicture2 />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleFullscreen}
                            className="text-white hover:bg-white/20"
                        >
                            {isFullscreen ? <Minimize /> : <Maximize />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
