<?php

class addDataNameCharacteristicGetListProcessor extends modObjectGetListProcessor
{
    public $classKey = 'addDataCharacteristics';
    public $defaultSortField = 'name';
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
        if ($this->resId) {
            $q = $this->modx->newQuery('addDataValue', array('resource_id' => $this->resId))
                ->select('name');

            $names = array();
            if ($q->prepare() && $q->stmt->execute()) {
                while ($row = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
                    $names[] = $row['name'];
                }
            }
            if ($names) {
                $c->where(array(
                    'name:NOT IN' => $names,
                ));
            }
        }

        return $c;
    }
}

return 'addDataNameCharacteristicGetListProcessor';