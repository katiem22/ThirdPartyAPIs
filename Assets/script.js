//Created a variable for moment
var now = moment();
//Created a variable for current date
var currentDate = now.format("MM DD YYYY");

// Set the current date 
$("#currentDay").text("Today's Date: " + currentDate);



$(document).ready(function() {

    // Created a for loop to get and display items from local storage
    hourArr = $('.hour').toArray();
    for (i = 0; i < hourArr.length; i++) {
        $(hourArr[i]).siblings('textarea').text(localStorage.getItem($(hourArr[i]).attr('data-time')));
    }
});


// Created a for loop for rows with timeblocks, taskblocks, and save buttons
for (i = 0; i < 9; i++) {
    //created a variable for the row
    var rowBlock = $('<div>').addClass('row');
    //created a variable for the time block
    var timeBlock = $('<div>').addClass('hour col-md-2').text(moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
    timeBlock.attr('data-time', moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
    //created a variable for the taskblock
    var taskBlock = $('<textarea>').addClass('col-md-9');
    //created a variable for the save block
    var saveButton = $('<button>').addClass('saveBtn col-md-1').html('<i class="fas fa-save"></i>');

    
    //append the container with the row
    $('.container').append(rowBlock);
    //append the row with the time block
    $(rowBlock).append(timeBlock);
    //after the timeblock display the task block
    $(timeBlock).after(taskBlock);
    //after the taskblock display the save button
    $(taskBlock).after(saveButton);


    // Created if else statement to determine the color of the row
    //if the time is the same as the time on the timeblock, display task block in red color
    if (now.isSame(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(taskBlock).addClass('present');
        //if the time is in the future, display in green color
    } else if (now.isBefore(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(taskBlock).addClass('future');
        //if the time is in the past, display in grey color
    } else if (now.isAfter(moment('9:00 AM', 'hh:mm A').add(i, 'hours'), 'hour')) {
        $(taskBlock).addClass('past');
    }
}

// Save click events to be able to store data in local storage
$('.saveBtn').on('click', function() {

    localStorage.setItem($(this).siblings('div.hour').attr('data-time'), $(this).siblings('textarea').val())
});
