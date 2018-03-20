//Import a html template from a url
function importTemplate(url) {
  let p = new Promise(function (resolve, reject) {
    let el = document.createElement("link");
    el.rel = 'import';
    el.href = url;

    //add it to the page
    document.querySelector("head").appendChild(el);
    console.log(1);
    resolve(el);
  }).then(function (el) {
    console.log(2);
    let exp = null;
    //grab link
    //let link = document.querySelector(`link[href='${url}']`);
    if (el) {
      //import template tag or template ID
      let temp = el.import.querySelector("#template");
      if (temp) {
        exp = document.importNode(temp, true);

        //style
        let style = el.import.querySelector('style');
        if (style)
          document.querySelector("style").innerHTML += style.innerHTML;
      }
    }
    console.log(exp);
    return exp;
  });

}
