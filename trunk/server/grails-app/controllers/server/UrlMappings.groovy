package server

class UrlMappings {

    static mappings = {

        "/newsView"(resources: "newsView")
        "/image"(resources: "image")
        "/category"(resources: "category")
        "/newsContent"(resources: "newsContent")
        "/news"(resources: "news")

        "/$controller/$action?/$id?(.$format)?" {
            constraints {
                // apply constraints here
            }
        }

        "/"(view: "/index")
        "500"(view: '/error')
        "404"(view: '/notFound')
    }
}
