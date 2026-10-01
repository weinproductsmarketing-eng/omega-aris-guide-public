(() => {
  const data=window.GUIDE_CONTENT; let device='android', app='pingcoin';
  const out=document.getElementById('guide');
  const step=(n,title,body)=>`<article class="step"><span class="step-number">${n}</span><div><h4>${title}</h4>${body}</div></article>`;
  function render(){
    const a=data.apps[app], apple=device==='iphone'||device==='ipad';
    document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.device===device)));
    document.querySelectorAll('[data-app]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.app===app)));
    document.getElementById('selection').textContent=`Your guide: ${a.name} · ${data.devices[device]}`;
    let html=`<div class="guide-title"><h3>${a.name} setup</h3><span class="pill">${data.devices[device]}</span></div>`;
    if(['windows','mac','linux'].includes(device)){
      const ping=app==='pingcoin', url=ping?'https://pingcoin.com/coins':'https://stackertools.com/home';
      const browserName=device==='windows'?'Microsoft Edge or Google Chrome':device==='mac'?'Safari or Google Chrome':'your web browser, such as Google Chrome';
      html+=step(1,'Open your web browser',`<p>On your ${data.devices[device]} computer, open ${browserName}. Connect to the Internet and keep this guide open. You do not need to install a computer app.</p>`);
      html+=step(2,`Open ${a.name}`,`<p>Select the link below. The website opens in another tab so you can return to these instructions.</p><a class="store-link" href="${url}" target="_blank" rel="noopener">Open ${a.name} coin list ↗</a>${ping?'':'<p class="note">The StackerTools browser tester is a beta version. If it does not work in your browser, try Chrome—the developer says it has had the most testing.</p>'}`);
      html+=step(3,'Choose your exact coin','<p>Select the coin you want to check. Match its metal, weight and design or year range. If your coin is not listed, do not choose a similar coin as a substitute.</p>');
      html+=step(4,'Allow the microphone',`<ol><li>Select <b>${ping?'Start Ping Test':'Start'}</b> on the coin’s test screen.</li><li>If your browser asks to use the microphone, select <b>Allow</b>.</li><li>If asked to choose a microphone, choose the one you will use to hear the coin.</li></ol><p>The website listens through your computer’s microphone. If the computer has no microphone, connect a compatible external microphone or use a phone or tablet.</p>`);
      html+=step(5,'Make a test and read the result','<ol><li>Move to a quiet place. Keep the microphone clear.</li><li>Follow the operating instructions supplied with your Omega to position and sound the coin. The microphone must be close enough to hear it clearly.</li><li>Let the website finish listening, then read the result. Repeat if the recording was unclear.</li><li>Also check the coin’s weight, dimensions and appearance. A sound match alone does not prove authenticity.</li></ol>');
      html+=step(6,'Keep your connection for browser testing','<p>Keep Internet connected while using either website. For testing away from Wi-Fi, set up the phone or tablet app and complete the <a href="#internet">offline check</a> before you leave.</p>');
      out.innerHTML=html; return;
    }
    const store=apple?'App Store':'Google Play', title=apple?a.iosName:a.androidName, developer=apple?a.iosDeveloper:a.androidDeveloper, url=apple?a.iosURL:a.androidURL;
    html+=step(1,'Prepare your device',`<p>Connect to Wi-Fi or cellular Internet. Have your ${apple?'Apple':'Google'} account ready for the store and charge your device. Both apps need microphone access to listen to the coin.</p>${device==='tablet'?'<div class="note"><b>Tablet check:</b> Open the listing on this tablet first. Continue only if Google Play offers installation for your device. </div>':''}`);
    html+=step(2,`Install from ${store}`,`<ol><li>Open <b>${store}</b> on the device you will use for testing.</li><li>Search for <b>${title}</b>. Check the developer: <b>${developer}</b>.</li><li>Tap <b>${apple?'Get':'Install'}</b>. ${apple?'Confirm with your device’s normal Face ID, Touch ID or Apple Account prompt.':'Sign in to Google Play if asked.'}</li><li>When installation finishes, open the app.</li></ol><a class="store-link" href="${url}">Open the official ${store} listing ↗</a><p class="source-line">Store labels can vary. If it already says Open, the app is installed.</p>`);
    html+=step(3,'Check access before you pay',`<p>${a.access}</p>${app==='stackertools'?'<a class="store-link" href="https://soundmoneymetals.us/" target="_blank" rel="noopener">Check StackerTools access options ↗</a>':''}`);
    html+=step(4,'Allow the app to hear the coin','<p>When the app requests the microphone, allow access for testing. If previously denied, open your device settings and find the app’s microphone permission. Exact settings names vary by device and operating-system version.</p>');
    html+=step(5,'Get familiar with the testing screen',`<ol>${a.testing.map(([t,p])=>`<li><b>${t}.</b> ${p}</li>`).join('')}</ol><p class="source-line">Reference: <a href="${a.source}">${a.name} developer guidance / web interface</a>. Button names can vary by version.</p>`);
    const visuals=apple?a.visualsApple:a.visualsAndroid;
    html+=`<div class="visuals">${visuals.map(([file,t,p])=>`<figure class="visual"><a href="assets/${file}" target="_blank" rel="noopener" aria-label="Enlarge ${t}"><img src="assets/${file}" alt="${t}: ${p}" loading="lazy"></a><figcaption><b>${t}</b>${p}<small>Tap to enlarge</small></figcaption></figure>`).join('')}</div>`;
    html+=step(6,'Check offline use and the Omega setup','<p>Follow the <a href="#internet">offline readiness check</a>, then review the <a href="#equipment">Omega positioning and power notes</a>. Installing the app is only the software part of getting ready.</p>');
    out.innerHTML=html;
  }
  document.querySelectorAll('[data-device]').forEach(b=>b.addEventListener('click',()=>{device=b.dataset.device;render()}));
  document.querySelectorAll('[data-app]').forEach(b=>b.addEventListener('click',()=>{app=b.dataset.app;render()}));
  document.getElementById('switch-app').addEventListener('click',()=>{app=app==='pingcoin'?'stackertools':'pingcoin';render();document.getElementById('start').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});document.querySelector(`[data-app="${app}"]`).focus({preventScroll:true})});
  const icons={android:'phone',iphone:'phone',tablet:'tablet',ipad:'tablet',windows:'computer',mac:'computer',linux:'computer'};
  document.querySelectorAll('[data-device]').forEach(b=>{
    const type=icons[b.dataset.device], shape=type==='computer'?'<rect x="2" y="3" width="24" height="16" rx="2"/><path d="M10 25h8M14 19v6"/>':`<rect x="${type==='phone'?7:4}" y="2" width="${type==='phone'?14:20}" height="24" rx="3"/><path d="M12 22h4"/>`;
    b.insertAdjacentHTML('afterbegin',`<svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">${shape}</svg>`);
  });
  const photos=['Front-0s','Front-1s','Left-0s','Left-1s','Right-0s','Right-1s'];
  let photo=0, playing=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gallery=document.querySelector('.hero-image'), photoImg=document.querySelector('#product-photo img'), pause=document.getElementById('photo-pause');
  function showPhoto(){const name=photos[photo], [view,count]=name.split('-'), phones=parseInt(count);const caption=`${view} view · ${phones===0?'without a phone':'one phone'}`;photoImg.src=`assets/${name}.png`;photoImg.alt=`Omega Aris Cricket 660B, ${caption}`;document.getElementById('photo-caption').textContent=caption;document.getElementById('photo-count').textContent=`${photo+1} / ${photos.length}`;}
  function updatePause(){pause.textContent=playing?'Pause photos':'Play photos';}
  document.getElementById('photo-prev').addEventListener('click',()=>{playing=false;photo=(photo+photos.length-1)%photos.length;showPhoto();updatePause()});
  document.getElementById('photo-next').addEventListener('click',()=>{playing=false;photo=(photo+1)%photos.length;showPhoto();updatePause()});
  pause.addEventListener('click',()=>{playing=!playing;updatePause()});
  setInterval(()=>{if(playing&&!document.hidden&&!gallery.matches(':hover')&&!gallery.contains(document.activeElement)){photo=(photo+1)%photos.length;showPhoto()}},4000);
  updatePause();render();
})();
