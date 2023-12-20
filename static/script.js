function subscribe_open(email_address) {
    document.getElementById("dark-area").style.width = "100%";
    document.getElementById("subscribe_email").value = email_address;
    
    if (document.getElementById("filter")) {
        document.getElementById("subscribe_location").value = document.getElementById("filter_location").value;
        document.getElementById("subscribe_experience_level").innerHTML = document.getElementById("filter_experience_level").innerHTML;
        document.getElementById("subscribe_invisible_level").value = document.getElementById("filter_experience_level").innerHTML;
        document.getElementById("subscribe_invisible_checkbox").value = document.getElementById("filter_invisible_checkbox").value;

        if(document.getElementById("filter_invisible_checkbox").checked == true){
            document.getElementById('subscribe_invisible_checkbox').checked = true;
            document.getElementById('subscribe_remote_checkbox').style.backgroundColor = "var(--green-2)";
        }else{
            document.getElementById('subscribe_invisible_checkbox').checked = false;
            document.getElementById('subscribe_remote_checkbox').style.backgroundColor = "var(--white)";
        }
    }
}

function subscribe_close(){
    document.getElementById("dark-area").style.width = "0%";
}

function focus_subscribe_email(){
    document.getElementById("subscribe_email").focus();
}

function focus_subscribe_location(){
    document.getElementById("subscribe_location").focus();
}

subscribe_level_dropdown = 0;
function toggle_subscribe_level(){
    if(subscribe_level_dropdown == 0){
        subscribe_level_dropdown = 1;
        document.getElementById('subscribe_level_dropdown').style.visibility = 'visible';
        document.getElementById('subscribe_level_dropdown').style.opacity = '1';
    }else{
        subscribe_level_dropdown = 0;
        document.getElementById('subscribe_level_dropdown').style.visibility = 'hidden';
        document.getElementById('subscribe_level_dropdown').style.opacity = '0';
    }
}

function open_subscribe_level(){
    if(subscribe_level_dropdown == 0){
        subscribe_level_dropdown = 1;
        document.getElementById('subscribe_level_dropdown').style.visibility = 'visible';
        document.getElementById('subscribe_level_dropdown').style.opacity = '1';
    }
}

function close_subscribe_level(){
    if(subscribe_level_dropdown == 1){
        subscribe_level_dropdown = 0;
        document.getElementById('subscribe_level_dropdown').style.visibility = 'hidden';
        document.getElementById('subscribe_level_dropdown').style.opacity = '0';
    }
}

function subscribe_level_check(item_name){
    document.getElementById('subscribe_experience_level').innerHTML = item_name;
    document.getElementById("subscribe_invisible_level").value = item_name;
}

function subscribe_remote_switch(){
    if(document.getElementById('subscribe_invisible_checkbox').checked == true){
        document.getElementById('subscribe_remote_checkbox').style.backgroundColor = "var(--white)";
        document.getElementById('subscribe_invisible_checkbox').checked = false;
    }else{
        document.getElementById('subscribe_remote_checkbox').style.backgroundColor = "var(--green-2)";
        document.getElementById('subscribe_invisible_checkbox').checked = true;
    }
}

function focus_side_subscribe_email(){
    document.getElementById("side_subscribe_email").focus();
}

function focus_bottom_subscribe_email(){
    document.getElementById("bottom_subscribe_email").focus();
}

function focus_filter_location(){
    document.getElementById("filter_location").focus();
}

function focus_filter_company(){
    document.getElementById("filter_company").focus();
}

level_dropdown = 0;
function toggle_level(){
    if(level_dropdown == 0){
        level_dropdown = 1;
        document.getElementById('level_dropdown').style.visibility = 'visible';
        document.getElementById('level_dropdown').style.opacity = '1';
    }else{
        level_dropdown = 0;
        document.getElementById('level_dropdown').style.visibility = 'hidden';
        document.getElementById('level_dropdown').style.opacity = '0';
    }
}

function open_level(){
    if(level_dropdown == 0){
        level_dropdown = 1;
        document.getElementById('level_dropdown').style.visibility = 'visible';
        document.getElementById('level_dropdown').style.opacity = '1';
    }
}

function close_level(){
    if(level_dropdown == 1){
        level_dropdown = 0;
        document.getElementById('level_dropdown').style.visibility = 'hidden';
        document.getElementById('level_dropdown').style.opacity = '0';
    }
}

function filter_level_check(item_name){
    document.getElementById('filter_experience_level').innerHTML = item_name;
}

filter_invisible_checkbox = document.getElementById('filter_invisible_checkbox');
filter_check_box = document.getElementById('filter_remote_checkbox');
if(filter_invisible_checkbox.checked == true){
    filter_check_box.style.backgroundColor = "var(--green-2)";
}

function filter_remote_switch(){
    if(filter_invisible_checkbox.checked == true){
        filter_check_box.style.backgroundColor = "var(--white)";
        filter_invisible_checkbox.checked = false;
    }else{
        filter_check_box.style.backgroundColor = "var(--green-2)";
        filter_invisible_checkbox.checked = true;
    }
}

function apply_filter(){
    filter_remote = '';
    if(document.getElementById("filter_invisible_checkbox").checked == true){
        filter_remote = "Remote-";
    }

    filter_experience = '';
    if(document.getElementById("filter_experience_level").innerHTML != 'All Level' && document.getElementById("filter_experience_level").innerHTML != 'Experience Level'){
        filter_experience = document.getElementById("filter_experience_level").innerHTML;
        filter_experience = filter_experience.replaceAll(' ','-');
        filter_experience = filter_experience + '-';
    }

    filter_location = '';
    if(document.getElementById("filter_location").value){
        filter_location = document.getElementById("filter_location").value;
        filter_location = filter_location.replaceAll(' ','-');
        filter_location = filter_location.replaceAll('ç','c');
        filter_location = filter_location.replaceAll('Ç','C');
        filter_location = filter_location.replaceAll('ğ','g');
        filter_location = filter_location.replaceAll('Ğ','G');
        filter_location = filter_location.replaceAll('ı','i');
        filter_location = filter_location.replaceAll('İ','I');
        filter_location = filter_location.replaceAll('ö','o');
        filter_location = filter_location.replaceAll('Ö','O');
        filter_location = filter_location.replaceAll('ş','s');
        filter_location = filter_location.replaceAll('Ş','S');
        filter_location = filter_location.replaceAll('ü','u');
        filter_location = filter_location.replaceAll('Ü','U');
        filter_location = '-in-' + filter_location;
    }

    filter_company = '';
    if(document.getElementById("filter_company").value){
        filter_company = document.getElementById("filter_company").value;
        filter_company = filter_company.replaceAll(' ','-');
        filter_company = filter_company.replaceAll('ç','c');
        filter_company = filter_company.replaceAll('Ç','C');
        filter_company = filter_company.replaceAll('ğ','g');
        filter_company = filter_company.replaceAll('Ğ','G');
        filter_company = filter_company.replaceAll('ı','i');
        filter_company = filter_company.replaceAll('İ','I');
        filter_company = filter_company.replaceAll('ö','o');
        filter_company = filter_company.replaceAll('Ö','O');
        filter_company = filter_company.replaceAll('ş','s');
        filter_company = filter_company.replaceAll('Ş','S');
        filter_company = filter_company.replaceAll('ü','u');
        filter_company = filter_company.replaceAll('Ü','U');
        // filter_company = '/' + filter_company;
        filter_company = '?company=' + filter_company;
    }

    window.location.href = '/' + filter_remote + filter_experience + 'Customer-Success-Jobs' + filter_location + filter_company;
}

function close_alert(){
    document.getElementById('alert').remove();
}