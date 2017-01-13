# jquery.lazyRender
A lightweight jQuery-based images lazy loader/preloader

## Installation

```sh
bower install jquery.lazyRender
```

## Getting Started

First, include these two lines of code in your HTML:

```html
<script type="text/javascript" src="bower_components/jquery.lazyRender/dist/jquery.lazyRender.js"></script>
<link rel="stylesheet" href="bower_components/jquery.lazyRender/dist/jquery.lazyRender.css" />
```

Then, define your images in your code using the most appropriate approach:
 - For `<img>` tags, replace your `src` attribute with `data-lazy-src` (don't forget to set your image's width & height):
```html
<img data-lazy-src="picture1.png" width="80" height="60" />
```

 - For CSS-defined background images, place your `background-image` rule in a separate CSS class and then define it in your element using the `data-lazy-class` attribute:
```html
<style type="text/css">
.target.has-background {
    background-image: url(picture2.png);
}
</style>

<div class="target" data-lazy-class="has-background"></div>
```

 - In order to preload images that will be eventually used in your page (useful for background images that will be used on Bootstrap Modals, for instance), define a preloader element and set its `data-preload-image` with your desired image URL:
```html
<i data-preload-image="picture3.png"></i>
```

Finally, you must either call `$(document).lazyRender()` or manually trigger `$(document).lazyRender('render')`:
```html
<script type="text/javascript">
// either schedule lazyRender to render all images AFTER the window's load event is fired ...
$(document).lazyRender();

// ... or, for any reason whatsoever, render all remaining images after the user clicks #myButton
$('#myButton'.on('click', function () {
    $(document).lazyRender('render');
});
<script>
```

## Example

```html
<script type="text/javascript" src="bower_components/jquery.lazyRender/dist/jquery.lazyRender.js"></script>
<link rel="stylesheet" href="bower_components/jquery.lazyRender/dist/jquery.lazyRender.css" />

<style type="text/css">
.target.has-background {
    background-image: url(picture2.png);
}
</style>

<img data-lazy-src="picture1.png" width="80" height="60" />

<div class="target" data-lazy-class="has-background"></div>

<i data-preload-image="picture3.png"></i>

<script type="text/javascript">
$(document).lazyRender();
<script>
```
