<?php
header('Access-Control-Allow-Origin: *');

$form_usuario 	= 	$_GET['nombre'];
$form_correo 	= 		$_GET['correo'];
$form_asunto 		= 	$_GET['telefono'];
$form_mensaje 	=		$_GET['mensaje'];

// creamos arreglso para respuestas
$res = array();
$vacio = array();

// verificamos que las variables tengan datos
if(empty($form_usuario)){
	$vacio['nombre'] =	'ingresar un nombre'.$form_usuario;
}

if(empty($form_asunto)){
	$vacio['asunto'] = 'ingresar asunto del mensaje';
}

if(empty($form_correo)){
	$vacio['correo'] = ' ingresar un correo';
}

if(empty($form_mensaje)){
	$vacio['mensaje'] = 'ingresa un mensaje';
}

require('PHPMailer-master/PHPMailerAutoload.php');

$mail = new PHPMailer;

$mailPara1 = 'jgereda@apoyoinmobiliario.com';
$mailPara2 = 'ventasfreka@gmail.com';

$mailParaNombre = 'Web admin';
$mailHTML =
'
<div style="font-family:helvetica; padding:10px; color:rgb(96,80,77);">
	<div style="text-align:center;  padding:15px;">
		<img width="150" height="auto" src="http://itaca.com.gt/public/logo.png">
	</div>
	<div style="border-bottom:solid 1px rgba(96,80,77,0.5); border-top:solid 1px rgba(96,80,77,0.5);">
	  <h3 style="text-align:center;">Contenido del correo</h3>
	</div>
	  <table width="100%" border="0" style="padding:15px;">
		<tr style="text-align:left; border-bottom-color:1px solid #000;">
			<th>Nombre</th>
			<th>Correo</th>
		</tr>
		<tr>
			<td>'.$form_usuario.'</td>
			<td>'.$form_correo.'</td>
		</tr>
		<tr>
			<th colspan="3" style="text-align:left; padding-top:20px; padding-bottom:10px;">Mensaje</th>
		</tr>
		<tr>
		  <td colspan="3">'.$form_mensaje.'</td>
		 </tr>
	  </table>
</div>
';

// si el arreglo vacio viene sin datos enviamos los datos

if(empty($vacio)){

	$mail->setFrom($mailPara1,$mailParaNombre);

	$mail->From = $mailPara1;
	$mail->FromName = 'Pagina web ('.$form_usuario.')';

	$mail->addAddress($mailPara1, $mailParaNombre); // Add a recipient
	$mail->addReplyTo($form_correo, $form_usuario);

    $mail->addCC($mailPara2);
    $mail->addBCC('laura.navas@mymarketlogic.com');

	$mail->isHTML(true);
	$mail->Subject = $form_asunto;
	$mail->Body    = $mailHTML;

	$mail->CharSet = 'UTF-8';

	$mail->send();

	$res['enviado'] = true;
	$res['enviado_aviso'] = 'enviado correctamente';

}else{
	$res['enviado'] = false;
	$res['vacio'] = $vacio;
}

echo json_encode($res);


?>
