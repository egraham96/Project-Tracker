var myModal = $("#myModal")
var projectFormEl = $('#project-form');
var projectNameVal = $("#project-name-input");
var projectTypeVal = $("#project-type-input");
var projectRateVal = $("#hourly-rate-input");
var projectDueDateVal = $("#due-date-input")
var errorMessage=$("#errormessage")
var tableBody = $("#table-body")
var newrowNum = +0
var deletemeButtons=$('.deleteme')


function handleformSubmit(event) {
    event.preventDefault()
    var projectName = projectNameVal.val().trim();
    var projectType = projectTypeVal.val().trim();
    var projectRate = projectRateVal.val().trim();
    var projectDueDate = projectDueDateVal.val().trim();
    if ((moment(projectDueDate, 'MM/DD/YYYY').diff(moment(), 'days') +1 > 0)) {
        printTable(projectName, projectType, projectRate, projectDueDate)
        projectFormEl[0].reset();
    }
    else {
        errorMessage.text("Past Due Dates are not Accepted")
        
     }
}



function printTable(pName, pType, pRate, pdueDate) {
    var daysToDate = (moment(pdueDate, 'MM/DD/YYYY').diff(moment(), 'days') + 1)
    var total = daysToDate * (parseInt(pRate) * 8)
    var tableRow = $('<tr>')
    var projectNum = $('<td>').text(newrowNum)
    var projectName = $('<td>').text(pName)
    var projectType = $('<td>').text(pType)
    var projectRate = $('<td>').text(pRate)
    var projectdueDate = $('<td>').text(pdueDate)
    var projectdaysUntil = $('<td>').text(daysToDate)
    var projectTotal = $('<td>').text("$ " + total)
    var deleteMe =$('<td>')
    deleteButton=$('<button> Delete </button>')
    deleteButton.attr("class", "deleteme")
    deleteMe.append(deleteButton)
    tableRow.append(
        projectNum,
        projectName,
        projectType,
        projectRate,
        projectdueDate,
        projectdaysUntil,
        projectTotal,
        deleteMe
    )
    tableBody.append(tableRow)
    myModal.modal('hide')
    newrowNum++
}


function deleteProject(event){
    var btnClicked=$(event.target)
    btnClicked.parent().parent().remove()
}


function setTime() {
    var timeDate = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    $("#timeanddate").text(timeDate)
}












tableBody.on('click', '.deleteme', deleteProject)

projectFormEl.on('submit', handleformSubmit)
setInterval(setTime, 1000);