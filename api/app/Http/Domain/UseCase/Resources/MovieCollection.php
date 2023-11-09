<?php

namespace App\Http\Domain\UseCase\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * This class serializes the response returned by the adapter.
 *
 * @autor John Alejandro Piedrahita
 */
class MovieCollection extends JsonResource
{
    /**
     * @param $request
     * @return array
     */
    public function toArray($request): array
    {
        return parent::toArray($request);
    }
}
