<?php 

	require_once('connect.php');

	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST,GET');
	header('Access-Control-Allow-Credentials:true'); 
	header("Content-Type: application/json;charset=utf-8"); 

	// 读数据
	$type = $_GET['type'];
	$id = intval($_GET['id']);
	$likeHandle = intval($_GET['likeHandle']);
	$result = '{"success":false}';

	$sql = "select like_num from " . $type . " where id = " . $id;
	$query = mysql_query($sql);

	if ($query && mysql_num_rows($query)) {
		$data = mysql_fetch_assoc($query);
	}
	else {
		die($result);
	}

	// 改数据
	if ($likeHandle) {
		if ($data['like_num']) {
			// 若还未为0则减1
			$like_num = $data['like_num'] - 1;
			$sql = "update " . $type . " set like_num = " . $like_num . " where id = " . $id;
			mysql_query($sql);
		} else {
			die($result);  // 已经为0了，不能再减
		}
	} else {
		// 否则加1
		$like_num = $data['like_num'] + 1;
		$sql = "update " . $type . " set like_num = " . $like_num . " where id = " . $id;
		mysql_query($sql);
	}

	$result = '{"success":true,"like_num":' . $like_num . '}';
	echo "$result";
	
 ?>