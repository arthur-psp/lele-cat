import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)


function smellingBallController() {
    
    const initSmellingBallScroll = () => {
        ScrollSmoother.create({
            smooth: 1,
	        effects: true,
        })

        const products = document.getElementById('products')
        gsap.from(products, { 
            duration: 2,
            y: -200, 
            ease: "bounce.out",
            duration: 2,
            rotate: "10"
        })
        
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

        const box1 = document.getElementById('box1')
        const box2 = document.getElementById('box2')
        const box3 = document.getElementById('box3')
        const box4 = document.getElementById('box4')
        gsap.from(box1, { 
           y: -100,
            opacity: 0,
            duration: 3,
            ease: "elastic.out",
            scrollTrigger: {
                trigger: box1,
                start: "top top",
            }
        })
        gsap.from(box3, { 
           y: -100,
            opacity: 0,
            duration: 3,
            ease: "elastic.out",
            scrollTrigger: {
                trigger: box3,
                start: "top top",
            }
        })
        gsap.from(box2, { 
           y: -100,
            opacity: 0,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: box2,
                start: "top top",
            }
        })
        gsap.from(box4, { 
           y: -100,
            opacity: 0,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: box4,
                start: "top top",
            }
        })
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
                start: "top 40%",
            }
        })

        const photoAllProduct = document.getElementById('all-product')
        gsap.from(photoAllProduct, {
            
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

        const frag = document.getElementById('frag')
        let fragST = SplitText.create(frag, { type: "words" });
        const dec = document.getElementById('dec')
        let decST = SplitText.create(dec, { type: "words" });
        const duration = document.getElementById('duration')
        let durationST = SplitText.create(duration, { type: "words" });
        const natural = document.getElementById('natural')
        let naturalST = SplitText.create(natural, { type: "words" });

        gsap.from(fragST.words, {
            duration: 1,
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            ease: "back",
            stagger: 0.1,
            scrollTrigger: {
                trigger: frag,
                start: "top 80%"
            }
        });
        gsap.from(decST.words, {
            duration: 1,
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            ease: "back",
            stagger: 0.1,
            scrollTrigger: {
                trigger: frag,
                start: "top 70%"
            }
        });
        gsap.from(durationST.words, {
            duration: 1,
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            ease: "back",
            stagger: 0.1,
            scrollTrigger: {
                trigger: frag,
                start: "top 60%"
            }
        });
        gsap.from(naturalST.words, {
            duration: 1,
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            ease: "back",
            stagger: 0.1,
            scrollTrigger: {
                trigger: frag,
                start: "top 50%"
            }
        });

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

        return null
    }

    return {
        controller: {
            initSmellingBallScroll,
        }
    }
}

export { smellingBallController }