<?php
/** @var modX $modx */
/** @var array $sources */

$settings = array();

$tmp = array(
    'templates' => array(
        'xtype' => 'textfield',
        'value' => '',
        'area' => 'adddata_main',
    ),
    'tabs' => array(
        'xtype' => 'textfield',
        'value' => 'characteristic',
        'area' => 'adddata_main',
    ),
);

foreach ($tmp as $k => $v) {
    /** @var modSystemSetting $setting */
    $setting = $modx->newObject('modSystemSetting');
    $setting->fromArray(array_merge(
        array(
            'key' => 'adddata_' . $k,
            'namespace' => PKG_NAME_LOWER,
        ), $v
    ), '', true, true);

    $settings[] = $setting;
}
unset($tmp);

return $settings;
