/* Public, curated metadata. Optional destinations: demo, download, website, video,
   publication, source, extra. Only include verified URLs. Thumbnails are actual
   application screenshots; projects without screenshots use a compact entry. */
const PROJECTS = [
  {id:'mozhi',name:'Mozhi',category:'Programming language',kind:'language',
    description:'Tamil-inspired language with a browser interpreter and eight interactive lessons.',
    tags:['Language design','Python','Pyodide'],image:'assets/mozhi.jpg',imageAlt:'Mozhi Studio running the hello-world lesson',
    demo:'mozhi/playground/',source:'https://github.com/sm1else-bot/mozhi',extra:{label:'Language guide',url:'mozhi/learn/'},
    note:'Runs in the browser using Pyodide. The first load requires network access.'},
];
