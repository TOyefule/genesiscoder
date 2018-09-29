<section ng-init="getLanguages()">
    <h1>Language selection</h1>
<ul>
    <li ng-repeat="language in languages">
       <button> {{language.name}}</button>
    </li>
</ul>
</section>
