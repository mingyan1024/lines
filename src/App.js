import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const I18N = {
    zh: {
        title: '提词器',
        textLabel: '文案内容',
        textPlaceholder: '在这里粘贴或输入文案内容...',
        speedLabel: '滚动速度',
        fontLabel: '字体大小',
        slow: '慢',
        fast: '快',
        small: '小',
        large: '大',
        playBtn: '▶ 开始播放',
        hint: 'Space 暂停 · 滚轮调进度 · Esc 退出',
        footerContact: '发现 Bug？欢迎联系',
    },
    en: {
        title: 'Teleprompter',
        textLabel: 'Script',
        textPlaceholder: 'Paste or type your script here...',
        speedLabel: 'Scroll Speed',
        fontLabel: 'Font Size',
        slow: 'Slow',
        fast: 'Fast',
        small: 'Small',
        large: 'Large',
        playBtn: '▶ Start',
        hint: 'Space pause · Scroll to seek · Esc exit',
        footerContact: 'Found a bug? Contact',
    },
};

const STORAGE_KEYS = {
    text: 'lines.teleprompter.text',
    lang: 'lines.teleprompter.lang',
    speed: 'lines.teleprompter.speed',
    fontSize: 'lines.teleprompter.fontSize',
};

const readStorage = (key, fallback) => {
    try {
        const value = window.localStorage.getItem(key);
        return value === null ? fallback : value;
    } catch {
        return fallback;
    }
};

const readNumberStorage = (key, fallback) => {
    const value = Number(readStorage(key, fallback));
    return Number.isFinite(value) ? value : fallback;
};

export default function App() {
    const [screen, setScreen] = useState('config'); // 'config' | 'play'
    const [lang, setLang] = useState(() => readStorage(STORAGE_KEYS.lang, 'zh'));
    const [text, setText] = useState(() => readStorage(STORAGE_KEYS.text, ''));
    const [speed, setSpeed] = useState(() => readNumberStorage(STORAGE_KEYS.speed, 50)); // px per second
    const [fontSize, setFontSize] = useState(() => readNumberStorage(STORAGE_KEYS.fontSize, 48));
    const [playing, setPlaying] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const containerRef = useRef(null);
    const rafRef = useRef(null);
    const lastTimeRef = useRef(null);
    const scrollYRef = useRef(0);

    // Keep ref in sync
    scrollYRef.current = scrollY;

    const lines = text.split('\n');

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEYS.text, text);
        } catch {
            // Ignore storage errors, such as private browsing restrictions.
        }
    }, [text]);

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEYS.lang, lang);
            window.localStorage.setItem(STORAGE_KEYS.speed, String(speed));
            window.localStorage.setItem(STORAGE_KEYS.fontSize, String(fontSize));
        } catch {
            // Ignore storage errors, such as private browsing restrictions.
        }
    }, [lang, speed, fontSize]);

    const clearSavedDraft = () => {
        setText('');
        try {
            window.localStorage.removeItem(STORAGE_KEYS.text);
        } catch {
            // Ignore storage errors, such as private browsing restrictions.
        }
    };

    const startPlay = () => {
        setScrollY(0);
        scrollYRef.current = 0;
        setPlaying(true);
        setScreen('play');
        document.documentElement.requestFullscreen?.();
    };

    const stopPlay = () => {
        setScreen('config');
        setPlaying(false);
        setScrollY(0);
        cancelAnimationFrame(rafRef.current);
        lastTimeRef.current = null;
        if (document.fullscreenElement) document.exitFullscreen?.();
    };

    // Animation loop
    const animate = useCallback((timestamp) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const delta = timestamp - lastTimeRef.current;
        lastTimeRef.current = timestamp;

        setScrollY(prev => {
            const container = containerRef.current;
            if (!container) return prev;
            const maxScroll = container.scrollHeight - container.clientHeight;
            const next = prev + (speed / 1000) * delta;
            return Math.min(next, maxScroll);
        });

        rafRef.current = requestAnimationFrame(animate);
    }, [speed]);

    // Start/pause animation
    useEffect(() => {
        if (screen !== 'play') return;
        if (playing) {
            lastTimeRef.current = null;
            rafRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(rafRef.current);
            lastTimeRef.current = null;
        }
        return () => cancelAnimationFrame(rafRef.current);
    }, [playing, screen, animate]);

    // Sync scrollY to DOM
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = scrollY;
        }
    }, [scrollY]);

    // Space to pause/resume
    useEffect(() => {
        if (screen !== 'play') return;
        const onKey = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setPlaying(p => !p);
            }
            if (e.code === 'Escape') {
                stopPlay();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [screen]);

    // Exit play when fullscreen is dismissed (e.g. browser Esc)
    useEffect(() => {
        const onFsChange = () => {
            if (!document.fullscreenElement && screen === 'play') {
                stopPlay();
            }
        };
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, [screen]);

    // Mouse wheel to scrub
    useEffect(() => {
        if (screen !== 'play') return;
        const onWheel = (e) => {
            e.preventDefault();
            const container = containerRef.current;
            if (!container) return;
            const maxScroll = container.scrollHeight - container.clientHeight;
            setScrollY(prev => Math.max(0, Math.min(prev + e.deltaY * 2, maxScroll)));
        };
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, [screen]);

    if (screen === 'play') {
        return (
            <div className="play-screen" ref={containerRef}>
                <div className="play-content" style={{ fontSize }}>
                    {lines.map((line, i) => (
                        <div key={i} className="play-line">
                            {line || '\u00A0'}
                        </div>
                    ))}
                    <div className="play-padding" />
                </div>
                <div className="play-center-line" />
                <div className="play-hint">{I18N[lang].hint}</div>
            </div>
        );
    }

    return (
        <div className="config-screen">
            <div className="config-header">
                <h1 className="config-title">{I18N[lang].title}</h1>
                <button className="lang-btn" onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}>
                    {lang === 'zh' ? 'EN' : '中文'}
                </button>
            </div>

            <div className="config-main-row">
                <div className="config-section config-textarea-col">
                    <label className="config-label">{I18N[lang].textLabel}</label>
                    <textarea
                        className="config-textarea"
                        placeholder={I18N[lang].textPlaceholder}
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>

                <div className="config-side-col">
                    <div className="config-row">
                        <div className="config-section config-half">
                            <label className="config-label">
                                {I18N[lang].speedLabel} <span className="config-value">{speed} px/s</span>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="300"
                                value={speed}
                                onChange={e => setSpeed(Number(e.target.value))}
                                className="config-slider"
                            />
                            <div className="config-range-hint">
                                <span>{I18N[lang].slow}</span><span>{I18N[lang].fast}</span>
                            </div>
                        </div>

                        <div className="config-section config-half">
                            <label className="config-label">
                                {I18N[lang].fontLabel} <span className="config-value">{fontSize}px</span>
                            </label>
                            <input
                                type="range"
                                min="24"
                                max="120"
                                value={fontSize}
                                onChange={e => setFontSize(Number(e.target.value))}
                                className="config-slider"
                            />
                            <div className="config-range-hint">
                                <span>{I18N[lang].small}</span><span>{I18N[lang].large}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="play-button"
                        onClick={startPlay}
                        disabled={!text.trim()}
                    >
                        {I18N[lang].playBtn}
                    </button>
                    <button
                        className="clear-draft-button"
                        onClick={clearSavedDraft}
                        disabled={!text}
                    >
                        {lang === 'zh' ? '清空暂存' : 'Clear saved draft'}
                    </button>
                </div>{/* config-side-col */}
            </div>{/* config-main-row */}

            <footer className="config-footer">
                {I18N[lang].footerContact}{' '}
                <a href="mailto:mycoolbb@gmail.com" className="footer-link">mycoolbb@gmail.com</a>
                <span className="footer-sep"> · </span>
                <Link to="/privacy" className="footer-link">{lang === 'zh' ? '隐私政策' : 'Privacy Policy'}</Link>
                <span className="footer-sep"> · </span>
                <Link to="/contact" className="footer-link">{lang === 'zh' ? '联系我们' : 'Contact'}</Link>
                <span className="footer-sep"> · </span>
                <Link to="/about" className="footer-link">{lang === 'zh' ? '关于' : 'About'}</Link>
            </footer>
        </div>
    );
}
