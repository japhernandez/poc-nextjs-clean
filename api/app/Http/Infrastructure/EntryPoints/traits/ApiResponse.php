<?php

namespace App\Http\Infrastructure\EntryPoints\traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

trait ApiResponse
{
    /**
     * Build error response
     *
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    public function errorResponse(string $message, int $code): JsonResponse
    {
        $response = ['error' => $message, 'code' => $code];

        return response()->json($response, $code);
    }

    /**
     * Build success response
     *
     * @param $data
     * @param int $code
     * @return JsonResponse
     */
    public function successResponse($data, int $code = Response::HTTP_OK): JsonResponse
    {
        $response = ['data' => $data];

        return response()->json($response, $code);
    }
}

