import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import coverArt from './assets/Broken_cover.png';
import track1 from './assets/BreadcrumbsintheStatic.mp3';
import track2 from './assets/Glass House Amnesia.mp3';
import track3 from './assets/Cell Block Ghost.mp3';
import track4 from './assets/The Strings I Never Chose.mp3';
import track5 from './assets/I WASNT IMAGINING IT.mp3';
import track6 from './assets/The Lie I Called Home.mp3';
import track7 from './assets/Lucid Lies.mp3';
import track8 from './assets/Dont Let Me Close My Eyes_.mp3';
import track9 from './assets/Echo Chamber Heart.mp3';
import track10 from './assets/Heirloom of Fire.mp3';

const ALBUM_DATA = {
  title: "BROKEN",
  artist: "DEV",
  description: "BROKEN is the unfiltered soundtrack of a childhood shadowed by pain and stitched together with survival. Through ten raw, visceral tracks, DEV opens the locked doors of his past, inviting listeners to walk barefoot through the wreckage — not for sympathy, but for truth. From the crackle of “Breadcrumbs in the Static” to the aching echoes of “The Lie I Called Home,” this album isn’t polished — it’s bleeding. Each song tells a chapter of emotional fragmentation: the rage, the silence, the isolation, the fear, and the desperate hope that maybe — just maybe — something whole can rise from what was shattered. This is not a concept album. It’s a confession in code and chorus, a mental health journal written in distortion and delay. It doesn’t ask for understanding. It dares you to feel what was never allowed to be spoken. BROKEN is the sound of survival — not tidy, not resolved, but honest. And sometimes, that’s more powerful than healing.",
  coverArt: coverArt,
  tracks: [
    { id: 1, title: "Breadcrumbs in the Static", duration: "3:16", file: track1 },
    { id: 2, title: "Glass House Amnesia", duration: "3:08", file: track2 },
    { id: 3, title: "Cell Block Ghost", duration: "4:00", file: track3 },
    { id: 4, title: "The Strings I Never Chose", duration: "3:19", file: track4 },
    { id: 5, title: "I WASN’T IMAGINING IT", duration: "2:30", file: track5 },
    { id: 6, title: "The Lie I Called Home", duration: "3:29", file: track6 },
    { id: 7, title: "Lucid Lies", duration: "3:19", file: track7 },
    { id: 8, title: "Don’t Let Me Close My Eyes", duration: "2:50", file: track8 },
    { id: 9, title: "Echo Chamber Heart", duration: "3:54", file: track9 },
    { id: 10, title: "Heirloom of Fire", duration: "3:07", file: track10 },
  ]
};

function App() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [imageError, setImageError] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrack < ALBUM_DATA.tracks.length - 1) {
        setCurrentTrack(currentTrack + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  };

  const nextTrack = () => {
    if (currentTrack < ALBUM_DATA.tracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
    }
  };

  const prevTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-brown to-dark text-white">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brownLight via-accent to-brown text-center glitch-text">
            {ALBUM_DATA.title}
          </h1>
          <p className="text-xl text-accent">by {ALBUM_DATA.artist}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img src={ALBUM_DATA.coverArt} alt="Album Art" className="rounded-xl border border-brownLight" />
            <audio ref={audioRef} src={ALBUM_DATA.tracks[currentTrack]?.file} className="hidden" />

            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-accent">{ALBUM_DATA.tracks[currentTrack]?.title}</h2>
              <div className="flex items-center space-x-4 mt-2">
                <button onClick={prevTrack} disabled={currentTrack === 0} className="bg-brown px-4 py-2 rounded">Prev</button>
                <button onClick={togglePlay} className="bg-accent px-6 py-2 rounded">{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={nextTrack} disabled={currentTrack === ALBUM_DATA.tracks.length - 1} className="bg-brown px-4 py-2 rounded">Next</button>
              </div>
              <div className="mt-2 text-sm text-brownLight">{formatTime(currentTime)} / {formatTime(duration)}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-accent mb-2">About This Album</h3>
            <p className="text-brownLight mb-6">{ALBUM_DATA.description}</p>

            <h3 className="text-xl font-bold text-accent mb-2">Tracklist</h3>
            <ul className="space-y-2">
              {ALBUM_DATA.tracks.map((track, index) => (
                <li
                  key={track.id}
                  onClick={() => playTrack(index)}
                  className={`cursor-pointer p-2 rounded hover:bg-brown/50 ${index === currentTrack ? 'bg-brown text-accent' : 'bg-dark'}`}
                >
                  <div className="flex justify-between">
                    <span>{track.title}</span>
                    <span>{track.duration}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
