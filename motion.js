/* Decorative motion never blocks setup or hides instructional content. */
(()=>{
 const section=document.getElementById('reveal'), stage=section.querySelector('.cinema-stage'), video=document.getElementById('reveal-video'), coin=document.getElementById('coin-video'), button=document.getElementById('motion-toggle'), progress=document.getElementById('film-progress');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let enabled=!preference.matches&&!navigator.connection?.saveData, queued=false, coinVisible=false, playPending=false;
 function load(v){const source=v.querySelector('source');if(!source.getAttribute('src')){source.src=source.dataset.src;v.load();}}
 function sync(){
  queued=false;if(!enabled||document.hidden)return;
  const top=parseFloat(getComputedStyle(stage).top)||0;
  const distance=Math.max(1,section.offsetHeight-stage.offsetHeight);
  const fraction=Math.max(0,Math.min(1,(top-section.getBoundingClientRect().top)/distance));
  progress.style.transform=`scaleX(${fraction})`;
  if(Number.isFinite(video.duration)&&video.readyState>=1){
   const time=fraction*Math.max(0,video.duration-.05);
   // Always apply the latest target, including during a seek interrupted by resizing.
   if(Math.abs(video.currentTime-time)>.045)video.currentTime=time;
  }
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(sync);}}
 function shouldPlayCoin(){return enabled&&coinVisible&&!document.hidden;}
 function reconcileCoin(){
  coin.loop=true;coin.muted=true;
  if(!shouldPlayCoin()){coin.pause();return;}
  load(coin);
  if(playPending||!coin.paused)return;
  playPending=true;
  coin.play().then(()=>{playPending=false;if(!shouldPlayCoin())coin.pause();}).catch(()=>{playPending=false;});
 }
 function apply(){
  document.body.classList.toggle('motion-off',!enabled);
  button.textContent=enabled?'Turn motion off':'Turn motion on';
  button.setAttribute('aria-pressed',String(!enabled));
  video.pause();
  if(enabled){load(video);schedule();}
  reconcileCoin();
 }
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule);
 window.visualViewport?.addEventListener('resize',schedule);
 new ResizeObserver(schedule).observe(section);
 new ResizeObserver(schedule).observe(stage);
 ['loadedmetadata','loadeddata','canplay','seeked'].forEach(event=>video.addEventListener(event,schedule));
 button.addEventListener('click',()=>{enabled=!enabled;apply();});
 preference.addEventListener('change',()=>{enabled=!preference.matches&&!navigator.connection?.saveData;apply();});
 new IntersectionObserver(entries=>{coinVisible=entries[0].isIntersecting;reconcileCoin();},{threshold:0}).observe(coin);
 coin.addEventListener('canplay',reconcileCoin);
 coin.addEventListener('ended',reconcileCoin);
 document.addEventListener('pointerdown',reconcileCoin,{passive:true});
 document.addEventListener('visibilitychange',()=>{reconcileCoin();schedule();});
 window.addEventListener('pageshow',()=>{reconcileCoin();schedule();});
 // Ease through the loop boundary instead of cutting directly to the first frame.
 let fadeFrame=0;
 function fadeCoin(){
  const duration=coin.duration, time=coin.currentTime, edge=.45;
  const amount=Number.isFinite(duration)?Math.max(0,Math.min(1,time/edge,(duration-time)/edge)):1;
  coin.style.opacity=String(amount*amount*(3-2*amount));
  if(!coin.paused&&!coin.ended)fadeFrame=requestAnimationFrame(fadeCoin);
 }
 coin.addEventListener('play',()=>{cancelAnimationFrame(fadeFrame);fadeCoin();});
 coin.addEventListener('pause',()=>{cancelAnimationFrame(fadeFrame);coin.style.opacity='1';});
 apply();
})();
