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
      await mermaid.mermaidAPI.render(
        'diagram-' + figureNum, mermaidSource, (svgCode, bindFunctions) => {
          const template = document.createElement('template');
          template.innerHTML = svgCode.trim();
          figure.parentElement.prepend(template.content.firstChild);
          figure.remove();
      });
      figureNum++;
    } catch(e) {
      console.error('respec-mermaid error: Failed to generate figure.',
        e, mermaidSource);
      continue;
    }

    // append the examples
    //example.after(preJwt);
  }
}

// setup exports on window
window.respecMermaid = {
  createFigures
}
