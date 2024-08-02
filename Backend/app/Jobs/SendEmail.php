<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Mail;
use App\Mail\MailNotify;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data;
    protected $recipientEmail;

    /**
     * Create a new job instance.
     *
     * @param $data
     * @param $recipientEmail
     */
    public function __construct($data, $recipientEmail)
    {
        $this->data = $data;
        $this->recipientEmail = $recipientEmail;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->recipientEmail)->send(new MailNotify($this->data));
    }
}


