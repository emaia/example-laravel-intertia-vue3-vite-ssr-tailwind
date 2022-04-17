<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;

if (! function_exists('vite_assets')) {
    function devServerRunning(string $host, int $port, bool $tls = false): bool
    {
        if (app()->environment('local')) {
            try {
                $schema = $tls ? 'https' : 'http';
                Http::withoutVerifying()->head("$schema://$host:$port/@vite/client");

                return true;
            } catch (Exception) {
            }
        }


        return false;
    }

    function getManifest(): array
    {
        return json_decode(file_get_contents(
            public_path('dist/manifest.json')
        ), true, 512, JSON_THROW_ON_ERROR);
    }

    /**
     * @return HtmlString
     * @throws Exception
     */
    function vite_assets(): HtmlString
    {
        $js = 'resources/js/app.ts';

        $host = config('app.url');
        $tls = Str::lower(Str::before($host, '://')) === 'https';

        $port = 3030;

        if (devServerRunning(Str::after($host, '://'), $port, $tls)) {
            return new HtmlString(
                <<<HTML
                <script type="module" src="$host:$port/@vite/client"></script>
                <script type="module" src="$host:$port/$js"></script>
            HTML
            );
        }

        $manifest = getManifest();

        return new HtmlString(
            <<<HTML
            <script type="module" src="/dist/{$manifest[$js]['file']}"></script>
            <link rel="stylesheet" href="/dist/{$manifest[$js]['css'][0]}" />
        HTML
        );
    }
}
