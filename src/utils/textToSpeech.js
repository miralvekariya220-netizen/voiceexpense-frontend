// class TextToSpeech {
//   constructor() {
//     if ('speechSynthesis' in window) {
//       this.synth = window.speechSynthesis;
//     }
//   }

//   speak(text, lang = 'hi-IN') {
//     if (!this.synth) return;
//     this.synth.cancel(); // Stop previous
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = lang;
//     utterance.rate = 1;
//     this.synth.speak(utterance);
//   }
// }

// export default new TextToSpeech();


class TextToSpeech {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    
    // Voices load hone ka wait karein
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
      };
    }
  }

  getBestVoice(lang) {
    // 1. Language ke hisab se voices filter karein
    const langVoices = this.voices.filter(v => v.lang.includes(lang.split('-')[0])); // 'hi' match karega

    if (langVoices.length === 0) return null;

    // 2. Priority: 'Google' wali voice (Quality achi hoti hai)
    const googleVoice = langVoices.find(v => v.name.includes('Google'));
    if (googleVoice) return googleVoice;

    // 3. Priority: 'Female' wali voice
    const femaleVoice = langVoices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Sangeeta'));
    if (femaleVoice) return femaleVoice;

    // 4. Koi bhi voice de do
    return langVoices[0];
  }

  speak(text, lang = 'hi-IN') {
    if (!this.synth) return;
    
    // Voices agar load nahi hui, to abhi load kar lo
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }

    this.synth.cancel(); // Stop previous audio

    const utterance = new SpeechSynthesisUtterance(text);
    
    // ✅ Best Voice dhoondo
    const voice = this.getBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
      // Agar Hindi hai, to speed thodi slow rakho (ziyada clear sunai deta hai)
      utterance.rate = lang.includes('hi') ? 0.9 : 1; 
      utterance.pitch = 1; // 1 = Normal, >1 = High (Girl like)
    }

    utterance.lang = lang;
    this.synth.speak(utterance);
  }
}
const textToSpeech = new TextToSpeech();
export default textToSpeech();