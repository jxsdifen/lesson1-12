<?php
	header("Content-type: application/json; charset=utf-8");
	require_once('db_config.php');

	$conn = mysqli_connect($mysql_conn['host'], $mysql_conn['user'], $mysql_conn['pwd'], $mysql_conn['db'], $mysql_conn['port']);
	if (!$conn) {
		die("could not connect to the database:\n" . mysql_error());
	}
	
	$ac = isset($_REQUEST['ac']) ? $_REQUEST['ac'] : '';
	$newsid = isset($_REQUEST['newsid']) ? $_REQUEST['newsid'] : 0;

	if ($ac == '' || $ac == 'select'){
		// $sql = 'select * from news';
		$sql = 'select n.*,nt.newstype_name from news as n,newstype as nt where n.newstype_id=nt.newstype_id order by n.newsid desc';
		mysqli_query($conn,'set names utf8');
		$result = mysqli_query($conn, $sql);

		$data = array();
		while($row = mysqli_fetch_assoc($result)){
			array_push($data, array(
				'id'=>$row['newsid'],
				'title'=>$row['newstitle'],
				'type'=>$row['newstype_id'],
				'typename'=>$row['newstype_name'],
				'img'=>$row['newsimg'],
				'desc'=>$row['newsdesc'],
				'date'=>$row['newsdate'],
			));
		}
		$result_data = array('state' => 'success', 'data' => $data);
		echo json_encode($result_data);
	}else if($ac == 'add'){
		$title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '';
		$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
		$img = isset($_REQUEST['img']) ? $_REQUEST['img'] : '';
		$desc = isset($_REQUEST['desc']) ? $_REQUEST['desc'] : '';
		$date = isset($_REQUEST['date']) ? $_REQUEST['date'] : '';

		$sql = 'insert into news(newstitle,newstype_id,newsimg,newsdesc,newsdate) '.
			   'values("'.$title.'","'.$type.'","'.$img.'","'.$desc.'","'.$date.'")';
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
		$title = isset($_REQUEST['title']) ? $_REQUEST['title'] : '';
		$type = isset($_REQUEST['type']) ? $_REQUEST['type'] : '';
		$img = isset($_REQUEST['img']) ? $_REQUEST['img'] : '';
		$desc = isset($_REQUEST['desc']) ? $_REQUEST['desc'] : '';
		$date = isset($_REQUEST['date']) ? $_REQUEST['date'] : '';

		$sql = 'update news set newstitle = "'.$title.'",newstype_id = "'.$type.'",newsimg = "'.$img.'",newsdesc = "'.$desc.'",newsdate = "'.$date.'" where newsid = '.$id;

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

		$sql = 'DELETE FROM news WHERE newsid = '.$id;
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