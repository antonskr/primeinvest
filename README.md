# PrimeInvest

landing. HTML, SCSS JS.

## Run

JS is split into ES modules, so the page needs a local server

```
npx serve .
```

Any other static server works too, for example Live Server in VS Code.

The timer runs for 15 minutes. To see what happens when it ends, add `?t=10` to the URL (10 seconds).

## Structure

```
index.html
scss/             variables, mixins, one file per BEM block
css/style.css     compiled from scss, committed
js/main.js        entry point, imports everything else
js/data.js        reviews and FAQ content
js/components/    small template functions for repeating markup
js/modules/       , sticky CTA, slider, FAQ, phone mask, form
img/
```

To rebuild the styles: `npm i`, then `npm run css`.