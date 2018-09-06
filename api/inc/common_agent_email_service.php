<?php
/**
 * Created by PhpStorm.
 * User: liangyi
 * Date: 2018/9/6
 * Time: 下午4:06
 */

function send_email_by_agent_service($email,$title,$body){
    $url = "http://agent_service.fnying.com/email/send_email.php";

    $post_data = array("email" => $email, "title" => $title,'body' => $body);

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

    $output = curl_exec($ch);
    curl_close($ch);

    $output_array = json_decode($output, true);

    return $output_array;
}