<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // supaya React bisa fetch
header("Access-Control-Allow-Methods: GET");

// lokasi file JSON
$jsonPath = __DIR__ . '/../data/games.json';
    

// cek apakah file ada
if (!file_exists($jsonPath)) {
    echo json_encode(["error" => "games.json not found"]);
    exit;
}

// baca isi file JSON
$jsonData = file_get_contents($jsonPath);

// ubah JSON jadi array PHP
$games = json_decode($jsonData, true);

// jika JSON rusak
if ($games === null) {
    echo json_encode(["error" => "Invalid JSON format"]);
    exit;
}

// kirim kembali ke React
echo json_encode($games, JSON_PRETTY_PRINT);
