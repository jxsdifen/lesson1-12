<?php
	header("Content-type: application/json; charset=utf-8");
	require_once('db_config.php');

	$conn = mysqli_connect($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pwd'], $mysql_conn['db'], $mysql_conn['port']);
	if (!$conn) {
		die("could not connect to the database:\n" . mysql_error());
	}

	$sql = 'select * from newstype';
	
	mysqli_query($conn,'set names utf8');
	$result = mysqli_query($conn, $sql);

	$data = array();
	while($row = mysqli_fetch_assoc($result)){
		array_push($data, array(
			'id'=>$row['newstype_id'],
			'typename'=>$row['newstype_name'],
		));
	}
	$result_data = array('state' => 'success', 'data' => $data);
	echo json_encode($result_data);

	mysqli_close($conn);
?>