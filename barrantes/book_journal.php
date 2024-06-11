<?php
$servername = "localhost";
$username = "u945995174_Sofia"; 
$password = "556206912_Sab"; 
$dbname = "u945995174_books";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    postRequest();
    return;
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    getRequest();
    return;
}

if ($_SERVER["REQUEST_METHOD"] == "PATCH") {
    patchRequest();
    return;
}

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    deleteRequest();
    return;
}

echo "Invalid request method";

function postRequest() {
    global $conn;

    $bkname = $_POST['Book_Name'];
    $bkgenre = $_POST['Book_Genre'];
    $releaseDt = $_POST['Release_Date'];
    $author = $_POST['Author'];
    $rating = $_POST['Rating'];

    $sql = "INSERT INTO `book_details`(`Book_Name`, `Book_Genre`, `Release_Date`, `Author`, `Rating`) 
            VALUES ('{$bkname}', '{$bkgenre}', '{$releaseDt}', '{$author}', '{$rating}')";

    if (!mysqli_query($conn, $sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    } else {
        echo "New record created successfully";
    }
}

function getRequest() {
    global $conn;

    $sql = "SELECT ID, Book_Name, Book_Genre, Release_Date, Author, Rating 
            FROM `book_details`";
    $result = mysqli_query($conn, $sql);

    $response = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $response[] = array(
            'id' => $row["ID"],
            'bkname' => $row["Book_Name"],
            'bkgenre' => $row["Book_Genre"],
            'releasdt' => $row["Release_Date"],
            'author' => $row['Author'],
            'rating' => $row['Rating']
        );
    }
    echo json_encode($response);
}

function patchRequest() {
    global $conn;

    parse_str(file_get_contents('php://input'), $_PATCH);
    $dataUserId = $_PATCH["ID"] ?? "";
    $bkname = $_PATCH['Book_Name'] ?? "";
    $bkgenre = $_PATCH['Book_Genre'] ?? "";
    $releaseDt = $_PATCH['Release_Date'] ?? "";
    $author = $_PATCH['Author'] ?? "";
    $rating = $_PATCH['Rating'] ?? "";

    $sql = "UPDATE `book_details` 
            SET 
            `Book_Name`='{$bkname}', `Book_Genre`='{$bkgenre}', 
            `Release_Date`='{$releaseDt}', `Author`='{$author}', 
            `Rating`='{$rating}' 
            WHERE `ID`='{$dataUserId}'";

    if (!mysqli_query($conn, $sql)) {
        echo "Error updating record: " . $sql . "<br>" . mysqli_error($conn);
    } else {
        echo "Updated successfully";
    }
}

function deleteRequest() {
    global $conn;

    parse_str(file_get_contents('php://input'), $_DELETE);
    $dataUserId = $_DELETE["ID"] ?? "";

    $sql = "DELETE FROM book_details WHERE ID={$dataUserId}";
    if (!mysqli_query($conn, $sql)) {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    } else {
        echo "Deleted successfully!";
    }
}

mysqli_close($conn);
?>
