<?php
if(isset($_FILES['file'])) {  
    $destination = "C:\\xampp\\htdocs\\cgia\\".$_FILES['file']['name'];
    if(move_uploaded_file($_FILES['file']['tmp_name'], $destination)){  
		$handle = fopen($_FILES['file']['name'], "rb");
		$contents = fread($handle, filesize($_FILES['file']['name']));
        $readable_hash=hash('sha256',$contents);
		$status['message'] = '<div class = "green" >Digest  is ' . $_FILES['file']['name'] . " : " .$readable_hash . "</div>";
        $status['success'] = True;
        print_r(json_encode($status));
    }  
}else{
	$status['message'] = '<div class = "red">No file Presented</div>';
    $status['success'] = False;
    print_r(json_encode($status));
}

?>