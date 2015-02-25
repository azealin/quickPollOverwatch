/**
 * Created by azeal_000 on 2/22/2015.
 */
$(function(){


$("div.container").replaceWith("<div class='container'><div class='header'> \
<nav> \
<ul class='nav nav-pills pull-right'> \
<li role='presentation' class='active'><a href='#'>Home</a></li> \
<li role='presentation'><a href='#'>Previous Results</a></li> \
</ul> \
</nav> \
<h3 class='text-muted'>Project name</h3> \
</div> \
 \
<div class='jumbotron'> \
<h1>QuickPoll</h1> \
<p class='lead'>Log in to your Twitch account to continue</p> \
<form class='form-inline'> \
<div class='form-group'> \
<label class='sr-only' for='exampleInputEmail3'>Email address</label></div>  \
<input type='text' class='form-control' placeholder='Enter username' id='User'></div> \
<div class='form-group'> \
<label class='sr-only' for='exampleInputPassword3' id='Password'>Password</label> \
<input type='password' class='form-control' id='exampleInputPassword3' placeholder='Password'>  \
</div> \
<div class='checkbox'> \
<label> \
<input type='checkbox'> Remember me \
</label> \
</div> \
<button type='submit' class='btn btn-lg btn-success' id='SignIn'>Sign in</button> \
</form> </div> \
</div>");

});
 //end of ready func
