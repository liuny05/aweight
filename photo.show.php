<?php 

	require_once('connect.php');

	$id = intval($_GET['id']);
	$sql = "select * from photo where id = $id";
	$query = mysql_query($sql);

	if ($query && mysql_num_rows($query)) {
		$data = mysql_fetch_assoc($query);
        // 阅读数+1
        $read_num = $data['read_num'] + 1;
        $sql = "update photo set read_num = " . $read_num . " where id = " . $data['id'];
        mysql_query($sql);

	}
	else {
		echo "没有图片！";
	}
	// print_r($data);

 ?>

 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<!-- meta -->
 	<meta charset="UTF-8">
 	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="renderer" content="webkit">
 	<title>Photography | 一股重口味</title>
 	<!-- link -->
    <link rel="shortcut icon" href="images/icon/weight.ico" type="image/x-icon">
 	<link href="style/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style/reset.css">
    <link rel="stylesheet" type="text/css" href="style/photo.show.css">
 </head>
 <body>
 	<header>
        <div class="topbar">
            <a href="index.html"><img src="images/HOME.png"></a>
        </div>
    </header>
    <article>
    	<div class="photocontainer">
            <div class="photolist">
                <?php 
                    $path = json_decode($data['photo_path']);
                    // print_r($path);
                    if ($path) {
                        foreach ($path as $value) {
                            echo '<img src="' . $value . '" class="photo-content">';
                        }
                    }
                    else {
                        echo "没有图片！";
                    }
                 ?>
            </div>
            <p class="photo-description"><?php echo $data['description']; ?></p>
            <div class="photo-gap"></div>
                <div class="heartcontainer" name='photo' value=<?php echo $data['id']; ?>>
                    <img src="images/icon/heart-outline.png" class="heart-show">
                    <img src="images/icon/heart-fill.png" class="heart-hide">
                    <span class="like"><?php echo $data['like_num']; ?></span>
                </div>
                <div class="photo-date">
                    <span class="glyphicon glyphicon-calendar photo-cal-icon"></span>
                    <span class="photo-dateline"><?php echo date("Y/n/d",$data['dateline']); ?></span>
                </div>
                <div class="photo-date">
                    <span class="photo-num">#<?php echo $data['photo_num']; ?>P</span>
                </div>   
        </div>
        <!-- UY BEGIN -->
        <div class="commentcontainer">
            <div id="uyan_frame"></div>
            <script type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid=2114780"></script>
        </div>
        <!-- UY END -->
    </article>
    
    <script src="script/jquery-3.1.0.js"></script>
    <script src="script/show.js"></script>

 </body>
 </html>