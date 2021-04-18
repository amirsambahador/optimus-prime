<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<script src="/assets/standard-js/jquery.min.js"></script>
<script src="/assets/standard-js/bootstrap.min.js"></script>
<script src="/assets/standard-js/react.production.min.js"></script>
<script src="/assets/standard-js/react-dom.production.min.js"></script>
<script src="/assets/standard-js/babel.min.js"></script>
<script src="/assets/j2os-js/container.js"></script>
<link rel="stylesheet" href="/assets/standard-css/bootstrap.min.css">
<body>
<div id="mydiv">

    <table class="table table-striped table-hover">
        <thead class="thead-dark">
        <tr>
            <th scope="col">First</th>
            <th scope="col">Id</th>
            <th scope="col">Last</th>
        </tr>
        </thead>
        <tbody id="rows">
        </tbody>
    </table>

</div>

<script type="text/babel">
    const  map = new Map();
    map['name']='bbb';

    Request.send(
    "post",
    'http://localhost:8080/test.do?name=a',
    Request.TEXT,
    JSON.stringify(map),
    function (status,response) {
    alert(status+" ,"+response);
    });

    const jsonArray = JSON.stringify([{name: "amirsam", id: 222, family: "bahador"}, {
        name: "amirsam",
        id: 222,
        family: "bahador"
    }]);

    UIManager.fillTable(["name", "id", "family"], jsonArray, 'rows');
</script>


</body>
</html>
