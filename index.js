import mermaid from 'mermaid';

function addMermaidStyles(document) {
  const mermaidStyles = document.createElement('style');

  mermaidStyles.innerHTML += `
  /* Any custom mermaid.js scripts will go here. */
  `;

  document.getElementsByTagName('head')[0].appendChild(mermaidStyles);
}

function addMermaidScripts(document) {
  const mermaidScripts = document.createElement('script');
  mermaidScripts.type = 'text/javascript';
  mermaidScripts.text += `
   /* Any custom mermaid.js scripts will go here. */
  `;
  document.getElementsByTagName('head')[0].appendChild(mermaidScripts);

  mermaid.initialize({startOnLoad:false, htmlLabels: false});
}

async function createFigures(config, document, utils) {
  // add scripts for figures
  addMermaidScripts(document);

  // add styles for figures
  addMermaidStyles(document);

  // process every mermaid figure in the document
  const mermaidFigures = document.querySelectorAll(".mermaid");
  let figureNum = 1;
  for(const figure of mermaidFigures) {
    // extract the mermaid source code
    const mermaidSource = figure.firstChild.textContent;
    // try rendering the diagram
    try {
      const {svg} = await mermaid.render(
        'diagram-' + figureNum, mermaidSource);
      const template = document.createElement('template');
      const cleanedSvg = svg.trim();//.replace(/height="[0-9]*"/, '');
      const dataUrl = 'data:image/svg+xml;base64,' + window.btoa(cleanedSvg);
      let style =
        figure.getAttribute('style') || 'max-width: 100%; aspect-ratio: 2/1;';
      template.innerHTML = `<img style="${style}" src="${dataUrl}">`;
      figure.parentElement.prepend(template.content.firstChild);
      figure.remove();
      figureNum++;
    } catch(e) {
      console.error('Failed to generate figure', {
        elements: [figure.firstChild],
        cause: e,
      });
      continue;
    }
  }
}

// setup exports on window
window.respecMermaid = {
  createFigures,
  // Export mermaid as well so that plugins can register custom diagrams if they want to.
  mermaid
}
