var taxasNh = [0,0,0];
var taxas14d = [0,0,0];
var taxas30d = [0,0,0];
var periodo = "nahora";
var valorFinal = 0.00;
var parcela = 0;
var entradaValor = 0.00;
var entradaFloat = 0.00;
var tipoPeriodo = "nahora";
var listaParcelas = ["Débito","1x"];
var listaPeriodos = [" "];
var listaIdsPeriodos = ["#per1","#per2","#per3"];
var listaIdsParcelas = ["#d1","#p1","#p2","#p3","#p4","#p5","#p6","#p7","#p8","#p9","#p10","#p11","#p12"]

mudarMarca();
calcularTaxa();

function popularPeriodo(){
	for (var i = 0; i < listaIdsPeriodos.length; i++) {
		listaPeriodos[i] = document.querySelector(listaIdsPeriodos[i]);
		if(i==0){
			listaPeriodos[i].textContent = "Receber na Hora";
		}
		if(i==1){
			listaPeriodos[i].textContent = "Receber em 14 dias";
		}
		if(i==2){
			listaPeriodos[i].textContent = "Receber em 30 dias dias";
		}
	}
}

function popularParcelas(){
	for (var i = 0; i < listaIdsParcelas.length; i++) {
		listaParcelas[i] = document.querySelector(listaIdsParcelas[i]);
		if(periodo=="nahora"){
			if(i==0){
				listaParcelas[i].textContent = "Débito | "+taxasNh[i]+"%";
			}
			if (i!=0) {
				listaParcelas[i].textContent = "Crédito | "+i+"x | "+taxasNh[i]+"%";
			}
		}
		if(periodo=="14d"){
			if(i==0){
				listaParcelas[i].textContent = "Débito | "+taxas14d[i]+"%";
			}
			if (i!=0) {
				listaParcelas[i].textContent = "Crédito | "+i+"x | "+taxas14d[i]+"%";
			}
		}
		if(periodo=="30d"){
			if(i==0){
				listaParcelas[i].textContent = "Débito | "+taxas30d[i]+"%";
			}
			if (i!=0) {
				listaParcelas[i].textContent = "Crédito | "+i+"x | "+taxas30d[i]+"%";
			}
		}
	}
}

function mudarMarca(){
	var tipoMarca = document.getElementById("marca");
	var marcaSelecionada = tipoMarca.options[tipoMarca.selectedIndex].value;
	if (marcaSelecionada=="sumup") {
		apagarTaxas();
		ativarCombo();
		document.getElementById("per2").disabled = true;
		taxasNh.push(1.9,4.6,6.1,7.6,9.1,10.6,12.1,13.6,15.1,16.6,18.1,19.6,21.1);
		taxas30d.push(1.9,3.1,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9,3.9);
		console.log(taxasNh.length);
		console.log(taxas30d.length);
		popularPeriodo();
		popularParcelas();
	}
	if (marcaSelecionada=="pagseguro") {
		apagarTaxas();
		ativarCombo();
		document.getElementById("per2").disabled = false;
		taxasNh.push(1.99,4.99,9.91,11.29,12.64,13.97,15.27,16.55,17.81,19.04,20.24,21.43,22.59);
		taxas14d.push(1.99,3.99,8.91,10.29,11.64,12.97,14.27,15.55,16.81,18.04,19.24,20.43,21.59);
		taxas30d.push(1.99,3.19,8.11,9.49,10.84,12.17,13.47,14.75,16.01,17.24,18.44,19.63,20.79);
		console.log(taxasNh.length);
		console.log(taxas14d.length);
		console.log(taxas30d.length);
		popularPeriodo();
		popularParcelas();
	}
	if (marcaSelecionada=="mercadopago") {
		apagarTaxas();
		ativarCombo();
		document.getElementById("per2").disabled = false;
		taxasNh.push(1.99,4.74,9.40,10.72,12.01,13.27,14.51,15.72,16.92,18.09,19.23,20.36,21.46);
		taxas14d.push(1.99,3.79,8.45,9.77,11.06,12.32,13.56,14.77,15.97,17.14,18.28,19.41,20.51);
		taxas30d.push(1.99,3.03,7.69,9.01,10.30,11.56,12.80,14.01,15.21,16.38,17.52,18.65,19.75);
		console.log(taxasNh.length);
		console.log(taxas14d.length);
		console.log(taxas30d.length);
		popularPeriodo();
		popularParcelas();
	}
	if(marcaSelecionada=="selecioneM"){
		desativarCombo();
		apagarPeriodos();
		apagarParcelas();
	}
	calcularTaxa();
}
function ativarCombo(){
	document.getElementById("parcela").disabled = false;
	document.getElementById("periodo").disabled = false;
	document.getElementById("valorCampo").disabled = false;
}
function desativarCombo(){
	document.getElementById("parcela").disabled = true;
	document.getElementById("periodo").disabled = true;
	document.getElementById("valorCampo").disabled = true;
}
function mudarPeriodo(){
	tipoPeriodo = document.getElementById("periodo");
	var periodoSelecionado = tipoPeriodo.options[tipoPeriodo.selectedIndex].value
	periodo = periodoSelecionado;
	popularParcelas();
	calcularTaxa();
}
function mudarParcela(){
	var tipoParcela = document.getElementById("parcela");
	var parcelaSelecionada = tipoParcela.options[tipoParcela.selectedIndex].value
	parcela = parseInt(parcelaSelecionada);
	calcularTaxa();
}

function calcularTaxa(){
	var resultadoPrint = document.querySelector(".valor-final");
	var entradaConvertida = document.getElementById("valorCampo");
	entradaValor = entradaConvertida.value.replace(",",".");
	if(periodo=="30d"){
		var taxaSel = taxas30d[parcela];
	}
	if(periodo=="14d"){
		var taxaSel = taxas14d[parcela];
	}
	if(periodo=="nahora"){
		var taxaSel = taxasNh[parcela];
	}
	var taxaConvert = (taxaSel/100);
	var valorDesconto = taxaConvert*entradaValor;
	valorFinal = entradaValor-valorDesconto;
	resultadoPrint.textContent = valorFinal.toFixed(2).replace(".", ",");
}

function apagarTaxas(){
	taxasNh.length = 0;
	taxas14d.length = 0;
	taxas30d.length = 0;
	i = 0;
}
function apagarParcelas(){
	listaParcelas.length = 0;
	i = 0;
	for (var i = 0; i < listaIdsParcelas.length; i++) {
		listaParcelas[i] = document.querySelector(listaIdsParcelas[i]);
		listaParcelas[i].textContent = " ";	
	}
}
function apagarPeriodos(){
	listaPeriodos.length = 0;
	i = 0;
	for (var i = 0; i < listaIdsPeriodos.length; i++) {
		listaPeriodos[i] = document.querySelector(listaIdsPeriodos[i]);
		listaPeriodos[i].textContent = " ";	
	}
}
