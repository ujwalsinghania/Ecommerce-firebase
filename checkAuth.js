
function shopkeeper() {
    $("#shop_button").css('visibility', 'visible')
        .click( function () {
            window.location.replace("shopkeeper.html") ;
        })
}

function customer() {
    $("#cust_button").css('visibility', 'visible')
        .click(function () {
            window.location.replace("customer.html") ;
        })
}

function delivery(){
    $("#delivery_button").css('visibility', 'visible')
        .click(function () {
            window.location.replace("delivery.html") ;
        })
}

function check(){
    auth.onAuthStateChanged(function (user){
        if(user) {
            const id = user.uid;
            localStorage.setItem("current_user", id);
            var role = localStorage.getItem("role");
            if (role == "Shopkeeper") {
                db.collection("stores").doc(id).get().then(function (doc) {
                    if ((doc.data().role) == "Shopkeeper") {
                        shopkeeper();
                    }
                });
            }
            if (role == "Delivery") {
                db.collection("delivery").doc(id).get().then(function (doc) {
                    if ((doc.data().role) == "Delivery") {
                        delivery();
                    }
                });
            }
            if (role == "Customer") {
                db.collection("Customer").doc(id).get().then(function (doc) {
                    if ((doc.data().role) == "Customer") {
                        customer();
                    }
                });
            }


            $("#login").css('visibility', 'hidden');
            $("#logout").css('visibility', 'visible').click(function () {
                auth.signOut().then(function () {
                    // Sign-out successful.
                }).catch(function (error) {
                    alert(error);
                });
            });
        }
        else{
            //window.location.replace("SignUp.html");
            console.log("no user") ;
        }
    });
}