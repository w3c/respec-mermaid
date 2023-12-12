import mermaid from 'mermaid';

function addMermaidStyles() {
  const mermaidStyles = document.createElement('style');

  mermaidStyles.innerHTML += `
  /* Any custom mermaid.js scripts will go here. */
  }`;

  document.getElementsByTagName('head')[0].appendChild(mermaidStyles);
}

function addMermaidScripts() {
  const mermaidScripts = document.createElement('script');
  mermaidScripts.type = 'text/javascript';
  mermaidScripts.text += `
   /* Any custom mermaid.js scripts will go here. */
  `;
  document.getElementsByTagName('head')[0].appendChild(mermaidScripts);

  mermaid.mermaidAPI.initialize({startOnLoad:false});
}

async function createFigures() {
  // add scripts for figures
  addMermaidScripts();

  // add styles for figures
  addMermaidStyles();

  // process every mermaid figure in the document
  const mermaidFigures = document.querySelectorAll(".mermaid");
  let figureNum = 1;
  for(const figure of mermaidFigures) {
    // extract the mermaid source code
    const mermaidSource = figure.firstChild.textContent;
    // try rendering the diagram
    try {
      const {svg} = await mermaid.mermaidAPI.render(
        'diagram-' + figureNum, mermaidSource);
      const template = document.createElement('template');
      const cleanedSvg = svg.trim().replace(/height="[0-9]*"/, '');
      template.innerHTML = cleanedSvg;
      figure.parentElement.prepend(template.content.firstChild);
      figure.remove();
      figureNum++;
    } catch(e) {
      console.error('respec-mermaid error: Failed to generate figure.',
        e, mermaidSource);
      continue;
    }
  }
}

// setup exports on window
window.respecMermaid = {
  createFigures
}
