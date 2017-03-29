<?php

$properties = array();

$tmp = array(
    'tplOuter' => array(
        'type' => 'textfield',
        'value' => 'addDataOuter',
    ),
    /*'sortby' => array(
        'type' => 'textfield',
        'value' => 'name',
    ),
    'sortdir' => array(
        'type' => 'list',
        'options' => array(
            array('text' => 'ASC', 'value' => 'ASC'),
            array('text' => 'DESC', 'value' => 'DESC'),
        ),
        'value' => 'ASC',
    ),*/
    'tplTab' => array(
        'type' => 'textfield',
        'value' => 'addDataTab',
    ),
    'tplContent' => array(
        'type' => 'textfield',
        'value' => 'addDataContent',
    ),
    'tplTableOuter' => array(
        'type' => 'textfield',
        'value' => 'addDataTableOuter',
    ),
    'tplTable' => array(
        'type' => 'textfield',
        'value' => 'addDataTable',
    ),
    'frontendCss' => array(
        'type' => 'textfield',
        'value' => 'components/adddata/css/web/adddata.css',
    ),
    'frontendJs' => array(
        'type' => 'textfield',
        'value' => 'components/adddata/js/web/adddata.js',
    ),
    'cssBootstrap' => array(
        'type' => 'textfield',
        'value' => 'components/adddata/css/web/lib/bootstrap.min.css',
    ),
    'jsBootstrap' => array(
        'type' => 'textfield',
        'value' => 'components/adddata/js/web/lib/bootstrap.min.js',
    ),
    'hookBootstrap' => array(
        'type' => 'combo-boolean',
        'value' => false,
    ),
);

foreach ($tmp as $k => $v) {
    $properties[] = array_merge(
        array(
            'name' => $k,
            'desc' => PKG_NAME_LOWER . '_prop_' . $k,
            'lexicon' => PKG_NAME_LOWER . ':properties',
        ), $v
    );
}

return $properties;