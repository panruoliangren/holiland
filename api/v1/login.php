<?php
header("Access-Control-Allow-Origin:*");
include("../db.php");

$tel=$_POST['tel'];
$pwd=$_POST['pwd'];

$sql="select * from userinfo where tel='$tel' and pwd='$pwd'";
$sql1="select * from userinfo where email='$tel' and pwd='$pwd'";
$res=mysql_query($sql);
$res1=mysql_query($sql1);

if($row=mysql_fetch_assoc($res)||$row=mysql_fetch_assoc($res1)){
	$arr=array('res_code'=>1,'res_message'=>'登陆成功');
}else{
	$arr=array('res_code'=>0,'res_message'=>'登陆失败');
}

echo json_encode($arr);
?>