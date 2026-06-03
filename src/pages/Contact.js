import PageLayout from './PageLayout';

const zh = {
    title: '联系我们',
    body: (
        <>
            <div className="page-section">
                <p>如果你在使用提词器时遇到了 Bug、有功能建议，或任何其他问题，欢迎随时联系我们。</p>
            </div>
            <div className="page-section">
                <h2>邮件联系</h2>
                <p>
                    <a href="mailto:mycoolbb@gmail.com">mycoolbb@gmail.com</a>
                </p>
                <p>我们通常会在 1-3 个工作日内回复。</p>
            </div>
            <div className="page-section">
                <h2>反馈内容建议包含</h2>
                <ul>
                    <li>问题描述（越详细越好）</li>
                    <li>使用的浏览器及版本</li>
                    <li>操作系统（Windows / macOS / iOS / Android）</li>
                    <li>如有截图请一并附上</li>
                </ul>
            </div>
        </>
    ),
};

const en = {
    title: 'Contact',
    body: (
        <>
            <div className="page-section">
                <p>Found a bug, have a feature request, or just want to say hello? Feel free to reach out.</p>
            </div>
            <div className="page-section">
                <h2>Email</h2>
                <p>
                    <a href="mailto:mycoolbb@gmail.com">mycoolbb@gmail.com</a>
                </p>
                <p>We typically reply within 1–3 business days.</p>
            </div>
            <div className="page-section">
                <h2>Helpful to include</h2>
                <ul>
                    <li>A description of the issue (the more detail the better)</li>
                    <li>Your browser and version</li>
                    <li>Your operating system (Windows / macOS / iOS / Android)</li>
                    <li>A screenshot if applicable</li>
                </ul>
            </div>
        </>
    ),
};

export default function Contact() {
    return <PageLayout zh={zh} en={en} />;
}
