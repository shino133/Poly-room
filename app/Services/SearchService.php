<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;

class SearchService
{
    public function applyFilters(Builder $query, array $filters, array $columns): Builder
    {
        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($query) use ($search, $columns) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', '%' . $search . '%');
                }
            });
        }

        return $query;
    }
}
