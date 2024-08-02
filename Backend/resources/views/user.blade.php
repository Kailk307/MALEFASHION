@extends('layouts.app')

@section('content')
<div class="panel-body" style="margin-bottom: 30px">
    <form action="{{ route('store1.user') }}" method="POST" class="form-horizontal">
        @csrf
        <div class="card">
            <h5 class="card-header">
                New user
            </h5>
            <div class="card-body row">
                <label class="col-sm-2" for="user-name"><b>user</b></label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter user..." name="name">
                </div>
                <label class="col-sm-2" for="user-name"><b>user</b></label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter username..." name="username">
                </div> <label class="col-sm-2" for="user-name"><b>user</b></label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter password..." name="password">
                </div> <label class="col-sm-2" for="user-name"><b>user</b></label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter email..." name="email">
                </div> <label class="col-sm-2" for="user-name"><b>user</b></label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter user..." name="provider">
                </div>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter user..." name="provider_id">
                </div>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter user..." name="gender">
                </div>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter user..." name="phone">
                </div>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter role..." name="roles">
                </div>
                <div class="col-sm-8">
                    <input type="text" class="form-control" placeholder="Enter status..." name="status">
                </div>
                <!-- Add user Button -->
                <div class="col-sm-2">
                    <button type="submit" class="btn btn-success">
                        <i class="fas fa-plus"></i>
                        Add user
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>
@if (count($users) > 0)
<div class="card">
    <h5 class="card-header">
        Current users
    </h5>
    <div class="card-body">
        <div class="panel panel-default">
            <div class="panel-body">
                <table class="table table-striped user-table">
                    <!-- Table Headings -->
                    <thead>
                        <th>user</th>
                        <th>username</th>
                        <th></th>
                        <th>user</th>
                        <th>user</th>
                        <th>user</th>
                        <th>user</th>

                        <th>Action</th>
                    </thead>
              
                </table>
            </div>
        </div>
    </div>
</div>
@endif
@endsection