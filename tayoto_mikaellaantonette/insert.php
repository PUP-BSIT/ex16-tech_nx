<?php
function insertKpop($servername, $username, $password, $dbname, $data) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die(json_encode(["error" => "Connection failed: " . 
            mysqli_connect_error()]));
    }
    
    $sql = "INSERT INTO kpop (GroupName, Song, FandomName, DebutYear, Agency) 
        VALUES ('{$data['GroupName']}', '{$data['Song']}', 
            '{$data['FandomName']}', '{$data['DebutYear']}', 
                '{$data['Agency']}')";

    if (!$connect->query($sql)) {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . 
            mysqli_error($connect)]);
    } else {
        echo json_encode(["message" => "Kpop Group added successfully"]);
    }
    mysqli_close($connect);
}
?>