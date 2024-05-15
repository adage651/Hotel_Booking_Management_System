import React from 'react';
import { Button } from 'primereact/button';
import {redirect } from 'react-router-dom'

const LoginErrorPage = () => {

    return (
       <div>


        <svg viewBox="0 0 960 540"   version="1.1" class="min-h-screen min-w-screen fixed left-0" preserveAspectRatio="none" style={{bottom: "-10rem;"}}><rect x="0" y="0" width="960" height="540" fill="var(--surface-ground)"></rect><path d="M0 331L26.7 321C53.3 311 106.7 291 160 291C213.3 291 266.7 311 320 329.5C373.3 348 426.7 365 480 373.2C533.3 381.3 586.7 380.7 640 373.8C693.3 367 746.7 354 800 341.2C853.3 328.3 906.7 315.7 933.3 309.3L960 303L960 541L933.3 541C906.7 541 853.3 541 800 541C746.7 541 693.3 541 640 541C586.7 541 533.3 541 480 541C426.7 541 373.3 541 320 541C266.7 541 213.3 541 160 541C106.7 541 53.3 541 26.7 541L0 541Z" fill="var(--orange-500)" stroke-linecap="round" stroke-linejoin="miter"></path></svg>
        <div class="px-5 min-h-screen flex justify-content-center align-items-center"><div class="z-1 text-center"><div class="text-900 font-bold text-8xl mb-4">Oops!</div><p class="line-height-3 mt-0 mb-5 text-700 text-xl font-medium">There is nothing here</p><a href="/"><button type="button" class="p-button p-button-warning font-medium p-button-raised">Go to Dashboard</button></a></div></div>
        <button class="layout-config-button config-link" type="button"><i class="pi pi-cog"></i></button>


       </div>
    );
};

export default LoginErrorPage;
