# Custom Deck Builder

## About This Tool

This application is a **fan creation** by [Jacob Fischer](https://github.com/JacobFischer/) with the sole intent of making it easier to try custom cards in Cryptozoic's Game Engine. It is open source and available on [GitHub](https://github.com/JacobFischer/Custom-Deck-Builder).

No cards produced using this tool should be used to profit from. Instead please buy [Cryptozoic](https://www.cryptozoic.com/)'s own deck building games utilizing their engine such as the DC Deck Building game, they are excellent.

This project was produced mostly as a tool to help its author more easily prototype custom cards to try in [Table Top Simulator](http://store.steampowered.com/app/286160/Tabletop_Simulator/) with and around Cryptozoic's own titles, as well as an excuse to brush up on some technical skills.

## Technical Details

This application is an [SPA](https://en.wikipedia.org/wiki/Single-page_application "Single-page Application"). Once you load the page you have everything you need to build some custom cards. **No** data is saved on a server somewhere. All the processing is done and saved on your machine via your web browser. I'm not interested in tracking you or stealing your data.

This project was made using a variety of frameworks:

- **[TypeScript](https://www.typescriptlang.org/ "JavaScript with types")**: The coding language used for pretty much everything in this project.
- **[SASS](http://sass-lang.com/ "Syntactically Awesome Style Sheets")**: Used to control the style and most animations on this page.
- **[Handlebars](http://handlebarsjs.com/ "Simple HTML Templates")**: Used to template the HTML layout and elements for all page sections.
- **[PixiJS](http://www.pixijs.com/ "2D graphics library for easily drawing cards")**: Currently the best browser library for manipulating 2D graphics and images on canvases. Used to render the custom cards.
- **[NPM](https://www.npmjs.com/ "Node Package Manager")**: The biggest and most popular JavaScript package manager, that hosts many of the smaller modules not explicitly mentioned here, but are still necessary to run.
- **[Webpack 2](https://webpack.js.org/)**: What wraps all these things together into a single page. I used this opportunity to transition Webpack 1.x skills to 2.0.

All the source code, commits, and resources are available freely on [GitHub](https://github.com/JacobFischer/Custom-Deck-Builder). All classes, methods, and exports and documented using well formed docstrings; so if you wish to modify this tool, do so to your heart's content!

---

A live version of application is kept up to date on https://jacobfischer.github.io/Custom-Deck-Builder/. Check out that version if you are not interested in developing it yourself.

## How to Build

As this is a webpack project, you just need to build and deploy it. As with most projects ensure you have [Node.js](https://nodejs.org/) installed, then just:

```
npm install
npm run dev
```

Then just in your browser navigate to http://localhost:8080/

Alternatively run `npm run build` to run webpack and save the output in the `built/` directory, and you can deploy the static assets at your will.
