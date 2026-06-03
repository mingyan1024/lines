import PageLayout from './PageLayout';

const zh = {
    title: '关于我们',
    body: (
        <>
            <div className="page-section">
                <h2>什么是提词器？</h2>
                <p>
                    lines.gaomian.org 提供一款免费的在线提词器工具，帮助主播、演讲者、视频创作者在录制时流畅朗读脚本，
                    无需安装任何软件，打开浏览器即可使用。
                </p>
            </div>
            <div className="page-section">
                <h2>主要功能</h2>
                <ul>
                    <li>全屏模式，沉浸式提词体验</li>
                    <li>可调节滚动速度与字体大小</li>
                    <li>空格键暂停 / 继续，鼠标滚轮调整进度</li>
                    <li>支持中英文界面切换</li>
                    <li>无需注册，无需登录，完全免费</li>
                </ul>
            </div>
            <div className="page-section">
                <h2>隐私承诺</h2>
                <p>
                    所有内容均在你的浏览器本地处理，我们不会收集或存储你的任何文案内容。
                </p>
            </div>
            <div className="page-section">
                <h2>联系我们</h2>
                <p>有任何建议或问题，欢迎发邮件至 <a href="mailto:mycoolbb@gmail.com">mycoolbb@gmail.com</a></p>

                <p>个人博客 <a href="https://gaomian.org" target="_blank" rel="noreferrer">gaomian.org</a></p>
            </div>
        </>
    ),
};

const en = {
    title: 'About',
    body: (
        <>
            <div className="page-section">
                <h2>What is this?</h2>
                <p>
                    lines.gaomian.org offers a free online teleprompter tool to help broadcasters, speakers, and video
                    creators read their scripts smoothly during recording — no installation required, works in any
                    modern browser.
                </p>
            </div>
            <div className="page-section">
                <h2>Key Features</h2>
                <ul>
                    <li>Fullscreen mode for distraction-free prompting</li>
                    <li>Adjustable scroll speed and font size</li>
                    <li>Space bar to pause/resume; mouse wheel to scrub</li>
                    <li>Chinese / English interface</li>
                    <li>No registration, no login, completely free</li>
                </ul>
            </div>
            <div className="page-section">
                <h2>Privacy</h2>
                <p>
                    Everything runs locally in your browser. We never collect or store your script content.
                </p>
            </div>
            <div className="page-section">
                <h2>Contact</h2>
                <p>Questions or suggestions? Email us at <a href="mailto:mycoolbb@gmail.com">mycoolbb@gmail.com</a></p>
                <p>Personal blog: <a href="https://gaomian.org" target="_blank" rel="noreferrer">gaomian.org</a></p>
            </div>
        </>
    ),
};

export default function About() {
    return <PageLayout zh={zh} en={en} />;
}
