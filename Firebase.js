// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getDatabase, ref, set, child, get, onValue } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app"s Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA18yH_4l7o0rEiNJe1Ybk0wlG9A1H15fU",
    authDomain: "doaniot-39e9c.firebaseapp.com",
    databaseURL: "https://doaniot-39e9c-default-rtdb.firebaseio.com",
    projectId: "doaniot-39e9c",
    storageBucket: "doaniot-39e9c.appspot.com",
    messagingSenderId: "977342964680",
    appId: "1:977342964680:web:518da215ac262fa7b896fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// Danh sách địa chỉ firebase và id
let Address_FB = [];
Address_FB[0] = "pH_min";
Address_FB[1] = "pH_max";
Address_FB[2] = "Temp_min";
Address_FB[3] = "Temp_max";
Address_FB[4] = "LW_min";
Address_FB[5] = "LW_max";
Address_FB[6] = 'PTime_1';
Address_FB[7] = 'PTime_2';
Address_FB[8] = 'PTime_3';
Address_FB[9] = 'PTime_4';
Address_FB[10] = 'Tperiod';
Address_FB[11] = 'Tperiod_t';
Address_FB[12] = 'Mode_Ctrl';

Address_FB[13] = 'RTime_1';
Address_FB[14] = 'RTime_2';
Address_FB[15] = 'RTime_3';
Address_FB[16] = 'RTime_4';

function Sends(S, V, mode) {
    // if (mode == 1) { Number = toString(V); }
    // else { Number = parseFloat(V); }
    const db = getDatabase();
    set(ref(db, 'Setting/' + S), {
        Value: V
    });
}

// Tự động cập nhật giá trị
// const db = getDatabase();
// const starCountRef = ref(db, 'Setting/pH_min/Value');
// onValue(starCountRef, (snapshot) => {
//     const data = snapshot.val();
//     document.getElementById('pH_min').value = data;
// });

Bt_Save.addEventListener("click", (e) => {
    // Sends("Number", document.getElementById("Number").value);
    for (let i = 0; i < Address_FB.length; i++) {
        var val = document.getElementById(Address_FB[i]).value;
        if (i > 12) Sends(Address_FB[i], val, 1);
        else Sends(Address_FB[i], val, 0);
        console.log("Đã upload lên " + Address_FB[i] + ": " + val);
    }
});

Bt_Reload.addEventListener("click", (e) => {
    for (let i = 0; i < Address_FB.length; i++) {
        let D = Address_FB[i];
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'Setting/' + D + "/Value")).then((snapshot) => {
            if (snapshot.exists()) {
                document.getElementById(D).value = snapshot.val();
                console.log("Nhận: " + snapshot.val());
                // document.getElementById("val").innerHTML = "Number = " + snapshot.val();
                // document.getElementById("pH_min").value = snapshot.val();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        // console.log("Đã nhận từ " + Address_FB[i] + ": " + M);
    }

});

    // // Doc pH
    // const ref_pH = ref(db, "Setting" + "/pH_min");
    // onValue(ref_pH, (snapshot) => {
    //     ph_min = snapshot.val();
    //     document.getElementById("").innerHTML = "pH: min" + ph_min;
    // });