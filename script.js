const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
const business=window.KAPILA_BUSINESS;
if(business){
  const phoneLinks=[...document.querySelectorAll('a[href^="tel:"]')];
  phoneLinks.forEach(link=>{const primary=link.getAttribute('href').includes('8062757454');link.href=`tel:${primary?business.phoneTel:business.alternatePhoneTel}`;if(link.textContent.includes('+91'))link.innerHTML=`${primary?business.phone:business.alternatePhone} <b>↗</b>`});
  document.querySelectorAll('.address-block p').forEach(node=>node.textContent=business.address);
  document.querySelectorAll('.hours-line strong').forEach(node=>node.textContent=business.hoursDisplay);
  const mapUrl=business.mapUrl||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`;
  document.querySelectorAll('.contact-buttons a[href*="google.com/maps"],.map-overlay a').forEach(link=>link.href=mapUrl);
  const map=document.querySelector('.contact-map iframe');if(map){map.src=business.mapEmbedUrl||`https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed`;map.title=`Kapila Traders at Metro Pillar 683, Uttam Nagar, New Delhi`}
  const addressLabel=document.querySelector('.address-block>span');if(addressLabel)addressLabel.textContent='SHOP ADDRESS · METRO PILLAR 683';
  const addressText=document.querySelector('.address-block p');if(addressText)addressText.innerHTML=business.address.replace(', Shop No.', ',<br>Shop No.').replace(', near Dal Mill Road', ',<br>near Dal Mill Road,');
  const mapLabel=document.querySelector('.map-overlay>span');if(mapLabel){mapLabel.textContent=business.name.toUpperCase();mapLabel.classList.add('map-label')}
  const mapLocation=document.querySelector('.map-overlay>strong');if(mapLocation)mapLocation.textContent='Metro Pillar 683 · Uttam Nagar';
  const mapCaption=document.querySelector('.map-note');if(mapCaption)mapCaption.textContent='Directions open the Kapila Traders Google Maps business listing.';
  const locationFaq=document.querySelector('.faq-list details:nth-child(6) p');if(locationFaq)locationFaq.textContent=business.address+'.';
  const whatsapp=document.querySelector('.float-whatsapp');if(whatsapp&&business.whatsappPhone)whatsapp.href=`https://wa.me/${business.whatsappPhone}?text=${encodeURIComponent('Hello Kapila Traders, I would like to enquire about an appliance spare part.')}`;
  const schema=document.querySelector('#business-schema');if(schema){const data=JSON.parse(schema.textContent);data.name=business.name;data.telephone=business.phoneTel;data.address.streetAddress=business.address;data.openingHours=business.hoursDisplay;schema.textContent=JSON.stringify(data)}
}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Open navigation menu':'Close navigation menu');nav.classList.toggle('open',!open)});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation menu');nav.classList.remove('open')}));
document.querySelectorAll('.filter-chip').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.filter-chip.active')?.classList.remove('active');button.classList.add('active');const filter=button.dataset.filter;document.querySelectorAll('.product-card').forEach(card=>{const category=card.dataset.category;card.classList.toggle('hidden',filter!=='all'&&category!==filter&&category!=='all')})}));
document.querySelectorAll('[data-enquiry]').forEach(link=>link.addEventListener('click',()=>{const enquiry=link.dataset.enquiry;const hash='#contact';document.querySelector(hash)?.scrollIntoView({behavior:'smooth'});window.setTimeout(()=>{const phone=document.querySelector('.phone-block a');if(phone)phone.setAttribute('aria-label',`Call Kapila Traders to enquire about ${enquiry}`)},250)}));
document.querySelector('#year').textContent=new Date().getFullYear();
fetch('/api/health',{headers:{accept:'application/json'}}).then(response=>{if(!response.ok)throw new Error('Node API is unavailable');return response.json()}).then(payload=>{if(payload.ok)document.documentElement.dataset.nodeApi='online'}).catch(()=>{document.documentElement.dataset.nodeApi='offline'});
