 <?php

//======================================
// 函数: 获取当前用户最新的一条数据
// 参数: variable        绑定名
//       account         账号
// cf
//======================================
function  get_us_log_bind_by_variable($variable , $account)
{
  $db = new DB_COM();
  $sql = "SELECT * FROM us_log_bind WHERE bind_name = '{$variable}' AND bind_info = '{$account}' ORDER BY log_id DESC LIMIT 1 ";
  $db -> query($sql);
  $row = $db -> fetchRow();
  return $row;
}
//======================================
// 函数: 绑定日志中创建未确认的绑定信息
// 参数: data_bind       绑定信息数组
// 返回: true              成功
//      false             失败
//======================================
function ins_bind_user_reg_bind_log($data_log_bind)
{
  $data_log_bind['ctime'] = date("Y-m-d H:i:s");
  $db = new DB_COM();
  $sql = $db->sqlInsert("us_log_bind", $data_log_bind);
  $q_id = $db->query($sql);
  if ($q_id == 0)
    return false;
  return true;
}

//======================================
// 函数: 记录验证码发送情况
// 参数: data            信息数组
// 返回: true              成功
//      false             失败
//======================================
function ins_user_verification_code($data)
{
  $data['ctime'] = date("Y-m-d H:i:s");
  $db = new DB_COM();
  $sql = $db->sqlInsert("us_log_bind",$data);
  $res = $db->query($sql);
  if ($res == 0)
    return false;
  return true;
}


//======================================
// 函数: 判断用户手机验证码发送次数是否超限(过去24小时最多发5次)
// 参数: data             信息数组
// 返回: count
//
//======================================
function user_phone_code_limit_check($phone)
{
    $one_day = 86400;
    $time_flag = time()-$one_day-60;
    $db = new DB_COM();
    $sql = "SELECT * FROM us_log_bind WHERE bind_info = '{$phone}' and bind_name='phone_code'  and limit_time>$time_flag";
    $db -> query($sql);
    $count = $db -> affectedRows();
    return $count;
}
//======================================
// 函数: 用户注册成功后验证码置零
// 参数: variable_code            bind_name
//       cellphone                bind_info
// 返回   count                    影响行数
//======================================
function upd_us_log_bind_variable($variable_code , $cellphone_num)
{
    $db = new DB_COM();
    $sql = "UPDATE us_log_bind SET bind_name = 'phone_code_used' WHERE bind_name = '{$variable_code}' AND bind_info = '{$cellphone_num}'";
    $db -> query($sql);
    $count = $db -> affectedRows();
    return $count;
}
//======================================
// 函数: 获取用户绑定的谷歌密钥
// 参数: us_id                用户id
// 返回: secret               用户密钥
//======================================
function get_secret_by_us_id($us_id,$vail){
    $db = new DB_COM();
    $sql = "SELECT bind_info FROM us_log_bind WHERE us_id = '{$us_id}' AND  bind_name = '{$vail}' order by ctime desc limit 1";
    $db->query($sql);
    $secret = $db->getField($sql,'bind_info');
    return $secret;
}
//======================================
// 函数: 添加绑定信息
// 参数: us_id       用户id
// 返回: data_bind   bind数组
// 返回:true           成功
//     false         失败
//======================================
function bind_log_info($us_id, $data_bind)
{
    $data_bind['us_id'] = $us_id;
    $data_bind['ctime'] = date("Y-m-d H:i:s");
    $db = new DB_COM();
    $sql = $db->sqlInsert('us_log_bind', $data_bind);
    $q_id = $db->query($sql);
    if ($q_id == 0)
        return false;
    return true;
}
//======================================
// 函数: 获取身份证图片
// 参数: us_id       用户id
// 返回: row         用户绑定身份证图片信息数组
//======================================
function get_us_log_bind_info_for_idPhoto($us_id)
{
    $db = new DB_COM();
    $sql = "SELECT * FROM us_log_bind WHERE bind_type = 'file' AND bind_name = 'idPhoto' AND us_id = '{$us_id}' AND count_error != '2' ORDER BY log_id DESC LIMIT 1 ";
    $db->query($sql);
    $row = $db -> fetchRow();
    return $row;
}
//======================================
// 函数: 获取身份证姓名
// 参数: us_id       用户id
// 返回: row         用户绑定身份证姓名信息数组
//======================================
function get_us_log_bind_info_for_idName($us_id)
{
    $db = new DB_COM();
    $sql = "SELECT * FROM us_log_bind WHERE bind_type = 'text' AND bind_name = 'name' AND us_id = '{$us_id}' AND count_error != '2' ORDER BY log_id DESC LIMIT 1 ";
    $db->query($sql);
    $row =$db -> fetchRow();
    return $row;
}
//======================================
// 函数: 获取身份证号
// 参数: us_id       用户id
// 返回: row         用户绑定身份证号码信息数组
//======================================
function get_us_log_bind_info_for_idNum($us_id)
{
    $db = new DB_COM();
    $sql = "SELECT * FROM us_log_bind WHERE bind_type = 'text' AND bind_name = 'idNum' AND us_id = '{$us_id}' AND count_error != '2' ORDER BY log_id DESC LIMIT 1 ";
    $db->query($sql);
    $row = $db -> fetchRow();
    return $row;
}
//======================================
//email地址绑定完成以后log表中的字段失效操作
// 参数: us_id       用户id
// 返回: count       影响行数
//======================================
function  upd_us_log_bind_info($us_id)
{
    $db = new DB_COM();
    $sql = "UPDATE us_log_bind SET bind_name = 'email_used' WHERE us_id = '{$us_id}' AND bind_type = 'text' AND bind_name = 'email'";
    $db->query($sql);
    $count = $db -> affectedRows();
    return $count;
}
//======================================
//phone地址绑定完成以后log表中的字段失效操作
// 参数: us_id       用户id
// 返回: count       影响行数
//======================================
function  upd_us_phone_log_bind_info($us_id)
{
    $db = new DB_COM();
    $sql = "UPDATE us_log_bind SET bind_name = 'phone_code_used' WHERE us_id = '{$us_id}' AND bind_name = 'phone_code'";
    $db->query($sql);
    $count = $db -> affectedRows();
    return $count;
}
