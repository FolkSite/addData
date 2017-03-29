<?php
/** @var modX $modx */
$addData = $modx->getService('adddata', 'addData',
    MODX_CORE_PATH . 'components/adddata/model/adddata/');

switch ($modx->event->name) {
    case 'OnDocFormRender':
        $templates = explode(',', str_replace(' ', '', $modx->getOption('adddata_templates')));
        if ($mode == 'new') return;

        if (($templates[0] == '') || in_array($resource->get('template'), $templates)) {
            if ($addData) {
                $addData->loadJsCssMgr($modx->controller, $id);
            }
        }
        break;

    case 'OnBeforeEmptyTrash':
        foreach ($ids as $id) {
            if ($id && $addData) {
                $modx->removeCollection('addDataValue', array("`resource_id` = {$id}"));
            }
        }
        //$modx->log(1, $modx->event->name .' '. print_r($ids, 1));
        break;
}