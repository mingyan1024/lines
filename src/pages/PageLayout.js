import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/PageLayout.css';

export default function PageLayout({ zh, en }) {
    const [lang, setLang] = useState('zh');
    const t = lang === 'zh' ? zh : en;

    return (
        <div className="page-screen">
            <div className="page-nav">
                <Link to="/" className="page-back">
                    {lang === 'zh' ? '← 返回提词器' : '← Back to Teleprompter'}
                </Link>
                <button className="lang-btn" onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}>
                    {lang === 'zh' ? 'EN' : '中文'}
                </button>
            </div>
            <div className="page-content">
                <h1 className="page-title">{t.title}</h1>
                {t.body}
            </div>
            <footer className="config-footer">
                <Link to="/privacy" className="footer-link">{lang === 'zh' ? '隐私政策' : 'Privacy Policy'}</Link>
                {' · '}
                <Link to="/contact" className="footer-link">{lang === 'zh' ? '联系我们' : 'Contact'}</Link>
                {' · '}
                <Link to="/about" className="footer-link">{lang === 'zh' ? '关于' : 'About'}</Link>
            </footer>
        </div>
    );
}
