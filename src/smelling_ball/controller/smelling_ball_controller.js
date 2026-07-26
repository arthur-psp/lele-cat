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
        gsap.from([box1, box2, box3, box4], { 
            duration: 2,
            ease: "circ",
            duration: 2,
            rotate: "100",
            scrollTrigger: {
                trigger: box1,
                start: "clamp(center, center)",
            }
        })

        const fin = document.getElementById('finality')
        const legend = document.getElementById('legend')
        let legendST = SplitText.create(subtitle, { type: "words" });
        gsap.from(fin, {
            delay: 1,
            duration: 1.9,
            
            scrollTrigger: {
                trigger: fin,
                start: "clamp(center, center)",        
                pin: fin,
                pinSpacing: false,
                
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