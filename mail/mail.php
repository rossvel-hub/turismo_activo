<?php
   // data sent in header are in JSON format
   header('Content-Type: application/json');
   // takes the value from variables and Post the data
   $name = $_POST['name'];
   $email = $_POST['email'];
   $telephone = $_POST['telephone'];

   $to = "anunciate@turismoactivo.mx";
   $subject = "Nuevo prospecto de Turismo Activo";
   // Email Template
   $message = "<b>Nombre : </b>". $name ."<br>";
   $message .= "<b>Numero de contacto : </b>".$telephone."<br>";
   $message .= "<b>Direccion de correo : </b>".$email."<br>";
   
   $header = "From:"+$email+" \r\n";
   $header .= "MIME-Version: 1.0\r\n";
   $header .= "Content-type: text/html\r\n";
   $retval = mail ($to,$subject,$message,$header);
   // message Notification
   if( $retval == true ) {
      echo json_encode(array(
         'success'=> true,
         'message' => 'El mensaje se envio exitosamente'
      ));
   }else {
      echo json_encode(array(
         'error'=> true,
         'message' => 'Error enviando mensaje'
      ));
   }
?>