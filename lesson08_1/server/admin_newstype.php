<?php
	header("Content-type: application/json; charset=utf-8");
	require_once('db_config.php');

	$conn = mysqli_connect($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pwd'], $mysql_conn['db'], $mysql_conn['port']);
	if (!$conn) {
		die("could not connect to the database:\n" . mysql_error());
	}
	
	$ac = isset($_REQUEST['ac']) ? $_REQUEST['ac'] : '';
	$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;

	if ($ac == '' || $ac == 'select'){
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
	}else if($ac == 'add'){
		$typename = isset($_REQUEST['typename']) ? $_REQUEST['typename'] : '';

		$sql = 'insert into newstype(newstype_name) values("'.$typename.'")';
		mysqli_query($conn,'set names utf8');
		$count = mysqli_query($conn, $sql);

		if ($count > 0){
			$result_data = array('state' => 'success');
		}else{
			$result_data = array('state' => 'fail');
		}
		echo json_encode($result_data);

	}else if($ac == 'edit'){
		$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
		$typename = isset($_REQUEST['typename']) ? $_REQUEST['typename'] : '';

		$sql = 'update newstype set newstype_name = "'.$typename.'" where newstype_id = '.$id;

		mysqli_query($conn,'set names utf8');
		$count = mysqli_query($conn, $sql);

		if ($count > 0){
			$result_data = array('state' => 'success');
		}else{
			$result_data = array('state' => 'fail');
		}
		echo json_encode($result_data);

	}else if($ac == 'del'){
		$id = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;

		$sql = 'DELETE FROM newstype WHERE newstype_id = '.$id;
		mysqli_query($conn,'set names utf8');
		$count = mysqli_query($conn, $sql);

		if ($count > 0){
			$result_data = array('state' => 'success');
		}else{
			$result_data = array('state' => 'fail');
		}
		echo json_encode($result_data);
	}

	

	mysqli_close($conn);
?>