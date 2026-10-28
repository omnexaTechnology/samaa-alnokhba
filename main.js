(function(){
  var WA='966567852320';
  var CLAIMS=[
    {icon:"i-car",title:"مطالبات حوادث السيارات",desc:"تجهيز ملف الحادث، تقرير المرور، تقدير الأضرار، ورفع المطالبة ومتابعتها مع شركة التأمين."},
    {icon:"i-heart",title:"التأمين الطبي",desc:"رفع مطالبات العلاج والفواتير الطبية، وتجهيز المستندات المطلوبة ومتابعة السداد."},
    {icon:"i-home",title:"تأمين الممتلكات",desc:"مطالبات الحريق والسرقة والأضرار المنزلية أو التجارية، مع توثيق الخسائر."},
    {icon:"i-scale",title:"المسؤولية المدنية",desc:"مطالبات الأضرار التي تسببت فيها للغير، ومراجعة الالتزامات والتسويات."},
    {icon:"i-search",title:"مراجعة التسويات",desc:"نراجع عرض التسوية الذي تقدمه شركة التأمين ونوضح لك إن كان منصفاً قبل القبول."},
    {icon:"i-hourglass",title:"المطالبات المتأخرة",desc:"إذا تأخرت شركة التأمين في الرد أو رفضت المطالبة، نتابع الاعتراض والإجراءات اللازمة."}
  ];
  function use(id){return '<svg class="icon"><use href="#'+id+'"/></svg>';}
  function $(id){return document.getElementById(id);}

  // Services cards, claim-type selects, footer list
  var grid=$('servicesGrid'),fs=$('footServices');
  CLAIMS.forEach(function(s){
    var a=document.createElement('article');a.className='svc2';
    a.innerHTML='<span class="si">'+use(s.icon)+'</span><h3>'+s.title+'</h3><p>'+s.desc+'</p>';
    grid.appendChild(a);
    var li=document.createElement('li');li.innerHTML='<a href="#services">'+s.title+'</a>';fs.appendChild(li);
  });
  Array.prototype.forEach.call(document.querySelectorAll('.claim-types'),function(sel){
    CLAIMS.concat([{title:'أخرى'}]).forEach(function(s){var o=document.createElement('option');o.value=o.textContent=s.title;sel.appendChild(o);});
  });


  // Header state + mobile menu
  var header=document.querySelector('.site-header');
  window.addEventListener('scroll',function(){header.classList.toggle('scrolled',window.scrollY>8);},{passive:true});
  var mb=$('menuBtn'),mn=$('mobileNav');
  function setMenu(open){mn.hidden=!open;mb.setAttribute('aria-expanded',String(open));mb.innerHTML=use(open?'i-x':'i-menu');mb.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');}
  mb.addEventListener('click',function(){setMenu(mn.hidden);});
  mn.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false);});

  // Validation
  function setErr(field,msg){var m=field.querySelector('.msg');
    if(msg){field.classList.add('err');if(!m){m=document.createElement('div');m.className='msg';field.appendChild(m);}m.textContent=msg;}
    else{field.classList.remove('err');if(m)m.remove();}}
  function validate(form){
    var ok=true;
    Array.prototype.forEach.call(form.querySelectorAll('[data-req]'),function(f){
      var el=f.querySelector('input,select'),v=(el.value||'').trim(),k=f.getAttribute('data-req'),msg='';
      if(k==='name'&&v.length<2)msg='اكتب اسمك الكامل.';
      if(k==='phone'&&!/^\+?\d{9,14}$/.test(v.replace(/[\s\-()]/g,'')))msg='أدخل رقم جوال صحيحًا، مثل 05XXXXXXXX.';
      if(k==='text'&&!v)msg='هذا الحقل مطلوب.';
      if(k==='select'&&!v)msg='اختر نوع المطالبة.';
      setErr(f,msg);if(msg&&ok){ok=false;el.focus();}
    });
    return ok;
  }

  // WhatsApp hand-off: opens wa.me with the prepared message and shows it as a fallback.
  function waUrl(msg){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(msg);}
  function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function showReady(wrap,host,form,msg){
    host.innerHTML='<div class="wa-ready"><h3>'+use('i-check')+'رسالتك جاهزة</h3>'+
      '<p>فتحنا لك واتساب برسالة جاهزة، أرسلها ثم أرفق الصور والمستندات داخل المحادثة. إذا لم يُفتح واتساب تلقائياً اضغط الزر.</p>'+
      '<div class="wa-preview" tabindex="0">'+esc(msg)+'</div>'+
      '<div class="wa-actions"><a class="wa-btn" href="'+waUrl(msg)+'" target="_blank" rel="noopener">'+use('i-whatsapp')+'فتح واتساب وإرسال</a>'+
      '<button type="button" class="ghost" data-act="copy">نسخ الرسالة</button>'+
      '<button type="button" class="ghost" data-act="back">تعديل البيانات</button></div></div>';
    wrap.hidden=true;host.hidden=false;
    // Open WhatsApp right away; if the browser blocks the popup, the button in the panel still works.
    window.open(waUrl(msg),'_blank');
    host.onclick=function(e){
      var b=e.target.closest('button');if(!b)return;
      if(b.getAttribute('data-act')==='back'){host.hidden=true;wrap.hidden=false;return;}
      var done=function(){b.textContent='تم النسخ';setTimeout(function(){b.textContent='نسخ الرسالة';},1800);};
      var fallback=function(){var r=document.createRange();r.selectNodeContents(host.querySelector('.wa-preview'));var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='حدد النص وانسخه';};
      try{navigator.clipboard.writeText(msg).then(done,fallback);}catch(err){fallback();}
    };
  }
  function lines(rows){return rows.filter(function(r){return r[1];}).map(function(r){return r[0]+': '+r[1];}).join('\n');}

  $('heroForm').addEventListener('submit',function(e){
    e.preventDefault();if(!validate(this))return;
    var msg='السلام عليكم، أرغب في متابعة لمطالبة تأمين.\n'+lines([
      ['الاسم',$('h-name').value.trim()],['الجوال',$('h-phone').value.trim()],['نوع المطالبة',$('h-type').value],['وصف الحادث',$('h-desc').value.trim()]]);
    showReady($('quoteForm'),$('quoteReady'),this,msg);
  });
  $('claimForm').addEventListener('submit',function(e){
    e.preventDefault();if(!validate(this))return;
    var msg='السلام عليكم، أرغب في رفع مطالبة تأمين.\n'+lines([
      ['الاسم',$('c-name').value.trim()],['الجوال',$('c-phone').value.trim()],
      ['نوع المطالبة',$('c-type').value],['وصف الحادث',$('c-desc').value.trim()]]);
    showReady($('claimFormWrap'),$('claimReady'),this,msg);
  });

  $('yr').textContent=new Date().getFullYear();
})();
