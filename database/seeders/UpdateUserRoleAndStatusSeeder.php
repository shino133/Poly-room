<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UpdateUserRoleAndStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = DB::table('users')->get();

        foreach ($users as $user) {
            $role = $user->id % 2 == 0 ? 'admin' : 'user';
            $status = $user->id % 2 == 0 ? 'active' : 'inactive';

            DB::table('users')
                ->where('id', $user->id)
                ->update([
                    'role' => $role,
                    'status' => $status,
                ]);
        }
    }
}
