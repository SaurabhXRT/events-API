export function isBookMyShowUrl(url) {
    var bookMyShowPattern = /https:\/\/in\.bookmyshow\.com\/explore\/events-[a-z]+/i;
    return bookMyShowPattern.test(url);
}
export function isInsiderInUrl(url) {
    var insiderInPattern = /https:\/\/insider\.in\/all-events-in-[a-z]+/i;
    return insiderInPattern.test(url);
}
export function isAlleventsUrl(url) {
    var alleventsPattern = /https:\/\/allevents\.in\/[a-z%0-9\-]+/i;
    return alleventsPattern.test(url);
}
export function isValidQuery(query) {
    var validPattern = /events\s+in\s+[a-z\s]+/i;
    return validPattern.test(query);
}
