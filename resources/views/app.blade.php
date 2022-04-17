<!DOCTYPE html>
<html class="h-full" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    {{ vite_assets() }}
    @inertiaHead
</head>
<body class="h-full font-sans antialiased">
@inertia
</body>
</html>
