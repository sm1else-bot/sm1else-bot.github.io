/* Public, curated metadata. Optional destinations: demo, download, website, video,
   publication, source, extra. Only include verified URLs. Thumbnails are actual
   application screenshots; projects without screenshots use a compact entry. */
const PROJECTS = [
  {id:'mozhi',name:'Mozhi',category:'Programming language',kind:'language',
    description:'Tamil-inspired language with a browser interpreter and eight interactive lessons.',
    tags:['Language design','Python','Pyodide'],image:'assets/mozhi.jpg',imageAlt:'Mozhi Studio running the hello-world lesson',
    demo:'mozhi/playground/',source:'https://github.com/sm1else-bot/mozhi',extra:{label:'Language guide',url:'mozhi/learn/'},
    note:'Runs in the browser using Pyodide. The first load requires network access.'},
  {id:'webos',name:'WebOS Snow',category:'Browser desktop',kind:'interactive',
    description:'A Snow Leopard-style desktop with working apps, draggable windows, and a shared simulated filesystem.',
    tags:['JavaScript','Desktop simulation','Browser'],image:'assets/webos-snow.png',imageAlt:'WebOS Snow desktop with Finder, the Dock, and a file context menu',imageFit:'contain',
    demo:'https://webos.jessenth.com/',
    note:'Runs entirely in the browser. Its simulated files persist for the browser session; it does not access your real filesystem.'},
];
