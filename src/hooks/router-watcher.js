import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const useWatcher = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const routerParams = useParams();
    const [pathname, setPathname] = useState('/');
    const listeners = useRef([])

    const addListener = useCallback((listener) => {
        let res = listeners.current.find(listener);
        if (res === undefined) {
            listeners.current.push(listener);
        }
    }, []);

    const removeListener = useCallback((listener) => {
        const index = listeners.current.findIndex(item => item === listener);
        if (index >= 0) {
            listeners.current.splice(index, 1);
        }
    }, []);

    const execListeners = useCallback(() => {
        listeners.current.forEach(func => func({navigate, location, routerParams}));
    }, [navigate, location, routerParams]);

    useEffect(() => {
        console.log('router-watcher location.pathname: ', location.pathname);
        if (pathname !== location.pathname) {
            execListeners();
            setPathname(location.pathname);
        }
    }, [location, execListeners, pathname]);

    return useMemo(() => {
        return {removeListener, addListener};
    }, [removeListener, addListener]);
}

export default useWatcher;