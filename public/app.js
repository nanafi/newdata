console.log("This is working!");

(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    const covidCols = [
      {
        id: "id",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "name",
        dataType: tableau.dataTypeEnum.string,
      },
      {
        id: "desc",
        dataType: tableau.dataTypeEnum.string,
      },
    ];

    let covidTableSchema = {
      id: "RIVM",
      alias: "Data Trello Numbers since start",
      columns: covidCols,
    };

    schemaCallback([covidTableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    let tableData = [];
    var i = 0;

    $.getJSON(
      "https://trello.com/b/8yoByXhs.json",
      function (resp) {
        // Iterate over the JSON object
        for (i = 0, len = resp.length; i < len; i++) {
          tableData.push({
            id: resp[i].id,
            name: resp[i].name,
            desc: resp[i].desc,
          });
        }
        table.appendRows(tableData);
        doneCallback();
      }
    );
  };

  tableau.registerConnector(myConnector);
})();

document.querySelector("#getData").addEventListener("click", getData);

function getData() {
  tableau.connectionName = "Data Trello Numbers";
  tableau.submit();
}