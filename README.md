# Mermaid.js for ReSpec

This ReSpec extension allows you to embed
[mermaid.js](https://mermaid-js.github.io/) diagrams in your specification.

Mermaid lets you create diagrams and visualizations using text and code. It is
a Javascript based diagramming and charting tool that renders Markdown-inspired
text definitions to create and modify diagrams dynamically.

An example of the output of this extension is provided below (this extension
renders the SVG diagram shown below):

![image](https://user-images.githubusercontent.com/108611/163728376-207437a8-fee0-4e3e-a9ad-8456c514de44.png)

# Usage

To use this extension, include the following line in your ReSpec file:

```html
<script class="remove" src="https://cdn.jsdelivr.net/gh/digitalbazaar/respec-mermaid@1.0.0/dist/main.js"></script>
```

and set the following configuration option in your ReSpec configuration:

```js
preProcess: [window.respecMermaid.createFigures]
```

Note that there might be releases later than the one listed above.
Check this repository's
[tags](https://github.com/digitalbazaar/respec-mermaid/tags) for all known
releases.

# ReSpec Markup

To use this extension, you must add the `mermaid` class to your content block.


```html
<figure>
  <pre class="diagram mermaid">
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
  </pre>
  <figcaption>A sequence diagram example</figcaption>
</figure>
```

For more examples of mermaid.js markup, see the
[official documentation](https://mermaid-js.github.io/).
