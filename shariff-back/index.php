<?php

require_once __DIR__.'/vendor/autoload.php';

use Heise\Shariff\Backend;

/**
 * Demo Application using Shariff Backend
 */
class Application
{
    /**
     * Sample configuration
     *
     * @var array
     */
    private static $configuration = [
        'cache' => [
            'ttl' => 60
        ],
        'domains' => [
            'www.party-nanny.de'
        ],
        'services' => [
            'GooglePlus',
            'Facebook'
        ],
        'Facebook' => [
            'app_id' => '1234567890',
            'secret' => 'secret'
        ]
                                ]
    ];

    public static function run()
    {
        header('Content-type: application/json');

        $url = isset($_GET['url']) ? $_GET['url'] : '';
        if ($url) {
            $shariff = new Backend(self::$configuration);
            echo json_encode($shariff->get($url));
        } else {
            echo json_encode(null);
        }
    }
}

Application::run();