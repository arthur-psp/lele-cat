import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)


function smellingBallController() {
    
    // O ScrollSmoother PRECISA ser criado antes de qualquer ScrollTrigger com pin
    // (requisito documentado do GSAP: "create the scrollSmoother before your
    // scrollTriggers"). Por isso ele é exposto como passo separado e chamado
    // primeiro no onMounted — antes do pin do hero (initVideoScrollScrub).
    const createSmoother = () => {
        ScrollSmoother.create({
            smooth: 1,
            effects: true,
        })
    }

    const initSmellingBallScroll = () => {
        const title = document.querySelector('#title')
        let titleST = SplitText.create(title, { type: "words" });
        const subtitle = document.querySelector('#subtitle')
        let subtitleST = SplitText.create(subtitle, { type: "lines" });

        gsap.from(titleST.words, {
            duration: 1,
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            duration: 0.7, 
            ease: "back",
            stagger: 0.100
        });

        gsap.from(subtitleST.lines, {
           rotationX: -100,
            transformOrigin: "50% 50% -160px",
            opacity: 0,
            duration: 0.8, 
            ease: "power3",
            stagger: 0.25
        });

        
        // gsap.to(box1, {
        //   scrollTrigger: {
        //     markers: true,
        //     trigger: box1,
        //     pin: true, // pin the trigger element while active
        //     start: "top top", // when the top of the trigger hits the top of the viewport
        //     end: "+=500", // end after scrolling 500px beyond the start
        //     scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        //     snap: {
        //     snapTo: "labels", // snap to the closest label in the timeline
        //     duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        //     delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
        //     ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
        //     },
        //   },
        // });

   

        const lavanda = document.getElementById('lavanda')
        const lavandaChip = document.getElementById('lavanda-chip')
        const hortela = document.getElementById('hortela')
        const hortelaChip = document.getElementById('hortela-chip')
        const talco = document.getElementById('talco')
        const talcoChip = document.getElementById('talco-chip')
        const limao = document.getElementById('limao')
        const limaoChip = document.getElementById('limao-chip')
        gsap.from(lavanda, {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "elastic.out",
            scrollTrigger: {
                trigger: lavandaChip,
                start: "top 80%",
            }
        })
        gsap.from(hortela, {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out",
            scrollTrigger: {
                trigger: hortela,
                start: "top 50%",
            }
        })
        gsap.from(talco, {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "elastic.out",
            scrollTrigger: {
                trigger: talcoChip,
                start: "top 30%",
            }
        })
        gsap.from(limao, {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out",
            scrollTrigger: {
                trigger: limaoChip,
                start: "top 10%",
                
            }
        })

        const legend = document.getElementById('legend')
        let legendST = SplitText.create(legend, { type: "words" });
        gsap.from(legendST.words, {
            duration: 1,
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            ease: "back",
            stagger: 0.1,
            scrollTrigger: {
                trigger: legend,
                start: "center center",
                
            }
        })

        const catImage = document.getElementById('cat-image')
        gsap.from(catImage, {
            x: 200,
            opacity: 0,
            duration: 2,
            ease: "elastic.inOut",
            scrollTrigger: {
                trigger: catImage,
                start: "top top",
            }
        })

        const photoAllProduct = document.getElementById('all-product')
        gsap.from(photoAllProduct, {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.in",
            scrollTrigger: {
                trigger: photoAllProduct,
                start: "top 80%",
            }
        })

        const offerCard = document.getElementById('offer-card')
        gsap.from(offerCard, {
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.in",
            scrollTrigger: {
                trigger: offerCard,
                start: "top 80%",
            }
        })

        

        return null
    }

    return {
        controller: {
            createSmoother,
            initSmellingBallScroll,
        }
    }
}

export { smellingBallController }