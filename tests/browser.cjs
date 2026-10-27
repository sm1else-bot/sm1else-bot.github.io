const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.SITE_URL||'http://127.0.0.1:8770/';
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.MOZHI_TEST_BROWSER?{executablePath:process.env.MOZHI_TEST_BROWSER}:{})});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  if(new URL(base).hostname==='127.0.0.1')await page.route('**/mozhi/playground/',route=>route.fulfill({status:302,headers:{location:'https://sm1else-bot.github.io/mozhi/playground/'}}));
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.project-card').count(),2);assert.deepEqual(await page.locator('.project-card').evaluateAll(items=>items.map(i=>i.dataset.project)),['mozhi','webos']);
  assert.equal(await page.locator('#results').innerText(),'2 projects');
  assert.equal(await page.locator('#total-count, #all-count, .hero, .media-action').count(),0);
  assert.ok((await page.locator('h1').boundingBox()).height<65);assert.ok((await page.locator('.project-media').first().boundingBox()).height<=250);
  assert.equal(await page.locator('.project-media img').evaluateAll(images=>images.every(i=>i.complete&&i.naturalWidth>0)),true);
  assert.equal(await page.locator('[data-project=mozhi] .primary-action').getAttribute('href'),'mozhi/playground/');
  assert.equal(await page.locator('[data-project=mozhi] .card-actions a').nth(1).getAttribute('href'),'https://github.com/sm1else-bot/mozhi');
  await page.locator('[data-filter="download"]').click();assert.equal(await page.locator('#empty').isVisible(),true);
  await page.locator('#empty-reset').click();await page.locator('#search').fill('mozhi');await page.locator('#sort').selectOption('name');await page.locator('#list-view').click();
  await page.reload();assert.equal(await page.locator('.project-card').count(),1);assert.equal(await page.locator('#list-view').getAttribute('aria-pressed'),'true');
  await page.locator('#reset').click();await page.locator('#grid-view').click();await page.locator('[data-project=mozhi] .details-toggle').click();assert.equal(await page.locator('#details-mozhi').isVisible(),true);
  await page.locator('[data-project=mozhi] .preview-action').click();const preview=page.frameLocator('#preview-frame');
  await preview.locator('#run-btn').click({timeout:90000});await preview.locator('#status').filter({hasText:'Finished'}).waitFor();assert.ok((await preview.locator('#output').innerText()).includes('Vanakkam'));
  await page.locator('#preview-close').click();await page.waitForFunction(()=>document.getElementById('preview-frame').getAttribute('src')==='about:blank');
  await page.locator('[data-project=webos] .preview-action').click();await preview.getByText('Read Me.txt',{exact:true}).first().waitFor({timeout:30000});assert.equal(await page.locator('#preview-open').getAttribute('href'),'https://webos.jessenth.com/');await page.locator('#preview-close').click();await page.waitForFunction(()=>document.getElementById('preview-frame').getAttribute('src')==='about:blank');
  for(const width of [1024,768,390,320]){await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
  assert.deepEqual(errors,[]);console.log('PASS Mozhi and WebOS catalog, links, filters, search, sorting, saved views, details, real interpreter preview, cleanup and responsive layouts');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
