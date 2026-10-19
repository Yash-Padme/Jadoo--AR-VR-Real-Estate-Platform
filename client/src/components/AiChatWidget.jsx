
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function AiChatWidget() {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  // UPDATED: Default Welcome Message
  const [chatHistory, setChatHistory] = useState([
    { sender: 'AI', text: 'Hi! I am Jadoo AI. Ask me to find a property for you, or shortlist a few and ask me to compare them!' }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/ai/history` ||`http://localhost:8000/api/v1/ai/history`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const res = await response.json();
        
        if (response.ok && res.data && res.data.length > 0) {
          const formattedHistory = res.data.map(msg => ({
            sender: msg.role === 'user' ? 'User' : 'AI',
            text: msg.text
          }));
          setChatHistory(formattedHistory);
        }
      } catch (error) {
        console.error("Failed to fetch chat history", error);
      }
    };

    if (token) {
      fetchHistory();
    }
  }, [token]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setChatHistory(prev => [...prev, { sender: 'User', text: userMsg }]);
    setQuery('');
    setLoading(true);

    try {
      // 1. Fetch shortlist (lekin ab agar khali hogi toh app rukegi nahi)
      const shortlistRes = await fetch(`https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/shortlist` ||`http://localhost:8000/api/v1/shortlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const shortlistData = await shortlistRes.json();
      const propertyIds = shortlistData.data?.properties?.map(p => p._id) || [];

      // REMOVED THE RESTRICTION BLOCK HERE

      // 2. Query Gemini
      const response = await fetch( `https://jadoo-ar-vr-real-estate-platform.onrender.com/api/v1/ai/chat` || `http://localhost:8000/api/v1/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ query: userMsg, propertyIds })
      });

      const data = await response.json();
      if (response.ok) {
        setChatHistory(prev => [...prev, { sender: 'AI', text: data.data.answer }]);
      } else {
        setChatHistory(prev => [...prev, { sender: 'AI', text: data.message || 'Error processing request.' }]);
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { sender: 'AI', text: 'Network error. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-playfair">
      {isOpen && (
        <div className="w-[95vw] md:w-[500px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 mb-4 transition-all duration-300">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg">✨ Jadoo AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 font-bold text-xl">
              &times;
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-5">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-xl text-sm shadow-sm ${msg.sender === 'User' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-black border border-gray-200 rounded-bl-none overflow-x-auto'}`}>
                  
                  {msg.sender === 'User' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <div className="space-y-3">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({node, ...props}) => <table className="table table-zebra table-sm w-full border border-gray-200 my-2" {...props} />,
                          th: ({node, ...props}) => <th className="bg-base-200 text-left font-bold" {...props} />,
                          td: ({node, ...props}) => <td className="border-t border-gray-200" {...props} />,
                          p: ({node, ...props}) => <p className="leading-relaxed" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 ml-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 ml-2" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-blue-900" {...props} />
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  )}

                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-black p-4 border border-gray-200 rounded-xl rounded-bl-none text-sm animate-pulse shadow-sm">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g. Find me a 1 big hall property..." 
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 disabled:opacity-50">
              Send
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
        >
          <span className="font-bold text-lg px-2">✨ Ask Jadoo AI</span>
        </button>
      )}
    </div>
  );
}

export default AiChatWidget;

// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';

// function AiChatWidget() {
//   const { token } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [query, setQuery] = useState('');
//   const [chatHistory, setChatHistory] = useState([
//     { sender: 'AI', text: 'Hi! I am Jadoo AI. Shortlist a few properties, then ask me to compare their true costs, commute times, or maintenance fees!' }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatHistory]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     const userMsg = query;
//     setChatHistory(prev => [...prev, { sender: 'User', text: userMsg }]);
//     setQuery('');
//     setLoading(true);

//     try {
//       // 1. Fetch the user's shortlist to provide context to Gemini
//       const shortlistRes = await fetch("http://localhost:8000/api/v1/shortlist", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const shortlistData = await shortlistRes.json();
//       const propertyIds = shortlistData.data?.properties?.map(p => p._id) || [];

//       // If no properties are shortlisted, the backend will reject the AI request
//       if (propertyIds.length === 0) {
//         setChatHistory(prev => [...prev, { sender: 'AI', text: 'Please shortlist at least one property first so I have data to analyze for you!' }]);
//         setLoading(false);
//         return;
//       }

//       // 2. Query the Gemini AI endpoint
//       const response = await fetch("http://localhost:8000/api/v1/ai/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ query: userMsg, propertyIds })
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setChatHistory(prev => [...prev, { sender: 'AI', text: data.data.answer }]);
//       } else {
//         setChatHistory(prev => [...prev, { sender: 'AI', text: data.message || 'Error processing request.' }]);
//       }
//     } catch (error) {
//       setChatHistory(prev => [...prev, { sender: 'AI', text: 'Network error. Please try again later.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-[9999] font-playfair">
//       {/* Chat Window */}
//       {isOpen && (
//         <div className="w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 mb-4 transition-all duration-300">
//           <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
//             <h3 className="font-bold text-lg">Jadoo AI Assistant</h3>
//             <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 font-bold text-xl">
//               &times;
//             </button>
//           </div>
          
//           <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
//             {chatHistory.map((msg, index) => (
//               <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === 'User' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-black rounded-bl-none'}`}>
//                   <p className="whitespace-pre-wrap">{msg.text}</p>
//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-gray-200 text-black p-3 rounded-xl rounded-bl-none text-sm animate-pulse">
//                   Analyzing properties...
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
//             <input 
//               type="text" 
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Ask about your shortlisted homes..." 
//               className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
//               disabled={loading}
//             />
//             <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-700 disabled:opacity-50">
//               Send
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Floating Toggle Button */}
//       {!isOpen && (
//         <button 
//           onClick={() => setIsOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
//         >
//           <span className="font-bold text-lg px-2">✨ Ask Jadoo AI</span>
//         </button>
//       )}
//     </div>
//   );
// }

// export default AiChatWidget;




//markdown improvement 

// import React, { useState, useRef, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// function AiChatWidget() {
//   const { token } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [query, setQuery] = useState('');
  
//   // Default message (agar history khali ho)
//   const [chatHistory, setChatHistory] = useState([
//     { sender: 'AI', text: 'Hi! I am Jadoo AI. Shortlist a few properties, then ask me to compare their true costs, commute times, or maintenance fees!' }
//   ]);
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   // Auto-scroll to the latest message
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chatHistory]);

//   // NEW: Backend se chat history fetch karne ka logic
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/v1/ai/history", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const res = await response.json();
        
//         if (response.ok && res.data && res.data.length > 0) {
//           // Database ke 'user'/'model' format ko UI ke 'User'/'AI' format mein convert karna
//           const formattedHistory = res.data.map(msg => ({
//             sender: msg.role === 'user' ? 'User' : 'AI',
//             text: msg.text
//           }));
//           setChatHistory(formattedHistory);
//         }
//       } catch (error) {
//         console.error("Failed to fetch chat history", error);
//       }
//     };

//     if (token) {
//       fetchHistory();
//     }
//   }, [token]);

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     const userMsg = query;
//     setChatHistory(prev => [...prev, { sender: 'User', text: userMsg }]);
//     setQuery('');
//     setLoading(true);

//     try {
//       const shortlistRes = await fetch("http://localhost:8000/api/v1/shortlist", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const shortlistData = await shortlistRes.json();
//       const propertyIds = shortlistData.data?.properties?.map(p => p._id) || [];

//       if (propertyIds.length === 0) {
//         setChatHistory(prev => [...prev, { sender: 'AI', text: 'Please shortlist at least one property first so I have data to analyze for you!' }]);
//         setLoading(false);
//         return;
//       }

//       const response = await fetch("http://localhost:8000/api/v1/ai/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ query: userMsg, propertyIds })
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setChatHistory(prev => [...prev, { sender: 'AI', text: data.data.answer }]);
//       } else {
//         setChatHistory(prev => [...prev, { sender: 'AI', text: data.message || 'Error processing request.' }]);
//       }
//     } catch (error) {
//       setChatHistory(prev => [...prev, { sender: 'AI', text: 'Network error. Please try again later.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-[9999] font-playfair">
//       {isOpen && (
//         <div className="w-[95vw] md:w-[500px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 mb-4 transition-all duration-300">
//           <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
//             <h3 className="font-bold text-lg">✨ Jadoo AI Assistant</h3>
//             <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 font-bold text-xl">
//               &times;
//             </button>
//           </div>
          
//           <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-5">
//             {chatHistory.map((msg, index) => (
//               <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
//                 <div className={`max-w-[90%] p-4 rounded-xl text-sm shadow-sm ${msg.sender === 'User' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-black border border-gray-200 rounded-bl-none overflow-x-auto'}`}>
                  
//                   {/* MARKDOWN RENDERER */}
//                   {msg.sender === 'User' ? (
//                     <p className="whitespace-pre-wrap">{msg.text}</p>
//                   ) : (
//                     <div className="space-y-3">
//                       <ReactMarkdown 
//                         remarkPlugins={[remarkGfm]}
//                         components={{
//                           table: ({node, ...props}) => <table className="table table-zebra table-sm w-full border border-gray-200 my-2" {...props} />,
//                           th: ({node, ...props}) => <th className="bg-base-200 text-left font-bold" {...props} />,
//                           td: ({node, ...props}) => <td className="border-t border-gray-200" {...props} />,
//                           p: ({node, ...props}) => <p className="leading-relaxed" {...props} />,
//                           ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1 ml-2" {...props} />,
//                           ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1 ml-2" {...props} />,
//                           strong: ({node, ...props}) => <strong className="font-bold text-blue-900" {...props} />
//                         }}
//                       >
//                         {msg.text}
//                       </ReactMarkdown>
//                     </div>
//                   )}

//                 </div>
//               </div>
//             ))}
//             {loading && (
//               <div className="flex justify-start">
//                 <div className="bg-white text-black p-4 border border-gray-200 rounded-xl rounded-bl-none text-sm animate-pulse shadow-sm">
//                   Analyzing shortlisted properties...
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
//             <input 
//               type="text" 
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="E.g. Compare these properties..." 
//               className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
//               disabled={loading}
//             />
//             <button type="submit" disabled={loading} className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 disabled:opacity-50">
//               Send
//             </button>
//           </form>
//         </div>
//       )}

//       {!isOpen && (
//         <button 
//           onClick={() => setIsOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
//         >
//           <span className="font-bold text-lg px-2">✨ Ask Jadoo AI</span>
//         </button>
//       )}
//     </div>
//   );
// }

// export default AiChatWidget;


// Ab hum frontend se us restriction (if-condition) ko hata denge aur pehle message ko thoda zyada welcoming bana denge. Apne code mein isse replace karein:
