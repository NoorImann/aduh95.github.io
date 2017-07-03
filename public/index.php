<?php
/**
 * Generates HTML for the home page
 *
 * @author Antoine du HAMEL
 */

namespace aduh95\Resume;

require_once __DIR__.'/../vendor/autoload.php';

$doc = new Document(
    'Résumé',
    isset($argc) && $argc > 1 && $argv[1] === '--one-file'
);



$doc()->header()->append()
        ()->h1(CONFIG\MY_INFO\PUBLIC_NAME)
        ()->p(['lang'=>'en'], 'IT Student')
        ()->p(['lang'=>'fr'])->text('Étudiant en informatique')
        ();

$main = $doc()->main();

$sections = [
    'experience' => [
        'en' => 'Experience',
        'fr' => 'Expérience professionnelle',
    ],
    'education' => [
        'en' => 'Education',
        'fr' => 'Formation',
    ],
    'languages' => [
        'en' => 'Languages',
        'fr' => 'Langues',
    ],
    'programming_languages' => [
        'en' => 'Programming Languages',
        'fr' => 'Programation informatique',
    ],
];

foreach ($sections as $view_name => $section_name) {
    $section = $main->section()->attr('class', $view_name.' col-md-12');

    foreach ($section_name as $lang => $value) {
        $section->h3()->attr('lang', $lang)->text($value);
    }
    $doc->addView(
        $view_name,
        $section
    );
}

$doc->addView('aside');
