import { useRef, useEffect } from 'react';

export function useEmergencyAlarm() {
  const audioCtxRef = useRef(null);
  const alarmOscRef = useRef(null);
  const alarmGainRef = useRef(null);
  const alarmIntervalRef = useRef(null);

  const startAlarmSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtxRef.current = new AudioContextClass();
      
      alarmOscRef.current = audioCtxRef.current.createOscillator();
      alarmGainRef.current = audioCtxRef.current.createGain();
      
      alarmOscRef.current.connect(alarmGainRef.current);
      alarmGainRef.current.connect(audioCtxRef.current.destination);
      
      alarmOscRef.current.type = "sine";
      alarmOscRef.current.frequency.setValueAtTime(500, audioCtxRef.current.currentTime);
      alarmGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      
      alarmOscRef.current.start();
      
      let state = true;
      alarmIntervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return;
        // sweep frequency between 500Hz and 850Hz to sound like a warning klaxon
        alarmOscRef.current.frequency.setValueAtTime(state ? 850 : 500, audioCtxRef.current.currentTime);
        alarmGainRef.current.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime);
        state = !state;
      }, 450);
    } catch (err) {
      console.error("Audio Context initiation failed:", err);
    }
  };

  const stopAlarmSound = () => {
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
    if (alarmOscRef.current) {
      try { alarmOscRef.current.stop(); } catch(e) {}
      alarmOscRef.current = null;
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch(e) {}
      audioCtxRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAlarmSound();
    };
  }, []);

  return { startAlarmSound, stopAlarmSound };
}
