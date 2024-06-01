
export default {
    "app_name": process.env.REACT_APP_APP_NAME,
    "govern_host": process.env.REACT_APP_GOVERN_HOST,
    "govern_api": process.env.REACT_APP_GOVERN_API,
    "token_cache_time": parseInt(process.env.REACT_APP_TOKEN_CACHE_TIME),
    "perpage": parseInt(process.env.REACT_APP_PERPAGE),
    "show_pages": parseInt(process.env.REACT_APP_SHOW_PAGES),
    "is_ellipsis": Boolean(process.env.REACT_APP_IS_ELLIPSIS),
}