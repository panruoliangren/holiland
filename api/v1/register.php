<?php 
header("Access-Control-Allow-Origin:*");
include("../db.php");

$tel=$_POST["tel"];
$email=$_POST['email'];
$pwd=$_POST["pwd"];

$sql="select * from userinfo where tel='$tel'";
$sql1="select * from userinfo where email='$email'";
$res=mysql_query($sql);
$res1=mysql_query($sql1);
if(mysql_num_rows($res) > 0){
	$arr=array('res_code' => 0, 'res_message' => "用户名已存在");
	echo json_encode($arr);
}else if(mysql_num_rows($res1) > 0){
	$arr=array('res_code' => 0, 'res_message' => "邮箱已注册");
	echo json_encode($arr);
}else{
	$sql="insert into userinfo (tel, email, pwd) values ('$tel','$email','$pwd')";

	$isSucc = mysql_query($sql);

	if($isSucc){
		$arr=array('res_code'=>1,'res_message'=>"注册成功");
	}else{
		$arr=array('res_code'=>0,'res_message'=>"注册失败");		
	}
	echo json_encode($arr);
}

?>