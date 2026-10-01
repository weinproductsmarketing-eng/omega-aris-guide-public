/* Visual instructions: diagrams are examples, never app screenshots. */
window.GuideVisuals=(()=>{
 const paths={
 wifi:'M4 10a18 18 0 0 1 24 0M8 15a12 12 0 0 1 16 0M12 20a6 6 0 0 1 8 0M16 25h.01',
 battery:'M4 9h23v16H4zM28 14h2v6M8 13h6v8M18 13v8',
 search:'M22 22l7 7M24 14a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
 download:'M16 3v18M9 14l7 7 7-7M4 24v5h24v-5',
 mic:'M12 5a4 4 0 0 1 8 0v11a4 4 0 0 1-8 0zM7 14v3a9 9 0 0 0 18 0v-3M16 26v5M10 31h12',
 coin:'M28 16a12 12 0 1 1-24 0 12 12 0 0 1 24 0M23 16a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
 check:'M5 17l7 7L27 7',
 plane:'M3 17l11-4V4l3-2 3 2v9l11 4v4l-11-3v7l4 3v3l-7-2-7 2v-3l4-3v-7L3 21z',
 wave:'M2 16h4l3-9 4 18 4-22 4 23 4-13 3 3h3',
 web:'M3 5h26v22H3zM3 11h26M7 8h.01M11 8h.01',
 account:'M22 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0M5 29v-3a11 11 0 0 1 22 0v3',
 ruler:'M3 10h26v12H3zM8 10v6M13 10v4M18 10v6M23 10v4'
 };
 const icon=k=>'<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+paths[k]+'"/></svg>';
 const flow=(title,items,note='Illustrated checklist')=>'<figure class="action-visual"><figcaption>'+title+'</figcaption><div class="visual-flow">'+items.map(([k,t,s],i)=>'<div class="visual-action"><span class="visual-icon">'+icon(k)+'</span><span class="visual-order">'+(i+1)+'</span><b>'+t+'</b><span>'+s+'</span></div>').join('')+'</div><small>'+note+'</small></figure>';
 function microphone(device,name){
  const apple=['iphone','ipad'].includes(device),desktop=['windows','mac','linux'].includes(device);
  const action=desktop?'Allow':apple?'Allow / OK':'While using the app';
  const path=desktop?['Browser settings','Site permissions','Microphone → Allow']:apple?['Settings','Privacy & Security','Microphone → app ON']:['Settings → Apps',name+' → Permissions','Microphone → Allow'];
  const source=desktop?'https://support.google.com/chrome/answer/2693767?co=GENIE.Platform%3DDesktop&hl=en':apple?'https://support.apple.com/guide/iphone/control-access-to-hardware-features-iph168c4bbd5/ios':'https://support.google.com/android/answer/9431959?hl=en';
  return '<figure class="permission-visual"><div class="permission-example"><span class="example-label">ILLUSTRATED EXAMPLE</span>'+icon('mic')+'<b>'+name+' needs the microphone</b><p>Look for the option that lets the app or website hear the coin.</p><span class="permission-choice">'+icon('check')+action+'</span><span class="tap-hint">↑ Choose the option that allows access</span></div><figcaption><b>Let your selected app listen</b><p>When you start a test, a permission message may appear. Its wording and layout can differ from this example.</p><details><summary>Already selected “Don’t allow”?</summary><ol>'+path.map(t=>'<li>'+t+'</li>').join('')+'</ol><p>Return to the app or website and try again. Browser and device permissions may both need to be enabled. On a shop or institution’s managed device, ask its administrator if the setting is locked.</p><a href="'+source+'" target="_blank" rel="noopener">Official permission help ↗</a></details></figcaption></figure>';
 }
 function step(n,device,app,data){
 const apple=['iphone','ipad'].includes(device),desktop=['windows','mac','linux'].includes(device),a=data.apps[app],store=apple?'App Store':'Google Play';
 if(n===1)return flow('Before you begin',[['wifi','Connect to Internet','Wi-Fi or cellular data'],['battery','Charge your device','Use its usual charger'],[desktop?'web':'account',desktop?'Open a browser':'Have your account ready',desktop?'Keep this guide open':apple?'Apple Account':'Google account']]);
 if(n===2)return desktop?flow('Open the official website',[['web','Use the link above','Opens in a new tab'],['coin','Find your coin','Use the exact match']]):flow('Find → check → install',[['search','Find '+a.name,'In '+store],['check','Check the developer',apple?a.iosDeveloper:a.androidDeveloper],['download',apple?'Get → Open':'Install → Open','Wait for installation']]);
 if(n===3)return desktop?flow('Match all three',[['coin','Metal','Gold, silver or other metal'],['ruler','Weight','Match the stated coin weight'],['check','Design / year','Match the listed version']]):flow('Check access before paying',[['account','Check your access','Open the selected app'],['check','Read the terms','Price, renewal and device limits'],['download','Buy only if needed','Use the official source; no Omega license included']]);
 if(n===4)return microphone(device,a.name);
 if(n===5)return flow('One test, then a wider check',[['coin','Select the exact coin','Metal, weight and design'],['mic','Listen in a quiet place','Keep the microphone clear'],['wave','Review the sound result','Then check weight, size and appearance']],'Illustrated sequence · A sound match alone does not prove authenticity.');
 if(n===6)return desktop?flow('Browser testing stays online',[['web','Keep the website open','Use its test screen'],['wifi','Keep Internet connected','Offline browser use is not confirmed']]):offline();
 return '';
 }
 function offline(){return flow('Practice the offline check',[['wifi','Set up online first','Load your exact coin and resolve access'],['plane','Airplane Mode ON','Also check Wi-Fi is OFF'],['coin','Reopen and try a test','Restore your connection afterward']],'Illustrated checklist · For installed phone/tablet apps, not the websites.');}
 return {step,microphone,offline,flow};
})();
