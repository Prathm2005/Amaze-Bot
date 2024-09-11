

import React, { useContext, useEffect, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { context } from '../../context/context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(context);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  useEffect(() => {
    if (isFirstOpen) {
      
      const timer = setTimeout(() => {
        setIsFirstOpen(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [isFirstOpen]);

  const loadthepage = () => {
    window.location.reload();
  };

  const clickcards = (Text) => {
    setInput(Text);
    onSent(Text);
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p onClick={loadthepage}>AmazeBot</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className={`intro ${isFirstOpen ? 'show' : 'hide'}`}>
        <img src={assets.user_icon} alt="Logo" />
        <p>Welcome to AmazeBot!</p>
      </div>
      <div className='main-container'>
        {!showResult ? (
          <>
            <div className="great">
              <p><span>Hello, Buddy..</span></p>
              <p>How Can I Help You...</p>
            </div>
            <div className="cards">
              <div onClick={() => clickcards('How AI transforms industries and job markets.')} className="card">
                <p>How AI transforms industries and job markets.</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div onClick={() => clickcards('How renewable energy reduces carbon emissions.')} className="card">
                <p>How renewable energy reduces carbon emissions.</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className='result'>
            <div className="result-title">
              <img style={{ height: 90, width: 100, borderRadius: 50, cursor: 'pointer' }} src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className='Result-data'>
              <img style={{ height: 40 }} src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Write your text' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <div className='bottom-text'>
            <p>© 2024 AmazeBot Inc. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;


