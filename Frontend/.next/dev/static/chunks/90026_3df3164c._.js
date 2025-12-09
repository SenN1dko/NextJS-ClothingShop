(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()){
        const existing = query[key];
        if (typeof existing === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            query[key] = [
                existing,
                value
            ];
        }
    }
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string') {
        return param;
    }
    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)){
        if (Array.isArray(value)) {
            for (const item of value){
                searchParams.append(key, stringifyUrlQueryParam(item));
            }
        } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
        }
    }
    return searchParams;
}
function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList){
        for (const key of searchParams.keys()){
            target.delete(key);
        }
        for (const [key, value] of searchParams.entries()){
            target.append(key, value);
        }
    }
    return target;
} //# sourceMappingURL=querystring.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-client] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? `[${hostname}]` : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return `${protocol}${host}${pathname}${search}${hash}`;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return (...args)=>{
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? `?${urlParts.slice(1).join('?')}` : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
                value: "E394",
                enumerable: false,
                configurable: true
            });
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = `Cannot find module for page: ${page}`;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = `Failed to load static file for page: ${page} ${message}`;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = `Cannot find the middleware module`;
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
});
const _utils = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _hasbasepath = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/has-base-path.js [app-client] (ecmascript)");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
        return errorOnce;
    }
});
let errorOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const errors = new Set();
    errorOnce = (msg)=>{
        if (!errors.has(msg)) {
            console.error(msg);
        }
        errors.add(msg);
    };
} //# sourceMappingURL=error-once.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    useLinkStatus: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * A React component that extends the HTML `<a>` element to provide
 * [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation. This is the primary way to navigate between routes in Next.js.
 *
 * @remarks
 * - Prefetching is only enabled in production.
 *
 * @see https://nextjs.org/docs/app/api-reference/components/link
 */ default: function() {
        return LinkComponent;
    },
    useLinkStatus: function() {
        return useLinkStatus;
    }
});
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _formaturl = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-client] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js [app-client] (ecmascript)");
const _usemergedref = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
const _utils = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/utils.js [app-client] (ecmascript)");
const _addbasepath = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/add-base-path.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _links = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/components/links.js [app-client] (ecmascript)");
const _islocalurl = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/router/utils/is-local-url.js [app-client] (ecmascript)");
const _segmentcache = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/components/segment-cache.js [app-client] (ecmascript)");
const _erroronce = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/shared/lib/utils/error-once.js [app-client] (ecmascript)");
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate) {
    if (typeof window !== 'undefined') {
        const { nodeName } = e.currentTarget;
        // anchors inside an svg have a lowercase nodeName
        const isAnchorNodeName = nodeName.toUpperCase() === 'A';
        if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute('download')) {
            // ignore click for browser’s default behavior
            return;
        }
        if (!(0, _islocalurl.isLocalURL)(href)) {
            if (replace) {
                // browser default behavior does not replace the history state
                // so we need to do it manually
                e.preventDefault();
                location.replace(href);
            }
            // ignore click for browser’s default behavior
            return;
        }
        e.preventDefault();
        if (onNavigate) {
            let isDefaultPrevented = false;
            onNavigate({
                preventDefault: ()=>{
                    isDefaultPrevented = true;
                }
            });
            if (isDefaultPrevented) {
                return;
            }
        }
        const { dispatchNavigateAction } = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/components/app-router-instance.js [app-client] (ecmascript)");
        _react.default.startTransition(()=>{
            dispatchNavigateAction(as || href, replace ? 'replace' : 'push', scroll ?? true, linkInstanceRef.current);
        });
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
function LinkComponent(props) {
    const [linkStatus, setOptimisticLinkStatus] = (0, _react.useOptimistic)(_links.IDLE_LINK_STATUS);
    let children;
    const linkInstanceRef = (0, _react.useRef)(null);
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, onNavigate, ref: forwardedRef, unstable_dynamicOnHover, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    const fetchStrategy = prefetchProp !== false ? getFetchStrategyFromPrefetchProp(prefetchProp) : _segmentcache.FetchStrategy.PPR;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                value: "E319",
                enumerable: false,
                configurable: true
            });
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            unstable_dynamicOnHover: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true,
            onNavigate: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart' || key === 'onNavigate') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'legacyBehavior' || key === 'unstable_dynamicOnHover') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else if (key === 'prefetch') {
                if (props[key] != null && valType !== 'boolean' && props[key] !== 'auto') {
                    throw createPropError({
                        key,
                        expected: '`boolean | "auto"`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw Object.defineProperty(new Error(`Dynamic href \`${href}\` found in <Link> while using the \`/app\` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href`), "__NEXT_ERROR_CODE", {
                        value: "E267",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo({
        "LinkComponent.useMemo": ()=>{
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
    }["LinkComponent.useMemo"], [
        hrefProp,
        asProp
    ]);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (children?.$$typeof === Symbol.for('react.lazy')) {
            throw Object.defineProperty(new Error(`\`<Link legacyBehavior>\` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's \`<a>\` tag.`), "__NEXT_ERROR_CODE", {
                value: "E863",
                enumerable: false,
                configurable: true
            });
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
            }
            if (onMouseEnterProp) {
                console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
                        value: "E320",
                        enumerable: false,
                        configurable: true
                    });
                }
                throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : '')), "__NEXT_ERROR_CODE", {
                    value: "E266",
                    enumerable: false,
                    configurable: true
                });
            }
        } else //TURBOPACK unreachable
        ;
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if (children?.type === 'a') {
                throw Object.defineProperty(new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor'), "__NEXT_ERROR_CODE", {
                    value: "E209",
                    enumerable: false,
                    configurable: true
                });
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    // Use a callback ref to attach an IntersectionObserver to the anchor tag on
    // mount. In the future we will also use this to keep track of all the
    // currently mounted <Link> instances, e.g. so we can re-prefetch them after
    // a revalidation or refresh.
    const observeLinkVisibilityOnMount = _react.default.useCallback({
        "LinkComponent.useCallback[observeLinkVisibilityOnMount]": (element)=>{
            if (router !== null) {
                linkInstanceRef.current = (0, _links.mountLinkInstance)(element, href, router, fetchStrategy, prefetchEnabled, setOptimisticLinkStatus);
            }
            return ({
                "LinkComponent.useCallback[observeLinkVisibilityOnMount]": ()=>{
                    if (linkInstanceRef.current) {
                        (0, _links.unmountLinkForCurrentNavigation)(linkInstanceRef.current);
                        linkInstanceRef.current = null;
                    }
                    (0, _links.unmountPrefetchableInstance)(element);
                }
            })["LinkComponent.useCallback[observeLinkVisibilityOnMount]"];
        }
    }["LinkComponent.useCallback[observeLinkVisibilityOnMount]"], [
        prefetchEnabled,
        href,
        router,
        fetchStrategy,
        setOptimisticLinkStatus
    ]);
    const mergedRef = (0, _usemergedref.useMergedRef)(observeLinkVisibilityOnMount, childRef);
    const childProps = {
        ref: mergedRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
                        value: "E312",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, href, as, linkInstanceRef, replace, scroll, onNavigate);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
            const upgradeToDynamicPrefetch = undefined;
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            const upgradeToDynamicPrefetch = unstable_dynamicOnHover === true;
            (0, _links.onNavigationIntent)(e.currentTarget, upgradeToDynamicPrefetch);
        }
    };
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    let link;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, _erroronce.errorOnce)('`legacyBehavior` is deprecated and will be removed in a future ' + 'release. A codemod is available to upgrade your components:\n\n' + 'npx @next/codemod@latest new-link .\n\n' + 'Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components');
        }
        link = /*#__PURE__*/ _react.default.cloneElement(child, childProps);
    } else {
        link = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            ...restProps,
            ...childProps,
            children: children
        });
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(LinkStatusContext.Provider, {
        value: linkStatus,
        children: link
    });
}
const LinkStatusContext = /*#__PURE__*/ (0, _react.createContext)(_links.IDLE_LINK_STATUS);
const useLinkStatus = ()=>{
    return (0, _react.useContext)(LinkStatusContext);
};
function getFetchStrategyFromPrefetchProp(prefetchProp) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        return prefetchProp === null || prefetchProp === 'auto' ? _segmentcache.FetchStrategy.PPR : // (although invalid values should've been filtered out by prop validation in dev)
        _segmentcache.FetchStrategy.Full;
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LayoutGroupContext",
    ()=>LayoutGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
const LayoutGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionConfigContext",
    ()=>MotionConfigContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * @public
 */ const MotionConfigContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    transformPagePoint: (p)=>p,
    isStatic: false,
    reducedMotion: "never"
});
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionContext",
    ()=>MotionContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
const MotionContext = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentTreeVariants",
    ()=>getCurrentTreeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs [app-client] (ecmascript)");
;
;
function getCurrentTreeVariants(props, context) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isControllingVariants"])(props)) {
        const { initial, animate } = props;
        return {
            initial: initial === false || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantLabel"])(initial) ? initial : undefined,
            animate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantLabel"])(animate) ? animate : undefined
        };
    }
    return props.inherit !== false ? context : {};
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateMotionContext",
    ()=>useCreateMotionContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function useCreateMotionContext(props) {
    const { initial, animate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentTreeVariants"])(props, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"]));
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useCreateMotionContext.useMemo": ()=>({
                initial,
                animate
            })
    }["useCreateMotionContext.useMemo"], [
        variantLabelsAsDependency(initial),
        variantLabelsAsDependency(animate)
    ]);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createHtmlRenderState",
    ()=>createHtmlRenderState
]);
const createHtmlRenderState = ()=>({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {}
    });
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "copyRawValuesOnly",
    ()=>copyRawValuesOnly,
    "useHTMLProps",
    ()=>useHTMLProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function copyRawValuesOnly(target, source, props) {
    for(const key in source){
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(source[key]) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isForcedMotionValue"])(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useInitialMotionValues.useMemo": ()=>{
            const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHtmlRenderState"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildHTMLStyles"])(state, visualState, transformTemplate);
            return Object.assign({}, state.vars, state.style);
        }
    }["useInitialMotionValues.useMemo"], [
        visualState
    ]);
}
function useStyle(props, visualState) {
    const styleProp = props.style || {};
    const style = {};
    /**
     * Copy non-Motion Values straight into style
     */ copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState));
    return style;
}
function useHTMLProps(props, visualState) {
    // The `any` isn't ideal but it is the type of createElement props argument
    const htmlProps = {};
    const style = useStyle(props, visualState);
    if (props.drag && props.dragListener !== false) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
        // Disable scrolling on the draggable direction
        style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
    }
    if (props.tabIndex === undefined && (props.onTap || props.onTapStart || props.whileTap)) {
        htmlProps.tabIndex = 0;
    }
    htmlProps.style = style;
    return htmlProps;
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSvgRenderState",
    ()=>createSvgRenderState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)");
;
const createSvgRenderState = ()=>({
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHtmlRenderState"])(),
        attrs: {}
    });
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/use-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSVGProps",
    ()=>useSVGProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function useSVGProps(props, visualState, _isStatic, Component) {
    const visualProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useSVGProps.useMemo[visualProps]": ()=>{
            const state = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSvgRenderState"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSVGAttrs"])(state, visualState, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSVGTag"])(Component), props.transformTemplate, props.style);
            return {
                ...state.attrs,
                style: {
                    ...state.style
                }
            };
        }
    }["useSVGProps.useMemo[visualProps]"], [
        visualState
    ]);
    if (props.style) {
        const rawStyles = {};
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copyRawValuesOnly"])(rawStyles, props.style, props);
        visualProps.style = {
            ...rawStyles,
            ...visualProps.style
        };
    }
    return visualProps;
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A list of all valid MotionProps.
 *
 * @privateRemarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */ __turbopack_context__.s([
    "isValidMotionProp",
    ()=>isValidMotionProp
]);
const validMotionProps = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "ignoreStrict",
    "viewport"
]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */ function isValidMotionProp(key) {
    return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterProps",
    ()=>filterProps,
    "loadExternalIsValidProp",
    ()=>loadExternalIsValidProp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs [app-client] (ecmascript)");
;
let shouldForward = (key)=>!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key);
function loadExternalIsValidProp(isValidProp) {
    if (typeof isValidProp !== "function") return;
    // Explicitly filter our events
    shouldForward = (key)=>key.startsWith("on") ? !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) : isValidProp(key);
}
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */ try {
    /**
     * We attempt to import this package but require won't be defined in esm environments, in that case
     * isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
     * in favour of explicit injection.
     */ loadExternalIsValidProp((()=>{
        const e = new Error("Cannot find module '@emotion/is-prop-valid'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })().default);
} catch  {
// We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}
function filterProps(props, isDom, forwardMotionProps) {
    const filteredProps = {};
    for(const key in props){
        /**
         * values is considered a valid prop by Emotion, so if it's present
         * this will be rendered out to the DOM unless explicitly filtered.
         *
         * We check the type as it could be used with the `feColorMatrix`
         * element, which we support.
         */ if (key === "values" && typeof props.values === "object") continue;
        if (shouldForward(key) || forwardMotionProps === true && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) || !isDom && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$valid$2d$prop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidMotionProp"])(key) || props["draggable"] && key.startsWith("onDrag")) {
            filteredProps[key] = props[key];
        }
    }
    return filteredProps;
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/dom/use-render.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRender",
    ()=>useRender
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/use-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/use-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$filter$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function useRender(Component, props, ref, { latestValues }, isStatic, forwardMotionProps = false) {
    const useVisualProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSVGComponent"])(Component) ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSVGProps"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHTMLProps"];
    const visualProps = useVisualProps(props, latestValues, isStatic, Component);
    const filteredProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$filter$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterProps"])(props, typeof Component === "string", forwardMotionProps);
    const elementProps = Component !== __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"] ? {
        ...filteredProps,
        ...visualProps,
        ref
    } : {};
    /**
     * If component has been handed a motion value as its child,
     * memoise its initial value and render that. Subsequent updates
     * will be handled by the onChange handler
     */ const { children } = props;
    const renderedChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useRender.useMemo[renderedChildren]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(children) ? children.get() : children
    }["useRender.useMemo[renderedChildren]"], [
        children
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(Component, {
        ...elementProps,
        children: renderedChildren
    });
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PresenceContext",
    ()=>PresenceContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * @public
 */ const PresenceContext = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useConstant",
    ()=>useConstant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */ function useConstant(init) {
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveMotionValue",
    ()=>resolveMotionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
;
/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 */ function resolveMotionValue(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value;
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeUseVisualState",
    ()=>makeUseVisualState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$utils$2f$resolve$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function makeState({ scrapeMotionValuesFromProps, createRenderState }, props, context, presenceContext) {
    const state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
        renderState: createRenderState()
    };
    return state;
}
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    const values = {};
    const motionValues = scrapeMotionValues(props, {});
    for(const key in motionValues){
        values[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$utils$2f$resolve$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMotionValue"])(motionValues[key]);
    }
    let { initial, animate } = props;
    const isControllingVariants$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isControllingVariants"])(props);
    const isVariantNode$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantNode"])(props);
    if (context && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
        if (initial === undefined) initial = context.initial;
        if (animate === undefined) animate = context.animate;
    }
    let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
    isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
    const variantToSet = isInitialAnimationBlocked ? animate : initial;
    if (variantToSet && typeof variantToSet !== "boolean" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationControls"])(variantToSet)) {
        const list = Array.isArray(variantToSet) ? variantToSet : [
            variantToSet
        ];
        for(let i = 0; i < list.length; i++){
            const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveVariantFromProps"])(props, list[i]);
            if (resolved) {
                const { transitionEnd, transition, ...target } = resolved;
                for(const key in target){
                    let valueTarget = target[key];
                    if (Array.isArray(valueTarget)) {
                        /**
                         * Take final keyframe if the initial animation is blocked because
                         * we want to initialise at the end of that blocked animation.
                         */ const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
                        valueTarget = valueTarget[index];
                    }
                    if (valueTarget !== null) {
                        values[key] = valueTarget;
                    }
                }
                for(const key in transitionEnd){
                    values[key] = transitionEnd[key];
                }
            }
        }
    }
    return values;
}
const makeUseVisualState = (config)=>(props, isStatic)=>{
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"]);
        const presenceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]);
        const make = ()=>makeState(config, props, context, presenceContext);
        return isStatic ? make() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConstant"])(make);
    };
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHTMLVisualState",
    ()=>useHTMLVisualState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript)");
"use client";
;
;
;
const useHTMLVisualState = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeUseVisualState"])({
    scrapeMotionValuesFromProps: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"],
    createRenderState: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHtmlRenderState"]
});
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSVGVisualState",
    ()=>useSVGVisualState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript)");
"use client";
;
;
;
const useSVGVisualState = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeUseVisualState"])({
    scrapeMotionValuesFromProps: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"],
    createRenderState: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$create$2d$render$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSvgRenderState"]
});
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "motionComponentSymbol",
    ()=>motionComponentSymbol
]);
const motionComponentSymbol = Symbol.for("motionComponentSymbol");
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isRefObject",
    ()=>isRefObject
]);
function isRefObject(ref) {
    return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMotionRef",
    ()=>useMotionRef
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)");
"use client";
;
;
/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */ function useMotionRef(visualState, visualElement, externalRef) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useMotionRef.useCallback": (instance)=>{
            if (instance) {
                visualState.onMount && visualState.onMount(instance);
            }
            if (visualElement) {
                if (instance) {
                    visualElement.mount(instance);
                } else {
                    visualElement.unmount();
                }
            }
            if (externalRef) {
                if (typeof externalRef === "function") {
                    externalRef(instance);
                } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(externalRef)) {
                    externalRef.current = instance;
                }
            }
        }
    }["useMotionRef.useCallback"], /**
     * Include externalRef in dependencies to ensure the callback updates
     * when the ref changes, allowing proper ref forwarding.
     */ [
        visualElement
    ]);
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SwitchLayoutGroupContext",
    ()=>SwitchLayoutGroupContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
/**
 * Internal, exported only for usage in Framer
 */ const SwitchLayoutGroupContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({});
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsomorphicLayoutEffect",
    ()=>useIsomorphicLayoutEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-client] (ecmascript)");
"use client";
;
;
const useIsomorphicLayoutEffect = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowser"] ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"];
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVisualElement",
    ()=>useVisualElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$data$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/is-ref-object.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function useVisualElement(Component, visualState, props, createVisualElement, ProjectionNodeConstructor) {
    const { visualElement: parent } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"]);
    const lazyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LazyContext"]);
    const presenceContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]);
    const reducedMotionConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfigContext"]).reducedMotion;
    const visualElementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */ createVisualElement = createVisualElement || lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
            visualState,
            parent,
            props,
            presenceContext,
            blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
            reducedMotionConfig
        });
    }
    const visualElement = visualElementRef.current;
    /**
     * Load Motion gesture and animation features. These are rendered as renderless
     * components so each feature can optionally make use of React lifecycle methods.
     */ const initialLayoutGroupConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$SwitchLayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwitchLayoutGroupContext"]);
    if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
        createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
    }
    const isMounted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInsertionEffect"])({
        "useVisualElement.useInsertionEffect": ()=>{
            /**
         * Check the component has already mounted before calling
         * `update` unnecessarily. This ensures we skip the initial update.
         */ if (visualElement && isMounted.current) {
                visualElement.update(props, presenceContext);
            }
        }
    }["useVisualElement.useInsertionEffect"]);
    /**
     * Cache this value as we want to know whether HandoffAppearAnimations
     * was present on initial render - it will be deleted after this.
     */ const optimisedAppearId = props[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$data$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimizedAppearDataAttribute"]];
    const wantsHandoff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Boolean(optimisedAppearId) && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "useVisualElement.useIsomorphicLayoutEffect": ()=>{
            if (!visualElement) return;
            isMounted.current = true;
            window.MotionIsMounted = true;
            visualElement.updateFeatures();
            visualElement.scheduleRenderMicrotask();
            /**
         * Ideally this function would always run in a useEffect.
         *
         * However, if we have optimised appear animations to handoff from,
         * it needs to happen synchronously to ensure there's no flash of
         * incorrect styles in the event of a hydration error.
         *
         * So if we detect a situtation where optimised appear animations
         * are running, we use useLayoutEffect to trigger animations.
         */ if (wantsHandoff.current && visualElement.animationState) {
                visualElement.animationState.animateChanges();
            }
        }
    }["useVisualElement.useIsomorphicLayoutEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useVisualElement.useEffect": ()=>{
            if (!visualElement) return;
            if (!wantsHandoff.current && visualElement.animationState) {
                visualElement.animationState.animateChanges();
            }
            if (wantsHandoff.current) {
                // This ensures all future calls to animateChanges() in this component will run in useEffect
                queueMicrotask({
                    "useVisualElement.useEffect": ()=>{
                        window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
                    }
                }["useVisualElement.useEffect"]);
                wantsHandoff.current = false;
            }
            /**
         * Now we've finished triggering animations for this element we
         * can wipe the enteringChildren set for the next render.
         */ visualElement.enteringChildren = undefined;
        }
    }["useVisualElement.useEffect"]);
    return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
    const { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot, layoutCrossfade } = props;
    visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? undefined : getClosestProjectingNode(visualElement.parent));
    visualElement.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: Boolean(drag) || dragConstraints && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$ref$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRefObject"])(dragConstraints),
        visualElement,
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */ animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig,
        crossfade: layoutCrossfade,
        layoutScroll,
        layoutRoot
    });
}
function getClosestProjectingNode(visualElement) {
    if (!visualElement) return undefined;
    return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMotionComponent",
    ()=>createMotionComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/LazyContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionContext/create.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$use$2d$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/dom/use-render.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$html$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$svg$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/is-browser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/features/definitions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$load$2d$features$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/features/load-features.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$symbol$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/symbol.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$motion$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */ function createMotionComponent(Component, { forwardMotionProps = false } = {}, preloadedFeatures, createVisualElement) {
    preloadedFeatures && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$load$2d$features$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadFeatures"])(preloadedFeatures);
    const useVisualState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$is$2d$svg$2d$component$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSVGComponent"])(Component) ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$svg$2f$use$2d$svg$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSVGVisualState"] : __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$html$2f$use$2d$html$2d$visual$2d$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHTMLVisualState"];
    function MotionDOMComponent(props, externalRef) {
        /**
         * If we need to measure the element we load this functionality in a
         * separate class component in order to gain access to getSnapshotBeforeUpdate.
         */ let MeasureLayout;
        const configAndProps = {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfigContext"]),
            ...props,
            layoutId: useLayoutId(props)
        };
        const { isStatic } = configAndProps;
        const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$create$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateMotionContext"])(props);
        const visualState = useVisualState(props, isStatic);
        if (!isStatic && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$is$2d$browser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowser"]) {
            useStrictMode(configAndProps, preloadedFeatures);
            const layoutProjection = getProjectionFunctionality(configAndProps);
            MeasureLayout = layoutProjection.MeasureLayout;
            /**
             * Create a VisualElement for this component. A VisualElement provides a common
             * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
             * providing a way of rendering to these APIs outside of the React render loop
             * for more performant animations and interactions
             */ context.visualElement = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$visual$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisualElement"])(Component, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
        }
        /**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */ return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxs"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionContext$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionContext"].Provider, {
            value: context,
            children: [
                MeasureLayout && context.visualElement ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(MeasureLayout, {
                    visualElement: context.visualElement,
                    ...configAndProps
                }) : null,
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$dom$2f$use$2d$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRender"])(Component, props, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$use$2d$motion$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionRef"])(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps)
            ]
        });
    }
    MotionDOMComponent.displayName = `motion.${typeof Component === "string" ? Component : `create(${Component.displayName ?? Component.name ?? ""})`}`;
    const ForwardRefMotionComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(MotionDOMComponent);
    ForwardRefMotionComponent[__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$utils$2f$symbol$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionComponentSymbol"]] = Component;
    return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
    const layoutGroupId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutGroupContext"]).id;
    return layoutGroupId && layoutId !== undefined ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
    const isStrict = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LazyContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LazyContext"]).strict;
    /**
     * If we're in development mode, check to make sure we're not rendering a motion component
     * as a child of LazyMotion, as this will break the file-size benefits of using it.
     */ if (("TURBOPACK compile-time value", "development") !== "production" && preloadedFeatures && isStrict) {
        const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
        configAndProps.ignoreStrict ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warning"])(false, strictMessage, "lazy-strict-mode") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(false, strictMessage, "lazy-strict-mode");
    }
}
function getProjectionFunctionality(props) {
    const { drag, layout } = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$features$2f$definitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureDefinitions"];
    if (!drag && !layout) return {};
    const combined = {
        ...drag,
        ...layout
    };
    return {
        MeasureLayout: drag?.isEnabled(props) || layout?.isEnabled(props) ? combined.MeasureLayout : undefined,
        ProjectionNode: combined.ProjectionNode
    };
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/components/create-proxy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createMotionProxy",
    ()=>createMotionProxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/motion/index.mjs [app-client] (ecmascript)");
;
;
function createMotionProxy(preloadedFeatures, createVisualElement) {
    if (typeof Proxy === "undefined") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMotionComponent"];
    }
    /**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */ const componentCache = new Map();
    const factory = (Component, options)=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMotionComponent"])(Component, options, preloadedFeatures, createVisualElement);
    };
    /**
     * Support for deprecated`motion(Component)` pattern
     */ const deprecatedFactoryFunction = (Component, options)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])(false, "motion() is deprecated. Use motion.create() instead.");
        }
        return factory(Component, options);
    };
    return new Proxy(deprecatedFactoryFunction, {
        /**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */ get: (_target, key)=>{
            if (key === "create") return factory;
            /**
             * If this element doesn't exist in the component cache, create it and cache.
             */ if (!componentCache.has(key)) {
                componentCache.set(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMotionComponent"])(key, undefined, preloadedFeatures, createVisualElement));
            }
            return componentCache.get(key);
        }
    });
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/components/m/proxy.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "m",
    ()=>m
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$create$2d$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/render/components/create-proxy.mjs [app-client] (ecmascript)");
;
const m = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$create$2d$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMotionProxy"])();
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useComposedRefs",
    ()=>useComposedRefs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
/**
 * Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
 */ /**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */ function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    } else if (ref !== null && ref !== undefined) {
        ref.current = value;
    }
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */ function composeRefs(...refs) {
    return (node)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup === "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        // React <19 will log an error to the console if a callback ref returns a
        // value. We don't use ref cleanups internally so this will only happen if a
        // user's ref callback returns a value, which we only expect if they are
        // using the cleanup functionality added in React 19.
        if (hasCleanup) {
            return ()=>{
                for(let i = 0; i < cleanups.length; i++){
                    const cleanup = cleanups[i];
                    if (typeof cleanup === "function") {
                        cleanup();
                    } else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */ function useComposedRefs(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"](composeRefs(...refs), refs);
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PopChild",
    ()=>PopChild
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/motion-dom/dist/es/utils/is-html-element.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$composed$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
/**
 * Measurement functionality has to be within a separate component
 * to leverage snapshot lifecycle.
 */ class PopChildMeasure extends __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    getSnapshotBeforeUpdate(prevProps) {
        const element = this.props.childRef.current;
        if (element && prevProps.isPresent && !this.props.isPresent) {
            const parent = element.offsetParent;
            const parentWidth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$html$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isHTMLElement"])(parent) ? parent.offsetWidth || 0 : 0;
            const size = this.props.sizeRef.current;
            size.height = element.offsetHeight || 0;
            size.width = element.offsetWidth || 0;
            size.top = element.offsetTop;
            size.left = element.offsetLeft;
            size.right = parentWidth - size.width - size.left;
        }
        return null;
    }
    /**
     * Required with getSnapshotBeforeUpdate to stop React complaining.
     */ componentDidUpdate() {}
    render() {
        return this.props.children;
    }
}
function PopChild({ children, isPresent, anchorX, root }) {
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const size = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0
    });
    const { nonce } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$MotionConfigContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionConfigContext"]);
    const composedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$composed$2d$ref$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useComposedRefs"])(ref, children?.ref);
    /**
     * We create and inject a style block so we can apply this explicit
     * sizing in a non-destructive manner by just deleting the style block.
     *
     * We can't apply size via render as the measurement happens
     * in getSnapshotBeforeUpdate (post-render), likewise if we apply the
     * styles directly on the DOM node, we might be overwriting
     * styles set via the style prop.
     */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInsertionEffect"])({
        "PopChild.useInsertionEffect": ()=>{
            const { width, height, top, left, right } = size.current;
            if (isPresent || !ref.current || !width || !height) return;
            const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
            ref.current.dataset.motionPopId = id;
            const style = document.createElement("style");
            if (nonce) style.nonce = nonce;
            const parent = root ?? document.head;
            parent.appendChild(style);
            if (style.sheet) {
                style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            top: ${top}px !important;
          }
        `);
            }
            return ({
                "PopChild.useInsertionEffect": ()=>{
                    if (parent.contains(style)) {
                        parent.removeChild(style);
                    }
                }
            })["PopChild.useInsertionEffect"];
        }
    }["PopChild.useInsertionEffect"], [
        isPresent
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(PopChildMeasure, {
        isPresent: isPresent,
        childRef: ref,
        sizeRef: size,
        children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"](children, {
            ref: composedRef
        })
    });
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PresenceChild",
    ()=>PresenceChild
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$PopChild$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, root })=>{
    const presenceChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConstant"])(newChildrenMap);
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    let isReusedContext = true;
    let context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PresenceChild.useMemo[context]": ()=>{
            isReusedContext = false;
            return {
                id,
                initial,
                isPresent,
                custom,
                onExitComplete: ({
                    "PresenceChild.useMemo[context]": (childId)=>{
                        presenceChildren.set(childId, true);
                        for (const isComplete of presenceChildren.values()){
                            if (!isComplete) return; // can stop searching when any is incomplete
                        }
                        onExitComplete && onExitComplete();
                    }
                })["PresenceChild.useMemo[context]"],
                register: ({
                    "PresenceChild.useMemo[context]": (childId)=>{
                        presenceChildren.set(childId, false);
                        return ({
                            "PresenceChild.useMemo[context]": ()=>presenceChildren.delete(childId)
                        })["PresenceChild.useMemo[context]"];
                    }
                })["PresenceChild.useMemo[context]"]
            };
        }
    }["PresenceChild.useMemo[context]"], [
        isPresent,
        presenceChildren,
        onExitComplete
    ]);
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */ if (presenceAffectsLayout && isReusedContext) {
        context = {
            ...context
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PresenceChild.useMemo": ()=>{
            presenceChildren.forEach({
                "PresenceChild.useMemo": (_, key)=>presenceChildren.set(key, false)
            }["PresenceChild.useMemo"]);
        }
    }["PresenceChild.useMemo"], [
        isPresent
    ]);
    /**
     * If there's no `motion` components to fire exit animations, we want to remove this
     * component immediately.
     */ __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "PresenceChild.useEffect": ()=>{
            !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
        }
    }["PresenceChild.useEffect"], [
        isPresent
    ]);
    if (mode === "popLayout") {
        children = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$PopChild$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopChild"], {
            isPresent: isPresent,
            anchorX: anchorX,
            root: root,
            children: children
        });
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"].Provider, {
        value: context,
        children: children
    });
};
function newChildrenMap() {
    return new Map();
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPresent",
    ()=>isPresent,
    "useIsPresent",
    ()=>useIsPresent,
    "usePresence",
    ()=>usePresence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/PresenceContext.mjs [app-client] (ecmascript)");
"use client";
;
;
/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */ function usePresence(subscribe = true) {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]);
    if (context === null) return [
        true,
        null
    ];
    const { isPresent, onExitComplete, register } = context;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePresence.useEffect": ()=>{
            if (subscribe) {
                return register(id);
            }
        }
    }["usePresence.useEffect"], [
        subscribe
    ]);
    const safeToRemove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePresence.useCallback[safeToRemove]": ()=>subscribe && onExitComplete && onExitComplete(id)
    }["usePresence.useCallback[safeToRemove]"], [
        id,
        onExitComplete,
        subscribe
    ]);
    return !isPresent && onExitComplete ? [
        false,
        safeToRemove
    ] : [
        true
    ];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */ function useIsPresent() {
    return isPresent((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$PresenceContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceContext"]));
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getChildKey",
    ()=>getChildKey,
    "onlyElements",
    ()=>onlyElements
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const getChildKey = (child)=>child.key || "";
function onlyElements(children) {
    const filtered = [];
    // We use forEach here instead of map as map mutates the component key by preprending `.$`
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].forEach(children, (child)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"])(child)) filtered.push(child);
    });
    return filtered;
}
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatePresence",
    ()=>AnimatePresence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-constant.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$PresenceChild$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$use$2d$presence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */ const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", root })=>{
    const [isParentPresent, safeToRemove] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$use$2d$presence$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePresence"])(propagate);
    /**
     * Filter any children that aren't ReactElements. We can only track components
     * between renders with a props.key.
     */ const presentChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnimatePresence.useMemo[presentChildren]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onlyElements"])(children)
    }["AnimatePresence.useMemo[presentChildren]"], [
        children
    ]);
    /**
     * Track the keys of the currently rendered children. This is used to
     * determine which children are exiting.
     */ const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChildKey"]);
    /**
     * If `initial={false}` we only want to pass this to components in the first render.
     */ const isInitialRender = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    /**
     * A ref containing the currently present children. When all exit animations
     * are complete, we use this to re-render the component with the latest children
     * *committed* rather than the latest children *rendered*.
     */ const pendingPresentChildren = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(presentChildren);
    /**
     * Track which exiting children have finished animating out.
     */ const exitComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$constant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConstant"])({
        "AnimatePresence.useConstant[exitComplete]": ()=>new Map()
    }["AnimatePresence.useConstant[exitComplete]"]);
    /**
     * Save children to render as React state. To ensure this component is concurrent-safe,
     * we check for exiting children via an effect.
     */ const [diffedChildren, setDiffedChildren] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(presentChildren);
    const [renderedChildren, setRenderedChildren] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(presentChildren);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$isomorphic$2d$effect$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsomorphicLayoutEffect"])({
        "AnimatePresence.useIsomorphicLayoutEffect": ()=>{
            isInitialRender.current = false;
            pendingPresentChildren.current = presentChildren;
            /**
         * Update complete status of exiting children.
         */ for(let i = 0; i < renderedChildren.length; i++){
                const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChildKey"])(renderedChildren[i]);
                if (!presentKeys.includes(key)) {
                    if (exitComplete.get(key) !== true) {
                        exitComplete.set(key, false);
                    }
                } else {
                    exitComplete.delete(key);
                }
            }
        }
    }["AnimatePresence.useIsomorphicLayoutEffect"], [
        renderedChildren,
        presentKeys.length,
        presentKeys.join("-")
    ]);
    const exitingChildren = [];
    if (presentChildren !== diffedChildren) {
        let nextChildren = [
            ...presentChildren
        ];
        /**
         * Loop through all the currently rendered components and decide which
         * are exiting.
         */ for(let i = 0; i < renderedChildren.length; i++){
            const child = renderedChildren[i];
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChildKey"])(child);
            if (!presentKeys.includes(key)) {
                nextChildren.splice(i, 0, child);
                exitingChildren.push(child);
            }
        }
        /**
         * If we're in "wait" mode, and we have exiting children, we want to
         * only render these until they've all exited.
         */ if (mode === "wait" && exitingChildren.length) {
            nextChildren = exitingChildren;
        }
        setRenderedChildren((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onlyElements"])(nextChildren));
        setDiffedChildren(presentChildren);
        /**
         * Early return to ensure once we've set state with the latest diffed
         * children, we can immediately re-render.
         */ return null;
    }
    if (("TURBOPACK compile-time value", "development") !== "production" && mode === "wait" && renderedChildren.length > 1) {
        console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
    }
    /**
     * If we've been provided a forceRender function by the LayoutGroupContext,
     * we can use it to force a re-render amongst all surrounding components once
     * all components have finished animating out.
     */ const { forceRender } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$context$2f$LayoutGroupContext$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LayoutGroupContext"]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: renderedChildren.map((child)=>{
            const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getChildKey"])(child);
            const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
            const onExit = ()=>{
                if (exitComplete.has(key)) {
                    exitComplete.set(key, true);
                } else {
                    return;
                }
                let isEveryExitComplete = true;
                exitComplete.forEach((isExitComplete)=>{
                    if (!isExitComplete) isEveryExitComplete = false;
                });
                if (isEveryExitComplete) {
                    forceRender?.();
                    setRenderedChildren(pendingPresentChildren.current);
                    propagate && safeToRemove?.();
                    onExitComplete && onExitComplete();
                }
            };
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$PresenceChild$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PresenceChild"], {
                isPresent: isPresent,
                initial: !isInitialRender.current || initial ? undefined : false,
                custom: custom,
                presenceAffectsLayout: presenceAffectsLayout,
                mode: mode,
                root: root,
                onExitComplete: isPresent ? undefined : onExit,
                anchorX: anchorX,
                children: child
            }, key);
        })
    });
};
;
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/path-to-regexp/dist/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PathError = exports.TokenData = void 0;
exports.parse = parse;
exports.compile = compile;
exports.match = match;
exports.pathToRegexp = pathToRegexp;
exports.stringify = stringify;
const DEFAULT_DELIMITER = "/";
const NOOP_VALUE = (value)=>value;
const ID_START = /^[$_\p{ID_Start}]$/u;
const ID_CONTINUE = /^[$\u200c\u200d\p{ID_Continue}]$/u;
const SIMPLE_TOKENS = {
    // Groups.
    "{": "{",
    "}": "}",
    // Reserved.
    "(": "(",
    ")": ")",
    "[": "[",
    "]": "]",
    "+": "+",
    "?": "?",
    "!": "!"
};
/**
 * Escape text for stringify to path.
 */ function escapeText(str) {
    return str.replace(/[{}()\[\]+?!:*\\]/g, "\\$&");
}
/**
 * Escape a regular expression string.
 */ function escape(str) {
    return str.replace(/[.+*?^${}()[\]|/\\]/g, "\\$&");
}
/**
 * Tokenized path instance.
 */ class TokenData {
    constructor(tokens, originalPath){
        this.tokens = tokens;
        this.originalPath = originalPath;
    }
}
exports.TokenData = TokenData;
/**
 * ParseError is thrown when there is an error processing the path.
 */ class PathError extends TypeError {
    constructor(message, originalPath){
        let text = message;
        if (originalPath) text += `: ${originalPath}`;
        text += `; visit https://git.new/pathToRegexpError for info`;
        super(text);
        this.originalPath = originalPath;
    }
}
exports.PathError = PathError;
/**
 * Parse a string for the raw tokens.
 */ function parse(str, options = {}) {
    const { encodePath = NOOP_VALUE } = options;
    const chars = [
        ...str
    ];
    const tokens = [];
    let index = 0;
    let pos = 0;
    function name() {
        let value = "";
        if (ID_START.test(chars[index])) {
            do {
                value += chars[index++];
            }while (ID_CONTINUE.test(chars[index]))
        } else if (chars[index] === '"') {
            let quoteStart = index;
            while(index++ < chars.length){
                if (chars[index] === '"') {
                    index++;
                    quoteStart = 0;
                    break;
                }
                // Increment over escape characters.
                if (chars[index] === "\\") index++;
                value += chars[index];
            }
            if (quoteStart) {
                throw new PathError(`Unterminated quote at index ${quoteStart}`, str);
            }
        }
        if (!value) {
            throw new PathError(`Missing parameter name at index ${index}`, str);
        }
        return value;
    }
    while(index < chars.length){
        const value = chars[index];
        const type = SIMPLE_TOKENS[value];
        if (type) {
            tokens.push({
                type,
                index: index++,
                value
            });
        } else if (value === "\\") {
            tokens.push({
                type: "escape",
                index: index++,
                value: chars[index++]
            });
        } else if (value === ":") {
            tokens.push({
                type: "param",
                index: index++,
                value: name()
            });
        } else if (value === "*") {
            tokens.push({
                type: "wildcard",
                index: index++,
                value: name()
            });
        } else {
            tokens.push({
                type: "char",
                index: index++,
                value
            });
        }
    }
    tokens.push({
        type: "end",
        index,
        value: ""
    });
    function consumeUntil(endType) {
        const output = [];
        while(true){
            const token = tokens[pos++];
            if (token.type === endType) break;
            if (token.type === "char" || token.type === "escape") {
                let path = token.value;
                let cur = tokens[pos];
                while(cur.type === "char" || cur.type === "escape"){
                    path += cur.value;
                    cur = tokens[++pos];
                }
                output.push({
                    type: "text",
                    value: encodePath(path)
                });
                continue;
            }
            if (token.type === "param" || token.type === "wildcard") {
                output.push({
                    type: token.type,
                    name: token.value
                });
                continue;
            }
            if (token.type === "{") {
                output.push({
                    type: "group",
                    tokens: consumeUntil("}")
                });
                continue;
            }
            throw new PathError(`Unexpected ${token.type} at index ${token.index}, expected ${endType}`, str);
        }
        return output;
    }
    return new TokenData(consumeUntil("end"), str);
}
/**
 * Compile a string to a template function for the path.
 */ function compile(path, options = {}) {
    const { encode = encodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
    const data = typeof path === "object" ? path : parse(path, options);
    const fn = tokensToFunction(data.tokens, delimiter, encode);
    return function path(params = {}) {
        const [path1, ...missing] = fn(params);
        if (missing.length) {
            throw new TypeError(`Missing parameters: ${missing.join(", ")}`);
        }
        return path1;
    };
}
function tokensToFunction(tokens, delimiter, encode) {
    const encoders = tokens.map((token)=>tokenToFunction(token, delimiter, encode));
    return (data)=>{
        const result = [
            ""
        ];
        for (const encoder of encoders){
            const [value, ...extras] = encoder(data);
            result[0] += value;
            result.push(...extras);
        }
        return result;
    };
}
/**
 * Convert a single token into a path building function.
 */ function tokenToFunction(token, delimiter, encode) {
    if (token.type === "text") return ()=>[
            token.value
        ];
    if (token.type === "group") {
        const fn = tokensToFunction(token.tokens, delimiter, encode);
        return (data)=>{
            const [value, ...missing] = fn(data);
            if (!missing.length) return [
                value
            ];
            return [
                ""
            ];
        };
    }
    const encodeValue = encode || NOOP_VALUE;
    if (token.type === "wildcard" && encode !== false) {
        return (data)=>{
            const value = data[token.name];
            if (value == null) return [
                "",
                token.name
            ];
            if (!Array.isArray(value) || value.length === 0) {
                throw new TypeError(`Expected "${token.name}" to be a non-empty array`);
            }
            return [
                value.map((value, index)=>{
                    if (typeof value !== "string") {
                        throw new TypeError(`Expected "${token.name}/${index}" to be a string`);
                    }
                    return encodeValue(value);
                }).join(delimiter)
            ];
        };
    }
    return (data)=>{
        const value = data[token.name];
        if (value == null) return [
            "",
            token.name
        ];
        if (typeof value !== "string") {
            throw new TypeError(`Expected "${token.name}" to be a string`);
        }
        return [
            encodeValue(value)
        ];
    };
}
/**
 * Transform a path into a match function.
 */ function match(path, options = {}) {
    const { decode = decodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
    const { regexp, keys } = pathToRegexp(path, options);
    const decoders = keys.map((key)=>{
        if (decode === false) return NOOP_VALUE;
        if (key.type === "param") return decode;
        return (value)=>value.split(delimiter).map(decode);
    });
    return function match(input) {
        const m = regexp.exec(input);
        if (!m) return false;
        const path = m[0];
        const params = Object.create(null);
        for(let i = 1; i < m.length; i++){
            if (m[i] === undefined) continue;
            const key = keys[i - 1];
            const decoder = decoders[i - 1];
            params[key.name] = decoder(m[i]);
        }
        return {
            path,
            params
        };
    };
}
function pathToRegexp(path, options = {}) {
    const { delimiter = DEFAULT_DELIMITER, end = true, sensitive = false, trailing = true } = options;
    const keys = [];
    const flags = sensitive ? "" : "i";
    const sources = [];
    for (const input of pathsToArray(path, [])){
        const data = typeof input === "object" ? input : parse(input, options);
        for (const tokens of flatten(data.tokens, 0, [])){
            sources.push(toRegExpSource(tokens, delimiter, keys, data.originalPath));
        }
    }
    let pattern = `^(?:${sources.join("|")})`;
    if (trailing) pattern += `(?:${escape(delimiter)}$)?`;
    pattern += end ? "$" : `(?=${escape(delimiter)}|$)`;
    const regexp = new RegExp(pattern, flags);
    return {
        regexp,
        keys
    };
}
/**
 * Convert a path or array of paths into a flat array.
 */ function pathsToArray(paths, init) {
    if (Array.isArray(paths)) {
        for (const p of paths)pathsToArray(p, init);
    } else {
        init.push(paths);
    }
    return init;
}
/**
 * Generate a flat list of sequence tokens from the given tokens.
 */ function* flatten(tokens, index, init) {
    if (index === tokens.length) {
        return yield init;
    }
    const token = tokens[index];
    if (token.type === "group") {
        for (const seq of flatten(token.tokens, 0, init.slice())){
            yield* flatten(tokens, index + 1, seq);
        }
    } else {
        init.push(token);
    }
    yield* flatten(tokens, index + 1, init);
}
/**
 * Transform a flat sequence of tokens into a regular expression.
 */ function toRegExpSource(tokens, delimiter, keys, originalPath) {
    let result = "";
    let backtrack = "";
    let isSafeSegmentParam = true;
    for (const token of tokens){
        if (token.type === "text") {
            result += escape(token.value);
            backtrack += token.value;
            isSafeSegmentParam || (isSafeSegmentParam = token.value.includes(delimiter));
            continue;
        }
        if (token.type === "param" || token.type === "wildcard") {
            if (!isSafeSegmentParam && !backtrack) {
                throw new PathError(`Missing text before "${token.name}" ${token.type}`, originalPath);
            }
            if (token.type === "param") {
                result += `(${negate(delimiter, isSafeSegmentParam ? "" : backtrack)}+)`;
            } else {
                result += `([\\s\\S]+)`;
            }
            keys.push(token);
            backtrack = "";
            isSafeSegmentParam = false;
            continue;
        }
    }
    return result;
}
/**
 * Block backtracking on previous text and ignore delimiter string.
 */ function negate(delimiter, backtrack) {
    if (backtrack.length < 2) {
        if (delimiter.length < 2) return `[^${escape(delimiter + backtrack)}]`;
        return `(?:(?!${escape(delimiter)})[^${escape(backtrack)}])`;
    }
    if (delimiter.length < 2) {
        return `(?:(?!${escape(backtrack)})[^${escape(delimiter)}])`;
    }
    return `(?:(?!${escape(backtrack)}|${escape(delimiter)})[\\s\\S])`;
}
/**
 * Stringify an array of tokens into a path string.
 */ function stringifyTokens(tokens) {
    let value = "";
    let i = 0;
    function name(value) {
        const isSafe = isNameSafe(value) && isNextNameSafe(tokens[i]);
        return isSafe ? value : JSON.stringify(value);
    }
    while(i < tokens.length){
        const token = tokens[i++];
        if (token.type === "text") {
            value += escapeText(token.value);
            continue;
        }
        if (token.type === "group") {
            value += `{${stringifyTokens(token.tokens)}}`;
            continue;
        }
        if (token.type === "param") {
            value += `:${name(token.name)}`;
            continue;
        }
        if (token.type === "wildcard") {
            value += `*${name(token.name)}`;
            continue;
        }
        throw new TypeError(`Unknown token type: ${token.type}`);
    }
    return value;
}
/**
 * Stringify token data into a path string.
 */ function stringify(data) {
    return stringifyTokens(data.tokens);
}
/**
 * Validate the parameter name contains valid ID characters.
 */ function isNameSafe(name) {
    const [first, ...rest] = name;
    return ID_START.test(first) && rest.every((char)=>ID_CONTINUE.test(char));
}
/**
 * Validate the next token does not interfere with the current param name.
 */ function isNextNameSafe(token) {
    if (token && token.type === "text") return !ID_CONTINUE.test(token.value[0]);
    return true;
} //# sourceMappingURL=index.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "hasA11yProp",
    ()=>hasA11yProp,
    "mergeClasses",
    ()=>mergeClasses,
    "toCamelCase",
    ()=>toCamelCase,
    "toKebabCase",
    ()=>toKebabCase,
    "toPascalCase",
    ()=>toPascalCase
]);
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Sun
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "4",
            key: "4exip2"
        }
    ],
    [
        "path",
        {
            d: "M12 2v2",
            key: "tus03m"
        }
    ],
    [
        "path",
        {
            d: "M12 20v2",
            key: "1lh1kg"
        }
    ],
    [
        "path",
        {
            d: "m4.93 4.93 1.41 1.41",
            key: "149t6j"
        }
    ],
    [
        "path",
        {
            d: "m17.66 17.66 1.41 1.41",
            key: "ptbguv"
        }
    ],
    [
        "path",
        {
            d: "M2 12h2",
            key: "1t8f8n"
        }
    ],
    [
        "path",
        {
            d: "M20 12h2",
            key: "1q8mjw"
        }
    ],
    [
        "path",
        {
            d: "m6.34 17.66-1.41 1.41",
            key: "1m8zz5"
        }
    ],
    [
        "path",
        {
            d: "m19.07 4.93-1.41 1.41",
            key: "1shlcs"
        }
    ]
];
const Sun = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("sun", __iconNode);
;
 //# sourceMappingURL=sun.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sun",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript)");
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.548.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Moon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
            key: "kfwtm"
        }
    ]
];
const Moon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("moon", __iconNode);
;
 //# sourceMappingURL=moon.js.map
}),
"[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Moon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Next$2e$js$2d$store$2f$Frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Next.js-store/Frontend/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=90026_3df3164c._.js.map