/* Public, curated metadata. Optional destinations: demo, download, website, video,
   publication, source, extra. Only include verified URLs. Thumbnails are actual
   application screenshots; projects without screenshots use a compact entry. */
const PROJECTS = [
  {id:'mozhi',name:'Mozhi',category:'Programming language',kind:'language',
    description:'Tamil-inspired language with a browser interpreter and eight interactive lessons.',
    tags:['Language design','Python','Pyodide'],image:'assets/mozhi.jpg',imageAlt:'Mozhi Studio running the hello-world lesson',
    demo:'mozhi/playground/',source:'https://github.com/sm1else-bot/mozhi',extra:{label:'Language guide',url:'mozhi/learn/'},
    note:'Runs in the browser using Pyodide. The first load requires network access.'},
  {id:'sound',name:'Sound from Scratch',category:'Interactive audio',kind:'audio',
    description:'An interactive Web Audio course, from an oscillator to a playable synthesizer.',
    tags:['Web Audio','Synthesis','Interactive course'],image:'assets/sound.jpg',imageAlt:'Sound from Scratch full synthesizer with waveform, filter, envelope, and keyboard controls',
    demo:'https://jessenth.com/music/sound-from-scratch.html',note:'Hosted on jessenth.com. Sound starts only after you use a play control.'},
  {id:'finder',name:'Finder+',category:'Windows application',kind:'desktop',mark:'F+',
    description:'Native Windows file search with fuzzy matching and a focused interface.',
    tags:['Windows','File search','Desktop'],source:'https://github.com/sm1else-bot/finderplusplus',
    download:'https://raw.githubusercontent.com/sm1else-bot/finderplusplus/main/downloads/FinderPlus-win-x64.zip',downloadLabel:'Download for Windows',
    extra:{label:'SHA-256 checksums',url:'https://raw.githubusercontent.com/sm1else-bot/finderplusplus/main/downloads/SHA256SUMS.txt'},note:'Windows x64 ZIP package, published in the project repository.'},
  {id:'aeroworks',name:'Aeroworks',category:'Simulation',kind:'research',mark:'AW',
    description:'A 3D motorsport aerodynamics workspace and virtual wind tunnel.',
    tags:['Simulation','Airflow','Engineering'],source:'https://github.com/sm1else-bot/aeroworks',
    note:'Source available. A browser deployment is not currently linked in this collection.'},
];
