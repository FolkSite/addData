<?php
/** @var modX $modx */
/** @var array $scriptProperties */
/** @var addData $addData */
if (!$addData = $modx->getService('adddata', 'addData', $modx->getOption('adddata_core_path', null,
        $modx->getOption('core_path') . 'components/adddata/') . 'model/adddata/', $scriptProperties)
) {
    return '';
}

$tplOuter = $modx->getOption('tplOuter', $scriptProperties, 'addDataOuter');
$tplTab = $modx->getOption('tplTab', $scriptProperties, 'addDataTab');
$tplContent = $modx->getOption('tplContent', $scriptProperties, 'addDataContent');
$tplTableOuter = $modx->getOption('tplTableOuter', $scriptProperties, 'addDataTableOuter');
$tplTable = $modx->getOption('tplTable', $scriptProperties, 'addDataTable');
$hookBootstrap = $modx->getOption('hookBootstrap', $scriptProperties, false);
$cssBootstrap = trim($modx->getOption('cssBootstrap', $scriptProperties,
    'components/adddata/css/web/lib/bootstrap.min.css'
));
$jsBootstrap = trim($modx->getOption('jsBootstrap', $scriptProperties,
    'components/adddata/js/web/lib/bootstrap.min.js'
));
$frontendCss = trim($modx->getOption('frontendCss', $scriptProperties,
    'components/adddata/css/web/adddata.css'
));
$frontendJs = trim($modx->getOption('frontendJs', $scriptProperties,
    'components/adddata/js/web/adddata.js'
));

$chunk = null;

if ($pdoTools = $modx->getService('pdoTools')) {
    $chunk = $pdoTools;
} else {
    $chunk = $modx;
}

$tabs = explode(',', $addData->getOption('adddata_tabs'));
$items = '';
$contents = '';
$it = '';
$tabcontent = '';

foreach ($tabs as $tab) {
    $modx->setPlaceholder('value', $tab);
    $items .= $chunk->getChunk($tplTab);

    switch ($tab) {
        case 'characteristic';
            $c = $modx->newQuery('addDataCharacteristics');
            $c->leftJoin('addDataValue', 'Value', 'Value.name = addDataCharacteristics.name');
            $c->select($modx->getSelectColumns('addDataCharacteristics', 'addDataCharacteristics'));
            $c->select($modx->getSelectColumns('addDataValue', 'Value', '', array('name', 'resource_id', 'value')));
            $c->where(array(
                'Value.resource_id' => $modx->resource->get('id'),
            ));

            $features = $addData->getGroups('addDataCharacteristics', $c);

            $tmp = array();
            foreach ($features as $feature) {
                if (empty($feature->get('party'))) {
                    $it .= $chunk->getChunk($tplTable, $feature->toArray());
                } else {
                    $tmp[$feature->get('party')] .= $chunk->getChunk($tplTable, $feature->toArray());
                }
            }

            $tabcontent = $chunk->getChunk($tplTableOuter, array(
                'table' => $it,
            ));

            if ($tmp) {
                foreach($tmp as $key => $g) {
                    $tabcontent .= $chunk->getChunk($tplTableOuter, array(
                        'party' => $key,
                        'table' => $g,
                    ));
                }
            }
            break;

        case 'feedback';

            break;
    }

    $contents .= $chunk->getChunk($tplContent, array(
        'tabcontent' => $tabcontent,
    ));
    unset($tabcontent);
}

$output = $chunk->getChunk($tplOuter, array(
    'items' => $items,
    'contents' => $contents,
));

if ($hookBootstrap) {
    if (!empty($cssBootstrap)) {
        $modx->regClientCSS(MODX_ASSETS_URL . $cssBootstrap);
    }
    if (!empty($jsBootstrap)) {
        $modx->regClientScript(MODX_ASSETS_URL . $jsBootstrap);
    }
}

if (!empty($frontendCss)) {
    $modx->regClientCSS(MODX_ASSETS_URL . $frontendCss);
}
if (!empty($frontendJs)) {
    $modx->regClientScript(MODX_ASSETS_URL . $frontendJs);
}

$modx->regClientHTMLBlock('<script>addData.initialize({ "actionUrl":"'
    . $addData->config['actionUrl'] . '"});</script>');

return $output;
