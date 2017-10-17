<?php
	header("Content-type: application/json; charset=utf-8");
	require_once('db_config.php');

	$conn = mysqli_connect($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pwd'], $mysql_conn['db'], $mysql_conn['port']);
	if (!$conn) {
		die("could not connect to the database:\n" . mysql_error());
	}

	$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
	
	if ($type == ''){
		$sql = 'select * from news order by newsid desc';
	}else{
		//$sql = 'select * from news where newstype="'.$type.'"';
		$sql = 'select n.*,nt.newstype_name from news as n,newstype as nt where n.newstype_id=nt.newstype_id and n.newstype_id='.$type
				.' order by n.newsid desc';
	}
	
	mysqli_query($conn,'set names utf8');
	$result = mysqli_query($conn, $sql);

	$data = array();
	while($row = mysqli_fetch_assoc($result)){
		array_push($data, array(
			'id'=>$row['newsid'],
			'title'=>$row['newstitle'],
			'type'=>$row['newstype_id'],
			'img'=>$row['newsimg'],
			'desc'=>$row['newsdesc'],
			'date'=>$row['newsdate'],
		));
	}
	$result_data = array('state' => 'success', 'data' => $data);
	echo json_encode($result_data);

	mysqli_close($conn);
?>