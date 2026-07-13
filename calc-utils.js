
const $=id=>document.getElementById(id);
const toast=$("toast");
const currency=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2});
function n(id){const v=parseFloat($(id).value);return Number.isFinite(v)?v:0}
function money(v){const a=currency.format(Math.abs(Number.isFinite(v)?v:0));return v<0?"-"+a:a}
function setText(id,v){$(id).textContent=v}
function showToast(message){
  toast.textContent=message;toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>toast.classList.remove("show"),2100);
}
async function copyText(value,message){
  try{await navigator.clipboard.writeText(value)}
  catch(e){
    const area=document.createElement("textarea");
    area.value=value;area.style.position="fixed";area.style.opacity="0";
    document.body.appendChild(area);area.select();document.execCommand("copy");area.remove();
  }
  showToast(message);
}
function saveInputs(key,ids){
  const data={};ids.forEach(id=>data[id]=$(id).value);
  localStorage.setItem(key,JSON.stringify(data));showToast("Deal saved on this device.");
}
function loadInputs(key,ids){
  try{
    const saved=localStorage.getItem(key);if(!saved)return false;
    const data=JSON.parse(saved);ids.forEach(id=>{if(data[id]!==undefined)$(id).value=data[id]});
    return true;
  }catch(e){return false}
}
function shareLink(ids){
  const url=new URL(window.location.href);url.search="";
  ids.forEach(id=>url.searchParams.set(id,$(id).value));
  return url.toString();
}
function applyQuery(ids){
  const p=new URLSearchParams(window.location.search);if(!p.size)return false;
  let used=false;ids.forEach(id=>{if(p.has(id)){ $(id).value=p.get(id);used=true }});
  return used;
}
function monthlyPayment(principal,annualRate,years){
  if(principal<=0||years<=0)return 0;
  const m=years*12,r=annualRate/100/12;
  if(r===0)return principal/m;
  const f=Math.pow(1+r,m);
  return principal*((r*f)/(f-1));
}
