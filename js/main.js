let e = document.createElement('div');
e.id = 'player';
e.classList.add("webfoot-obj");

document.getElementById("stage").appendChild(e);

let p = new Player(e);

let b = new Bundler(p);
b.start(120, 0.5);
