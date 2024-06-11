<?php
$server = 'localhost';
$username = 'alimasa_songs';
$password = 'songsss01alimasA';
$db = 'u945995174_songs';

$conn = mysqli_connect($server, $username, $password, $db);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
  case 'GET':
    $sql = "SELECT id, title, artist, genre, album, duration FROM songs";
    $result = $conn->query($sql);

    $songsList = array();
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $songsList[] = $row;
      }
    }
    echo json_encode($songsList);
    break;

  case 'POST':
    $data = json_decode(file_get_contents('php://input'), true);

    $title = $data['title'];
    $artist = $data['artist'];
    $genre = $data['genre'];
    $album = $data['album'];
    $duration = $data['duration'];

    $sql = "INSERT INTO songs (title, artist, genre, album, duration) 
            VALUES ('$title', '$artist', '$genre', '$album', '$duration')";

    if ($conn->query($sql) === TRUE) {
      echo "New song added successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    break;

  case 'PATCH':
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];
    $fieldsToUpdate = $data['fieldsToUpdate']; 

    $updateFields = array();
    foreach ($fieldsToUpdate as $key => $value) {
      $updateFields[] = "$key='$value'";
    }

    $updateFieldsStr = implode(", ", $updateFields);

    $sql = "UPDATE songs SET $updateFieldsStr WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
      echo "Song updated successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    break;

  case 'DELETE':
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];

    $sql = "DELETE FROM songs WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
      echo "Song deleted successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    break;

  default:
    echo "Method not supported";
    break;
}

$conn->close();
?>
