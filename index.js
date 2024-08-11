<script>
        function createPUTRequest(connToken, jsonObj, dbName, relName) {
            var putRequest = "{\n"
                    + "\"token\" : \""
                    + connToken
                    + "\","
                    + "\"dbName\": \""
                    + dbName
                    + "\",\n" + "\"cmd\" : \"PUT\",\n"
                    + "\"rel\" : \""
                    + relName + "\","
                    + "\"jsonStr\": \n"
                    + jsonObj
                    + "\n"
                    + "}";
            return putRequest;
        }
        function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
            var url = dbBaseUrl + apiEndPointUrl;
            var jsonObj;
            $.post(url, reqString, function (result) {
                jsonObj = JSON.parse(result);
            }).fail(function (result) {
                var dataJsonObj = result.responseText;
                jsonObj = JSON.parse(dataJsonObj);
            });
            return jsonObj;
        }

        function validateAndGetFormData() {
            
            var rno = document.getElementById("rNo").value;
            var name = document.getElementById("stuName").value;
            var class = document.getElementById("stuclass").value;
            var dob = document.getElementById("dob").value;     
            var add = document.getElementById("add").value;
            var doe = document.getElementById("doe").value;
            
            var jsonStrObj = {
		RollNo: rno,
                StudentName: name,
		Class: class,
                DOB: dob,
                Address: add,
                DOE: doe,
            };
            return JSON.stringify(jsonStrObj);
        }
        

        function registerCandidate() {

            var jsonStr = validateAndGetFormData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createPUTRequest("90935330|-31948798561083333|90934457",jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
            alert(putReqStr);
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommand(putReqStr,
                    "http://api.login2explore.com:5577", "/api/iml");
            jQuery.ajaxSetup({async: true});
            alert( "VALUES INSERTED "+ JSON.stringify(resultObj));
            document.getElementById("myForm").reset();
}

function resetForm() {
	$("#rNo").val("")
	$("#stuName").val("");
	$("#stuclass").val("");
	$("#dob").val("");
	$("#add").val("");
	$("#doe").val("");
	$("#rNo").focus();
}

        
    </script>
