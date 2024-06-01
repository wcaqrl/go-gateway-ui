import React, { Suspense, lazy } from 'react';
import { useRoutes, Navigate } from "react-router-dom";
import config from "./config";
import { CacheUtil } from "./utils/cache";


let routes = [
    {
        path: "/login",
        title: "登录",
        component: lazy(() => import('./pages/login')),
    },
    {
        path: "/",
        title: config.app_name,
        auth: true,
        component: lazy(() => import('./pages/home')),
        children: [
            {
                index: true,
                title: "数据分析",
                component: lazy(() => import('./pages/analysis')),
            },
            {
                path: "admin",
                title: "管理员列表",
                component: lazy(() => import('./pages/admin')),
                children: [
                    {
                        index: true,
                        title: "管理员列表",
                        component: lazy(() => import('./pages/admin/components/list')),
                    },
                    {
                        path: "show/:id",
                        title: "管理员查看",
                        component: lazy(() => import('./pages/admin/components/show')),
                    },
                    {
                        path: "add",
                        title: "管理员添加",
                        component: lazy(() => import('./pages/admin/components/action')),
                    },
                    {
                        path: "edit/:id",
                        title: "管理员编辑",
                        component: lazy(() => import('./pages/admin/components/action')),
                    },
                    {
                        path: "change/:id",
                        title: "管理员密码修改",
                        component: lazy(() => import('./pages/admin/components/change')),
                    },
                ]
            },
            {
                path: "tenant",
                title: "租户列表",
                component: lazy(() => import('./pages/tenant')),
                children: [
                    {
                        index: true,
                        title: "租户列表",
                        component: lazy(() => import('./pages/tenant/components/list')),
                    },
                    {
                        path: "show/:id",
                        title: "租户查看",
                        component: lazy(() => import('./pages/tenant/components/show')),
                    },
                    {
                        path: "add",
                        title: "租户添加",
                        component: lazy(() => import('./pages/tenant/components/action')),
                    },
                    {
                        path: "edit/:id",
                        title: "租户编辑",
                        component: lazy(() => import('./pages/tenant/components/action')),
                    },
                ]
            },
            {
                path: "basis",
                title: "服务列表",
                component: lazy(() => import('./pages/basis')),
                children: [
                    {
                        index: true,
                        title: "服务列表",
                        component: lazy(() => import('./pages/basis/components/list')),
                    },
                    {
                        path: "show/:id",
                        title: "服务查看",
                        component: lazy(() => import('./pages/basis/components/show')),
                    },
                    {
                        path: "add",
                        title: "服务添加",
                        component: lazy(() => import('./pages/basis/components/action')),
                    },
                    {
                        path: "edit/:id",
                        title: "服务编辑",
                        component: lazy(() => import('./pages/basis/components/action')),
                    },
                    {
                        path: "stat/:id",
                        title: "服务统计",
                        component: lazy(() => import('./pages/basis/components/stat')),
                    }
                ]
            },
            {
                path: "*",
                title: "页面未找到",
                component: lazy(() => import('./pages/not-found')),
            }
        ],
    },
];

const assembleRoute = (path: string, auth: boolean, routes: Array<any>) => {
    return routes.map((item: any) => {
        let thePath = path + '/' + item.path;
        thePath     = thePath.replace(/\/\/+/g, "/");
        item.auth   = item.auth ? item.auth : auth;
        item.to     = thePath;
        if (item.children) {
            item.children = assembleRoute(thePath, item.auth, item.children);
        }
        return item;
    });
}

routes = assembleRoute("/", false, routes);

// 生成路由
function genRoutes(routes: any) {
    const list = [];
    routes.map((item: any) => {
        const obj = { ...item };
        obj.element = <Suspense fallback={<div style={{display: 'flex'}}></div>}>
            <obj.component />
        </Suspense>;
        if (obj.children) {
            obj.children = genRoutes(obj.children);
        }
        ['component', 'title', 'auth'].forEach(name => delete obj[name]);
        list.push(obj);
    });
    return list;
}

const Router = () => useRoutes(genRoutes(routes));

function comparePath(pathname: string, path: string) {
    if (path.indexOf(":") !== -1) {
        const patt = /\/:\w+/g;
        let reg = '^' + path.replace(patt, "/\\w+").replace(/\//g, '\\/') + '$';
        return new RegExp(reg).test(pathname);
    } else {
        return pathname === path;
    }
}


// 根据路径查找路由
const searchRoute = (pathname: string, routes: Array<any>) => {
    for (const item of routes) {
        if (comparePath(pathname, item.to)) return item;
        if (item.children) {
            const res = searchRoute(pathname, item.children);
            if (res) return res;
        }
    }
    return null;
};

const CheckRouter = (pathname: string) => searchRoute(pathname, routes)


const OnRouterBefore = function ({navigate, location, routerParams}) {
    let r = CheckRouter(location.pathname);
    console.log('onRouterBefore location.pathname: ', location.pathname);
    if (r && r.title) {
        document.title = r.title || config.app_name;
    }
    if (r && r.to === '/login') {
        return;
    }

    // return;
    if (r && r.auth) {
        // token权限验证
        const token = (new CacheUtil()).getExpire('token') || '';
        if (!token) {
            navigate('/login', {replace: true});
        }
    }
}

export { Router, CheckRouter, OnRouterBefore }


