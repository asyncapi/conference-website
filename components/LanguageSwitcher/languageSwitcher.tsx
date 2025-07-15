import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'select';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '', 
  variant = 'dropdown' 
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (isAnimating) return;
    
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleClose = () => {
    setIsAnimating(true);
    setIsOpen(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleLanguageChange = (languageCode: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: languageCode });
    handleClose();
  };

  if (variant === 'select') {
    return (
      <select
        value={currentLanguage.code}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className={`bg-transparent text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 ${className}`}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.name}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={handleToggle}
        disabled={isAnimating}
        className={`
          group relative flex items-center space-x-3 px-4 py-2.5 
          bg-gradient-to-r from-gray-800/50 to-gray-900/50 
          backdrop-blur-sm border border-gray-600/50 
          hover:border-blue-400/60 hover:from-blue-900/30 hover:to-blue-800/30
          focus:outline-none focus:ring-2 focus:ring-blue-400/30
          rounded-xl transition-all duration-300 ease-out
          transform hover:scale-105 active:scale-95
          shadow-lg hover:shadow-xl hover:shadow-blue-500/10
          ${isOpen ? 'border-blue-400/60 from-blue-900/30 to-blue-800/30' : ''}
        `}
        aria-label={t('common.language')}
      >
        {/* Flag */}
        <div className="relative">
          <span className="text-xl filter drop-shadow-sm">{currentLanguage.flag}</span>
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Language Name */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-200">
            {currentLanguage.name}
          </span>
          <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
            {currentLanguage.nativeName}
          </span>
        </div>

        {/* Dropdown Arrow */}
        <div className={`
          relative w-4 h-4 transition-transform duration-300 ease-out
          ${isOpen ? 'rotate-180' : 'rotate-0'}
        `}>
          <svg 
            className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`
          absolute right-0 mt-3 w-64 
          bg-gradient-to-b from-gray-900/95 to-gray-800/95 
          backdrop-blur-xl border border-gray-600/50 
          rounded-2xl shadow-2xl shadow-black/50 z-50
          transform transition-all duration-300 ease-out
          ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
        `}>
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-600/30">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              {t('common.selectLanguage')}
            </h3>
          </div>

          {/* Language List */}
          <div className="py-2 max-h-64 overflow-y-auto custom-scrollbar">
            {languages.map((language, index) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`
                  w-full text-left px-4 py-3 
                  hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20
                  transition-all duration-200 ease-out
                  transform hover:translate-x-1
                  group/language
                  ${language.code === currentLanguage.code
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-r-2 border-blue-400'
                    : ''
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center space-x-3">
                  {/* Flag */}
                  <div className="relative">
                    <span className="text-lg filter drop-shadow-sm group-hover/language:scale-110 transition-transform duration-200">
                      {language.flag}
                    </span>
                    {language.code === currentLanguage.code && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  {/* Language Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className={`
                        text-sm font-medium truncate
                        ${language.code === currentLanguage.code
                          ? 'text-blue-300'
                          : 'text-white group-hover/language:text-blue-200'
                        }
                        transition-colors duration-200
                      `}>
                        {language.name}
                      </span>
                      {language.code === currentLanguage.code && (
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 group-hover/language:text-gray-300 transition-colors duration-200">
                      {language.nativeName}
                    </span>
                  </div>

                  {/* Check Icon for Current Language */}
                  {language.code === currentLanguage.code && (
                    <svg 
                      className="w-4 h-4 text-blue-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-600/30">
            <p className="text-xs text-gray-500 text-center">
              {t('common.languageNote')}
            </p>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={handleClose}
        />
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher; 