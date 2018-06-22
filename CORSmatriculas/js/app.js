//Creamos 1 variable global que es el objeto que desencadena todo (mediante el m�todo iniciar())
var notas = {};

/**
* Constante que contiene la ruta donde est�n los archivos que solicitamos;
* NOTA IMPORTANTE
* Se han tenido que crear 3 archivos en la carpeta SERVER (alumnos, notas y todos).
* Cada uno de estos archivos es llamado dependiendo de si en el input buscamos por email, matricula o TODOS.
* Se hace esto porque no podemos acceder a la URL original del ex�men mediante el puerto 3000;
**/
const urlServidor = "http://localhost/CORSmatriculas/server/";

(function(d, notas){ //Comenzamos con una CLAUSURE que recibe 2 par�metros: el document (que renombramos a 'd' y nuestro objeto 'notas');

	'use strict';  	//activamos el modo estricto que habilita la optimizaci�n del c�digo;

	let uri = '';  // recoge el dato introducido en el input (ser� un email, matr�cula o el string TODOS);
	let documento = ''; // recoge el documento al que llamaremos en el servidor (alumnos.txt, notas.txt o todos.txt);


	/**
	* inicialiarApp :: Es el �nico m�todo al que llama el objeto notas cuando invoca al m�todo 'iniciar';
	*  - Inicializa la aplicaci�n cuando el DOM se ha renderizado;
	*  - @variable :: input  >> nodo input del DOM;
	* -  @variable :: button >> nodo button del DOM;
	*  - @function :: agregarListenersAlDOM >> agrega los listeners keypress (al input) & click (al button);
	**/
	function inicialiarApp(){
		d.addEventListener('DOMContentLoaded', function(){

			let input  = d.getElementById('intro');
			let button = d.querySelector('button');
			agregarListenersAlDOM(input, button);

		}, true);
	}


	/**
	* agregarListenersAlDOM :: A�ade listeners a los nodos que recibe como par�metros y hace la petici�n CORS;
	*  - @param    			:: inp        >> nodo input del DOM;
	*  - @variable 			:: btn        >> nodo button del DOM;
	*  - @listener 			:: keypress   >> a�ade el listener keypress al input. Cuando se pulsa ENTER, eval�a si se cumple el patr�n para el string introducido.
	*  - @listener 			:: click      >> a�ade el listener click al button. Cuando se hace CLICK eval�a si se cumple el patr�n para el string introducido en el input;
 	*  - @function 			:: pedirDatos >> realiza la petici�n CORS;
	**/
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


	/**
	* gestionExpReg	:: Eval�a si un string cunple o no un patr�n y devuelve false si no se cumple el patr�n o la URL de la petici�n CORS si el patr�n se cumple.
	*  - @param    	:: formato    >> el string de entrada que hay que validar (es nuestro string introducido en el input de b�squeda);
	*  - @pattern  	::            >> distintos patrones, para email, matr�cula y el string TODOS;
	*  - @param    	:: url        >> la URL para realizar la petici�n mediante CORS;
	**/
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


	/**
	* pedirDatos :: Crea un objeto XMLHttpRequest que realiza una petici�n POST a la URL (petici�n) que entra como par�metro. Llama a una funci�n de callback al finalizar para formatear los datos;
	*  - @param  :: peticion 		 >> el string de entrada que hay que validar (es nuestro string introducido en el input de b�squeda);
	*  - @param  :: callback 		 >> funci�n callback o funci�n "llamar de vuelta" para formatear los datos que llegan de la petici�n POST;
	*  - @param  :: url      		 >> la URL para realizar la petici�n mediante CORS;
	*  - @result :: xhr.responseText >> resultado en formato string de los datos recibidos del server;
	**/
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
		xhr.onerror = function() { alert('Error de respuesta en la petici�n CORS'); };
	}



	/**
	* dom_crearTabla :: Busca un elemeto dento de un objeto;
	*  - @param      :: datos_alumno  >> objeto que contiene los datos del alumno encontrado en la petici�n CORS una vez que se ha encontrado una coincidencia;
	*  - @clausula   ::               >> se a�ade una clausula if. Si el objeto viene vac�o o no se est� buscando un email, se interrumpe el programa y se alerta al usuario. 'NOTAS', es decir, la b�squeda por MATRICULA, no est� implementada, por eso se inluye en el bucle IF (habr�a que implementarlo);
	*  - @variable   :: info_alumno   >> contiene los datos del alumno (num. matr�cula, nombre, apellidos, tlf...)
	*  - @variable   :: notas         >> (no confundir con el objeto 'notas' que es el que inicializa la app). Contiene las notas de cada uno de los m�dulos;
	**/
	function dom_crearTabla(datos_alumno){
		let info = d.getElementById('info');
		console.log(datos_alumno);
		
		if(documento != 'notas' || datos_alumno.length == 0){
			alert('El m�todo s�lo est� implementado para correos electr�nicos.\nSi has introducido un email v�lido, no se han encontrado resultados.');
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

	/**
	* tratamientoDatos  :: funci�n CALLBACK
	*  - @param         :: respuestaJSON  >> datos recibidos de la petiic�n CORS;
	*  - @function      :: eliminarHijos  >> Elimina los hijos de un nodo pasando por par�metro el ID del nodo;
	*  - @function      :: formatearDatos >> formatea el dato (string) que llega de la petici�n CORS;
	*  - @function      :: dom_crearTabla >> crea los nodos necesarios para construir una tabla e inserta los datos (formateados) que se reciben del SERVER;
	**/
	function tratamientoDatos(respuestaJSON){
		eliminarHijos('info');
		let datos_formateados = formatearDatos(respuestaJSON);
		dom_crearTabla(datos_formateados);
	}


	/**
	* formatearDatos :: Formatea el string que llega desde la petici�n CORS;
	*  - @param      :: datos               >> string
	*  - @array      :: result              >> acumula los datos a buscar  mediante buscarDatoEnObjetos o buscarDatoEnString;
	*  - @function   :: buscarDatoEnObjetos >> recorre los datos formateados de la petici�n CORS, buscando el dato insertado en el input de b�squeda del formulario;
	*  - @return     :: devuelve el objeto donde se encuentra el dato buscado (el alumno y sus datos);
	**/
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


	/**
	* buscarDatoEnObjetos  :: Busca un elemeto dento de un objeto;
	*  - @param      	   :: obj                 >> el objeto en el que se realizar� la b�squeda;
	*  - @array      	   :: datos_encontrados   >> array donde se acumular�n las coincidencias
	*  - @return     	   :: devuelve los datos encontrados si hay alguna coincidencia;
	**/
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
					if(index['Matr�cula'] == uri){
						datos_encontrados.push(index);
					}
				});
			}
		}
		return datos_encontrados;
	}

	/**
	* buscarDatoEnString :: Formatea y busca elemeentos dentro de un string
	* FUNCI�N NO DESARROLLADA
	**/
	function buscarDatoEnString(str){
		alert('La function no est� desarrollada,\nsolo funciona para emails.\n\nEl resultado de la petici�n a formatear es:\n\n' + str);
	}


	function CSV2JSON(csv, sepRegistro, sepCampo){}


	/**
	* eliminarHijos :: Elimina todos los hijos de un nodo. Mientras el nodo tenga hijos, va eliminando el primer hijo;
	*  - @param     :: nodo 		 >> el id del elemento nodo del que queremos eliminar los hijos;
	**/
	function eliminarHijos(nodo){
		let domnode = d.getElementById(nodo);
		while (domnode.firstChild) {
			domnode.removeChild(domnode.firstChild);
		}
	}

	/**
	* iniciar :: �nico m�todo del objeto 'notas' y �nico m�todo aplicable dentro del script; Inicializa la aplicaci�n;
	**/
	notas.iniciar = function(){ inicialiarApp(); };
}(document, notas));


