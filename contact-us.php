---
layout: contact
---

<?php 
include "./libs/class.smtp.php";
include "./libs/class.phpmailer.php";
include "./simple-php-captcha.php";

//SMTP/Mail server settings
$SMTP_SERVER = ''; 
$SMTP_PORT = ''; 
$SMTP_USER = '';
$SMTP_PASS =  '';  
$FROM_EMAIL = '';
$FROM_NAME = '';
$TO_EMAIL = '';

//Website name
$WEBSITE = "";

//Airtable related setting
$API_KEY = '{{site.airtable.apikey}}';

//Airtable API URL
$AIRTABLE_URL = "https://api.airtable.com/v0/{{ site.airtable.contact }}/Contact_Responses";

$message = '';

if (empty($_POST['send'])){
    $_SESSION['captcha'] = simple_php_captcha();
}


if(isset($_POST) and $_POST['send'] == "Send" ) {
    $name = mysql_escape_string($_POST['name']);
    $email = mysql_escape_string($_POST['email']);   
    $phone = mysql_escape_string($_POST['phone']);  
    $message = mysql_escape_string($_POST['message']);     
    $error = array();
    $captcha = mysql_escape_string($_POST['captcha']);    

    if (strtolower($captcha) == strtolower($_SESSION['captcha']['code'])) {

	    if(empty($name) ||  empty($email) ){
		$error['mail'] = "Name or Email value missing!!";
	    }   
	    
	    if(count($error) == 0){
			//send email
			$msg = "";
			$msg .= "Someone visited the church website and left you a message:\n\n";
			$msg .= "Message from: ".$name."\n";
			$msg .= "Email: ".$email."\n";
			$msg .= "Phone: ".$phone."\n\n";
			$msg .= "----------------------\n\n";
			$msg .= $message;
			
			$mail = new PHPMailer();
			$mail->IsSMTP();
			$mail->SMTPAuth = true;
			//$mail->SMTPSecure = "tls";
			//$mail->SMTPDebug = true;
		
			$mail->Host = $SMTP_SERVER;
			$mail->Port = $SMTP_PORT;
			$mail->Username = $SMTP_USER;
			$mail->Password = $SMTP_PASS;
				
			$mail->SetFrom($FROM_EMAIL, $FROM_NAME);
			$mail->AddReplyTo("", "");
		    
			$mail->Subject = "New message from the church website: ".$WEBSITE;

			$mail->AddAddress($TO_EMAIL, $TO_EMAIL);
		
			$mail->Body = $msg;
			if ($mail->Send()) {
			    $emailmsg = "Email sent.";
			}
		
			//post to airtable api
			$data_to_post =  '{
				    "fields": {
				    "Name": "'.$name.'",
				    "Email": "'.$email.'",';
			if(!empty($phone)){
			    $data_to_post .= '"Phone Number": "'.$phone.'",';
			}
			if(!empty($message)){
			    $data_to_post .= '"Message": "'.$message.'"';
			}	    
			$data_to_post .= '
				}
			  }';
			  
			//print $data_to_post; 
			  
			$request_headers = array();
			$request_headers[] = 'Authorization: Bearer '. $API_KEY;
			$request_headers[] = 'Content-type: application/json';

			$curl = curl_init();
			curl_setopt($curl,CURLOPT_URL, $AIRTABLE_URL);
			curl_setopt($curl,CURLOPT_POST, sizeof($data_to_post));
			curl_setopt($curl,CURLOPT_POSTFIELDS, $data_to_post);
			curl_setopt($curl, CURLOPT_HTTPHEADER, $request_headers);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
			$result = curl_exec($curl);

			//print_r($result);

			curl_close($curl);
			
			$arr = json_decode($result, true);
			if ($arr['error']){
			    $emailmsg .= "ERROR sending data to Airtable.";
			} else {
			    $emailmsg .= "Data posted to Airtable.";
			}
		
		} else {
			print "Either Name or email missing.";
		}
	} else {
	    print "Incorrect CAPTCHA input.";
	    //$_SESSION['captcha'] = $_POST['cap'];
	}	
 }   
?>

<div class="contact-page">
       <h1>{{ site.data.contact_page[0].Heading }}</h1>
    <article class="contact-text">

        {{ site.data.contact_page[0].Content | markdownify }}
		    </article><!--/ministry-update-->
		<hr>
		<br/>
		
		<form action="" method="POST">
		<input type="hidden" id="cap" name="cap" value = '<?php print $_SESSION['captcha'];?>'/>  
		<div class="row">
			<div class="medium-4 columns">
			<label>Name
				<input type="text" placeholder="Your Name" name="name" id="name" required aria-describedby="nameHelpText">
				<p id="nameHelpText" class="help-text">Required</p>
			</label>
			</div><!--/name-->
			<div class="medium-4 columns">
			<label>Email
				<input type="text" placeholder="you@email.com" name="email" id="email" required aria-describedby="emailHelpText">
				<p id="emailHelpText" class="help-text">Required</p>
			</label>
			</div><!--/email-->
			<div class="medium-4 columns">
			<label>Phone
				<input type="text" name="phone" id="phone" placeholder="(123) 456-7890"> 
			</label>
			</div><!--/phone-->
			<div class="small-12 columns">
			<label>Message
				<textarea name="message" placeholder="I have a question about..." required></textarea> 
			</label>
			</div><!--/message-->
			<div class="small-12 medium-12 captcha columns end">
				<p>Please type the characters displayed below in the "Captcha" field.</p>
				<img src = '<?php echo $_SESSION['captcha']['image_src']; ?>'>
			</div><!--/captcha image-->
			<div class="small-6 medium-3 captcha-input columns">
			<label>Captcha
				<input type="text" id="captcha" name="captcha" required> 
			</label>
			</div><!--/captcha input-->
			<div class="small-12 columns">
			<input  name="send" id="send" type="submit" value="Send" class="button"/>
			</div>
		</form>

  </div><!--/contact-page-->
