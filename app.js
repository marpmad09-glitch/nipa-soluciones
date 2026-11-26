const diagnostics = [
  { code:'ERR-PWR-01', subsystem:'Fuente de Poder y Cargador', symptom:'Equipo no enciende; LED del cargador se apaga o parpadea al conectarlo', frequency:'16%', severity:'Crítica', variable:'Resistencia a tierra (Ω)', pattern:'0XXX', semaphore:'Rojo', cause:'Cortocircuito directo en MOSFET de entrada o capacitor cerámico SMD en línea principal (19V/12V).', mistake:'Conectar fuente de laboratorio sin medir resistencia a tierra previamente.', protocol:'Medir resistencia a tierra en jack de entrada y bobinas principales sin energizar.', normal:'Resistencia > 1000 Ω (sin continuidad a GND)', maintenance:'Correctivo' },
  { code:'ERR-THM-01', subsystem:'Sistema Térmico', symptom:'Apagado súbito tras 10-15 min de uso y carcasa excesivamente caliente', frequency:'18%', severity:'Alta', variable:'Potencia (W) / efecto Joule', pattern:'1101', semaphore:'Amarillo', cause:'Obstrucción total del disipador por polvo y pasta térmica cristalizada (alta resistencia térmica).', mistake:'Aplicar pasta térmica nueva sin limpiar residuos secos ni verificar RPM del cooler.', protocol:'Desmontar disipador, limpiar con alcohol isopropílico y renovar pasta térmica.', normal:'Temperatura en reposo < 45 °C y potencia en umbral nominal', maintenance:'Preventivo' },
  { code:'ERR-VRM-01', subsystem:'Placa Base y Etapa VRM', symptom:'Reinicio repentino únicamente al ejecutar juegos o software pesado', frequency:'12%', severity:'Alta', variable:'Tensión bajo carga (V)', pattern:'10XX', semaphore:'Rojo', cause:'Capacitores electrolíticos secos en fuente ATX o fase VRM incapaz de sostener corriente pico.', mistake:'Medir el voltaje únicamente en reposo (BIOS) donde marca 12 V estable.', protocol:'Ejecutar prueba de estrés mientras se monitorea la caída de tensión en riel de 12 V.', normal:'Caída de tensión < 5% (mínimo 11.40 V)', maintenance:'Correctivo' },
  { code:'ERR-RAM-01', subsystem:'Memoria RAM y Buses', symptom:'Equipo enciende (LEDs y cooler activos) pero no da imagen (3 pitidos)', frequency:'14%', severity:'Media', variable:'Frecuencia / Señal (f)', pattern:'1110', semaphore:'Amarillo', cause:'Sulfatación en pines dorados de memoria RAM o falla en regulador VDDQ (1.2 V / 1.35 V).', mistake:'Manipular módulos sin descargar estática (ESD) o con batería interna conectada.', protocol:'Limpiar contactos con alcohol isopropílico y medir el voltaje en slot DIMM.', normal:'1.20 V (DDR4) o 1.35 V (DDR3L) estables', maintenance:'Preventivo' },
  { code:'ERR-PWR-02', subsystem:'Fuente de Poder y Cargador', symptom:'PC de escritorio enciende ventiladores 2 segundos y se apaga en bucle', frequency:'9%', severity:'Alta', variable:'Tensión (V) / señal PG', pattern:'10XX', semaphore:'Rojo', cause:'Falla en señal Power_Good (PG) o caída en riel de 3.3 V / 5 V Standby de fuente ATX.', mistake:'Cambiar memoria RAM o procesador sin probar la fuente con tester bajo carga.', protocol:'Puentear cable verde (PS_ON) a tierra en conector ATX y medir rieles principales.', normal:'12 V, 5 V, 3.3 V (±5%) y señal PG 100–500 ms', maintenance:'Correctivo' },
  { code:'ERR-PWR-03', subsystem:'Fuente de Poder y Cargador', symptom:'Portátil conectado pero no carga batería (0% disponible, conectado)', frequency:'8%', severity:'Media', variable:'Tensión (V) / corriente (I)', pattern:'10XX', semaphore:'Rojo', cause:'Celdas de batería degradadas bajo umbral mínimo o daño en IC Charger (BQ24780/similar).', mistake:'Reemplazar batería inmediatamente sin medir voltaje en pines del conector.', protocol:'Medir salida del cargador en vacío y voltaje en terminales del conector de batería.', normal:'Cargador en rango nominal y 3.3 V en pines SMBus', maintenance:'Correctivo' },
  { code:'ERR-STO-01', subsystem:'Almacenamiento (SSD / HDD)', symptom:'Mensaje “No Bootable Device” o disco desaparece intermitentemente', frequency:'7%', severity:'Media', variable:'Tensión 5 V/3.3 V y continuidad', pattern:'10XX', semaphore:'Rojo', cause:'Falso contacto en cable SATA/flex o caída de tensión en línea de alimentación de 5 V.', mistake:'Formatear el disco inmediatamente asumiendo daño de sistema operativo.', protocol:'Verificar voltaje en puerto SATA/M.2 y revisar estado SMART de la unidad.', normal:'5.0 V / 3.3 V estables y salud SMART > 80%', maintenance:'Correctivo' },
  { code:'ERR-VRM-02', subsystem:'Placa Base y Etapa VRM', symptom:'Puertos USB no reconocen dispositivos o alertan sobrevoltaje', frequency:'6%', severity:'Alta', variable:'Resistencia (Ω) / tensión (V)', pattern:'0XXX', semaphore:'Rojo', cause:'Pin de datos en corto con línea VBUS (5 V) dentro del puerto USB físico dañado.', mistake:'No realizar inspección visual ni prueba de continuidad antes de energizar.', protocol:'Inspeccionar pines físicos USB y medir continuidad entre pin 1 (5 V) y pin 4 (GND).', normal:'Circuito abierto (OL) entre 5 V y tierra', maintenance:'Correctivo' },
  { code:'ERR-LOG-01', subsystem:'Sistema Operativo y Arranque', symptom:'Pantallazo azul (BSOD: WHEA_UNCORRECTABLE_ERROR / KERNEL_POWER 41)', frequency:'5%', severity:'Alta', variable:'Rizado (Ripple) y tensión (V)', pattern:'1110', semaphore:'Amarillo', cause:'Inestabilidad en suministro de energía al procesador por rizado excesivo en fuente.', mistake:'Reinstalar Windows sin auditar historial eléctrico ni capacitores de filtrado.', protocol:'Verificar estabilidad de voltajes Vcore y recomendar UPS/regulador por reincidencia.', normal:'Sin variaciones bruscas de voltaje ni Kernel-Power', maintenance:'Correctivo' },
  { code:'ERR-MNT-01', subsystem:'Sistema Térmico', symptom:'Lentitud extrema, ruido mecánico en ventilador y temperaturas altas en reposo', frequency:'5%', severity:'Baja', variable:'Potencia en reposo (W)', pattern:'1101', semaphore:'Amarillo', cause:'Acumulación de pelusa en aspas que genera fricción mecánica y sobreconsumo de corriente.', mistake:'Sopletear el ventilador sin bloquear las aspas (inducción inversa).', protocol:'Bloquear aspas, retirar polvo con brocha antiestática y verificar consumo.', normal:'Flujo libre y reducción de potencia en reposo', maintenance:'Preventivo' }
];

const state = { selected:null, equipments:load('nipa_equipment') || [], events:load('nipa_events') || [] };

function load(key){ try{return JSON.parse(localStorage.getItem(key));}catch{return null;} }
function save(key,value){ localStorage.setItem(key,JSON.stringify(value)); }
function escapeHtml(value=''){ return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

function renderSymptoms(query=''){
  const list=document.getElementById('symptomList');
  const q=query.toLowerCase().trim();
  const filtered=diagnostics.filter(d=>[d.code,d.subsystem,d.symptom,d.cause].join(' ').toLowerCase().includes(q));
  list.innerHTML=filtered.map(d=>`<button class="symptom-item ${state.selected?.code===d.code?'selected':''}" data-code="${d.code}"><span><span class="symptom-name">${escapeHtml(d.symptom)}</span><br><span class="symptom-code">${d.code} · ${escapeHtml(d.subsystem)}</span></span><span class="severity-dot ${d.severity}"></span></button>`).join('') || '<p style="color:#8293a5;font-size:13px;padding:10px">No se encontraron coincidencias.</p>';
  list.querySelectorAll('.symptom-item').forEach(button=>button.addEventListener('click',()=>selectDiagnostic(button.dataset.code)));
}

function selectDiagnostic(code){
  state.selected=diagnostics.find(d=>d.code===code);
  renderSymptoms(document.getElementById('symptomSearch').value);
  const d=state.selected;
  document.getElementById('resultCard').innerHTML=`<div class="result-header"><div><span class="badge">${d.code}</span><h2>${escapeHtml(d.symptom)}</h2><div class="result-meta"><span class="badge">${d.subsystem}</span><span class="badge">Patrón ${d.pattern}</span><span class="badge">${d.frequency} frecuencia</span></div></div><div class="severity-hero"><span class="badge ${d.semaphore==='Rojo'?'red':'yellow'}">● ${d.semaphore}</span><strong>${d.severity}</strong></div></div><div class="result-grid"><section class="info-block"><h3>Causa técnica probable</h3><p>${escapeHtml(d.cause)}</p></section><section class="info-block"><h3>Variable clave</h3><p><strong>${escapeHtml(d.variable)}</strong></p></section><section class="info-block"><h3>Protocolo de verificación</h3><p>${escapeHtml(d.protocol)}</p></section><section class="info-block"><h3>Parámetro normal</h3><p><strong>${escapeHtml(d.normal)}</strong></p></section><section class="info-block warning-block full"><h3>Error común a evitar</h3><p>${escapeHtml(d.mistake)}</p></section></div><div class="action-row"><button class="primary-button" id="registerDiagnosis">Registrar en un equipo</button><span class="badge">${d.maintenance}</span></div>`;
  document.getElementById('registerDiagnosis').addEventListener('click',()=>openEquipmentModal());
}

function showView(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); document.getElementById(name+'View').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===name));
  const titles={diagnostico:'Diagnóstico rápido',equipos:'Mis equipos',seguimiento:'Seguimiento'}; document.getElementById('pageTitle').textContent=titles[name];
  if(name==='equipos') renderEquipment(); if(name==='seguimiento') renderTimeline();
}

function openEquipmentModal(equipment=null){
  document.getElementById('equipmentModal').classList.add('open'); document.getElementById('equipmentModal').setAttribute('aria-hidden','false');
  document.getElementById('equipmentModalTitle').textContent=equipment?'Editar equipo':'Nuevo equipo';
  document.getElementById('equipmentId').value=equipment?.id||'';
  document.getElementById('equipmentName').value=equipment?.name||''; document.getElementById('equipmentModel').value=equipment?.model||'';
  document.getElementById('equipmentSerial').value=equipment?.serial||''; document.getElementById('equipmentOwner').value=equipment?.owner||'';
  document.getElementById('equipmentType').value=equipment?.type||'Portátil'; document.getElementById('equipmentStatus').value=equipment?.status||'Diagnóstico';
  document.getElementById('equipmentNotes').value=equipment?.notes||(state.selected?`Síntoma asociado: ${state.selected.code} — ${state.selected.symptom}`:'');
}
function closeModal(){ document.getElementById('equipmentModal').classList.remove('open'); document.getElementById('equipmentModal').setAttribute('aria-hidden','true'); }

function renderEquipment(){
  const grid=document.getElementById('equipmentGrid'); document.getElementById('equipmentCount').textContent=state.equipments.length;
  if(!state.equipments.length){grid.innerHTML='<div class="empty-grid"><h3>Aún no hay equipos registrados</h3><p>Use “Nuevo equipo” para comenzar el seguimiento.</p></div>';return;}
  grid.innerHTML=state.equipments.map(e=>`<article class="equipment-card"><div class="equipment-card-header"><span class="badge">${escapeHtml(e.type)}</span><span class="status-pill">${escapeHtml(e.status)}</span></div><h3>${escapeHtml(e.name)}</h3><p><strong>${escapeHtml(e.model)}</strong></p><p>${e.serial?'S/N: '+escapeHtml(e.serial):'Sin número de serie'}</p><p>${e.owner?'Propietario: '+escapeHtml(e.owner):'Sin propietario asignado'}</p><div class="equipment-actions"><button class="text-button" data-edit="${e.id}">Editar</button><button class="text-button" data-service="${e.id}">Agregar nota</button><button class="text-button danger" data-delete="${e.id}">Eliminar</button></div></article>`).join('');
  grid.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openEquipmentModal(state.equipments.find(e=>e.id===b.dataset.edit)));
  grid.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>deleteEquipment(b.dataset.delete));
  grid.querySelectorAll('[data-service]').forEach(b=>b.onclick=()=>addServiceNote(b.dataset.service));
}

function deleteEquipment(id){ if(confirm('¿Eliminar este equipo y su historial asociado?')){state.equipments=state.equipments.filter(e=>e.id!==id); state.events=state.events.filter(e=>e.equipmentId!==id); save('nipa_equipment',state.equipments);save('nipa_events',state.events);renderEquipment();renderTimeline();toast('Equipo eliminado');} }
function addServiceNote(id){
  const note=prompt('Describa la intervención o avance:'); if(!note?.trim())return; const e=state.equipments.find(x=>x.id===id); e.status='En reparación'; e.notes=note.trim();
  state.events.unshift({id:crypto.randomUUID(),equipmentId:id,name:e.name,note:note.trim(),date:new Date().toLocaleString('es-CO')}); save('nipa_equipment',state.equipments);save('nipa_events',state.events);renderEquipment();renderTimeline();toast('Seguimiento actualizado');
}

function renderTimeline(){
  const timeline=document.getElementById('timeline'); if(!state.events.length){timeline.innerHTML='<div class="empty-grid"><h3>Sin movimientos registrados</h3><p>Las notas de servicio aparecerán aquí.</p></div>';return;}
  timeline.innerHTML=state.events.map(e=>`<article class="timeline-item"><h3>${escapeHtml(e.name)}</h3><p>${escapeHtml(e.note)} · ${escapeHtml(e.date)}</p></article>`).join('');
}

function toast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500);}

document.getElementById('symptomSearch').addEventListener('input',e=>renderSymptoms(e.target.value));
document.querySelectorAll('.nav-item').forEach(n=>n.addEventListener('click',()=>showView(n.dataset.view)));
document.getElementById('newEquipmentButton').onclick=()=>openEquipmentModal(); document.getElementById('closeModal').onclick=closeModal; document.getElementById('cancelModal').onclick=closeModal;
document.getElementById('equipmentModal').addEventListener('click',e=>{if(e.target.id==='equipmentModal')closeModal();});
document.getElementById('equipmentForm').addEventListener('submit',e=>{e.preventEvent?.();e.preventDefault();const id=document.getElementById('equipmentId').value;const equipment={id:id||crypto.randomUUID(),name:document.getElementById('equipmentName').value.trim(),model:document.getElementById('equipmentModel').value.trim(),serial:document.getElementById('equipmentSerial').value.trim(),owner:document.getElementById('equipmentOwner').value.trim(),type:document.getElementById('equipmentType').value,status:document.getElementById('equipmentStatus').value,notes:document.getElementById('equipmentNotes').value.trim(),updated:new Date().toISOString()}; if(id){state.equipments=state.equipments.map(x=>x.id===id?equipment:x);}else{state.equipments.unshift(equipment);state.events.unshift({id:crypto.randomUUID(),equipmentId:equipment.id,name:equipment.name,note:'Equipo registrado en el taller',date:new Date().toLocaleString('es-CO')});}save('nipa_equipment',state.equipments);save('nipa_events',state.events);closeModal();renderEquipment();renderTimeline();document.getElementById('equipmentCount').textContent=state.equipments.length;toast(id?'Equipo actualizado':'Equipo registrado');});
document.getElementById('exportEquipmentButton').onclick=()=>{const blob=new Blob([JSON.stringify({equipments:state.equipments,events:state.events},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`nipa-registros-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);};
renderSymptoms();renderEquipment();renderTimeline();
