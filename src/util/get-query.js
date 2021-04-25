function getQuery (value, location = window.location) {
    const query = location.search.substring(1)
    const list = query.split('&')
    for (let i = 0; i < list.length; i++) {
        const pair = list[i].split('=')
        if (pair[0] === value) {
            return pair[1]
        }
    }
}

export default getQuery
