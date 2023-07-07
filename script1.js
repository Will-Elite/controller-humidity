// xử lý phần cài đặt độ ẩm

// var smallerSetting = 30;
// var biggerSetting = 50;


// var textElementSetup = document.getElementById("humidity-textSetup");
// textElementSetup.textContent = "Độ ẩm từ "  + smallerSetting + " đến " + biggerSetting;

function updateHumidityIcon(humidity1) {
    var iconElement = document.getElementById("humidity-icon");
    var textElement = document.getElementById("humidity-text");

    if (humidity1 < smallerSetting) {
        iconElement.style.backgroundColor = "green";
        textElement.textContent = "Độ ẩm nhỏ hơn " + smallerSetting;
        sendRequest('ON');
    } else if (humidity1 > biggerSetting) {
        iconElement.style.backgroundColor = "red";
        textElement.textContent ="Độ ẩm lớn hơn " + biggerSetting;
        sendRequest('OFF');
    } else {
        iconElement.style.backgroundColor = "yellow";

        if (isNaN(smallerSetting) || isNaN(biggerSetting)) {
           
            textElement.textContent = "Độ ẩm từ không có giá trị cài đặt!";
        } else {
           
            textElement.textContent = "Độ ẩm từ "  + smallerSetting + " đến " + biggerSetting;
        }
        
    } 
}

function updateHumiditySettings() {
   
    smallerSetting = parseInt(document.getElementById("smaller-input").value);
    biggerSetting = parseInt(document.getElementById("bigger-input").value);

    // Gọi hàm updateHumidityIcon với giá trị độ ẩm hiện tại (ở đây dùng giá trị mặt định là 45)
    // updateHumidityIcon(humidity);

    var textElementSetup = document.getElementById("humidity-textSetup");
    // textElementSetup.textContent = "Độ ẩm từ " + smallerSetting + " đến " + "50";

    if (isNaN(smallerSetting) || isNaN(biggerSetting)) {
        // Xử lý khi giá trị không hợp lệ
        textElementSetup.textContent = "Bạn chưa nhập giá trị cài đặt để thiết bị hoạt động!";
        console.log("Giá trị không hợp lệ!");
    } else {
        textElementSetup.textContent = "Độ ẩm từ " + smallerSetting + " đến " + biggerSetting;
        // Xử lý khi giá trị hợp lệ
        console.log("Giá trị hợp lệ!");
    }
    
    var textWarningSetup = document.getElementById("warning-setup");
    if ( smallerSetting < biggerSetting) {
        
        textWarningSetup.textContent = "Bạn đã nhập đúng. Xin cảm ơn!";
    } else if ( smallerSetting >= biggerSetting) {
       
        textWarningSetup.textContent = "Bạn đã nhập sai. Mời nhập lại!";
    } else {
        textWarningSetup.textContent = "Bạn chưa có nhập, thiết bị sẽ không hoạt động!";
    }
}



function sendRequest(status) {
    const url = `http://172.20.10.11/?may=${status}`;

    fetch(url)
    .then(response => response.text())
    .then(data1 => {
        displayDataDevice(data1);
        // Xử lý dữ liệu ở đây (nếu cần)
    })
    .catch(error => {
        console.error('Yêu cầu thất bại. Lỗi:', error);
    });
}

function displayDataDevice (dataStatus) {
    var dataStatusDevice = document.getElementById('dataContainer-statusDevice');
    dataStatusDevice.textContent = dataStatus;
}




function displayData (data2) {
    var dataContainer = document.getElementById('dataContainer-statusWork');
    if (data2 === null) {
        dataContainer.textContent = "Device have not power";
    } else {
        dataContainer.textContent = "Device working";
    }
    
}

// Cập nhật hàm dữ liệu sau mỗi 10 giây
function updateData() {
    const initiaUrl = 'http://172.20.10.11';

    fetch(initiaUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data3 => {
        displayData(data3);
        // Xử lý dữ liệu ở đây (nếu cần)
    })
    .catch(error => {
        console.error('Yêu cẩu thất bại. Lỗi:', error);
        displayData(null); // Hiển thị thông báo "Device has not power"
    });

    fetch(initiaUrl)
    .then(response => response.text())
    .then(data1 => {
        displayDataDevice(data1);
        // Xử lý dữ liệu ở đây (nếu cần)
    })
    .catch(error => {
        console.error('Yêu cầu thất bại. Lỗi:', error);
    });
    
}


// Gọi hàm updateData ban đầu
updateData();

// Cập nhật dữ liệu tự động sau mỗi 20 giây
setInterval(updateData, 10000);

