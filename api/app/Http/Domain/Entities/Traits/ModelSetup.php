<?php

namespace App\Http\Domain\Entities\Traits;

/**
 * Trait to serialize the fillables of the model, providing an array without the implicit declaration.
 *  an array without the implicit declaration, it only manages the attributes
 *  that are in the database
 *
 * @autor John Alejandro Piedrahita
 */
trait ModelSetup
{
    protected function initAttributes(): void
    {
        /**
         * The attributes that aren´t mass assignable
         *
         * @var array $this
         */
        if(property_exists($this, 'guarded')) $this->guarded = [];
    }
}
