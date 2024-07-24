<?php

namespace App\Traits;

use Illuminate\Pagination\LengthAwarePaginator;

trait Paginates
{
    protected function formatPagination(LengthAwarePaginator $paginator)
    {
        return [
            'current_page' => $paginator->currentPage(),
            'first_page_url' => $paginator->url(1),
            'from' => $paginator->firstItem(),
            'last_page' => $paginator->lastPage(),
            'last_page_url' => $paginator->url($paginator->lastPage()),
            'next_page_url' => $paginator->nextPageUrl(),
            'path' => $paginator->path(),
            'per_page' => $paginator->perPage(),
            'prev_page_url' => $paginator->previousPageUrl(),
            'to' => $paginator->lastItem(),
            'total' => $paginator->total(),
            'links' => $paginator->linkCollection()
        ];
    }

    protected function formatResponse($items, LengthAwarePaginator $paginator)
    {
        return response()->json([
            'data' => $items,
            'pagination' => $this->formatPagination($paginator)
        ]);
    }
}
