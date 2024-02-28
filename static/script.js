isdone=false;
username=null;
getUsername()

console.log(apitoken)


document.addEventListener('mousemove', (e) => {
    if (username == "") {
        document.getElementById("usern").hidden = false
        document.getElementById("lockin").hidden = false
    } else {
        document.getElementById("usern").disabled = true
        document.getElementById("usern").value = username;
        document.getElementById("lockin").hidden = true
    }
    // Get the mouse position
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    // Calculate the new background position based on mouse position
    const newPositionX = 50 + mouseX * 40; // Adjust the multiplier as needed
    const newPositionY = 50 + mouseY * 10; // Adjust the multiplier as needed

    // Apply the new background position
    document.body.style.backgroundPosition = `${newPositionX}% ${newPositionY}%`;
  });

  document.addEventListener('DOMContentLoaded', function () {
    var isDone = false; // Ensure this variable is defined
    document.getElementById('kk').addEventListener('submit', function (event) {
        document.getElementById('backtohome').hidden=false;
        event.preventDefault();
        document.getElementById('loadinggif').hidden = false;
        submitForm();
        if (!isDone) {
            // Get the form
            var form = document.getElementById('kk');

            // Calculate new position and size based on percentage of window size
            var newTop = window.innerHeight * 0.38; // 38% from the top
            var newLeft = window.innerWidth * 0.12; // 12% from the left

    

            // Use CSS transitions for animation
            form.style.transition = 'top 1s, left 1s, width 1s';

            // Apply new styles
            form.style.top = newTop + 'px';
            form.style.left = newLeft + 'px';

            isDone = true;
        }
    });

    // Update form position and size when the window is resized
    window.addEventListener('resize', function () {
        if (isDone) {
            // Recalculate new position and size based on percentage of window size
            var newTop = window.innerHeight * 0.38; // 38% from the top
            var newLeft = window.innerWidth * 0.12; // 12% from the left


            // Apply new styles
            document.getElementById('kk').style.top = newTop + 'px';
            document.getElementById('kk').style.left = newLeft + 'px';
        }
    });
});


function submitForm() {
    var form = document.getElementById('kk');
    var formData = new FormData(form);

    fetch('/leetify', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data here
        console.log(data);

        // Update the image source
        if (data.plot_url) {
            document.getElementById('plotimg').hidden = false
            document.getElementById('plotimg').src = data.plot_url;
            document.getElementById('plotimg').alt = "error ig"
            document.getElementById('share').hidden = false
            changeBackground()
        }

        // You can hide the loading gif or perform any other actions
        document.getElementById('loadinggif').hidden = true;
    })
    .catch(error => {
        console.error('Error:', error);

        // Handle errors, hide loading gif or perform other actions
        document.getElementById('loadinggif').hidden = true;
    });
}

function changeBackground() {
    var body = document.body;
  
    // Check if the current background is an image
    var isImage = body.style.backgroundImage !== 'none';
  
    // Toggle between image and color
    if (isImage) {
      body.style.transition = 'background-color 1s ease';
      body.style.backgroundImage = 'none'; // Remove background image
      body.style.backgroundColor = '#161f2e'; // Set background color
    } else {
      body.style.transition = 'background-image 1s ease';
      body.style.backgroundImage = 'url("plotimg")'; // Set background image
      body.style.backgroundColor = ''; // Remove background color
    }
  }

  function addPost(postContent) {
    console.log(postContent)
    // Make a POST request to the server to add a new post
    fetch("/add_post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            postcontent: postContent,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Log the server response (for demonstration purposes)
        console.log(data);

        // Fetch posts again to update the HTML with the new post
        fetchPosts();
    })
    .catch(error => console.error('Error adding post:', error));
}


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function lockUsername() {
    usernamel = document.getElementById("usern").value;
    if (usernamel) {
        fetch(`/lockname?usern=${encodeURIComponent(usernamel)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(handleErrors)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if(data.message == "success") {
                username=usernamel
                document.getElementById("usern").disabled = true
                document.getElementById("usern").value = usernamel;
                document.getElementById("lockin").hidden = true
            }
        })
        .catch(error => {
            console.error('Error locking username:', error);
        });
    }
}

function getUsername() {
    fetch('/getname', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(data => {
        username = data.username
    })
    .catch(error => {
        console.error('Error getting username:', error);
        return null
    });
}