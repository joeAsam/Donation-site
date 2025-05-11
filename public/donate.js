document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.amount-btn').forEach(b => {
            b.classList.remove('amount-btn.active');
        });

        btn.classList.add('amount-btn.active');

        const amount = btn.dataset.amount;
        document.getElementById('customAmount').value = amount;

        btn.addEventListener('click', () => {
            console.log('Button clicked', btn.dataset.amount);
        })
    });
});

document.getElementById('donateBtn').addEventListener('click', function (e) {
    e.preventDefault();

    const selectedAmount =
        document.querySelector('.amount-btn-active')?.dataset.amount ||
        document.getElementById('customAmount').value;

    if (!selectedAmount || Number(selectedAmount) <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-44ae5bba6e2cb2fe7e1a1bd200efac99-X", // 🔁 Replace this
        tx_ref: "donation-" + Date.now(),
        amount: Number(selectedAmount),
        currency: "USD",
        payment_options: "card, paypal, banktransfer",
        customer: {
            email: "donor@example.com", // Replace or fetch dynamically
            name: "Donor"
        },
        callback: function (response) {
            console.log("Payment successful:", response);
            window.location.href = "/success.html";
        },
        onclose: function () {
            alert("Payment window closed.");
        },
        customizations: {
            title: "Asam Donations",
            description: "Support for communities in need",
            logo: "https://yourdomain.com/logo.png" // Replace with your logo URL
        }
    });
});


// crypto
document.getElementById('cryptoDonateBtn').addEventListener('click', async() => {
    const customAmount = document.getElementById("customAmount").value;
    const amoint = parseFloat(customAmount);

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    try {
        const res = await fetch("/create-nowpayments-charge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount }),
        });

        const data = await res.json();

        if (res.ok && data.invoiceUrl) {
            window.location.href = data.invoiceUrl;
        } else{
            console.error(data);
            alert("Couldn't initialize crypto payment. Try again.")
        }
    } catch (err) {
        console.error(err);
        alert("Error initializing payment.");
    }
});