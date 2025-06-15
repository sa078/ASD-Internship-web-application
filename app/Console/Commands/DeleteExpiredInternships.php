<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Internship;
use Carbon\Carbon;

class DeleteExpiredInternships extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'internships:delete-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete internships past their deadline';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $now = now(); // Current date/time
        $deletedCount = Internship::where('deadline', '<', $now)->delete();
        $this->info("Deleted {$deletedCount} expired internships.");
    }
}
