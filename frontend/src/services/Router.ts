import Routes from "./Routes";

export const Router = {

  init(){
    document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        const link = target.closest("a");

        if (!link || !link.classList.contains("sidebar__item")) return;

        e.preventDefault();

        const href = link.getAttribute("href");
        Router.go(href!);

    });

    window.addEventListener("popstate", (e) => {
      Router.go(e.state?.route || "/", false);
    });

    Router.go(location.pathname || "/", false);
  },

  go(route:string, addToHistory = true){

    if(addToHistory){
      history.pushState({route}, "", route);
    }

    const app = document.querySelector("#app") as HTMLDivElement;

    app.innerHTML = ""; 

    const component:string = Routes[route];

    let page;

    if(component){
      page = document.createElement(component);
    }
    else{
      page = document.createElement("h1");
      page.textContent = "404";
    }
    app.appendChild(page);

    window.scrollTo(0,0);
  }

}