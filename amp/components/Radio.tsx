// pages/Radio.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Head from 'next/head';
import styles from './Codec.module.css'; // Custom CSS for styling

interface Revisions {
  "*": string;
}

interface Page {
  revisions: Revisions[];
}

interface Pages {
  [key: string]: Page;
}

interface Query {
  pages: Pages;
}

interface ApiResponse {
  query: Query;
}

interface CodecData {
  frequencies: string[];
  gallery: string;
}

interface CharacterImage {
  [key: string]: { image: string };
}

// Define games data
const games: Record<string, CodecData> = {
  '227': { frequencies: ['140.15', '140.48', '140.96', '140.85', '141.52', '141.12', '141.80'], gallery: '227' },
  '11471': { frequencies: ['140.15', '140.48', '140.96', '140.85', '141.52', '141.12', '141.80'], gallery: '150' },
  '15512': { frequencies: ['140.15', '140.48', '140.96', '140.85', '141.52', '141.12', '141.80'], gallery: '149' },
  '11783': { frequencies: ['140.15', '140.48', '140.96', '140.85', '141.52', '141.12', '141.80'], gallery: '11783' },
};

const Radio: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<string>('15512');
  const [currentCodec, setCurrentCodec] = useState<any[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [cImages, setCImages] = useState<CharacterImage>({});
  const [freqCount, setFreqCount] = useState<number>(0);
  const [signalCount, setSignalCount] = useState<number>(7);
  const [dBar, setDBar] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);

  // Fetch Codec data from API
  useEffect(() => {
    fetchCodecData();
    startBarSignal();
  }, [currentGame]); // Add currentGame as dependency to re-fetch when it changes

  // Fetch data with Axios using generics for TypeScript safety
  const fetchCodecData = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `https://metalgear.wikia.com/api.php?format=json&action=query&prop=revisions&rvprop=content&pageids=${currentGame}&rvparse=1`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Ensure safe access to response data
      const pageData = response.data?.query?.pages;
      const pageId = Object.keys(pageData)[0];
      const text = pageData[pageId].revisions[0]['*'];

      parseText(text);
    } catch (error) {
      console.error('Error fetching codec data:', error);
    }
  };

  const parseText = (text: string) => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(text, 'text/html');
    const headers = htmlDoc.querySelectorAll('h3');
    const topics: string[] = [];

    headers.forEach((header) => {
      const topic = header.querySelector('span')?.innerHTML ?? '';
      topics.push(topic);
      setCurrentCodec((prev) => [...prev, { characters: [], conversations: [] }]);
    });
  };

  // Bar Signal Function
  const startBarSignal = () => {
    if (running) return;
    setRunning(true);
    setInterval(() => {
      if (dBar) {
        setSignalCount((prev) => (prev > 0 ? prev - 1 : 0));
        setDBar(false);
      } else {
        setSignalCount((prev) => (prev < 7 ? prev + 1 : 7));
        setDBar(true);
      }
    }, 500);
  };

  const handleChangeFrequency = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setFreqCount((prev) => (prev + 1 >= games[currentGame].frequencies.length ? 0 : prev + 1));
    } else {
      setFreqCount((prev) => (prev - 1 < 0 ? games[currentGame].frequencies.length - 1 : prev - 1));
    }
  };

  return (
    <div className={styles.codecContainer}>
      <Head>
        <title>Codec Interface</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap" rel="stylesheet" />
      </Head>

      <div id="mCodec" className={styles.mCodec}>
        <div id="main-con" className={styles.mainCon}>
          {/* Frequency Display */}
          <div id="left" className={styles.arrow} onClick={() => handleChangeFrequency('left')}>
            <i className="fa fa-caret-left" />
          </div>
          <div id="freq-con">
            <h2 id="freq" className={styles.freq}>
              {games[currentGame].frequencies[freqCount]}
            </h2>
          </div>
          <div id="right" className={styles.arrow} onClick={() => handleChangeFrequency('right')}>
            <i className="fa fa-caret-right" />
          </div>
        </div>

        {/* Character Image Boxes */}
        <div
          id="contact_1"
          className={styles.charBox}
          style={{ backgroundImage: `url(${cImages['Snake']?.image ?? ''})` }}
        ></div>
        <div
          id="contact_2"
          className={styles.charBox}
          style={{ backgroundImage: `url(${cImages['Otacon']?.image ?? ''})` }}
        ></div>

        {/* Conversation Text */}
        <div id="text-con" className={styles.textCon}>
          <h2 id="c-char" className={styles.cChar}>Snake:</h2>
          <h3 id="text" className={styles.convoText}>...</h3>
        </div>

        {/* Bar Animation */}
        <div id="bars-con" className={styles.barsCon}>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.bar}
              animate={{ width: `${(8 - i) * 10}%` }}
              style={{ backgroundColor: i < signalCount ? '#03FB8D' : '#397975' }}
            ></motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Radio;
