<?php

function getKpop($servername, $username, $password, $dbname) {
    $connect = mysqli_connect($servername, $username, $password, $dbname);
    if (!$connect) {
        die(json_encode(["error" => "Connection failed: " . 
            mysqli_connect_error()]));
    }
    
    $sql = "SELECT * FROM kpop ORDER BY id DESC";
    $result = $connect->query($sql);

    if (!$result) {
        echo json_encode(["error" => "Error fetching kpop: " . 
            mysqli_error($connect)]);
    } else {
        $kpop = [];
        while ($row = $result->fetch_assoc()) {
            $movies[] = $row;
        }
        echo json_encode($kpop);
    }
    mysqli_close($connect);
}
?>

