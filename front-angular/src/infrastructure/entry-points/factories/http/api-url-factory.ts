export const makeApiUrl = (path: string, params?: string): string => {
    let queryString = `${path}`;
    if (params) queryString = `${path}?query=${params}`

    return `http://localhost:8000/api/${queryString}`
}
