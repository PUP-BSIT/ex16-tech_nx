<?php
function deleteKpop($servername, $username, $password, $dbname, $id) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    $sql = "DELETE FROM kpop WHERE ID=$id";
    if (!$connect->query($sql)) {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . 
            mysqli_error($connect)]);
    } else {
        echo json_encode(["message" => "Deleted successfully"]);
    }
    mysqli_close($connect);
}
?>