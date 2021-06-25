import NotFound from "./views/NotFound.js";
import Home from "./views/Home.js";
import Chapters from "./views/Chapters.js";
import Texts from "./views/Texts.js";
import Series from "./views/Series.js";
import ChapterView from "./views/ChapterView.js";
import Account from "./views/Account.js";
import Unauthorized from "./views/Unauthorized.js";
import Bye from "./views/Bye.js";
import initAuth from "./auth2.js";
import setItem from "./setItem.js"
import getUser from "./user.js"
import {getSite} from "./data.js"

let data;

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const render = (view) => {
    const main = document.querySelector("main")
    main.classList.remove('spinner')
    main.innerHTML = view.getHtml()
}

const router = () => {
    const routes = [
        { path: "/not-found", view: NotFound },
        { path: "/bye", view: Bye },
        { path: "/", view: Home },
        { path: "/texts", view: Texts },
        { path: "/series", view: Series },
        { path: "/chapters", view: Chapters },
        { path: "/chapters/:id", view: ChapterView },
        { path: "/account", view: Account, user_level: 0}
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }


    const view = new match.route.view(getParams(match));

    view.siteMap = data

    let protectedLevel = 'user_level' in match.route ? match.route['user_level'] : false;

    if (protectedLevel !== false) {
        getUser().then((user)=>{
            if (user && user['level'] >= protectedLevel) {
                view.user = user
                render(view)
            } else {
                render(new Unauthorized)
            }
        })
    } else {
        render(view)
    }
    view.afterRender()
};

window.addEventListener("popstate", router);


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("a[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
        else if (e.target.closest('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.closest('[data-link]'));
        }
        else if (e.target.matches("[logout]")) {
            e.preventDefault();
            setItem("token", null)
        }
    });
    getUser().then((user)=>{
        updateNav(Boolean(user))
    })

    getSite().then((d) => {
        data = d
        router()
    })
    
    initAuth()
}); 

var updateNav = function(logged) {
    document.getElementById("signin").hidden = logged
    document.getElementById("signedin").hidden = !logged
}

var localStorageSetHandler = function(e) {
    if (e.key == 'token') {
        if (e.value) {
            updateNav(1)
            let curPath = window.location.href
            navigateTo(curPath == '/bye' ? '/' : curPath);
        } else {
            updateNav(0)
            navigateTo('/bye');
        }
    } 
  };

document.addEventListener("itemInserted", localStorageSetHandler, false);



