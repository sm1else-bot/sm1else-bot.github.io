/* Public, curated metadata. Optional destinations: demo, download, website, video,
   publication, source, extra. Only include verified URLs. Thumbnails are actual
   application screenshots; projects without screenshots use a compact entry. */
const PROJECTS = [
  {id:'triage',name:'TRIAGE',category:'Engineering case study',kind:'research',
    description:'The YHack business-risk prototype and its evolution into TRIAGE+, an evidence-governed analytical workstation.',
    tags:['Python','React','Evidence systems'],image:'assets/triage-workstation.webp',imageAlt:'TRIAGE+ report with explicitly classified findings in a synthetic test case',
    website:'triageplus/',websiteLabel:'Read case study',source:'https://github.com/sm1else-bot/triageplus',
    note:'Covers the original team project and subsequent engineering. Source contains the static publication. The original demo is linked in the case study; the TRIAGE+ interactive demo is coming soon.'},
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
