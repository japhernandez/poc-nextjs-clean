export const makeApiUrl = (path: string, params?: string): string => {
    let queryString = `${path}`;
    if (params) queryString = `${path}?query=${params}`

    return `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/${queryString}`
}
