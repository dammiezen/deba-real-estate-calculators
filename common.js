
(function(){
  "use strict";
  let deferredPrompt=null;
  const installBtn=document.getElementById("installAppBtn");
  const help=document.getElementById("installHelp");
  const closeHelp=document.getElementById("closeInstallHelp");
  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;if(installBtn)installBtn.hidden=false});
  if(installBtn)installBtn.addEventListener("click",async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}else if(help){help.classList.add("show")}});
  if(closeHelp&&help){closeHelp.onclick=()=>help.classList.remove("show");help.onclick=e=>{if(e.target===help)help.classList.remove("show")}}
  if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
})();
