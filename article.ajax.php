<?php 
	require_once('connect.php');
	
	// 为什么要加这一堆头文件？
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST,GET');
	header('Access-Control-Allow-Credentials:true'); 
	header("Content-Type: application/json;charset=utf-8"); 

	$sql = "select * from article where is_deleted = 0 order by dateline DESC";
	$query = mysql_query($sql);
	if ($query && mysql_num_rows($query)) {
		while ($row = mysql_fetch_assoc($query)) {
			$data[] = $row;  // 相当于+=
		}
	} else {
		$data = 0;
	}
	// print_r($data);
	$result = json_encode($data);
	echo $result;
 ?>