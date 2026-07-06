import PageLayout from './PageLayout';

const zh = {
    title: '隐私政策',
    body: (
        <>
            <div className="page-section">
                <p>最后更新：2026 年 6 月 2 日</p>
            </div>
            <div className="page-section">
                <h2>我们收集哪些数据</h2>
                <p>
                    本网站（lines.gaomian.org）是一款纯前端工具，<strong style={{ color: '#e0e0e0' }}>不收集、不上传你的个人信息或文稿内容</strong>。
                    你输入的文稿内容仅在你的浏览器本地运行。为了方便下次继续使用，当前文稿可能会保存在你浏览器的本地存储中，
                    不会上传至任何服务器，你也可以随时在页面中清空暂存内容。
                </p>
            </div>
            <div className="page-section">
                <h2>Cookie 与分析</h2>
                <p>
                    我们目前不使用任何追踪 Cookie 或第三方分析服务。如未来接入 Google AdSense 等广告服务，
                    页面上将会出现相关说明，Google 可能通过 Cookie 投放个性化广告。
                    你可以通过 <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">Google 广告设置</a> 选择退出个性化广告。
                </p>
            </div>
            <div className="page-section">
                <h2>第三方链接</h2>
                <p>本网站不包含第三方链接，不对外部网站的隐私做法负责。</p>
            </div>
            <div className="page-section">
                <h2>联系我们</h2>
                <p>如对隐私政策有疑问，请发送邮件至：<a href="mailto:mycoolbb@gmail.com">mycoolbb@gmail.com</a></p>
            </div>
        </>
    ),
};

const en = {
    title: 'Privacy Policy',
    body: (
        <>
            <div className="page-section">
                <p>Last updated: June 2, 2026</p>
            </div>
            <div className="page-section">
                <h2>Data We Collect</h2>
                <p>
                    This website (lines.gaomian.org) is a purely client-side tool.{' '}
                    <strong style={{ color: '#e0e0e0' }}>We do not collect or upload your personal information or script content.</strong>{' '}
                    The script text you enter runs entirely in your browser. To make it easier to continue later,
                    your current draft may be saved in your browser's local storage. It is never sent to any server,
                    and you can clear the saved draft from the page at any time.
                </p>
            </div>
            <div className="page-section">
                <h2>Cookies &amp; Analytics</h2>
                <p>
                    We currently do not use any tracking cookies or third-party analytics. If Google AdSense
                    or similar advertising services are added in the future, a notice will appear on the page.
                    Google may use cookies to serve personalized ads. You can opt out via{' '}
                    <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">Google Ad Settings</a>.
                </p>
            </div>
            <div className="page-section">
                <h2>Third-Party Links</h2>
                <p>This site contains no third-party links and is not responsible for external privacy practices.</p>
            </div>
            <div className="page-section">
                <h2>Contact</h2>
                <p>For privacy questions, email us at: <a href="mailto:mycoolbb@gmail.com">mycoolbb@gmail.com</a></p>
            </div>
        </>
    ),
};

export default function Privacy() {
    return <PageLayout zh={zh} en={en} />;
}
