export function plainText(content: string) {
    return content.replace(/<[^>]*>/g, ' ').replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[#*_~>`]/g, '').replace(/\s+/g, ' ').trim();
}
export function readingTime(content: string) {
    return Math.max(1, Math.ceil(plainText(content).split(/\s+/).filter(Boolean).length / 200));
}
export function formatDate(value: string | Date) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 'Undated' : new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}
