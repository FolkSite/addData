<?php

class addDataResCharacteristicGetListProcessor extends modObjectGetListProcessor
{
    public $classKey = 'addDataValue';
    public $defaultSortField = 'party';
    public $defaultSortDirection = 'ASC';
    protected $resId = 0;

    /**
     * @return bool
     */
    public function initialize()
    {
        $properties = $this->getProperties();
        if ($properties) {
            $this->resId = (int)$properties['res_id'];
        }

        return parent::initialize();
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        //$result = array();
        $c->innerJoin('addDataCharacteristics', 'Characteristics', 'addDataValue.name = Characteristics.name');
        $c->select($this->modx->getSelectColumns('addDataValue', 'addDataValue'));
        $c->select($this->modx->getSelectColumns('addDataCharacteristics', 'Characteristics', '', array('name', 'description', 'party')));
        $c->where(array(
            'resource_id' => $this->resId,
        ));

        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where(array(
                'name:LIKE' => "%{$query}%",
                'OR:party:LIKE' => "%{$query}%",
                'OR:description:LIKE' => "%{$query}%",
                'OR:value:LIKE' => "%{$query}%",
            ));
        }

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();
        $array['actions'] = array();

        // Edit
        $array['actions'][] = array(
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('adddata_characteristic_update'),
            'action' => 'updateResCharacteristic',
            'button' => true,
            'menu' => true,
        );

        // Remove
        $array['actions'][] = array(
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('adddata_characteristic_remove'),
            'multiple' => $this->modx->lexicon('adddata_characteristics_remove'),
            'action' => 'removeResCharacteristic',
            'button' => true,
            'menu' => true,
        );

        return $array;
    }

}

return 'addDataResCharacteristicGetListProcessor';