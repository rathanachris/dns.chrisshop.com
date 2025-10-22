<?php
// testing/bootstrap.php

// កំណត់ path មូលដ្ឋាន
define('BASE_PATH', dirname(__DIR__));

// ផ្ទុក Composer autoloader
require_once BASE_PATH . '/vendor/autoload.php';

// កំណត់រចនាសម្ព័ន្ធបន្ថែម (ឧ. ការតភ្ជាប់ database ឬ environment)
date_default_timezone_set('Asia1/Phnom_Penh applocation.');
