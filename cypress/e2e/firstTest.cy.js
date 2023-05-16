///<reference types="cypress"/>
// import { find } from "cypress/types/lodash"
// const { each } = require ("cypress/types/bluebird")
const { Button } = require("bootstrap")
// const { iteratee } = require("cypress/types/lodash")
const { timeout } = require("rxjs-compat/operator/timeout")

// const { contains } = require("cypress/types/jquery")

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
        cy.get('[data-cy="imputEmail1"]')
    })

    it("my second test",()=>{
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        cy.get('[data-cy="SignInBtn"]')

        cy.contains('[status="warning"]','Sign in')
        cy.get('#inputEmail3').parents('form').find('button').should('contain','Sign in').parents('form').find('nb-checkbox').click()

        cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })

    it("my second test",()=>{
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
        // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
        // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')


        //selenium 
        // const firstForm = cy.contains('nb-card','Using the Grid')
        // const secondForm =   cy.contains('nb-card','Basic form')

        // firstForm.find('[for="inputEmail1"]').should('contain','Email')
        // firstForm.find('[for="inputPassword2"]').should('contain','Password')
        // secondForm.find('[for="exampleInputEmail1"]').should('contain','Email address')


        //cypress style 
        cy.contains('nb-card','Using the Grid').then(fisrtForm =>{
            const emailFirstLabel = fisrtForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = fisrtForm.find('[for="inputPassword2"]').text()
            expect(emailFirstLabel).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card','Basic form').then(secondForm =>{
                const secondFormText = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(secondFormText)

                //wrap func 
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain','Password')
            })
        })

        
        
    })


    //invoke command 
    it.only('invvoke command',()=>{
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        //1 
        cy.get('[for="exampleInputEmail1"]')
            .should('contain','Email address')
            .should ('have.class','label')
            .and('have.text','Email address')

        //2 
        cy.get('[for="exampleInputEmail1"]').then(label =>{
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        //3 
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text=>{
            expect(text).to.equal('Email address')
        })


        cy.contains('nb-card','Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr','class')
        // .should('contain','checked')
        .then(classVal =>{
            expect(classVal).to.contain('checked')
        })
    })


    // assert properties  

    it('assert properties',()=>{
       

        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Datepicker").click()

        cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('19').click()
            cy.wrap(input).invoke('prop','value').should('contain','Apr 19, 2023')
        })
    })

    //checkboxes and radiobuttons 

    it('radioButtons',()=>{
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Form Layouts").click()

        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then(radioButtons =>{
            cy.wrap(radioButtons)
            .first()
            .check({force: true})
            .should('be.checked')

            cy.wrap(radioButtons)
            .eq(1)
            .check({force: true})
            
            cy.wrap(radioButtons)
            .first()
            .should('be.not.checked')

            cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')
        })
    })

    //checkboxes 
    it('checkboxes',()=>{
        cy.visit("/")
        cy.contains("Modal & Overlays").click()
        cy.contains("Toastr").click()

        // cy.get('[type="checkbox"]').check({force: true})
        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).click({force: true})

    })

    //date picker date object 
    it.only('assert properties',()=>{

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate()+ day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('default',{month:'short'})
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr','ng-reflect-date').then(dateAttr =>{
                if(!dateAttr.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
    
                } else{
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }
        cy.visit("/")
        cy.contains("Forms").click()
        cy.contains("Datepicker").click()





        cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
            cy.wrap(input).click()
           
            let dateAssert = selectDayFromCurrent(5)
            cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
            cy.wrap(input).should('have.value',dateAssert)
        })
    })

    it('Lists and Dropdowns',()=>{
        cy.visit("/")
        //1 
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain','Dark')
        cy.get('nb-layout-header nav').should('have.css','background-color','rgb(34, 43, 69)')

        //2 
        cy.get('nav nb-select').then(dropdown =>{
            cy.wrap(dropdown).click()
            //4 elements 
            cy.get('.options-list nb-option').each((listItem,index)=>{
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate":"rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain',itemText)
                cy.get('nb-layout-header nav').should('have.css','background-color',colors[itemText])
                if(index < 3){
                    cy.wrap(dropdown).click()
                }
            })
        })

       
    })

    it('web tables', ()=>{
        cy.visit("/")
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        //1 update existing table row 
        cy.get('tbody').contains('tr','Larry').then(tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder = "Age"]').clear().type('28')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain','28')
        })

        //2 adding new row  
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow =>{
            cy.wrap(tableRow).find('[placeholder = "First Name"]').type('Maree')
            cy.wrap(tableRow).find('[placeholder = "Last Name"]').type('Gangoo')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColumns =>{
            cy.wrap(tableColumns).eq(2).should('contain','Maree')
            cy.wrap(tableColumns).eq(3).should('contain','Gangoo')
        })

        //3 filtering by age 
        // cy.get('thead').find('[placeholder = "Age"]').type('20')


        // cy.get('thead [placeholder = "Age"]').type('20')
        // cy.wait(500)
        // cy.get('tbody tr').each(tableRow =>{
        //     cy.wrap(tableRow).find('td').eq(6).should('contain',20)
        // })

        const age = [20,30,40,200]
        cy.wrap(age).each(age=>{
            cy.get('thead [placeholder = "Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow =>{
                if(age == 200 ){
                    cy.wrap(tableRow).should('contain', 'No data found')
                }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain',age)

                }
               
            })
        })

    })

    it('tooltips', ()=>{
        cy.visit("/")
        cy.contains("Modal & Overlays").click()
        cy.contains("Tooltip").click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    })

    it('Dialog',()=>{
        cy.visit("/")
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        //1
        // cy.get('tbody tr').first().find('.nb-trash').click()
        // cy.on('window:confirm',(confirm)=>{
        //     expect(confirm).to.equal("Are you sure you want to delete?")
        // })

        //2
        // const stub = cy.stub()
        // cy.on('window:confirm',stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(()=>{
        //     expect(stub.getCall(0)).to.be.calledWith("Are you sure you want to delete?")
        // })

        //3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm',()=> false)
   
    
})

})
