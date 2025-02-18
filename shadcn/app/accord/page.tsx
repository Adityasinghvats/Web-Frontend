import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  
  

function AccordPage() {
    const faqs = [
        {
            question: "Question 1",
            answer: "Answer 1"
        },
        {
            question: "Question 2",
            answer: "Answer 2"
        }
    ]
  return (
    <div className='flex justify-center items-center h-full'>
        <main className='w-[500px] p-4'>
        <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index+1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                     {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>  
        <Accordion type="single" collapsible>
           <AccordionItem value="item-1">
             <AccordionTrigger>Is it accessible?</AccordionTrigger>
               <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
             </AccordionContent>
           </AccordionItem>
        </Accordion>
        <HoverCard>
        <HoverCardTrigger>Hover</HoverCardTrigger>
         <HoverCardContent>
            The React Framework – created and maintained by @vercel.
         </HoverCardContent>
        </HoverCard>
        </main>
    </div>
  )
}

export default AccordPage