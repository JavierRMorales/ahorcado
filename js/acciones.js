// JavaScript Document
$(document).ready(function(e) {
	$('#splash').hide();
	$('#menu').show();
	var colecciones=[];
	$('#btn-enviar').on('click',function(){
        //alert ($('#selcoleccion').val() + $('#selcuantas').val());
		obtenerpalabras($('#selcoleccion').val(), $('#selcuantas').val());
    });//enviar
	function obtenerpalabras(coleccion, cuantas) {
		var xajax = $.post("http://192.168.4.111/proyecto_1/obtenerpalabras.php",{
			cual: coleccion, cuantas: cuantas},function(){
				alert("Informacion enviada");
				alert("Coleccion: " + coleccion);
				alert("Numero de palabras: " + cuantas);
			})
			.done(function(datos){
				var arreglo=JSON.parse(datos);
				console.log(arreglo[0].textoPalabra); //se ejecuta cuando hay una respuesta
				$('#boton_ip').show();
				$('#seleccion-opciones').hide();
				$('#selcoleccion').empty();
			})
			.fail(function(){
				alert("Error, No se pudo enviar la informacion. Intenta de nuevo, revise su conexion.");
				
			});
	}//obtenerPalabras
	
	
	
	
	function obtenercolecciones(txtip) {
		alert("Usted eligio el siguiente IP: " + txtip);
		return $.post("http://" + txtip + "/proyecto_1/obtenercolecciones.php", function(){
				
			});
	}
	$('#btn-buscar-colecciones').on('click',function(){
		$('#cargando').show();
		$.when(obtenercolecciones($('#txtip').val())).then(function successHandler(datos){
			var arreglo=JSON.parse(datos);
			for(var i=0; i<arreglo.length; i++){
				var option = new Option(arreglo[i].coleccion, arreglo[i].coleccion);
				$('#selcoleccion').append(option);
			}
			$('#boton_ip').hide();
			$('#selcoleccion').trigger("change");
			$('#cargando').hide();
			$('#seleccion-opciones').show();
		},function errorHandler(){
			$('#cargando').hide();
			alert("Error: No se encontro ninguna coleccion. [666999]");
			$('#boton_ip').show();
			
			
		});
		return false;
    });//clickbtn
}); //ready