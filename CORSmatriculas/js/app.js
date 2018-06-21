var notas = {};
const urlServidor = "http://localhost/CORSmatriculas/server/";

(function(d, notas){
	'use strict';

	let uri = '';
	let documento = '';

	function inicialiarApp(){
		d.addEventListener('DOMContentLoaded', function(){

			let input  = d.getElementById('intro');
			let button = d.querySelector('button');
			agregarListenersAlDOM(input, button);

		}, true);
	}

	//Agrega los listeners al DOM
	function agregarListenersAlDOM(inp, btn){
		let url = '';
		let texto_a_buscar ='';

		inp.addEventListener('keypress', function(e){
			if(e.keyCode == 13 ){ 
				let texto_a_buscar = inp.value.trim();
				url = gestionExpReg(texto_a_buscar);
				if(url!=false){
					pedirDatos(url, tratamientoDatos);
				}else{
					alert('No se cumple el formato');
				}
			}
		}, true);

		btn.addEventListener('click', function(){
			let texto_a_buscar = inp.value.trim();
			url = gestionExpReg(texto_a_buscar);
			if(url!=false){
				pedirDatos(url, tratamientoDatos);
			}else{
				alert('No se cumple el formato');
			}
		}, true);
	}

	function gestionExpReg(formato){
		let pattern_matricula = /[A-Z]{3}\d{4}/; 
		let pattern_todos = /TODOS/; 
		let pattern_email = /[a-z]{3}\d{1,}@[a-z]{1,}.[a-z]{1,3}/;
		let url = urlServidor;

		if(pattern_matricula.test(formato) || pattern_email.test(formato) || pattern_todos.test(formato)){
			
			if(pattern_matricula.test(formato)){ documento = 'alumnos';}
			if(pattern_email.test(formato)){ documento = 'notas';}
			if(pattern_todos.test(formato)){ documento = 'todos';}
			
			url+= (documento+'.txt?alumno='+formato);
			uri = formato;

			return url;
		}
		return false;
	}

	function pedirDatos(peticion, callback){
		
		let xhr = new XMLHttpRequest();
		if (!xhr) {alert('no soporta CORS'); return;}

		if ("withCredentials" in xhr) {
			xhr.open('POST', peticion, true);

		} else if (typeof XDomainRequest != "undefined") {
			xhr = new XDomainRequest();
			xhr.open('POST', peticion);

		} else {
			xhr = null;
		}

		xhr.send();
		xhr.onload = function() { callback(xhr.responseText); };
		xhr.onerror = function() { alert('Error de respuesta en la petición CORS'); };
	}

	function dom_crearTabla(datos_alumno){
		let info = d.getElementById('info');
		console.log(datos_alumno);
		
		if(documento != 'notas' || datos_alumno.length == 0){
			alert('El método sólo está implementado para correos electrónicos.\nSi has introducido un email válido, no se han encontrado resultados.');
			return;
		}

		let info_alumno = datos_alumno[0][0];
		let notas = datos_alumno[0][1];

		let media = 0;
		let num_notas = 0;
		
		info.classList.remove('esconder');
		info.style.display = 'block';

		let thead_txt_modulo = d.createTextNode('Modulo');
		let thead_txt_notas = d.createTextNode('Notas');

		let table   = d.createElement('table');
		let caption = d.createElement('caption');
		let thead   = d.createElement('thead');
		let tbody   = d.createElement('tbody');
		let tfoot    = d.createElement('tfoot');

		for(let key in notas){
			let tbody_tr = d.createElement('tr');
			let tbody_tdmodulo = d.createElement('td');
			let tbody_tdnotas = d.createElement('td');
			let td_notas = d.createElement('td');

			let nkey = d.createTextNode(key);
			let nnota = notas[key];
			if(!isNaN(notas[key])){
				media += parseInt(notas[key]);
				nnota = ( "" + parseInt(notas[key])/10 ).replace('.', ',');
				num_notas++;
			}
			let nvalue = d.createTextNode(nnota);
			
			tbody_tdmodulo.appendChild(nkey);
			tbody_tdnotas.appendChild(nvalue);
			tbody_tr.appendChild(tbody_tdmodulo);
			tbody_tr.appendChild(tbody_tdnotas);
			tbody.appendChild(tbody_tr);	
		}

		let thead_tr = d.createElement('tr'); 
		let thead_th1 = d.createElement('th'); 
		let thead_th2 = d.createElement('th');
		
		let tfoot_tr = d.createElement('tr'); 
		let tfoot_td1media = d.createTextNode('Media');
		let tfoot_td2media = d.createTextNode( ("" + (media/(num_notas*10)).toFixed(2)).replace('.', ',') );
		let tfoot_td1 = d.createElement('td'); 
		let tfoot_td2 = d.createElement('td'); 

		caption.innerHTML = info_alumno['Nombre'] + ' ' + info_alumno['Apellido1'] + ' ' + info_alumno['Apellido2'];

		tfoot_td1.appendChild(tfoot_td1media);
		tfoot_td2.appendChild(tfoot_td2media);
		tfoot_tr.appendChild(tfoot_td1);
		tfoot_tr.appendChild(tfoot_td2);
		tfoot.appendChild(tfoot_tr);

		thead_th1.appendChild(thead_txt_modulo);
		thead_th2.appendChild(thead_txt_notas);
		thead_tr.appendChild(thead_th1);
		thead_tr.appendChild(thead_th2);
		thead.appendChild(thead_tr);

		table.appendChild(caption);
		table.appendChild(thead);
		table.appendChild(tbody);
		table.appendChild(tfoot);

		info.appendChild(table);
	}

	function tratamientoDatos(respuestaJSON){
		eliminarHijos('info');
		let datos_formateados = formatearDatos(respuestaJSON);
		dom_crearTabla(datos_formateados);
	}

	function formatearDatos(datos){
		let result = new Array();
		let primer_caracter = (datos.trim()).substring(0, 1);
		if(primer_caracter == '[' || primer_caracter == '{'){
			result = buscarDatoEnObjetos(JSON.parse(datos));
		}else{
			result = buscarDatoEnString(datos);
		}
		return result;
	}

	function buscarDatoEnObjetos(obj){
		let datos_encontrados = new Array();

		if(Array.isArray(obj)){
			if(Array.isArray(obj[0])){
				obj.map(function(index, pos){
					if(index[0]['Correo'] == uri){
						datos_encontrados.push(index);
					}
				});
			
			}else{
				obj.map(function(index, pos){
					if(index['Matrícula'] == uri){
						datos_encontrados.push(index);
					}
				});
			}
		}
		return datos_encontrados;
	}

	function buscarDatoEnString(str){
		alert('La function no está desarrollada,\nsolo funciona para emails.\n\nEl resultado de la petición a formatear es:\n\n' + str);
	}

	function CSV2JSON(csv, sepRegistro, sepCampo){}

	function eliminarHijos(nodo){
		let domnode = d.getElementById(nodo);
		while (domnode.firstChild) {
			domnode.removeChild(domnode.firstChild);
		}
	}

	notas.iniciar = function(){ inicialiarApp(); };
}(document, notas));


