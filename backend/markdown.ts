import sanitizeHtml from 'sanitize-html';
const showdown = require('showdown');
export function renderMarkdown(markdown: string): string {
    const converter = new showdown.Converter({ headerLevelStart: 3 });
    return sanitizeHtml(converter.makeHtml(markdown), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt'] },
    });
}
