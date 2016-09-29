<?php
	require_once('config.php');
	//连接
	if(!($con = mysql_connect(HOST, USERNAME, PASSWORD))){
		echo mysql_error();
	}
	//选择数据库
	if(!mysql_select_db('aweight')){
		echo mysql_error();
	}
	//设置编码
	if(!mysql_query('set names utf8')){
		echo mysql_error();
	}
?>