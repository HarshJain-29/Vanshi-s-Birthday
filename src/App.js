import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Music, Image, Laugh, Smile, Sparkle, Frown, MessageSquare, PlusCircle, Trash2, ListChecks, ChevronLeft, ChevronRight, X } from 'lucide-react'; // Added X icon for modal close

// Preloader Component
const Preloader = ({ onLoaded }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onLoaded();
        }, 2000); // Preloader visible time is 2 seconds
        return () => clearTimeout(timer);
    }, [onLoaded]);

    return (
        <div
            className="fixed inset-0 bg-gradient-to-br from-rose-200 to-indigo-200 z-50 flex flex-col items-center justify-center animate-fade-out-preloader-long"
        >
            {/* Party Poppers - Left */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-6xl md:text-8xl animate-bounce-in-left hidden sm:block">🎉</div>
            <div className="absolute left-8 top-1/3 -translate-y-1/2 text-5xl md:text-7xl animate-bounce-in-left hidden sm:block">🥳</div>

            {/* Preloader Image - User Addable */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-white shadow-lg flex items-center justify-center animate-pulse-preloader">
                {/* User can replace this image URL */}
                <img src="https://harshjain-29.github.io/Vanshi-s-Birthday/assets/images/Preloader.png" alt="Couple in Love" className="w-full h-full object-cover" />
            </div>
            <p
                className="mt-8 text-2xl md:text-3xl font-bold text-fuchsia-700 animate-fade-in-up"
            >Warming up our love, just for you...</p> {/* Catchy cheesy line */}

            {/* Party Poppers - Right */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl md:text-8xl animate-bounce-in-right hidden sm:block">🎉</div>
            <div className="absolute right-8 top-2/3 -translate-y-1/2 text-5xl md:text-7xl animate-bounce-in-right hidden sm:block">🎈</div>
        </div>
    );
};

// Birthday Cake Component
const BirthdayCake = ({ onClick, candlesLit }) => {
    return (
        <div className="flex justify-center mb-8 relative z-10 cursor-pointer" onClick={onClick}>
            <svg className="w-64 h-64 md:w-80 md:h-80" viewBox="0 0 250 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bottom Layer of Cake - Original Colors */}
                <rect x="25" y="150" width="200" height="70" rx="15" fill="#F8BBD0"/>
                <path d="M25 150 C 75 120, 175 120, 225 150 L 225 150 L 25 150 Z" fill="#F48FB1"/>
                <line x1="35" y1="170" x2="215" y2="170" stroke="#F06292" strokeWidth="1" strokeOpacity="0.3"/>
                <line x1="30" y1="190" x2="220" y2="190" stroke="#F06292" strokeWidth="1" strokeOpacity="0.3"/>

                {/* Middle Layer of Cake - Original Colors */}
                <rect x="45" y="100" width="160" height="60" rx="12" fill="#F48FB1"/>
                <path d="M45 100 C 85 75, 165 75, 205 100 L 205 100 L 45 100 Z" fill="#F06292"/>
                <line x1="55" y1="120" x2="195" y2="120" stroke="#E91E63" strokeWidth="1" strokeOpacity="0.3"/>
                <line x1="50" y1="140" x2="200" y2="140" stroke="#E91E63" strokeWidth="1" strokeOpacity="0.3"/>

                {/* Top Layer of Cake - Original Colors */}
                <rect x="70" y="60" width="110" height="40" rx="10" fill="#F06292"/>
                <path d="M70 60 C 95 35, 155 35, 180 60 L 180 60 L 70 60 Z" fill="#F8BBD0"/>
                <line x1="80" y1="75" x2="170" y2="75" stroke="#C2185B" strokeWidth="1" strokeOpacity="0.3"/>

                {/* Decorative dots (sprinkles or frosting pearls) on top layer */}
                <circle cx="85" cy="65" r="2.5" fill="#FFFFFF"/>
                <circle cx="105" cy="63" r="2.5" fill="#FFFFFF"/>
                <circle cx="125" cy="61" r="2.5" fill="#FFFFFF"/>
                <circle cx="145" cy="63" r="2.5" fill="#FFFFFF"/>
                <circle cx="165" cy="65" r="2.5" fill="#FFFFFF"/>

                {/* Anime Couple Placeholder on top of the cake */}
                <image href="https://harshjain-29.github.io/Vanshi-s-Birthday/assets/images/oncake.png" x="63" y="-20" width="120" height="80" />

                {/* Text on the middle layer of the cake */}
                <text x="125" y="130" textAnchor="middle" fontSize="20" fill="#FFF" className="font-dancing-script">
                    Happy Birthday!
                </text>

                <text x="125" y="190" textAnchor="middle" fontSize="35" fill="#FFF" className="font-dancing-script">
                    Vanshi
                </text>

                {/* Candles - adjusted positions for the new cake layers */}
                <rect x="75" y="45" width="8" height="18" rx="2" fill="#FFECB3"/> {/* Candle 1 */}
                <circle cx="79" cy="42" r="4" fill={candlesLit ? "#FFB74D" : "#FFECB3"} className={candlesLit ? "animate-flame" : ""}/> {/* Flame 1 */}

                <rect x="115" y="35" width="8" height="28" rx="2" fill="#FFECB3"/> {/* Candle 2 - Taller */}
                <circle cx="119" cy="32" r="4" fill={candlesLit ? "#FFB74D" : "#FFECB3"} className={candlesLit ? "animate-flame delay-100" : ""}/> {/* Flame 2 */}

                <rect x="155" y="48" width="8" height="15" rx="2" fill="#FFECB3"/> {/* Candle 3 */}
                <circle cx="159" cy="45" r="4" fill={candlesLit ? "#FFB74D" : "#FFECB3"} className={candlesLit ? "animate-flame delay-200" : ""}/> {/* Flame 3 */}
            </svg>
        </div>
    );
};

// DreamList Component
const DreamList = () => {
    const [dreams, setDreams] = useState([]);
    const [newDream, setNewDream] = useState('');

    useEffect(() => {
        // Load dreams from localStorage on component mount
        const storedDreams = localStorage.getItem('vanshi_our_dreams');
        if (storedDreams) {
            try {
                setDreams(JSON.parse(storedDreams));
            } catch (e) {
                console.error("Failed to parse dreams from localStorage:", e);
                setDreams([]); // Reset if parsing fails
            }
        }
    }, []);

    useEffect(() => {
        // Save dreams to localStorage whenever they change
        localStorage.setItem('vanshi_our_dreams', JSON.stringify(dreams));
    }, [dreams]);

    const addDream = () => {
        if (newDream.trim() !== '') {
            setDreams(prevDreams => [...prevDreams, { id: Date.now(), text: newDream.trim() }]);
            setNewDream('');
        }
    };

    const removeDream = (id) => {
        setDreams(prevDreams => prevDreams.filter(dream => dream.id !== id));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addDream();
        }
    };

    return (
        <div
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-12 shadow-inner relative z-10 border-2 border-fuchsia-200"
        >
            <h2
                className="text-3xl md:text-4xl font-bold text-center text-rose-700 mb-6 flex items-center justify-center font-dancing-script"
            >
                <ListChecks className="w-8 h-8 mr-3 text-rose-600" />
                Our Adventures Await!
            </h2>
            <p
                className="text-gray-700 text-center mb-4"
            >Let's list all the dreams we want to fulfill together!</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    value={newDream}
                    onChange={(e) => setNewDream(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new dream..."
                    className="flex-grow p-3 rounded-xl border-2 border-rose-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 text-gray-700"
                />
                <button
                    onClick={addDream}
                    className="bg-fuchsia-600 text-white p-3 rounded-xl shadow-md hover:bg-fuchsia-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-semibold text-lg"
                >
                    <PlusCircle className="w-5 h-5"/> Add Dream
                </button>
            </div>
            <ul className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar p-2">
                {dreams.length === 0 ? (
                    <li
                        className="text-center text-gray-500 italic"
                    >No dreams added yet. Start dreaming!</li>
                ) : (
                    dreams.map(dream => (
                        <li
                            key={dream.id}
                            className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-rose-100 animate-fade-in-item text-gray-800"
                        >
                            <span className="text-lg flex-grow pr-4">{dream.text}</span>
                            <button
                                onClick={() => removeDream(dream.id)}
                                className="text-rose-500 hover:text-rose-700 transition-colors duration-200 p-1 rounded-full hover:bg-rose-50"
                            >
                                <Trash2 className="w-5 h-5"/>
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

// Special Note Pop-up Component
const SpecialNoteModal = ({ isVisible, onClose, photoSrc, noteContent }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div className="relative bg-gradient-to-br from-fuchsia-100 to-purple-100 rounded-3xl p-8 max-w-2xl w-full text-center shadow-2xl border-4 border-purple-300 animate-pop-up-open max-h-[90vh] overflow-y-auto custom-scrollbar"> {/* Re-added custom-scrollbar and overflow-y-auto */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-rose-500 text-white rounded-full p-2 hover:bg-rose-600 transition-colors duration-200 shadow-md z-10"
                    aria-label="Close Note"
                >
                    <X className="w-6 h-6"/>
                </button>
                <h3 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 font-dancing-script">A Note from My Heart</h3>
                {photoSrc && (
                    <img src={photoSrc} alt="Special Moment" className="w-full max-h-64 object-cover rounded-lg mb-6 mx-auto border-2 border-fuchsia-300"/>
                )}
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-playfair-display text-left whitespace-pre-wrap"> {/* Added whitespace-pre-wrap to handle \n\n */}
                    {noteContent}
                </p>
            </div>
        </div>
    );
};


// Main App Component
const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [openCardId, setOpenCardId] = useState(null);
    const [candlesLit, setCandlesLit] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const messageTimeoutRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null); // State for the photo displayed in the dedicated space
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [arePhotosSpread, setArePhotosSpread] = useState(true); // Initial state: photos are spread out

    // Quiz states
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizFeedback, setQuizFeedback] = useState('');
    const [isNoteUnlocked, setIsNoteUnlocked] = useState(false);
    const quizFeedbackTimeoutRef = useRef(null);

    const noteContent = (
        <div className="space-y-4 text-center">
            <p>
                My love, this past year has been an amazing journey. We had our ups and downs, but we also had so many fun times: flying kites, dancing at weddings, and sneaking out to spend time together. These moments, sharing our love and simply being with each other, made every day special and left beautiful memories in our hearts.
            </p>
            <p>
                You are the light that guides me, the comfort that soothes me, and the goofy smile that brightens my day.
            </p>
            <p>
                I promise to take care of you, to love you deeply, to always be by your side, to understand you, and to be the very best I can be, with you, for you, for <em>us</em>.
            </p>
            <p>
                Happy Birthday, my wonderful Vanshi! And Happy 1-Year Anniversary of our love story, which is just around the corner. One year down, forever to go – with you, every moment is pure magic.
            </p>
            <p className="mt-4 font-semibold italic text-pink-600">
                With infinite love, always yours — Harsh ❤️
            </p>
        </div>);
    const notePhotoSrc = `${process.env.PUBLIC_URL}/assets/images/special.jpg`; // Placeholder for the note's photo


    // Placeholder data for 16 photos
    const photoMemories = Array.from({ length: 16 }, (_, i) => {
        const rows = 4;
        const cols = 4;
        const rowIdx = Math.floor(i / cols);
        const colIdx = i % cols;

        // Distribute photos initially across the visible area for spread effect
        const spreadLeft = (colIdx / (cols - 1)) * 70 + 15; // 15% to 85% horizontally
        const spreadTop = (rowIdx / (rows - 1)) * 60 + 10;   // 10% to 70% vertically (leaving space for selected photo)

        const offsetX = (Math.random() * 10 - 5); // -5 to +5 percentage points
        const offsetY = (Math.random() * 10 - 5); // -5 to +5 percentage points

        // Calculate a unique Z-index to ensure visible layering in the spread
        const zIndexSpread = 10 + Math.floor(Math.random() * 10);


        return {
            id: `mem-${i}`,
            src: `${process.env.PUBLIC_URL}/assets/images/ourmemory${i+1}.jpg`,
            alt: `Our Memory ${i + 1}`,
            // caption: `A beautiful moment #${i + 1}`,
            // Initial state: spread out
            spreadTransform: {
                rotate: Math.random() * 30 - 15, // -15 to +15 degrees
                left: `${spreadLeft + offsetX}%`,
                top: `${spreadTop + offsetY}%`,
                zIndex: zIndexSpread,
                width: '180px',
                height: '120px',
                opacity: 1,
            },
            // State when one photo is selected: lined up at the bottom
            linedUpTransform: {
                rotate: Math.random() * 5 - 2.5, // Small rotation for natural look
                // Line up in two rows at the bottom (8 photos per row)
                left: `${5 + (i % 8) * 11.5}%`, // Distribute in 8 columns
                top: `${(i < 8 ? 80 : 88)}%`, // Two rows: 80% for first, 88% for second
                zIndex: 5, // Lower z-index for lined up photos
                width: '100px',
                height: '70px',
                opacity: 0.8,
            },
            // Transform for the single displayed photo above the lined-up pile
            displayTransform: {
                left: '50%',
                top: '30%', // Position above the lined-up photos
                width: '350px', // Larger size for display
                height: '250px',
                rotate: 0,
                zIndex: 60, // Higher z-index to be on top
                opacity: 1,
            }
        };
    });


    const harmoniousSongs = [
        { id: 'song1', title: 'Our Melody 1', embedUrl: 'https://www.youtube.com/embed/K1Uc52jzFIQ?si=4QyjStpPeIOGYF2Q' }, 
        { id: 'song2', title: 'Our Melody 2', embedUrl: 'https://www.youtube.com/embed/BxbxCcDlzkw?si=6LSea7RLicluKyT6' },
        { id: 'song3', title: 'Our Melody 3', embedUrl: 'https://www.youtube.com/embed/ep_GKAtOH9I?si=MkJ-c92xPykjVRTE' },
        { id: 'song4', title: 'Our Melody 4', embedUrl: 'https://www.youtube.com/embed/suC_Y2eZtAw?si=pGdbskm6O2fELl-F' },
        { id: 'song5', title: 'Our Melody 5', embedUrl: 'https://www.youtube.com/embed/ZmcBC9-wAXM?si=vibEFjCt11IoCxqh' },
        { id: 'song6', title: 'Our Melody 6', embedUrl: 'https://www.youtube.com/embed/yLAcnCtvsJU?si=d2uv1MnWLfpNk0g5' },
    ];

    const goToNextImageInLightbox = () => {
        const currentIndex = photoMemories.findIndex(p => p.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % photoMemories.length;
        setSelectedImage(photoMemories[nextIndex]);
    };

    const goToPrevImageInLightbox = () => {
        const currentIndex = photoMemories.findIndex(p => p.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + photoMemories.length) % photoMemories.length;
        setSelectedImage(photoMemories[prevIndex]);
    };

    const goToNextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % harmoniousSongs.length);
    };

    const goToPrevSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + harmoniousSongs.length) % harmoniousSongs.length);
    };


    // List of "Open When" card data
    const openWhenCards = [
        {
            id: 'laugh',
            title: 'Open when you need to laugh',
            icon: <Laugh className="w-8 h-8 text-fuchsia-500" />,
            media: `${process.env.PUBLIC_URL}/assets/images/happy.jpg`,
            text: "May this remind you of all the silly moments we've shared, and bring a smile to your face, my love. Laughter is the best medicine, and you deserve a dose of happiness!",
            song: `${process.env.PUBLIC_URL}/assets/songs/happy.mp3`,
        },
        {
            id: 'down',
            title: 'Open when you are feeling down',
            icon: <Frown className="w-8 h-8 text-indigo-500" />,
            media: `${process.env.PUBLIC_URL}/assets/images/feelingdown.png`,
            text: "When the world feels heavy, remember that you're never alone. I'm here for you, always. This is a reminder of my unending support and love, Vanshi. You are strong and beautiful.",
            song: `${process.env.PUBLIC_URL}/assets/songs/feelingdown.mp3`,
        },
        {
            id: 'loved',
            title: 'Open when you need to feel being loved',
            icon: <Heart className="w-8 h-8 text-rose-500" />,
            media: `${process.env.PUBLIC_URL}/assets/images/loved.jpg`,
            text: "My dearest Vanshi, if you ever doubt how much you are cherished, open this. Every moment with you is a blessing, and my love for you grows stronger with each passing day. You are my everything.",
            song: `${process.env.PUBLIC_URL}/assets/songs/loved.mp3`,
        },
        {
            id: 'angry',
            title: 'Open when you are angry with me',
            icon: <MessageSquare className="w-8 h-8 text-amber-500" />,
            media: `${process.env.PUBLIC_URL}/assets/images/unhappy.png`,
            text: "Okay, deep breaths! Remember that even when we argue, my love for you remains constant. Let's talk it out, or just cuddle it out. I cherish you, even when you're mad at me.",
            song: `${process.env.PUBLIC_URL}/assets/songs/angry.mp3`,
        },
        {
            id: 'miss',
            title: 'Open when you miss me',
            icon: <Sparkle className="w-8 h-8 text-cyan-500" />,
            media: `${process.env.PUBLIC_URL}/assets/images/missing.jpg`,
            text: "Even when miles separate us, you're always in my thoughts and heart. This is a little piece of me, wishing I was there with you, Vanshi. Can't wait until we're together again!",
            song: `${process.env.PUBLIC_URL}/assets/songs/miss.mp3`,
        },
        {
            id: 'asleep',
            title: 'Open when you are falling asleep',
            icon: <Smile className="w-8 h-8 text-emerald-500" />,
            media: `${process.env.PUBLIC_URL}/assets/images/sleep.jpg`,
            text: "As you drift off to dreamland, remember how much you're adored. May your sleep be peaceful and filled with sweet dreams. Goodnight, my beautiful Vanshi. I love you.",
            song: `${process.env.PUBLIC_URL}/assets/songs/sleep.mp3`,
        },
    ];

    const currentOpenCard = openCardId ? openWhenCards.find(card => card.id === openCardId) : null;


    // Handle cake click
    const handleCakeClick = useCallback(() => {
        setCandlesLit(true);
        setShowMessage(true);

        // Clear any existing timeout to prevent multiple messages
        if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current);
        }

        // Set timeout to hide the message after 5 seconds
        messageTimeoutRef.current = setTimeout(() => {
            setShowMessage(false);
            setCandlesLit(false); // Turn off candles after message
        }, 5000);
    }, []);

    // Function to close the currently open card
    const closeCard = useCallback(() => {
        setOpenCardId(null); // Only set the ID to null
    }, []);

    // Function to handle photo click for new animation
    const handlePhotoClick = (photo) => {
        // If clicking the currently displayed photo, deselect it
        if (selectedImage && selectedImage.id === photo.id) {
            setSelectedImage(null);
            setArePhotosSpread(true); // Return all photos to spread state
        } else {
            setArePhotosSpread(false); // Make photos line up
            setTimeout(() => {
                setSelectedImage(photo); // Open the photo in the dedicated space
            }, 700); // Small time gap for photos to line up (duration-700)
        }
    };

    // Function to close the photo display area and re-spread photos
    // This is called when the X button on the displayed photo is clicked
    const closePhotoDisplay = () => {
        setSelectedImage(null);
        setArePhotosSpread(true); // Return all photos to spread state
    };


    // Function to close the special note modal
    const closeSpecialNoteModal = () => {
        setIsNoteUnlocked(false);
        // Reset quiz state if needed for replaying, or keep it unlocked
    };

    // Quiz questions
    const quizQuestions = [
        {
            question: "Where is my favorite place to be?",
            options: ["At the beach", "On a road trip", "In your arms", "Anywhere with WiFi 😜"],
            correctAnswerIndex: 2,
        },
        {
            question: "What do I miss the most when we’re apart?",
            options: ["Your voice", "Your hugs", "Your sleepy goodnights", "All of the above and more"],
            correctAnswerIndex: 3,
        },
    ];

    const handleAnswer = (selectedIndex) => {
        if (quizFeedbackTimeoutRef.current) {
            clearTimeout(quizFeedbackTimeoutRef.current);
        }

        if (selectedIndex === quizQuestions[currentQuestionIndex].correctAnswerIndex) {
            setQuizFeedback('Correct! 🎉');
            if (currentQuestionIndex === quizQuestions.length - 1) {
                // Last question and correct
                quizFeedbackTimeoutRef.current = setTimeout(() => {
                    setQuizFeedback('');
                    setIsNoteUnlocked(true); // Unlock the note
                    setIsQuizActive(false); // Hide quiz after completion
                }, 1000); // Short delay before unlocking note
            } else {
                // Not last question, move to next
                quizFeedbackTimeoutRef.current = setTimeout(() => {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setQuizFeedback('');
                }, 1000); // Short delay before next question
            }
        } else {
            setQuizFeedback('Oops, not quite! Try again.');
            quizFeedbackTimeoutRef.current = setTimeout(() => {
                setQuizFeedback('');
            }, 2000); // Clear feedback after 2 seconds
        }
    };


    return (
        // Tailwind CSS for global styling and font
        <div
            className="font-sans antialiased text-gray-800 bg-gradient-to-br from-fuchsia-50 via-rose-50 to-indigo-50 min-h-screen flex flex-col items-center justify-center p-4 cursor-heart"
        >
            {/* Tailwind CSS CDN */}
            <script src="https://cdn.tailwindcss.com"></script>
            {/* Inter, Dancing Script, and Playfair Display Fonts */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Dancing+Script:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />

            {/* Preloader is rendered here */}
            {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}

            {/* Party Poppers Floating across Page */}
            {!isLoading && (
                <>
                    <div className="party-popper top-10 left-[10%] text-6xl animate-float-popper delay-1000">🎉</div>
                    <div className="party-popper top-1/4 right-[15%] text-5xl animate-float-popper delay-2000">🎈</div>
                    <div className="party-popper bottom-1/2 left-[5%] text-7xl animate-float-popper delay-3000">🥳</div>
                    <div className="party-popper top-1/3 left-[20%] text-4xl animate-float-popper delay-4000">🎊</div>
                    <div className="party-popper bottom-10 right-[20%] text-6xl animate-float-popper delay-5000">✨</div>
                    <div className="party-popper top-[5%] right-[5%] text-8xl animate-float-popper delay-6000">💖</div>
                    <div className="party-popper bottom-5 left-[30%] text-5xl animate-float-popper delay-7000">🥳</div>
                </>
            )}


            {/* Main Content */}
            {!isLoading && (
                <div
                    className="w-full max-w-4xl bg-white bg-opacity-95 rounded-3xl shadow-xl p-6 md:p-10 relative overflow-hidden animate-fade-in-long transition-all duration-500 ease-in-out border-4 border-rose-200"
                >
                    {/* Floating Orbs for Royal Effect - Original lighter colors */}
                    <div className="absolute -top-20 -left-20 w-48 h-48 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-1 z-0"></div>
                    <div className="absolute top-10 right-0 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-2 z-0"></div>
                    <div className="absolute bottom-0 left-1/4 w-36 h-36 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-3 z-0"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-52 h-52 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-1 z-0" style={{ animationDelay: '2s' }}></div>


                    {/* Happy Birthday Header */}
                    <h1
                        className="text-4xl md:text-5xl font-extrabold text-center text-fuchsia-700 mb-4 relative z-10 drop-shadow-lg font-dancing-script"
                    >
                        Happy Birthday, My Dearest Vanshi! <Heart className="inline-block w-10 h-10 text-rose-500 -mt-2 animate-bounce-slow" />
                        <span
                            className="block text-xl md:text-2xl text-rose-600 mt-2 font-inter font-semibold"
                        >Celebrating You and Our Amazing Year Together!</span>
                    </h1>

                    {/* Permanent Line for her */}
                    <p
                        className="text-2xl md:text-3xl font-bold text-center text-rose-700 mb-8 font-dancing-script animate-fade-in-up"
                    >
                        We're almost at our 1-year mark, <br/> and your Birthday makes it even more memorable, Vanshi!
                    </p>

                    {/* Container for Cake and surrounding elements */}
                    <div className="relative flex justify-center items-center flex-col md:flex-row my-8">
                        {/* Left Side Elements for Cake */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-16 flex flex-col items-center space-y-6 z-10 animate-left-side-intro">
                            <span className="text-6xl text-purple-500 animate-float-subtle">🎈</span>
                            <span className="text-5xl text-pink-500 animate-float-subtle delay-100">🎉</span>
                            <div className="w-20 h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        </div>

                        {/* Interactive Birthday Cake */}
                        <BirthdayCake onClick={handleCakeClick} candlesLit={candlesLit} />

                        {/* Right Side Elements for Cake */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-16 flex flex-col items-center space-y-6 z-10 animate-right-side-intro">
                            <span className="text-5xl text-fuchsia-500 animate-float-subtle">🎉</span>
                            <span className="text-6xl text-indigo-500 animate-float-subtle delay-100">🎈</span>
                            <div
                                className="w-20 h-20 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"
                                style={{animationDelay: '0.3s'}}
                            ></div>
                        </div>
                    </div>

                    {/* Floating Message (still appears on cake click) */}
                    {showMessage && (
                        <div
                            className="absolute z-20 bg-white p-4 rounded-xl shadow-lg border-2 border-rose-300 text-center animate-fade-in-up-float"
                            style={{top: '35%', left: '50%', transform: 'translateX(-50%)'}}
                        >
                            <p
                                className="text-xl md:text-2xl font-bold text-fuchsia-700 font-dancing-script leading-tight"
                            >
                                We're almost at our 1-year mark, <br/> and your Birthday makes it even more memorable, Vanshi!
                            </p>
                        </div>
                    )}

                    {/* Open When... Cards Section */}
                    <h2
                        className="text-3xl md:text-4xl font-bold text-center text-fuchsia-800 mb-6 md:mb-8 relative z-10 font-dancing-script"
                    >Your Special "Open When..." Letters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 relative z-10">
                        {openWhenCards.map((card) => (
                            <div
                                key={card.id}
                                className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out border-2 border-transparent hover:border-rose-400 bg-opacity-90 hover:shadow-xl"
                                onClick={() => setOpenCardId(card.id)}
                            >
                                <div className="relative z-10 flex flex-col items-center">
                                    {card.icon}
                                    <h3
                                        className="text-xl md:text-2xl font-semibold mt-3 text-purple-800 group-hover:text-fuchsia-700 transition-colors duration-300"
                                    >{card.title}</h3>
                                    <p
                                        className="text-sm text-gray-600 mt-2"
                                    >Click to open this love letter!</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal for Open Card Content */}
                    {currentOpenCard && (
                        <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-md bg-black bg-opacity-50 animate-fade-in">
                            <div
                                className="relative bg-gradient-to-br from-white to-pink-50 rounded-3xl p-8 max-w-lg w-full md:max-w-xl lg:max-w-2xl shadow-2xl animate-pop-up-open flex flex-col items-center border-4 border-fuchsia-300 overflow-hidden max-h-[90vh] overflow-auto"
                            >
                                {/* Envelope top flap */}
                                <div
                                    className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-purple-200 to-pink-200 rounded-t-3xl transform-gpu origin-top card-unfold-flap z-20"
                                ></div>

                                {/* Content area, revealed by flap */}
                                <div
                                    className="relative w-full h-full p-4 md:p-6 bg-white rounded-b-xl shadow-inner-lg animate-fade-in-content custom-scrollbar"
                                    style={{ animationDelay: '0.8s', flexGrow: 1, overflowY: 'auto' }}
                                >
                                    <h2
                                        className="text-3xl md:text-4xl font-bold text-fuchsia-700 mb-4 text-center font-playfair-display"
                                    >{currentOpenCard.title}</h2>
                                    {currentOpenCard.media && (
                                        <div className="mb-4">
                                            {/* Check if media is a video (e.g., .mp4, .webm) or an image */}
                                            {currentOpenCard.media.endsWith('.mp4') || currentOpenCard.media.endsWith('.webm') ? (
                                                <video
                                                    controls
                                                    className="rounded-lg shadow-md w-full max-h-64 object-cover border-2 border-rose-300 mx-auto"
                                                >
                                                    <source src={currentOpenCard.media} type={currentOpenCard.media.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <div className="flex justify-center">
                                                <img
                                                    src={currentOpenCard.media}
                                                    alt={currentOpenCard.title}
                                                    className="rounded-lg shadow-md w-72 object-contain border-2 border-rose-300"
                                                />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <p
                                        className="text-gray-800 text-lg md:text-xl font-playfair-display leading-relaxed mb-4 text-left"
                                    >
                                        {currentOpenCard.text}
                                    </p>
                                    {currentOpenCard.song && (
                                        <div className="w-full mt-4">
                                            <p
                                                className="text-sm text-gray-500 mb-2 text-center"
                                            >My special melody:</p>
                                            <audio controls className="w-full">
                                                <source src={currentOpenCard.song} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={closeCard}
                                    className="absolute bottom-4 right-4 bg-rose-500 text-white rounded-full p-2 hover:bg-rose-600 transition-colors duration-200 shadow-md z-30"
                                    aria-label="Close Letter"
                                >
                                    <X className="w-6 h-6"/>
                                </button>
                            </div>
                        </div>
                    )}


                    {/* Section for Our Harmonious Blend Music */}
                    <div
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-12 shadow-inner relative z-10 border-2 border-indigo-200"
                    >
                        <h2
                            className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-6 flex items-center justify-center font-dancing-script"
                        >
                            <Music className="w-8 h-8 mr-3 text-indigo-600 animate-spin-slow" />
                            Our Harmonious Blend <span
                                className="text-xl ml-3 text-gray-700"
                            >(98% Match on Spotify!)</span>
                        </h2>
                        <p
                            className="text-gray-700 text-center mb-4"
                        >These songs are the soundtrack to our love, celebrating our perfect harmony.</p>
                        <div className="relative w-full max-w-2xl mx-auto">
                            <div
                                className="overflow-hidden rounded-xl shadow-lg border-2 border-blue-400 bg-white"
                            >
                                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSongIndex * 100}%)` }}>
                                    {harmoniousSongs.map((song, index) => (
                                        <div key={song.id} className="w-full flex-shrink-0 p-4">
                                            <p
                                                className="text-lg font-medium text-gray-800 mb-3 text-center"
                                            >{song.title}</p>
                                            <iframe
                                                className="w-full aspect-video rounded-lg shadow-md"
                                                src={song.embedUrl}
                                                title={`YouTube video player - ${song.title}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                            
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={goToPrevSong}
                                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-colors z-10"
                                aria-label="Previous song"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={goToNextSong}
                                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-colors z-10"
                                aria-label="Next song"
                            >
                                <ChevronRight size={24} />
                            </button>
                            <div className="flex justify-center mt-4 space-x-2">
                                {harmoniousSongs.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSongIndex(idx)}
                                        className={`w-3 h-3 rounded-full ${idx === currentSongIndex ? 'bg-indigo-500' : 'bg-blue-400 hover:bg-blue-300'} transition-colors`}
                                        aria-label={`Go to song ${idx + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Our Adventures Await! - Dream List Section */}
                    <DreamList />

                    {/* Section for Photos */}
                    <div
                        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-inner relative z-10 border-2 border-fuchsia-200"
                    >
                        <h2
                            className="text-3xl md:text-4xl font-bold text-center text-rose-700 mb-6 flex items-center justify-center font-dancing-script"
                        >
                            <Image className="w-8 h-8 mr-3 text-rose-600 animate-pulse-slow" />
                            Our Beautiful 1-Year Memories
                        </h2>
                        <p
                            className="text-lg font-semibold text-center text-fuchsia-700 mb-6 italic"
                        >
                            One year down, forever to go – our love story is just beginning!
                        </p>
                        <p
                            className="text-gray-700 text-center mb-4"
                        >
                            A cherished collection of moments from our incredible year together. Click on a photo to see it magically float and open!
                        </p>
                        <div className="relative w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden"> {/* Container for photos */}
                            {photoMemories.map((photo, index) => {
                                const isThisPhotoSelected = selectedImage && photo.id === selectedImage.id;
                                const currentTransform = isThisPhotoSelected
                                    ? photo.displayTransform // Selected photo goes to display area
                                    : arePhotosSpread
                                        ? photo.spreadTransform // Initial spread
                                        : photo.linedUpTransform; // Other photos line up

                                return (
                                    <div
                                        key={photo.id}
                                        className={`absolute cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-700 ease-in-out`}
                                        style={{
                                            zIndex: currentTransform.zIndex,
                                            left: currentTransform.left,
                                            top: currentTransform.top,
                                            transform: `translate(-50%, -50%) rotate(${currentTransform.rotate}deg)`,
                                            width: currentTransform.width,
                                            height: currentTransform.height,
                                            opacity: currentTransform.opacity,
                                            border: '2px solid #F472B6', // Rose-400 border
                                        }}
                                        onClick={() => handlePhotoClick(photo)}
                                    >
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-white text-sm font-semibold text-center p-2">{photo.caption}</span>
                                        </div>
                                    </div>
                                );
                            })}
                             {/* Controls for navigating displayed photo */}
                             {selectedImage && (
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-4 z-50">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); goToPrevImageInLightbox(); }}
                                        className="bg-fuchsia-500 text-white p-2 rounded-full shadow-lg hover:bg-fuchsia-600 transition-colors"
                                        aria-label="Previous photo"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); closePhotoDisplay(); }}
                                        className="bg-rose-500 text-white p-2 rounded-full shadow-lg hover:bg-rose-600 transition-colors"
                                        aria-label="Close photo display"
                                    >
                                        <X size={24} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); goToNextImageInLightbox(); }}
                                        className="bg-fuchsia-500 text-white p-2 rounded-full shadow-lg hover:bg-fuchsia-600 transition-colors"
                                        aria-label="Next photo"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700 text-center text-lg mt-6 font-playfair-display italic">
                            Without you, my life is jumbled and scattered, but with your presence, everything aligns beautifully, making me feel complete.
                        </p>
                    </div>

                    {/* Quiz Section */}
                    {!isNoteUnlocked && (
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 mt-12 shadow-xl border-2 border-purple-300 text-center relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4 font-dancing-script">Unlock My Special Note!</h3>
                            <p className="text-gray-700 mb-6">Answer these two questions correctly to reveal my heartfelt message.</p>

                            {!isQuizActive ? (
                                <button
                                    onClick={() => { setIsQuizActive(true); setCurrentQuestionIndex(0); setQuizFeedback(''); }}
                                    className="bg-fuchsia-600 text-white p-3 rounded-xl shadow-md hover:bg-fuchsia-700 transition-colors duration-200 font-semibold text-lg animate-pulse-quiz-button"
                                >
                                    Start Quiz!
                                </button>
                            ) : (
                                <div className="quiz-container animate-fade-in-up">
                                    <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                                        {quizQuestions[currentQuestionIndex].question}
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(index)}
                                                className="bg-white text-fuchsia-700 border-2 border-fuchsia-300 rounded-xl p-3 shadow-sm hover:bg-fuchsia-50 hover:border-fuchsia-400 transition-all duration-200 font-medium text-lg"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    {quizFeedback && (
                                        <p className={`text-lg font-bold ${quizFeedback.includes('Correct') ? 'text-emerald-600' : 'text-red-600'} animate-fade-in-out-feedback`}>
                                            {quizFeedback}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Special Note Pop-up */}
                    <SpecialNoteModal
                        isVisible={isNoteUnlocked}
                        onClose={closeSpecialNoteModal}
                        photoSrc={notePhotoSrc}
                        noteContent={noteContent}
                    />

                    {/* Subtle Lighting effect */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-700"></div>
                    </div>
                </div>
            )}

            {/* Footer */}
            {!isLoading && (
                <footer
                    className="mt-8 text-center text-gray-600 text-sm italic relative z-10"
                >
                    Made with 💘 by your long-distance boy — one cheesy pixel at a time.
                </footer>
            )}

            {/* Custom CSS for animations and general styling */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Dancing+Script:wght@400;700&family=Playfair+Display:wght@400;700&display=swap');

                body {
                    font-family: 'Inter', sans-serif;
                }

                .font-dancing-script {
                    font-family: 'Dancing Script', cursive;
                }
                .font-playfair-display {
                    font-family: 'Playfair Display', serif;
                }

                /* Custom Scrollbar for Modal and Dream List */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px; /* Or even smaller, e.g., 4px, to be subtle */
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent; /* Make track transparent */
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(244, 114, 182, 0.5); /* Rose-400 with 50% opacity */
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #ec4899; /* Darker Rose-500 on hover, for slight visibility */
                }

                /* Custom Cursor */
                .cursor-heart {
                    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23ec4899"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>') 12 12, auto;
                }

                /* Preloader Fade Out - Ensured visibility during animation */
                .animate-fade-out-preloader-long {
                    animation: fadeOutPreloaderLong 0.5s ease-out 1.5s forwards; /* Adjusted delay for 2s total display */
                }

                @keyframes fadeOutPreloaderLong {
                    0% { opacity: 1; visibility: visible; }
                    99% { opacity: 0; visibility: visible; }
                    100% { opacity: 0; visibility: hidden; }
                }

                /* Main Content Fade In - Adjusted delay to match preloader */
                .animate-fade-in-long {
                    animation: fadeIn 1s ease-in 2s forwards; /* Starts after preloader completes */
                    opacity: 0;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* Preloader Party Popper Animations */
                .animate-bounce-in-left {
                    animation: bounceInLeft 1s ease-out forwards;
                }
                .animate-bounce-in-right {
                    animation: bounceInRight 1s ease-out forwards;
                }

                @keyframes bounceInLeft {
                    0% { transform: translateX(-100vw); opacity: 0; }
                    60% { transform: translateX(0); opacity: 1; }
                    80% { transform: translateX(-10px); }
                    100% { transform: translateX(0); }
                }

                @keyframes bounceInRight {
                    0% { transform: translateX(100vw); opacity: 0; }
                    60% { transform: translateX(0); opacity: 1; }
                    80% { transform: translateX(10px); }
                    100% { transform: translateX(0); }
                }

                /* Floating Balloons Effect (Global) */
                .animate-float-1 { animation: float1 8s ease-in-out infinite; }
                .animate-float-2 { animation: float2 9s ease-in-out infinite; }
                .animate-float-3 { animation: float3 7s ease-in-out infinite; }

                @keyframes float1 {
                    0% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                    100% { transform: translateY(0) rotate(0deg); }
                }

                @keyframes float2 {
                    0% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(-7deg); }
                    100% { transform: translateY(0) rotate(0deg); }
                }

                @keyframes float3 {
                    0% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(3deg); }
                    100% { transform: translateY(0) rotate(0deg); }
                }

                /* Lighting Pulse (Global and for cake elements) */
                .animate-pulse {
                    animation: pulse 2s infinite alternate;
                }

                @keyframes pulse {
                    0% { opacity: 0.4; transform: scale(1); }
                    100% { opacity: 0.6; transform: scale(1.05); }
                }

                /* Preloader Pulse (more gentle) */
                .animate-pulse-preloader {
                    animation: pulsePreloader 1.5s infinite alternate;
                }

                @keyframes pulsePreloader {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.05); }
                }

                /* Heart Beat */
                .animate-bounce-slow {
                    animation: bounceSlow 2s infinite ease-in-out;
                }
                @keyframes bounceSlow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                /* Pop In for Cake */
                .animate-pop-in {
                    animation: popIn 0.8s ease-out forwards;
                }
                @keyframes popIn {
                    0% { transform: scale(0); opacity: 0; }
                    80% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); }
                }

                /* Icon Spin */
                .animate-spin-slow {
                    animation: spinSlow 5s linear infinite;
                }
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Icon Pulse */
                .animate-pulse-slow {
                    animation: pulseSlow 3s infinite alternate;
                }
                @keyframes pulseSlow {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                /* Sparkle Effect */
                .sparkle-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                    z-index: 0;
                }

                .sparkle {
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    opacity: 0;
                    box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
                    animation: sparkle-anim 3s ease-out infinite;
                }

                @keyframes sparkle-anim {
                    0% { transform: scale(0) rotate(0deg); opacity: 0; }
                    20% { transform: scale(1) rotate(45deg); opacity: 1; }
                    80% { opacity: 0; }
                    100% { transform: scale(0) rotate(90deg); opacity: 0; }
                }

                /* Candle Flame Animation */
                .animate-flame {
                    animation: realisticFlame 0.4s infinite alternate;
                }

                @keyframes realisticFlame {
                    0% { transform: scale(1) translateY(0px) skewX(0deg); opacity: 1; filter: brightness(1.2); }
                    25% { transform: scale(1.05) translateY(-1px) skewX(1deg); opacity: 0.95; filter: brightness(1.5); }
                    50% { transform: scale(0.98) translateY(0.5px) skewX(-1deg); opacity: 1; filter: brightness(1.1); }
                    75% { transform: scale(1.02) translateY(-0.5px) skewX(0.5deg); opacity: 0.98; filter: brightness(1.3); }
                    100% { transform: scale(1) translateY(0px) skewX(0deg); opacity: 1; filter: brightness(1.2); }
                }


                /* Floating Message Animation */
                .animate-fade-in-up-float {
                    animation: fadeInUpFloat 0.7s ease-out forwards;
                }

                @keyframes fadeInUpFloat {
                    0% { opacity: 0; transform: translateY(20px) translateX(-50%); }
                    100% { opacity: 1; transform: translateY(0) translateX(-50%); }
                }

                /* Cake Side Elements - Initial Entrance then Subtle Float */
                .animate-left-side-intro {
                    animation: leftSideIntro 3s ease-out 3s forwards, floatSubtle 4s ease-in-out 6s infinite alternate;
                }

                .animate-right-side-intro {
                    animation: rightSideIntro 3s ease-out 3s forwards, floatSubtle 4s ease-in-out 6s infinite alternate;
                }

                @keyframes leftSideIntro {
                    0% { transform: translateX(calc(-100vw - 50px)) translateY(-50%); opacity: 0; }
                    100% { transform: translateX(0) translateY(-50%); opacity: 1; }
                }

                @keyframes rightSideIntro {
                    0% { transform: translateX(calc(100vw + 50px)) translateY(-50%); opacity: 0; }
                    100% { transform: translateX(0) translateY(-50%); opacity: 1; }
                }

                /* Subtle floating animation after initial entry */
                .animate-float-subtle {
                    animation: floatSubtle 4s ease-in-out infinite alternate;
                }

                @keyframes floatSubtle {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }

                /* New: Pop-up Modal animations for the envelope opening */
                .animate-pop-up-open {
                    animation: popUpOpen 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; /* Springy pop effect */
                }

                @keyframes popUpOpen {
                    0% { transform: scale(0.5); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .card-unfold-flap {
                    clip-path: polygon(0 0, 100% 0, 50% 100%); /* Triangle shape for flap */
                    transform-origin: top center; /* Rotate around the top edge */
                    animation: unfoldFlap 1.2s ease-out forwards; /* Slower unfold */
                }

                @keyframes unfoldFlap {
                    0% { transform: rotateX(0deg); z-index: 2; }
                    100% { transform: rotateX(180deg); z-index: 0; } /* Flap rotates back, moves behind content */
                }

                .animate-fade-in-content {
                    animation: fadeInContent 1.5s ease-in forwards; /* Slower fade in */
                    opacity: 0; /* Start hidden */
                }
                @keyframes fadeInContent {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }


                /* Dream List Item Fade-in */
                @keyframes fade-in-item {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-item {
                    animation: fade-in-item 0.3s ease-out forwards;
                }

                /* Floating Party Popper Animation */
                .party-popper {
                    position: fixed; /* Changed to fixed for full page float */
                    animation: floatPopper 15s linear infinite;
                    pointer-events: none;
                    z-index: 100; /* High z-index */
                    opacity: 0.8;
                    font-size: 3rem; /* Default size */
                }

                /* Random positions for party poppers, applied via JS */
                .party-popper:nth-child(1) { left: 10%; top: 10%; animation-delay: 1s; }
                .party-popper:nth-child(2) { left: 80%; top: 20%; animation-delay: 3s; font-size: 2.5rem; }
                .party-popper:nth-child(3) { left: 30%; top: 70%; animation-delay: 5s; font-size: 3.5rem; }
                .party-popper:nth-child(4) { left: 50%; top: 5%; animation-delay: 7s; font-size: 2rem; }
                .party-popper:nth-child(5) { left: 5%; top: 80%; animation-delay: 9s; font-size: 4rem; }
                .party-popper:nth-child(6) { left: 90%; top: 50%; animation-delay: 11s; font-size: 3rem; }
                .party-popper:nth-child(7) { left: 40%; top: 40%; animation-delay: 13s; font-size: 2.8rem; }


                @keyframes floatPopper {
                    0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { transform: translate(calc(var(--float-end-x)), calc(var(--float-end-y))) rotate(calc(var(--float-end-deg))); opacity: 0; }
                }
                /* These variables need to be set per element or using JS for true randomness */
                /* For now, using placeholders for illustration */
                .party-popper:nth-child(1) { --float-end-x: 50vw; --float-end-y: 80vh; --float-end-deg: 720deg;}
                .party-popper:nth-child(2) { --float-end-x: -30vw; --float-end-y: 60vh; --float-end-deg: -540deg;}
                .party-popper:nth-child(3) { --float-end-x: 20vw; --float-end-y: -70vh; --float-end-deg: 900deg;}
                .party-popper:nth-child(4) { --float-end-x: -80vw; --float-end-y: -30vh; --float-end-deg: -360deg;}
                .party-popper:nth-child(5) { --float-end-x: 70vw; --float-end-y: 10vh; --float-end-deg: 600deg;}
                .party-popper:nth-child(6) { --float-end-x: -40vw; --float-end-y: -20vh; --float-end-deg: 450deg;}
                .party-popper:nth-child(7) { --float-end-x: 10vw; --float-end-y: 90vh; --float-end-deg: -720deg;}

                /* Photo animations */
                /* Base transition for all photo movements */
                .photo-item-transition {
                    transition: transform 0.7s ease-in-out, left 0.7s ease-in-out, top 0.7s ease-in-out, width 0.7s ease-in-out, height 0.7s ease-in-out, opacity 0.7s ease-in-out, z-index 0s;
                }

                .animate-fade-in-slow {
                    animation: fadeInSlow 1.5s ease-in forwards;
                    opacity: 0;
                }

                @keyframes fadeInSlow {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                /* Quiz button pulse */
                .animate-pulse-quiz-button {
                    animation: pulse-quiz 1.5s infinite alternate;
                }

                @keyframes pulse-quiz {
                    0% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                    100% { transform: scale(1.05); box-shadow: 0 8px 12px rgba(0,0,0,0.2); }
                }

                /* Quiz feedback fade in/out */
                .animate-fade-in-out-feedback {
                    animation: fade-in-out-feedback 2s forwards;
                }

                @keyframes fade-in-out-feedback {
                    0% { opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { opacity: 0; }
                }

            `}</style>
        </div>
    );
};

export default App;
