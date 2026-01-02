
import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text, className = "" }) => {
  if (!text) return null;
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ 
        __html: text.replace(/\n/g, '<br />')
      }}
    />
  );
};

export default FormattedText;
