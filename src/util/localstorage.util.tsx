export const setAccessToken = (token: string) => {
    window.localStorage.setItem('accessToken', token)
}

export const getAccessToken = () => {
    return window.localStorage.getItem('accessToken')
}

export const clearAccessToken = () => {
    return window.localStorage.removeItem('accessToken')
}
