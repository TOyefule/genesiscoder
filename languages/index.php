<html ng-app="languages">
<body>
<ng-view></ng-view>

<span id="base-copyright"></span>
<?php if ($loc != 'localhost') { ?>
    <script src='<?php print $src ?>js/global-nolog.js'></script>
<?php } else{
     include('../globals/public/index.php');
} ?>
</body>

<script type='text/javascript' src='js/angular.min.js'></script>
<script type='text/javascript' src='js/angular-route.min.js'></script>
<script type='text/javascript' src='js/angular-sanitize.js'></script>
<script type='text/javascript' src='js/app.js?clear=5'></script>
<script type='text/javascript' src='js/services.js'></script>
<script type='text/javascript' src='js/controllers.js'></script>
<script type='text/javascript' src='js/directives.js'></script>
</html>

