<?php
  // Logfile location
  $logfile = "/srv/www/vhosts/party-nanny.de/tmp/contact.log";

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["InputName"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["InputEmail"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["InputMessage"]);
        $spamhidden = strip_tags(trim($_POST["InputSpamHidden"]));
				$spamhidden = str_replace(array("\r","\n"),array("",""),$spamhidden);
        $spamcheck = strip_tags(trim($_POST["InputSpam"]));
				$spamcheck = str_replace(array("\r","\n"),array("",""),$spamcheck);

	// Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL) OR !is_numeric($spamcheck) OR $spamcheck != 5 OR $spamhidden != "") {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Beim Versenden ihrer Nachricht ist ein Fehler aufgetreten.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        $recipient = "andi@blafasl.de";

        // Set the email subject.
        $subject = "Kontaktformular party-nanny.de: $name";

        // Build the email content.
        $email_content = "Eine Nachricht von $name\n";
        $email_content .= "Anworten an Email: $email\n\n";
        $email_content .= "Nachricht:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <domain-admin@blafasl.de>\n";
        $email_headers .= "Reply-To: $name <$email>\n";
        $email_headers .= "Return-Path: $name <$email>\n"; 
        $email_headers .= "Content-Type: text/plain\n"; 

	$logtext = "----".date(r)."----\n";
	$logtext.= "Von: $name <$email>\n";
	$logtext.= "Nachricht:\n";
        $logtext.= $message;
	$logtext.= "\n";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
	    echo "Ihre Nachricht wurde erfolgreich gesendet.";
	    $logtext.="mailed OK\n";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
	    echo "Beim Versenden ihrer Nachricht ist ein Fehler aufgetreten.";
	    $logtext.="mailed ERR\n";
        }

	$logtext.="----end----\n\n";
        file_put_contents($logfile, $logtext, FILE_APPEND);

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Beim Versenden ihrer Nachricht ist ein Fehler aufgetreten.";
    }

?>
