/* ===========================================================
   Silver Studios Website
   script.js

   Handles:
   - Page animations
   - Contact form behaviour
   - Navigation improvements
=========================================================== */


/* ===========================
   Page Loaded Animation
=========================== */

document.addEventListener("DOMContentLoaded", () => {


    const sections = document.querySelectorAll(".section");


    sections.forEach(section => {

        section.classList.add("fade");

    });


});



/* ===========================
   Contact Form
=========================== */

const contactForm = document.querySelector(".contact-form");


if(contactForm){


    contactForm.addEventListener("submit", (event) => {


        event.preventDefault();


        /*
            GitHub Pages cannot send emails directly.

            Replace this section later with:
            - Formspree
            - EmailJS
            - Web3Forms
            - Your own API
        */


        alert(
            "Thanks for contacting us! We will get back to you soon."
        );


        contactForm.reset();


    });


}



/* ===========================
   Smooth Page Navigation
=========================== */

const links = document.querySelectorAll("a");


links.forEach(link => {


    link.addEventListener("click", function(event){


        const destination = this.getAttribute("href");


        /*
            Only animate internal page links.
            Ignore external links and buttons.
        */


        if(
            destination &&
            destination.endsWith(".html")
        ){

            document.body.style.opacity = "0";


            setTimeout(() => {

                window.location.href = destination;

            }, 150);


        }


    });


});



/* ===========================
   Scroll Reveal
=========================== */

const revealElements = document.querySelectorAll(
    ".card, .project-card"
);



const observer = new IntersectionObserver(
    entries => {


        entries.forEach(entry => {


            if(entry.isIntersecting){


                entry.target.classList.add("fade");


                observer.unobserve(
                    entry.target
                );


            }


        });


    },
    {
        threshold:0.15
    }

);



revealElements.forEach(element => {


    observer.observe(element);


});



/* ===========================
   Current Year Footer
=========================== */

const yearElements = document.querySelectorAll(
    "footer p:first-child"
);


yearElements.forEach(element => {


    element.innerHTML =
        "© " +
        new Date().getFullYear() +
        " Silver Studios";


});

/* ===========================
   Load Projects
=========================== */


const projectContainer =
    document.getElementById("project-container");


if(projectContainer){


    fetch("data/projects.json")

    .then(response => response.json())

    .then(data => {


        data.projects.forEach(project => {


            const card = document.createElement("div");


            card.className = "project-card";


            card.innerHTML = `

                <img 
                    src="${project.image}"
                    alt="${project.title}"
                >


                <div class="project-content">

                    <h3>
                        ${project.title}
                    </h3>


                    <p>
                        ${project.description}
                    </p>


                    <a 
                        class="button"
                        href="${project.link}"
                    >
                        View Project
                    </a>

                </div>

            `;


            projectContainer.appendChild(card);


        });


    })

    .catch(error => {

        console.error(
            "Could not load projects:",
            error
        );

    });


}
