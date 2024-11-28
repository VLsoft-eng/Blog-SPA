export function convertUrlsToLinks(text) {
    const urlRegex = /https?:\/\/[^\s]+/g;
    let lastIndex = 0;
    const result = [];

    text.replace(urlRegex, function(match, index) {
        if (index > lastIndex) {
            result.push(document.createTextNode(text.slice(lastIndex, index)));
        }

        const link = document.createElement('a');
        link.href = match;
        link.target = 'blank';
        link.innerText = match
        result.push(link);

        lastIndex = index + match.length;
    });

    if (lastIndex < text.length) {
        result.push(document.createTextNode(text.slice(lastIndex)));
    }

    return result;
}