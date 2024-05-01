import React from 'react';

import './ContactStatus.css';

export const ContactStatus = ({ text, contentClass = '', showText = true }: { text: string, contentClass?: string, showText?: boolean }) => (
  <div className={`status status-contact status-${text?.toLowerCase()} ${contentClass}`}>
    <span>{showText ? text : ''}</span>
  </div>
);