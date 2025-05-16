import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Or whatever global CSS you're using
import SurveyWrapper from './SurveyWrapper.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SurveyWrapper />
  </React.StrictMode>
);
