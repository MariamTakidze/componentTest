
///<reference types="cypress"/>

describe("my second suite",()=>{
    it('my first test',()=>{
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()
        //by tag name 
        cy.get("input")

        //by Id 
        cy.get("#inputEmail1")

        //by class name 
        cy.get(".input-full-width")

        //by attr name 
        cy.get("[placeholder]")
        
        //by attr name and value 
        cy.get("[placeholder='Email']")

        //by class value 
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag name and attribute with value 
        cy.get("input[placeholder='Email']")
        
        //by two different attributes 
        cy.get("[placeholder='Email'],[type='Email']")

        //by tag name and attribute with value, Id and class name 
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //recommended cy 
        cy.get('data-cy="imputEmail1"')
    })
})
// describe("my first suite",()=>{
//     describe("first suite section",()=>{
//         beforeEach('code for each test',()=>{
//             //repetitive code
            
//         })
//         it('my first test',()=>{

//         })
//         it('my seconf test',()=>{
            
//         })
//         it('my third test',()=>{
            
//         })
//     })
//     it('my first test',()=>{

//     })
//     it('my second test',()=>{
        
//     })
//     it('my third test',()=>{
        
//     })

// })

// describe("my second suite",()=>{
//     it('my first test',()=>{

//     })
//     it('my second test',()=>{
        
//     })
//     it('my third test',()=>{
        
//     })

// })