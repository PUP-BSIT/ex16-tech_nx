<?php
function updateKpop($servername, $username, $password, $dbname, $data) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die(json_encode(["error" => "Connection failed: " . 
            mysqli_connect_error()]));
    }
    
    $sql = "UPDATE kpop SET GroupName='{$data['GroupName']}', 
        Song='{$data['Song']}', FandomName='{$data['FandomName']}', 
        DebutYear='{$data['DebutYear']}', Agency='{$data['Agency']}' 
        WHERE ID={$data['ID']}";

    if (!$connect->query($sql)) {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . 
            mysqli_error($connect)]);
    } else {
        echo json_encode(["message" => "Kpop Group updated successfully"]);
    }
    mysqli_close($connect);
}
?>
