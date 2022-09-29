import React from 'react';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@misc/window/components/WindowFrame';
import Application from '@components/Application';
import SuperTokens, {
  SuperTokensWrapper,
  getSuperTokensRoutesForReactRouterDom,
} from 'supertokens-auth-react';
import ThirdPartyEmailPasswordReact from 'supertokens-auth-react/recipe/thirdpartyemailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SessionExpiredPopup from '@misc/window/components/SessionExpiredPopup';
import getCookieHandler from '@misc/window/components/cookieHandler';
import getWindowHandler from '@misc/window/components/windowHandler';

// Say something
console.log('[ERWT] : Renderer execution started');

// Application to Render
const app = (
  <WindowFrame title='ERWT Boilerplate' platform='windows'>
    <Application />
  </WindowFrame>
);

// Render application in DOM
createRoot(document.getElementById('app')).render(app);
