const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base=process.env.SITE_URL||'http://127.0.0.1:8770/';
(async()=>{
  const browser=await chromium.launch({headless:true,...(process.env.MOZHI_TEST_BROWSER?{executablePath:process.env.MOZHI_TEST_BROWSER}:{})});
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1000}});
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    await page.goto(base);await page.evaluate(()=>document.fonts.ready);
    assert.equal(await page.locator('.project-card').count(),4);
    assert.ok((await page.locator('.project-media').first().boundingBox()).y<300,'Projects should appear immediately');
    assert.equal(await page.locator('.hero').count(),0);
    assert.equal(await page.locator('#total-count, #all-count').count(),0,'Only the result summary should show the project count');
    assert.ok((await page.locator('.project-media').first().boundingBox()).height<=250,'Gallery previews should stay compact');
    assert.equal(await page.locator('.media-action').count(),0,'Actions belong below screenshots');
    assert.ok((await page.locator('h1').boundingBox()).height<65,'Page heading must stay compact');
    assert.ok((await page.locator('.search svg').boundingBox()).width<=20,'Search icon must not expand to page size');
    assert.equal(await page.locator('.project-media img').evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0)),true);
    await page.locator('[data-filter="demo"]').click();assert.equal(await page.locator('.project-card').count(),2);
    await page.locator('[data-filter="download"]').click();assert.equal(await page.locator('.project-card').count(),1);
    assert.ok((await page.locator('[data-project="finder"] .primary-action').getAttribute('href')).endsWith('FinderPlus-win-x64.zip'));
    await page.locator('.details-toggle').click();assert.equal(await page.locator('#details-finder').isVisible(),true);
    assert.ok((await page.locator('#details-finder a').getAttribute('href')).endsWith('SHA256SUMS.txt'));
    await page.locator('[data-filter="source"]').click();assert.equal(await page.locator('.project-card').count(),3);
    await page.locator('#sort').selectOption('name');await page.locator('#list-view').click();
    await page.locator('#search').fill('Windows');assert.equal(await page.locator('.project-card').count(),1);
    assert.equal(await page.locator('.project-card').first().getAttribute('data-project'),'finder');
    await page.locator('#search').fill('');await page.locator('#grid-view').click();await page.locator('#sort').selectOption('curated');
    await page.locator('#reset').click();await page.locator('#search').fill('nonexistent project');assert.equal(await page.locator('#empty').isVisible(),true);
    await page.locator('#empty-reset').click();await page.locator('[data-project="sound"] .tags button').first().click();assert.equal(await page.locator('.project-card').count(),1);
    assert.ok(page.url().includes('q=Web'));await page.reload();assert.equal(await page.locator('.project-card').count(),1);
    await page.locator('#reset').click();await page.locator('#sort').selectOption('name');assert.equal(await page.locator('.project-card').first().getAttribute('data-project'),'aeroworks');
    await page.locator('#list-view').click();assert.ok(await page.locator('#project-grid').evaluate(e=>e.classList.contains('list')));
    await page.reload();assert.equal(await page.locator('#list-view').getAttribute('aria-pressed'),'true');
    await page.locator('#grid-view').click();await page.locator('#sort').selectOption('curated');
    await page.locator('h1').click();await page.keyboard.press('/');assert.equal(await page.locator('#search').evaluate(e=>e===document.activeElement),true);
    await page.keyboard.press('Escape');
    await page.locator('[data-project="sound"] .project-media').click();
    await page.frameLocator('#preview-frame').locator('#d1-btn').waitFor({timeout:30000});
    await page.frameLocator('#preview-frame').locator('#d1-btn').click();
    await page.locator('#preview-close').click();await page.waitForFunction(()=>document.getElementById('preview-frame').getAttribute('src')==='about:blank');
    assert.equal(await page.locator('[data-project="sound"] .project-media').evaluate(e=>e===document.activeElement),true);
    console.log('PASS catalog, real screenshots, all filters, verified download, details, tag search, URL state, sorting, persistent views, shortcuts, live audio preview and cleanup');
    if(process.env.SCREENSHOT_DIR)await page.screenshot({path:process.env.SCREENSHOT_DIR+'/projects-archive-desktop.png',fullPage:true});
    for(const width of [1024,768,390,320]){
      await page.setViewportSize({width,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow at ${width}`);
    }
    if(process.env.SCREENSHOT_DIR){await page.setViewportSize({width:390,height:844});await page.screenshot({path:process.env.SCREENSHOT_DIR+'/projects-archive-mobile.png',fullPage:true});}
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.evaluate(()=>{const original=PROJECTS.slice();for(let i=0;i<100;i++)PROJECTS.push({...original[i%original.length],id:'test-'+i,name:'Test project '+i});render();});
    assert.equal(await page.locator('.project-card').count(),104);
    await page.locator('#search').fill('Test project 99');assert.equal(await page.locator('.project-card').count(),1);
    assert.deepEqual(errors,[]);
    console.log('PASS responsive layouts at 320–1440px, reduced-motion rendering, and filtering a 104-entry catalog');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
