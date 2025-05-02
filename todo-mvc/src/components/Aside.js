import { Aside, Header, H3, Span, H5, Link, Hr, Blockquote, P, Footer, Ul, Li, H4 } from 'https://cdn.jsdelivr.net/npm/@hacker_man/most-js@1.3.0/index.js';

export default function AsideComponent() {
  return Aside({className: "about"}, [
    Header({}, [
      H3({}, "MostJS TodoMVC"),
      Span({className: "source-links"}, [
      H5({}, "Source:"),
      Link({href: "https://github.com/mostjs/most-todomvc"},"source"),
      ]),
      Hr({}),
      Blockquote({className: "quote speech-bubble"}, [
        P({}, "The only way to get rid of an idea is to execute it."),
        Footer({}, Link({href: "https://github.com/e-aub"},"@hacker_man"))
      ]),
      Hr({}),
      H4({}, "Official Ressources"),
      Ul({}, [
        Li({}, Link({href: "https://github.com/mostjs/most-todomvc"},"Quickstart")),
        Li({}, Link({href: "https://github.com/mostjs/most-todomvc"},"Documentation")),
        
      ])
    ]),
  ])
}