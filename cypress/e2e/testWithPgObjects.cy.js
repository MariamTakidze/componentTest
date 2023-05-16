const { onDatePickerPage } = require("../support/page_objects/datePickerPage")
const { onFormsLayoutsPage } = require("../support/page_objects/formsLayoutsPage")
const { navigateTo } = require("../support/page_objects/navigationPage")
const { onSmartTablePage } = require("../support/page_objects/smartTablePage")


describe('testing with page objects',()=>{
    beforeEach('open application',()=>{
        cy.openHomePage()
    })

    // it('verify navigations across the pages',()=>{
    //     navigateTo.formsLayoutsPage()
    //     navigateTo.datePickerPage()
    //     navigateTo.smartTablePage()
    //     navigateTo.toasterPage()
    //     navigateTo.tooltipPage()
    // })

    it.only('submit form',()=>{
        navigateTo.formsLayoutsPage()
        onFormsLayoutsPage.submitInlineFormWithNameAndEmail("Maree","gango@gmail.com")
        onFormsLayoutsPage.submitBasicFormWithEmailAndPassword("gango27@gmail.com","test213")
        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRange(7,14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstNnameAndLastName('Mar','Gang')
        onSmartTablePage.updateAgeByFirstName('Mar','35')
        onSmartTablePage.deleteRowByIndex(1)
    })
})