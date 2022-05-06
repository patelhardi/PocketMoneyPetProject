window.onload = function() {
    //create form object
    var formHandle = document.forms.loginForm;

    //create required variables
    var outputdueresult = document.getElementById("dueresult");
    var paidoutputresult = document.getElementById("paidresult");
    var progressbarresult = document.getElementById("progressBar");
    var paidamount = [];
    var getpercentage =0;
    var dueresult;

    //call function on form submit
    formHandle.onsubmit = processForm;

    //create function
    function processForm() {
        var ttamount = formHandle.total_Amount;
        var pnamount = formHandle.payNow_Amount;

        checkNumbers(ttamount.value, pnamount.value);

        return false;
        
    }

    //validate for the input required only numbers and decimals
    function checkNumbers(totalamount, paidvalue){
        //console.log(totalamount, paidvalue);
        var regex = /^\d+.?\d*$/;
        if(!regex.test(totalamount) || !regex.test(paidvalue) ){
            return document.getElementById("errormsg").innerHTML = "Please Enter valid numbers from 0 to 9";
        }
        else{
            document.getElementById("errormsg").innerHTML = "";
            //insert paid amount into array
            paidamount.push("$" +paidvalue);

            //percentage logic
            getpercentage += (100*paidvalue/totalamount);
            
            //logic for circular progress bar
            var progressvalue = 0;
            var percentagevalue = document.getElementById("valuePercent");
            //set interval to update the process bar in a 10 second time interval
            var progress = setInterval(function(){
                progressvalue++; 
                percentagevalue.innerHTML = Math.round(getpercentage) + "%";
                progressbarresult.style.background = "conic-gradient(#2aaf44 " + (progressvalue*3.6) + "deg, #b6f8c3 " + progressvalue + "deg)";

                if(progressvalue === Math.round(getpercentage)){
                    clearInterval(progress);
                }
            },10);

            checkDueResult(outputdueresult);

            //display result
            var resultoutput = document.getElementById("result");
            resultoutput.style.display = "block";
            //change total amount textbox property to readonly 
            document.getElementById("totalAmount").style.borderStyle = "none";
            document.getElementById("totalAmount").style.backgroundColor = "transparent";
            document.getElementById("totalAmount").readOnly=true;
            document.getElementById("payNowAmount").focus();
            outputdueresult.innerHTML = dueresult.toFixed(2);

            //display successful message when there is no due balance left
            if(dueresult <= 0.00){
                formHandle.style.display = "none";
                resultoutput.style.display = "none";
                document.getElementById("success").style.display = "block";
                document.getElementById("success").style.color = "white";
                paidoutputresult.innerHTML = paidamount;
            }
            return dueresult;
        }

        function checkDueResult(dueamount){
            //logic for due amount 
            if(dueamount.innerHTML === "" || dueamount.innerHTML === null){
                return dueresult = (totalamount - paidvalue);
            }
            else{
                return dueresult -= paidvalue;
            }
        }
    }
};