
function filterByTitle(needle) {
    const chunks = needle.split(' ');

    return title => {
        return chunks.every(chunk => title.match(getRegExp(chunk)));
    };
}

function getRegExp(needle) {
    return new RegExp(needle, 'i');
}

module.exports = filterByTitle;