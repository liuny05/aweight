<?php 

	require_once('connect.php');

	$id = intval($_GET['id']);
	$sql = "select * from article where id = $id";
	$query = mysql_query($sql);

	if ($query && mysql_num_rows($query)) {
		$data = mysql_fetch_assoc($query);
        // 阅读数+1
        $read_num = $data['read_num'] + 1;
        $sql = "update article set read_num = " . $read_num . " where id = " . $data['id'];
        mysql_query($sql);

	}
	else {
		echo "没有文章！";
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
 	<title>Article | <?php echo $data['title']; ?></title>
 	<!-- link -->
 	<link href="style/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style/reset.css">
    <link rel="stylesheet" type="text/css" href="style/article.show.css">
 </head>
 <body>
 	<header>
        <div class="topbar">
            <a href="index.html"><img src="images/HOME.png"></a>
        </div>
    </header>
    <article>
    	<!-- <p class="articlehead">Article
            <div class="articleheadunderline"></div>
        </p> -->
    	<div class="articlecontainer">
    		<h2 class="article-title"><?php echo $data['title']; ?></h2>
    		<span class="article-author"><?php echo $data['author']; ?></span>
    		<span class="article-dateline"><?php echo date("Y/n/d",$data['dateline']); ?></span>
    		<p class="article-content"><?php echo $data['content']; ?></p>
    		<div class="heartcontainer" name='article' value=<?php echo $data['id']; ?>>
    			<img src="images/icon/heart-outline.png" class="heart-show">
    			<img src="images/icon/heart-fill.png" class="heart-hide">
    			<span class="like"><?php echo $data['like_num']; ?></span>
    		</div>
    		<div class="eyecontainer">
    			<img src="images/icon/eye.png" class="eye">
    			<span class="read"><?php echo $data['read_num']; ?></span>
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