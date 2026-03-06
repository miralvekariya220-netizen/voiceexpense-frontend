// import React, { useState } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material';
// import { Mic, MicOff, Send } from '@mui/icons-material';
// import { expenseAPI } from '../services/api';
// import tts from '../utils/textToSpeech';

// const VoiceInput = ({ onExpenseAdded }) => {
//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
//   const [loading, setLoading] = useState(false);

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const startListening = () => {
//     resetTranscript();
//     tts.speak("बोलिये", "hi-IN");
//     SpeechRecognition.startListening({ language: 'hi-IN', continuous: false });
//   };

//   const stopListening = () => SpeechRecognition.stopListening();

//   const handleSend = async () => {
//     if (!transcript) return;
//     setLoading(true);
//     try {
//       const response = await expenseAPI.addVoice({ text: transcript, language: 'hi' });
//       const msg = `₹${response.data.amount} ${response.data.category} में जोड़ दिया गया`;
//       tts.speak(msg, "hi-IN");
//       alert(msg);
//       resetTranscript();
//       if (onExpenseAdded) onExpenseAdded();
//     } catch (error) {
//       console.error(error);
//       tts.speak("माफ़ कीजिये, समझ नहीं आया", "hi-IN");
//       alert("Error adding expense");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card sx={{ mb: 3, textAlign: 'center', bgcolor: '#f8f9fa' }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>🎤 बोलकर खर्च जोड़ें</Typography>
        
//         <Box sx={{ minHeight: '60px', p: 2, bgcolor: 'white', borderRadius: 2, mb: 2, border: '1px dashed grey' }}>
//           <Typography color="textSecondary">
//             {transcript || "यहाँ आपकी आवाज़ दिखेगी... (उदा: 'आज 500 रुपये पेट्रोल में')"}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
//           <Button 
//             variant="contained" 
//             color={listening ? "error" : "primary"}
//             startIcon={listening ? <MicOff /> : <Mic />}
//             onClick={listening ? stopListening : startListening}
//           >
//             {listening ? "सुन रहा हूँ..." : "बोलना शुरू करें"}
//           </Button>

//           <Button 
//             variant="contained" 
//             color="success" 
//             startIcon={<Send />}
//             disabled={!transcript || loading}
//             onClick={handleSend}
//           >
//             {loading ? <CircularProgress size={24} /> : "Backend भेजें"}
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default VoiceInput;

// chnage ke pehleka code 
// import React, { useState } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { Card, CardContent, Typography, Button, Box, CircularProgress, MenuItem, TextField } from '@mui/material';
// import { Mic, MicOff, Send } from '@mui/icons-material';
// import { expenseAPI } from '../services/api';
// import tts from '../utils/textToSpeech';

// const VoiceInput = ({ onExpenseAdded }) => {
//   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
//   const [loading, setLoading] = useState(false);
  
//   // ✅ Language State (Default: Hindi)
//   const [language, setLanguage] = useState('hi-IN');

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   const startListening = () => {
//     resetTranscript();
//     // ✅ Selected Language use karein
//     SpeechRecognition.startListening({ language: language, continuous: true });
//   };

//   const stopListening = () => SpeechRecognition.stopListening();

//   const handleSend = async () => {
//     if (!transcript) return;
//     setLoading(true);
//     try {
//       // ✅ Backend ko sirf language code bhejein (hi, gu, en)
//       const langCode = language.split('-')[0]; // 'hi-IN' -> 'hi'
      
//       const response = await expenseAPI.addVoice({ text: transcript, language: langCode });
      
//       const msg = `Added ₹${response.data.amount} to ${response.data.category}`;
//       tts.speak(msg, language); // ✅ Same language me bolo
//       alert(msg);
//       resetTranscript();
//       if (onExpenseAdded) onExpenseAdded();
//     } catch (error) {
//       console.error(error);
//       alert("Error adding expense");
//     } finally {
//       setLoading(false);
//        resetTranscript();
//     }
//   };

//   return (
//     <Card sx={{ mb: 3, textAlign: 'center', bgcolor: '#f8f9fa' }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h5">🎤 Voice Input</Typography>
          
//           {/* ✅ Language Selector Dropdown */}
//           <TextField
//             select
//             label="Language"
//             size="small"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             sx={{ width: 150 }}
//           >
//             <MenuItem value="hi-IN">Hindi (हिंदी)</MenuItem>
//             <MenuItem value="gu-IN">Gujarati (ગુજરાતી)</MenuItem>
//             <MenuItem value="en-IN">English (India)</MenuItem>
//           </TextField>
//         </Box>
        
//         <Box sx={{ minHeight: '60px', p: 2, bgcolor: 'white', borderRadius: 2, mb: 2, border: '1px dashed grey' }}>
//           <Typography color="textSecondary">
//             {transcript || "Speak now..."}
//           </Typography>
//         </Box>

//         <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
//           <Button 
//             variant="contained" 
//             color={listening ? "error" : "primary"}
//             startIcon={listening ? <MicOff /> : <Mic />}
//             onClick={listening ? stopListening : startListening}
//           >
//             {listening ? "Listening..." : "Start Speaking"}
//           </Button>

//           <Button 
//             variant="contained" 
//             color="success" 
//             startIcon={<Send />}
//             disabled={!transcript || loading}
//             onClick={handleSend}
//           >
//             {loading ? <CircularProgress size={24} /> : "Submit"}
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default VoiceInput;



import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Card, CardContent, Typography, Button, Box, CircularProgress, MenuItem, TextField } from '@mui/material';
import { Mic, MicOff, Send } from '@mui/icons-material';
import { expenseAPI } from '../services/api';
import tts from '../utils/textToSpeech';

const VoiceInput = ({ onExpenseAdded }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('hi-IN');

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ language: language, continuous: true });
  };

  const stopListening = () => SpeechRecognition.stopListening();

  const handleSend = async () => {
    if (!transcript) return;
    setLoading(true);
    
    // 🛑 1. Stop Listening Immediately
    SpeechRecognition.stopListening();

    try {
      const langCode = language.split('-')[0];
      const response = await expenseAPI.addVoice({ text: transcript, language: langCode });
      
      const msg = `Added ₹${response.data.amount} to ${response.data.category}`;
      tts.speak(msg, language);
      alert(msg);
      
      // ✅ 2. Reset Transcript HERE
      resetTranscript();
      
      if (onExpenseAdded) onExpenseAdded();
    } catch (error) {
      console.error(error);
      alert("Error adding expense");
    } finally {
      setLoading(false);
      // ✅ 3. Double Check Reset
      resetTranscript();
    }
  };

  return (
    <Card sx={{ mb: 3, textAlign: 'center', bgcolor: '#f8f9fa' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">🎤 Voice Input</Typography>
          <TextField select label="Language" size="small" value={language} onChange={(e) => setLanguage(e.target.value)} sx={{ width: 150 }}>
            <MenuItem value="hi-IN">Hindi (हिंदी)</MenuItem>
            <MenuItem value="gu-IN">Gujarati (ગુજરાતી)</MenuItem>
            <MenuItem value="en-IN">English (India)</MenuItem>
          </TextField>
        </Box>
        
        <Box sx={{ minHeight: '60px', p: 2, bgcolor: 'white', borderRadius: 2, mb: 2, border: '1px dashed grey' }}>
          <Typography color="textSecondary">
            {transcript || "Speak now..."}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" color={listening ? "error" : "primary"} startIcon={listening ? <MicOff /> : <Mic />} onClick={listening ? stopListening : startListening}>
            {listening ? "Listening..." : "Start Speaking"}
          </Button>

          <Button variant="contained" color="success" startIcon={<Send />} disabled={!transcript || loading} onClick={handleSend}>
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VoiceInput;