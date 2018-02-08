//Import a html template from a url
function importTemplate(url) {
  let exp = null;

  let el = document.createElement("link");
  el.rel = 'import';
  el.href = url;

  //add it to the page
  document.querySelector("head").appendChild(el);

  //grab link
  //let link = document.querySelector(`link[href='${url}']`);
  if (el) {
    //import template tag or template ID
    let temp = el.import.querySelector('template') || el.import.querySelector('#template');
    exp = document.importNode(temp.content, true);

    //style
    let style = el.import.querySelector('style');
    if (style)
      document.querySelector("style").innerHTML += style.innerHTML;
  }
  return exp;
}
