const runScripts = () => {



    const navToggle = document.querySelector(".nav-toggle")

    navToggle.addEventListener('click', (e) => {
      e.preventDefault()
      navToggle.classList.toggle('is-active')    
    })
    
    $('.nav-button').on('click', function() {
    $('nav').toggleClass('open')
      
    })
    
    document.addEventListener("touchstart", function(){}, true);
    

    //scroll to top

    $("a[href='#top']").on("click", function () {
        document.body.scrollIntoView({ block: "start", behavior: "smooth" })
        return false
    })



    const scrollLinks = document.querySelectorAll('.js-scroll')

    scrollLinks.forEach(link => {
      // addEventListener is just the same as jQuery’s .on()
      // we can listen for events on elements and then run a function
      link.addEventListener('click', event => {
        // using the event keyword we get access to a snapshot of what
        // happened when we clicked on our link
    
        // this is equivalent to return false in jQuery
        // it will block the default browser behaviour of the link jumping to
        // the href attribute
        event.preventDefault()
    
        // here we grab the href attribute from our link
        const href = link.getAttribute('href')
        console.log(href)
        // here we use the new  scrollIntoView feature to scroll to
        // our desired element in a smooth fashion
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        })
      })
    })




    const sections = document.querySelectorAll('section')
    document.addEventListener('scroll', function () {
        const topViewport = window.pageYOffset
        const midViewport = topViewport + (window.innerHeight / 2)

        sections.forEach(section => {
            const midSection = section.offsetTop + (section.offsetHeight / 2)
            const distanceToSection = midViewport - midSection

            const parallaxTags = section.querySelectorAll('[data-parallax]')

            parallaxTags.forEach(tag => {
                const ratio = parseFloat(tag.getAttribute('data-parallax'))
                const weightedDistance = distanceToSection * ratio

                tag.style.transform = `translate(0, ${weightedDistance}px)`
            })
        })
    })







    const imageHolders = document.querySelectorAll(".image-up")


    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.1) {
                entry.target.classList.add("loaded")
            }
        })
    }, {
        threshold: [0, 0.1, 1]
    })

    imageHolders.forEach(holder => {
        observer.observe(holder)
    })


    inView('section')
        .on('enter', section => {
            // classList.add is the same as jQuery’s .addClass() method
            // but the vanilla javascript version
            section.classList.add('in-viewport')

        })



        .on('exit', section => {
            section.classList.remove('in-viewport')
        })


    // here we set the class to add only once we have scrolled 0.3 of 
    // our section into the viewport
    inView.threshold(0.3)

    //Pen-line animation
    inView('.waves')
        .on('enter', section => {
            const wavePath = document.querySelector('#wave path')
            const waveOffset = anime.setDashoffset(wavePath)

            wavePath.setAttribute('stroke-dashoffset', waveOffset)
            anime({
                targets: wavePath,
                strokeDashoffset: [0, waveOffset],
                duration: 5000,
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutSine',
            });

        })


        .on('exit', section => {
            section.classList.remove('in-viewport')
        })








    //Font "hello Stranger"
    const fontvarationhero = document.querySelector(".fontvarationhero")

    window.addEventListener("scroll", function () {
        const pixels = window.pageYOffset


        const wght = 100 + pixels * 2
        const wdth = 100 + pixels * 0.7

        if (fontvarationhero) {
            fontvarationhero.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`
        }

    })


    anime({
        targets: '#pen',
        translateY: -300,
        direction: 'alternate',
        duration: 50000,
        loop: true,
        easing: 'linear',
        rotate: '1turn',
        complete: 'randomValues'
    });


    const arrowPath = document.querySelector('#arrow path')
    const arrowOffset = anime.setDashoffset(arrowPath)

    arrowPath.setAttribute('stroke-dashoffset', arrowOffset)
    anime({
        targets: arrowPath,
        strokeDashoffset: [0, arrowOffset],
        duration: 3000,
        direction: 'normal',
        easing: 'easeInOutSine',
    });




}









runScripts()


/*
const bodyTag = document.querySelector("body")

const wiper = document.createElement("div")
wiper.classList.add("wiper")


const wiperHolder = document.createElement("div")
const wiperText = document.createElement("h2")
wiperText.innerHTML = "data-title"

wiperHolder.appendChild(wiperText)

wiper.appendChild(wiperHolder)

bodyTag.appendChild(wiper)

barba.use(barbaPrefetch)

barba.init({
    debug: true,
    transitions: [
        {

            leave({ current, next, trigger }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        defaults: {
                            duration: 1
                        },
                        onComplete() {
                            runScripts()
                            current.container.remove()
                            resolve()
                        }
                    })

                    const navigation = current.container.querySelectorAll(".top, .menu")
                    const sectionbarba = current.container.querySelectorAll("section")

                    timeline
                        .set(wiper, { x: "-100%" })
                        .set(wiperText, { y: "100%" })
                        .to(navigation, { opacity: 0 }, 0)
                        .to(sectionbarba, { x: 0, opacity: 0 }, { x: 500, opacity: 0 }, 0)
                        .to(wiper, { x: 0 })
                })
            },

            beforeEnter({ current, next, trigger }) {
                wiperText.innerHTML = next.container.getAttribute("data-title")

                window.scrollTo({
                    top: 0

                })


                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        onComplete() {
                            resolve()
                        }
                    })

                    timeline
                        .to(wiperText, { y: 0 }, 0)
                        .to(wiperText, { y: "100%" }, 1)

                })
            },

            enter({ current, next, trigger }) {
                return new Promise(resolve => {
                    const timeline = gsap.timeline({
                        onComplete() {
                            runScripts()
                            resolve()
                        }
                    })

                    const navigation = next.container.querySelectorAll(".top, .menu")
                    const sectionbarba = next.container.querySelectorAll("section")

                    timeline

                        .set(navigation, { opacity: 0 })
                        .set(sectionbarba, { opacity: 0.25, x: -500 })
                        .to(navigation, { opacity: 1 }, 0)
                        .to(sectionbarba, { opacity: 1, x: 0 }, 0)
                        .to(wiper, { x: "100%" }, 0)


                })
            }

        }
    ],
    views: []
})
*/