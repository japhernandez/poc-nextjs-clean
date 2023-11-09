<?php

namespace App\Http\Domain\Entities\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Domain\Entities\Traits\ModelSetup;

class Movie extends Model
{
    use ModelSetup;

    protected $primaryKey = 'id';

    public function __construct(array $attribute = [])
    {
        $this->initAttributes();
        parent::__construct($attribute);
    }
}
